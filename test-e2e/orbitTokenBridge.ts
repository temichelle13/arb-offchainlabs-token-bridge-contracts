import {
  L1Network,
  L1ToL2MessageGasEstimator,
  L1ToL2MessageStatus,
  L1TransactionReceipt,
  L2Network,
  L2TransactionReceipt,
} from '@arbitrum/sdk'
import { getBaseFee } from '@arbitrum/sdk/dist/lib/utils/lib'
import { JsonRpcProvider } from '@ethersproject/providers'
import { expect } from 'chai'
import { setupTokenBridgeInLocalEnv } from '../scripts/local-deployment/localDeploymentLib'
import {
  ERC20,
  ERC20__factory,
  IERC20Bridge__factory,
  IERC20__factory,
  IInbox__factory,
  IOwnable__factory,
  L1FeeTokenUSDCCustomGateway__factory,
  L1GatewayRouter__factory,
  L1OrbitCustomGateway__factory,
  L1OrbitERC20Gateway__factory,
  L1OrbitGatewayRouter__factory,
  L1USDCCustomGateway__factory,
  L2CustomGateway__factory,
  L2GatewayRouter__factory,
  L2USDCCustomGateway__factory,
  MockL1Usdc__factory,
  ProxyAdmin__factory,
  TestArbCustomToken__factory,
  TestCustomTokenL1__factory,
  TestERC20,
  TestERC20__factory,
  TestOrbitCustomTokenL1__factory,
  TransparentUpgradeableProxy__factory,
  UpgradeExecutor__factory,
  IFiatTokenArbitrumOrbitV22__factory,
} from '../build/types'
import { defaultAbiCoder } from 'ethers/lib/utils'
import { BigNumber, Wallet, ethers } from 'ethers'
import { exit } from 'process'

const config = {
  parentUrl: 'http://localhost:8547',
  childUrl: 'http://localhost:3347',
}

const LOCALHOST_L3_OWNER_KEY =
  '0xecdf21cb41c65afb51f91df408b7656e2c8739a5877f2814add0afd780cc210e'

let parentProvider: JsonRpcProvider
let childProvider: JsonRpcProvider

let deployerL1Wallet: Wallet
let deployerL2Wallet: Wallet

let userL1Wallet: Wallet
let userL2Wallet: Wallet

let _l1Network: L1Network
let _l2Network: L2Network

let token: TestERC20
let l2Token: ERC20
let nativeToken: ERC20 | undefined

describe('orbitTokenBridge', () => {
  // configure orbit token bridge
  before(async function () {
    parentProvider = new ethers.providers.JsonRpcProvider(config.parentUrl)
    childProvider = new ethers.providers.JsonRpcProvider(config.childUrl)

    const testDevKey =
      '0xb6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659'
    const testDevL1Wallet = new ethers.Wallet(testDevKey, parentProvider)
    const testDevL2Wallet = new ethers.Wallet(testDevKey, childProvider)

    const deployerKey = ethers.utils.sha256(
      ethers.utils.toUtf8Bytes('user_token_bridge_deployer')
    )
    deployerL1Wallet = new ethers.Wallet(deployerKey, parentProvider)
    deployerL2Wallet = new ethers.Wallet(deployerKey, childProvider)
    await (
      await testDevL1Wallet.sendTransaction({
        to: deployerL1Wallet.address,
        value: ethers.utils.parseEther('20.0'),
      })
    ).wait()
    await (
      await testDevL2Wallet.sendTransaction({
        to: deployerL2Wallet.address,
        value: ethers.utils.parseEther('20.0'),
      })
    ).wait()

    const { l1Network, l2Network } = await setupTokenBridgeInLocalEnv()

    _l1Network = l1Network
    _l2Network = l2Network

    // create user wallets and fund it
    const userKey = ethers.utils.sha256(ethers.utils.toUtf8Bytes('user_wallet'))
    userL1Wallet = new ethers.Wallet(userKey, parentProvider)
    userL2Wallet = new ethers.Wallet(userKey, childProvider)
    await (
      await deployerL1Wallet.sendTransaction({
        to: userL1Wallet.address,
        value: ethers.utils.parseEther('10.0'),
      })
    ).wait()
    await (
      await deployerL2Wallet.sendTransaction({
        to: userL2Wallet.address,
        value: ethers.utils.parseEther('10.0'),
      })
    ).wait()

    const nativeTokenAddress = await getFeeToken(
      l2Network.ethBridge.inbox,
      parentProvider
    )
    nativeToken =
      nativeTokenAddress === ethers.constants.AddressZero
        ? undefined
        : ERC20__factory.connect(nativeTokenAddress, userL1Wallet)

    if (nativeToken) {
      const supply = await nativeToken.balanceOf(deployerL1Wallet.address)
      await (
        await nativeToken
          .connect(deployerL1Wallet)
          .transfer(userL1Wallet.address, supply.div(10))
      ).wait()
    }
  })

  it('should have deployed token bridge contracts', async function () {
    // get router as entry point
    const l1Router = L1OrbitGatewayRouter__factory.connect(
      _l2Network.tokenBridge.l1GatewayRouter,
      parentProvider
    )

    expect((await l1Router.defaultGateway()).toLowerCase()).to.be.eq(
      _l2Network.tokenBridge.l1ERC20Gateway.toLowerCase()
    )
  })

  it('can deposit token via default gateway', async function () {
    // fund user to be able to pay retryable fees
    if (nativeToken) {
      await (
        await nativeToken
          .connect(deployerL1Wallet)
          .transfer(userL1Wallet.address, ethers.utils.parseEther('1000'))
      ).wait()
      nativeToken.connect(userL1Wallet)
    }

    // create token to be bridged
    const tokenFactory = await new TestERC20__factory(userL1Wallet).deploy()
    token = await tokenFactory.deployed()
    await (await token.mint()).wait()

    // snapshot state before
    const userTokenBalanceBefore = await token.balanceOf(userL1Wallet.address)

    const gatewayTokenBalanceBefore = await token.balanceOf(
      _l2Network.tokenBridge.l1ERC20Gateway
    )
    const userNativeTokenBalanceBefore = nativeToken
      ? await nativeToken.balanceOf(userL1Wallet.address)
      : await parentProvider.getBalance(userL1Wallet.address)
    const bridgeNativeTokenBalanceBefore = nativeToken
      ? await nativeToken.balanceOf(_l2Network.ethBridge.bridge)
      : await parentProvider.getBalance(_l2Network.ethBridge.bridge)

    // approve token
    const depositAmount = 350
    await (
      await token.approve(_l2Network.tokenBridge.l1ERC20Gateway, depositAmount)
    ).wait()

    // calculate retryable params
    const maxSubmissionCost = nativeToken
      ? BigNumber.from(0)
      : BigNumber.from(584000000000)
    const callhook = '0x'

    const gateway = L1OrbitERC20Gateway__factory.connect(
      _l2Network.tokenBridge.l1ERC20Gateway,
      userL1Wallet
    )
    const outboundCalldata = await gateway.getOutboundCalldata(
      token.address,
      userL1Wallet.address,
      userL2Wallet.address,
      depositAmount,
      callhook
    )

    const l1ToL2MessageGasEstimate = new L1ToL2MessageGasEstimator(
      childProvider
    )
    const retryableParams = await l1ToL2MessageGasEstimate.estimateAll(
      {
        from: userL1Wallet.address,
        to: userL2Wallet.address,
        l2CallValue: BigNumber.from(0),
        excessFeeRefundAddress: userL1Wallet.address,
        callValueRefundAddress: userL1Wallet.address,
        data: outboundCalldata,
      },
      await getBaseFee(parentProvider),
      parentProvider
    )

    const gasLimit = retryableParams.gasLimit.mul(60)
    const maxFeePerGas = retryableParams.maxFeePerGas
    const tokenTotalFeeAmount = gasLimit.mul(maxFeePerGas).mul(2)

    // approve fee amount
    if (nativeToken) {
      await (
        await nativeToken.approve(
          _l2Network.tokenBridge.l1ERC20Gateway,
          tokenTotalFeeAmount
        )
      ).wait()
    }

    // bridge it
    const userEncodedData = nativeToken
      ? defaultAbiCoder.encode(
          ['uint256', 'bytes', 'uint256'],
          [maxSubmissionCost, callhook, tokenTotalFeeAmount]
        )
      : defaultAbiCoder.encode(
          ['uint256', 'bytes'],
          [maxSubmissionCost, callhook]
        )

    const router = nativeToken
      ? L1OrbitGatewayRouter__factory.connect(
          _l2Network.tokenBridge.l1GatewayRouter,
          userL1Wallet
        )
      : L1GatewayRouter__factory.connect(
          _l2Network.tokenBridge.l1GatewayRouter,
          userL1Wallet
        )

    const depositTx = await router.outboundTransferCustomRefund(
      token.address,
      userL1Wallet.address,
      userL2Wallet.address,
      depositAmount,
      gasLimit,
      maxFeePerGas,
      userEncodedData,
      { value: nativeToken ? BigNumber.from(0) : tokenTotalFeeAmount }
    )

    // wait for L2 msg to be executed
    await waitOnL2Msg(depositTx)

    ///// checks

    const l2TokenAddress = await router.calculateL2TokenAddress(token.address)
    l2Token = ERC20__factory.connect(l2TokenAddress, childProvider)
    expect(await l2Token.balanceOf(userL2Wallet.address)).to.be.eq(
      depositAmount
    )

    const userTokenBalanceAfter = await token.balanceOf(userL1Wallet.address)
    expect(userTokenBalanceBefore.sub(userTokenBalanceAfter)).to.be.eq(
      depositAmount
    )

    const gatewayTokenBalanceAfter = await token.balanceOf(
      _l2Network.tokenBridge.l1ERC20Gateway
    )
    expect(gatewayTokenBalanceAfter.sub(gatewayTokenBalanceBefore)).to.be.eq(
      depositAmount
    )

    const userNativeTokenBalanceAfter = nativeToken
      ? await nativeToken.balanceOf(userL1Wallet.address)
      : await parentProvider.getBalance(userL1Wallet.address)
    if (nativeToken) {
      expect(
        userNativeTokenBalanceBefore.sub(userNativeTokenBalanceAfter)
      ).to.be.eq(tokenTotalFeeAmount)
    } else {
      expect(
        userNativeTokenBalanceBefore.sub(userNativeTokenBalanceAfter)
      ).to.be.gte(tokenTotalFeeAmount.toNumber())
    }

    const bridgeNativeTokenBalanceAfter = nativeToken
      ? await nativeToken.balanceOf(_l2Network.ethBridge.bridge)
      : await parentProvider.getBalance(_l2Network.ethBridge.bridge)
    expect(
      bridgeNativeTokenBalanceAfter.sub(bridgeNativeTokenBalanceBefore)
    ).to.be.eq(tokenTotalFeeAmount)
  })

  xit('can withdraw token via default gateway', async function () {
    // fund userL2Wallet so it can pay for L2 withdraw TX
    await depositNativeToL2()

    // snapshot state before
    const userL1TokenBalanceBefore = await token.balanceOf(userL1Wallet.address)
    const userL2TokenBalanceBefore = await l2Token.balanceOf(
      userL2Wallet.address
    )
    const l1GatewayTokenBalanceBefore = await token.balanceOf(
      _l2Network.tokenBridge.l1ERC20Gateway
    )
    const l2TokenSupplyBefore = await l2Token.totalSupply()

    // start withdrawal
    const withdrawalAmount = 250
    const l2Router = L2GatewayRouter__factory.connect(
      _l2Network.tokenBridge.l2GatewayRouter,
      userL2Wallet
    )
    const withdrawTx = await l2Router[
      'outboundTransfer(address,address,uint256,bytes)'
    ](token.address, userL1Wallet.address, withdrawalAmount, '0x')
    const withdrawReceipt = await withdrawTx.wait()
    const l2Receipt = new L2TransactionReceipt(withdrawReceipt)

    // wait until dispute period passes and withdrawal is ready for execution
    await sleep(5 * 1000)

    const messages = await l2Receipt.getL2ToL1Messages(userL1Wallet)
    const l2ToL1Msg = messages[0]
    const timeToWaitMs = 1000
    await l2ToL1Msg.waitUntilReadyToExecute(childProvider, timeToWaitMs)

    // execute on L1
    await (await l2ToL1Msg.execute(childProvider)).wait()

    //// checks
    const userL1TokenBalanceAfter = await token.balanceOf(userL1Wallet.address)
    expect(userL1TokenBalanceAfter.sub(userL1TokenBalanceBefore)).to.be.eq(
      withdrawalAmount
    )

    const userL2TokenBalanceAfter = await l2Token.balanceOf(
      userL2Wallet.address
    )
    expect(userL2TokenBalanceBefore.sub(userL2TokenBalanceAfter)).to.be.eq(
      withdrawalAmount
    )

    const l1GatewayTokenBalanceAfter = await token.balanceOf(
      _l2Network.tokenBridge.l1ERC20Gateway
    )
    expect(
      l1GatewayTokenBalanceBefore.sub(l1GatewayTokenBalanceAfter)
    ).to.be.eq(withdrawalAmount)

    const l2TokenSupplyAfter = await l2Token.totalSupply()
    expect(l2TokenSupplyBefore.sub(l2TokenSupplyAfter)).to.be.eq(
      withdrawalAmount
    )
  })

  it('can deposit token via custom gateway', async function () {
    // fund user to be able to pay retryable fees
    if (nativeToken) {
      await (
        await nativeToken
          .connect(deployerL1Wallet)
          .transfer(userL1Wallet.address, ethers.utils.parseEther('1000'))
      ).wait()
    }

    // create L1 custom token
    const customL1TokenFactory = nativeToken
      ? await new TestOrbitCustomTokenL1__factory(deployerL1Wallet).deploy(
          _l2Network.tokenBridge.l1CustomGateway,
          _l2Network.tokenBridge.l1GatewayRouter
        )
      : await new TestCustomTokenL1__factory(deployerL1Wallet).deploy(
          _l2Network.tokenBridge.l1CustomGateway,
          _l2Network.tokenBridge.l1GatewayRouter
        )
    const customL1Token = await customL1TokenFactory.deployed()
    await (await customL1Token.connect(userL1Wallet).mint()).wait()

    // create L2 custom token
    if (nativeToken) {
      await depositNativeToL2()
    }
    const customL2TokenFactory = await new TestArbCustomToken__factory(
      deployerL2Wallet
    ).deploy(_l2Network.tokenBridge.l2CustomGateway, customL1Token.address)
    const customL2Token = await customL2TokenFactory.deployed()

    // prepare custom gateway registration params
    const router = nativeToken
      ? L1OrbitGatewayRouter__factory.connect(
          _l2Network.tokenBridge.l1GatewayRouter,
          userL1Wallet
        )
      : L1GatewayRouter__factory.connect(
          _l2Network.tokenBridge.l1GatewayRouter,
          userL1Wallet
        )
    const l1ToL2MessageGasEstimate = new L1ToL2MessageGasEstimator(
      childProvider
    )

    const routerData =
      L2GatewayRouter__factory.createInterface().encodeFunctionData(
        'setGateway',
        [[customL1Token.address], [_l2Network.tokenBridge.l2CustomGateway]]
      )
    const routerRetryableParams = await l1ToL2MessageGasEstimate.estimateAll(
      {
        from: _l2Network.tokenBridge.l1GatewayRouter,
        to: _l2Network.tokenBridge.l2GatewayRouter,
        l2CallValue: BigNumber.from(0),
        excessFeeRefundAddress: userL1Wallet.address,
        callValueRefundAddress: userL1Wallet.address,
        data: routerData,
      },
      await getBaseFee(parentProvider),
      parentProvider
    )

    const gatewayData =
      L2CustomGateway__factory.createInterface().encodeFunctionData(
        'registerTokenFromL1',
        [[customL1Token.address], [customL2Token.address]]
      )
    const gwRetryableParams = await l1ToL2MessageGasEstimate.estimateAll(
      {
        from: _l2Network.tokenBridge.l1CustomGateway,
        to: _l2Network.tokenBridge.l2CustomGateway,
        l2CallValue: BigNumber.from(0),
        excessFeeRefundAddress: userL1Wallet.address,
        callValueRefundAddress: userL1Wallet.address,
        data: gatewayData,
      },
      await getBaseFee(parentProvider),
      parentProvider
    )

    // approve fee amount
    const valueForGateway = gwRetryableParams.deposit.mul(BigNumber.from(2))
    const valueForRouter = routerRetryableParams.deposit.mul(BigNumber.from(2))
    if (nativeToken) {
      await (
        await nativeToken.approve(
          customL1Token.address,
          valueForGateway.add(valueForRouter)
        )
      ).wait()
    }

    // do the custom gateway registration
    const receipt = await (
      await customL1Token
        .connect(userL1Wallet)
        .registerTokenOnL2(
          customL2Token.address,
          gwRetryableParams.maxSubmissionCost,
          routerRetryableParams.maxSubmissionCost,
          gwRetryableParams.gasLimit.mul(2),
          routerRetryableParams.gasLimit.mul(2),
          BigNumber.from(100000000),
          valueForGateway,
          valueForRouter,
          userL1Wallet.address,
          {
            value: nativeToken
              ? BigNumber.from(0)
              : valueForGateway.add(valueForRouter),
          }
        )
    ).wait()

    /// wait for execution of both tickets
    const l1TxReceipt = new L1TransactionReceipt(receipt)
    const messages = await l1TxReceipt.getL1ToL2Messages(childProvider)
    const messageResults = await Promise.all(
      messages.map(message => message.waitForStatus())
    )
    if (
      messageResults[0].status !== L1ToL2MessageStatus.REDEEMED ||
      messageResults[1].status !== L1ToL2MessageStatus.REDEEMED
    ) {
      console.log(
        `Retryable ticket (ID ${messages[0].retryableCreationId}) status: ${
          L1ToL2MessageStatus[messageResults[0].status]
        }`
      )
      console.log(
        `Retryable ticket (ID ${messages[1].retryableCreationId}) status: ${
          L1ToL2MessageStatus[messageResults[1].status]
        }`
      )
      exit()
    }

    // snapshot state before
    const userTokenBalanceBefore = await customL1Token.balanceOf(
      userL1Wallet.address
    )
    const gatewayTokenBalanceBefore = await customL1Token.balanceOf(
      _l2Network.tokenBridge.l1CustomGateway
    )
    const userNativeTokenBalanceBefore = nativeToken
      ? await nativeToken.balanceOf(userL1Wallet.address)
      : await parentProvider.getBalance(userL1Wallet.address)
    const bridgeNativeTokenBalanceBefore = nativeToken
      ? await nativeToken.balanceOf(_l2Network.ethBridge.bridge)
      : await parentProvider.getBalance(_l2Network.ethBridge.bridge)

    // approve token
    const depositAmount = 110
    await (
      await customL1Token
        .connect(userL1Wallet)
        .approve(_l2Network.tokenBridge.l1CustomGateway, depositAmount)
    ).wait()

    // calculate retryable params
    const maxSubmissionCost = 0
    const callhook = '0x'

    const gateway = L1OrbitCustomGateway__factory.connect(
      _l2Network.tokenBridge.l1CustomGateway,
      userL1Wallet
    )
    const outboundCalldata = await gateway.getOutboundCalldata(
      customL1Token.address,
      userL1Wallet.address,
      userL2Wallet.address,
      depositAmount,
      callhook
    )

    const retryableParams = await l1ToL2MessageGasEstimate.estimateAll(
      {
        from: userL1Wallet.address,
        to: userL2Wallet.address,
        l2CallValue: BigNumber.from(0),
        excessFeeRefundAddress: userL1Wallet.address,
        callValueRefundAddress: userL1Wallet.address,
        data: outboundCalldata,
      },
      await getBaseFee(parentProvider),
      parentProvider
    )

    const gasLimit = retryableParams.gasLimit.mul(40)
    const maxFeePerGas = retryableParams.maxFeePerGas
    const tokenTotalFeeAmount = gasLimit.mul(maxFeePerGas).mul(2)

    // approve fee amount
    if (nativeToken) {
      await (
        await nativeToken.approve(
          _l2Network.tokenBridge.l1CustomGateway,
          tokenTotalFeeAmount
        )
      ).wait()
    }

    // bridge it
    const userEncodedData = nativeToken
      ? defaultAbiCoder.encode(
          ['uint256', 'bytes', 'uint256'],
          [maxSubmissionCost, callhook, tokenTotalFeeAmount]
        )
      : defaultAbiCoder.encode(
          ['uint256', 'bytes'],
          [BigNumber.from(334400000000), callhook]
        )

    const depositTx = await router.outboundTransferCustomRefund(
      customL1Token.address,
      userL1Wallet.address,
      userL2Wallet.address,
      depositAmount,
      gasLimit,
      maxFeePerGas,
      userEncodedData,
      { value: nativeToken ? BigNumber.from(0) : tokenTotalFeeAmount }
    )

    // wait for L2 msg to be executed
    await waitOnL2Msg(depositTx)

    ///// checks
    expect(await router.getGateway(customL1Token.address)).to.be.eq(
      _l2Network.tokenBridge.l1CustomGateway
    )

    const l2TokenAddress = await router.calculateL2TokenAddress(
      customL1Token.address
    )

    l2Token = ERC20__factory.connect(l2TokenAddress, childProvider)
    expect(await l2Token.balanceOf(userL2Wallet.address)).to.be.eq(
      depositAmount
    )

    const userTokenBalanceAfter = await customL1Token.balanceOf(
      userL1Wallet.address
    )
    expect(userTokenBalanceBefore.sub(userTokenBalanceAfter)).to.be.eq(
      depositAmount
    )

    const gatewayTokenBalanceAfter = await customL1Token.balanceOf(
      _l2Network.tokenBridge.l1CustomGateway
    )
    expect(gatewayTokenBalanceAfter.sub(gatewayTokenBalanceBefore)).to.be.eq(
      depositAmount
    )

    const userNativeTokenBalanceAfter = nativeToken
      ? await nativeToken.balanceOf(userL1Wallet.address)
      : await parentProvider.getBalance(userL1Wallet.address)
    if (nativeToken) {
      expect(
        userNativeTokenBalanceBefore.sub(userNativeTokenBalanceAfter)
      ).to.be.eq(tokenTotalFeeAmount)
    } else {
      expect(
        userNativeTokenBalanceBefore.sub(userNativeTokenBalanceAfter)
      ).to.be.gte(tokenTotalFeeAmount.toNumber())
    }
    const bridgeNativeTokenBalanceAfter = nativeToken
      ? await nativeToken.balanceOf(_l2Network.ethBridge.bridge)
      : await parentProvider.getBalance(_l2Network.ethBridge.bridge)
    expect(
      bridgeNativeTokenBalanceAfter.sub(bridgeNativeTokenBalanceBefore)
    ).to.be.eq(tokenTotalFeeAmount)
  })

  it('can upgrade from bridged USDC to native USDC when eth is native token', async function () {
    /// test applicable only for eth based chains
    if (nativeToken) {
      return
    }

    /// create new L1 usdc gateway behind proxy
    const proxyAdminFac = await new ProxyAdmin__factory(
      deployerL1Wallet
    ).deploy()
    const proxyAdmin = await proxyAdminFac.deployed()
    const l1USDCCustomGatewayFactory = await new L1USDCCustomGateway__factory(
      deployerL1Wallet
    ).deploy()
    const l1USDCCustomGatewayLogic = await l1USDCCustomGatewayFactory.deployed()
    const tupFactory = await new TransparentUpgradeableProxy__factory(
      deployerL1Wallet
    ).deploy(l1USDCCustomGatewayLogic.address, proxyAdmin.address, '0x')
    const tup = await tupFactory.deployed()
    const l1USDCCustomGateway = L1USDCCustomGateway__factory.connect(
      tup.address,
      deployerL1Wallet
    )
    console.log('L1USDCCustomGateway address: ', l1USDCCustomGateway.address)

    /// create new L2 usdc gateway behind proxy
    const proxyAdminL2Fac = await new ProxyAdmin__factory(
      deployerL2Wallet
    ).deploy()
    const proxyAdminL2 = await proxyAdminL2Fac.deployed()
    const l2USDCCustomGatewayFactory = await new L2USDCCustomGateway__factory(
      deployerL2Wallet
    ).deploy()
    const l2USDCCustomGatewayLogic = await l2USDCCustomGatewayFactory.deployed()
    const tupL2Factory = await new TransparentUpgradeableProxy__factory(
      deployerL2Wallet
    ).deploy(l2USDCCustomGatewayLogic.address, proxyAdminL2.address, '0x')
    const tupL2 = await tupL2Factory.deployed()
    const l2USDCCustomGateway = L2USDCCustomGateway__factory.connect(
      tupL2.address,
      deployerL2Wallet
    )
    console.log('L2USDCCustomGateway address: ', l2USDCCustomGateway.address)

    /// create l1 usdc behind proxy
    const l1UsdcFactory = await new MockL1Usdc__factory(
      deployerL1Wallet
    ).deploy()
    const l1UsdcLogic = await l1UsdcFactory.deployed()
    const tupL1UsdcFactory = await new TransparentUpgradeableProxy__factory(
      deployerL1Wallet
    ).deploy(l1UsdcLogic.address, proxyAdmin.address, '0x')
    const tupL1Usdc = await tupL1UsdcFactory.deployed()
    const l1Usdc = MockL1Usdc__factory.connect(
      tupL1Usdc.address,
      deployerL1Wallet
    )
    await (await l1Usdc.initialize()).wait()
    console.log('L1 USDC address: ', l1Usdc.address)

    /// create l2 usdc behind proxy
    const l2UsdcLogic = await _deployBridgedUsdcToken(deployerL2Wallet)
    const tupL2UsdcFactory = await new TransparentUpgradeableProxy__factory(
      deployerL2Wallet
    ).deploy(l2UsdcLogic.address, proxyAdminL2.address, '0x')
    const tupL2Usdc = await tupL2UsdcFactory.deployed()
    const l2UsdcInit = IFiatTokenArbitrumOrbitV22__factory.connect(
      tupL2Usdc.address,
      deployerL2Wallet
    )
    await (
      await l2UsdcInit.initialize(
        'USDC token',
        'USDC.e',
        'USD',
        6,
        ethers.Wallet.createRandom().address,
        ethers.Wallet.createRandom().address,
        ethers.Wallet.createRandom().address,
        deployerL2Wallet.address
      )
    ).wait()
    await (await l2UsdcInit.initializeV2('USDC')).wait()
    await (
      await l2UsdcInit.initializeV2_1(ethers.Wallet.createRandom().address)
    ).wait()
    await (await l2UsdcInit.initializeV2_2([], 'USDC.e')).wait()
    await (
      await l2UsdcInit.initializeArbitrumOrbit(
        l2USDCCustomGateway.address,
        l1Usdc.address
      )
    ).wait()
    const l2Usdc = IERC20__factory.connect(l2UsdcInit.address, deployerL2Wallet)
    console.log('L2 USDC address: ', l2Usdc.address)

    /// initialize gateways
    await (
      await l1USDCCustomGateway.initialize(
        l2USDCCustomGateway.address,
        _l2Network.tokenBridge.l1GatewayRouter,
        _l2Network.ethBridge.inbox,
        l1Usdc.address,
        l2Usdc.address,
        deployerL1Wallet.address
      )
    ).wait()
    console.log('L1 USDC custom gateway initialized')

    await (
      await l2USDCCustomGateway.initialize(
        l1USDCCustomGateway.address,
        _l2Network.tokenBridge.l2GatewayRouter,
        l1Usdc.address,
        l2Usdc.address,
        deployerL2Wallet.address
      )
    ).wait()
    console.log('L2 USDC custom gateway initialized')

    /// register USDC custom gateway
    const router = L1GatewayRouter__factory.connect(
      _l2Network.tokenBridge.l1GatewayRouter,
      deployerL1Wallet
    )
    const l2Router = L2GatewayRouter__factory.connect(
      _l2Network.tokenBridge.l2GatewayRouter,
      deployerL2Wallet
    )
    const maxGas = BigNumber.from(500000)
    const gasPriceBid = BigNumber.from(200000000)
    let maxSubmissionCost = BigNumber.from(257600000000)
    const registrationCalldata = router.interface.encodeFunctionData(
      'setGateways',
      [
        [l1Usdc.address],
        [l1USDCCustomGateway.address],
        maxGas,
        gasPriceBid,
        maxSubmissionCost,
      ]
    )
    const rollupOwner = new Wallet(LOCALHOST_L3_OWNER_KEY, parentProvider)
    const upExec = UpgradeExecutor__factory.connect(
      await IOwnable__factory.connect(
        _l2Network.ethBridge.rollup,
        deployerL1Wallet
      ).owner(),
      rollupOwner
    )
    const gwRegistrationTx = await upExec.executeCall(
      router.address,
      registrationCalldata,
      {
        value: maxGas.mul(gasPriceBid).add(maxSubmissionCost),
      }
    )
    await waitOnL2Msg(gwRegistrationTx)
    console.log('USDC custom gateway registered')

    /// check gateway registration
    expect(await router.getGateway(l1Usdc.address)).to.be.eq(
      l1USDCCustomGateway.address
    )
    expect(await l1USDCCustomGateway.depositsPaused()).to.be.eq(false)
    expect(await l2Router.getGateway(l1Usdc.address)).to.be.eq(
      l2USDCCustomGateway.address
    )
    expect(await l2USDCCustomGateway.withdrawalsPaused()).to.be.eq(false)

    /// do a deposit
    const depositAmount = ethers.utils.parseEther('2')
    await (await l1Usdc.transfer(userL1Wallet.address, depositAmount)).wait()
    await (
      await l1Usdc
        .connect(userL1Wallet)
        .approve(l1USDCCustomGateway.address, depositAmount)
    ).wait()
    maxSubmissionCost = BigNumber.from(334400000000)
    const depositTx = await router
      .connect(userL1Wallet)
      .outboundTransferCustomRefund(
        l1Usdc.address,
        userL2Wallet.address,
        userL2Wallet.address,
        depositAmount,
        maxGas,
        gasPriceBid,
        defaultAbiCoder.encode(['uint256', 'bytes'], [maxSubmissionCost, '0x']),
        { value: maxGas.mul(gasPriceBid).add(maxSubmissionCost) }
      )
    await waitOnL2Msg(depositTx)
    expect(await l2Usdc.balanceOf(userL2Wallet.address)).to.be.eq(depositAmount)
    expect(await l1Usdc.balanceOf(l1USDCCustomGateway.address)).to.be.eq(
      depositAmount
    )
    console.log('Deposited USDC')

    /// pause deposits
    await (await l1USDCCustomGateway.pauseDeposits()).wait()
    expect(await l1USDCCustomGateway.depositsPaused()).to.be.eq(true)

    /// pause withdrawals
    await (await l2USDCCustomGateway.pauseWithdrawals()).wait()
    expect(await l2USDCCustomGateway.withdrawalsPaused()).to.be.eq(true)

    /// transfer ownership to circle
    const circleWallet = ethers.Wallet.createRandom().connect(parentProvider)
    await (
      await deployerL1Wallet.sendTransaction({
        to: circleWallet.address,
        value: ethers.utils.parseEther('1'),
      })
    ).wait()

    await (await l1Usdc.setOwner(circleWallet.address)).wait()
    await (await l1USDCCustomGateway.setOwner(circleWallet.address)).wait()
    console.log('L1 USDC and L1 USDC gateway ownership transferred to circle')

    /// circle checks that deposits are paused, all in-flight deposits and withdrawals are processed

    /// add minter rights to usdc gateway so it can burn USDC
    await (
      await l1Usdc.connect(circleWallet).addMinter(l1USDCCustomGateway.address)
    ).wait()
    console.log('Minter rights added to USDC gateway')

    /// burn USDC
    await (
      await l1USDCCustomGateway.connect(circleWallet).burnLockedUSDC()
    ).wait()
    expect(await l1Usdc.balanceOf(l1USDCCustomGateway.address)).to.be.eq(0)
    expect(await l2Usdc.balanceOf(userL2Wallet.address)).to.be.eq(depositAmount)
    console.log('USDC burned')
  })

  it('can upgrade from bridged USDC to native USDC when fee token is used', async function () {
    /// test applicable only for fee token based chains
    if (!nativeToken) {
      return
    }

    /// create new L1 usdc gateway behind proxy
    const proxyAdminFac = await new ProxyAdmin__factory(
      deployerL1Wallet
    ).deploy()
    const proxyAdmin = await proxyAdminFac.deployed()
    const l1USDCCustomGatewayFactory =
      await new L1FeeTokenUSDCCustomGateway__factory(deployerL1Wallet).deploy()
    const l1USDCCustomGatewayLogic = await l1USDCCustomGatewayFactory.deployed()
    const tupFactory = await new TransparentUpgradeableProxy__factory(
      deployerL1Wallet
    ).deploy(l1USDCCustomGatewayLogic.address, proxyAdmin.address, '0x')
    const tup = await tupFactory.deployed()
    const l1USDCCustomGateway = L1USDCCustomGateway__factory.connect(
      tup.address,
      deployerL1Wallet
    )
    console.log('L1USDCCustomGateway address: ', l1USDCCustomGateway.address)

    /// create new L2 usdc gateway behind proxy
    const proxyAdminL2Fac = await new ProxyAdmin__factory(
      deployerL2Wallet
    ).deploy()
    const proxyAdminL2 = await proxyAdminL2Fac.deployed()
    const l2USDCCustomGatewayFactory = await new L2USDCCustomGateway__factory(
      deployerL2Wallet
    ).deploy()
    const l2USDCCustomGatewayLogic = await l2USDCCustomGatewayFactory.deployed()
    const tupL2Factory = await new TransparentUpgradeableProxy__factory(
      deployerL2Wallet
    ).deploy(l2USDCCustomGatewayLogic.address, proxyAdminL2.address, '0x')
    const tupL2 = await tupL2Factory.deployed()
    const l2USDCCustomGateway = L2USDCCustomGateway__factory.connect(
      tupL2.address,
      deployerL2Wallet
    )
    console.log('L2USDCCustomGateway address: ', l2USDCCustomGateway.address)

    /// create l1 usdc behind proxy
    const l1UsdcFactory = await new MockL1Usdc__factory(
      deployerL1Wallet
    ).deploy()
    const l1UsdcLogic = await l1UsdcFactory.deployed()
    const tupL1UsdcFactory = await new TransparentUpgradeableProxy__factory(
      deployerL1Wallet
    ).deploy(l1UsdcLogic.address, proxyAdmin.address, '0x')
    const tupL1Usdc = await tupL1UsdcFactory.deployed()
    const l1Usdc = MockL1Usdc__factory.connect(
      tupL1Usdc.address,
      deployerL1Wallet
    )
    await (await l1Usdc.initialize()).wait()
    console.log('L1 USDC address: ', l1Usdc.address)

    /// create l2 usdc behind proxy
    const l2UsdcLogic = await _deployBridgedUsdcToken(deployerL2Wallet)
    const tupL2UsdcFactory = await new TransparentUpgradeableProxy__factory(
      deployerL2Wallet
    ).deploy(l2UsdcLogic.address, proxyAdminL2.address, '0x')
    const tupL2Usdc = await tupL2UsdcFactory.deployed()
    const l2UsdcInit = IFiatTokenArbitrumOrbitV22__factory.connect(
      tupL2Usdc.address,
      deployerL2Wallet
    )
    await (
      await l2UsdcInit.initialize(
        'USDC token',
        'USDC.e',
        'USD',
        6,
        ethers.Wallet.createRandom().address,
        ethers.Wallet.createRandom().address,
        ethers.Wallet.createRandom().address,
        deployerL2Wallet.address
      )
    ).wait()
    await (await l2UsdcInit.initializeV2('USDC')).wait()
    await (
      await l2UsdcInit.initializeV2_1(ethers.Wallet.createRandom().address)
    ).wait()
    await (await l2UsdcInit.initializeV2_2([], 'USDC.e')).wait()
    await (
      await l2UsdcInit.initializeArbitrumOrbit(
        l2USDCCustomGateway.address,
        l1Usdc.address
      )
    ).wait()
    const l2Usdc = IERC20__factory.connect(l2UsdcInit.address, deployerL2Wallet)
    console.log('L2 USDC address: ', l2Usdc.address)

    /// initialize gateways
    await (
      await l1USDCCustomGateway.initialize(
        l2USDCCustomGateway.address,
        _l2Network.tokenBridge.l1GatewayRouter,
        _l2Network.ethBridge.inbox,
        l1Usdc.address,
        l2Usdc.address,
        deployerL1Wallet.address
      )
    ).wait()
    console.log('L1 USDC custom gateway initialized')

    await (
      await l2USDCCustomGateway.initialize(
        l1USDCCustomGateway.address,
        _l2Network.tokenBridge.l2GatewayRouter,
        l1Usdc.address,
        l2Usdc.address,
        deployerL2Wallet.address
      )
    ).wait()
    console.log('L2 USDC custom gateway initialized')

    /// register USDC custom gateway
    const router = L1OrbitGatewayRouter__factory.connect(
      _l2Network.tokenBridge.l1GatewayRouter,
      deployerL1Wallet
    )
    const l2Router = L2GatewayRouter__factory.connect(
      _l2Network.tokenBridge.l2GatewayRouter,
      deployerL2Wallet
    )
    const maxGas = BigNumber.from(500000)
    const gasPriceBid = BigNumber.from(200000000)
    const totalFeeTokenAmount = maxGas.mul(gasPriceBid)
    const maxSubmissionCost = BigNumber.from(0)

    // prefund inbox to pay for registration
    await (
      await nativeToken
        .connect(deployerL1Wallet)
        .transfer(_l2Network.ethBridge.inbox, totalFeeTokenAmount)
    ).wait()

    const registrationCalldata = (router.interface as any).encodeFunctionData(
      'setGateways(address[],address[],uint256,uint256,uint256,uint256)',
      [
        [l1Usdc.address],
        [l1USDCCustomGateway.address],
        maxGas,
        gasPriceBid,
        maxSubmissionCost,
        totalFeeTokenAmount,
      ]
    )
    const rollupOwner = new Wallet(LOCALHOST_L3_OWNER_KEY, parentProvider)

    // approve fee amount
    console.log('Approving fee amount')
    await (
      await nativeToken
        .connect(rollupOwner)
        .approve(l1USDCCustomGateway.address, totalFeeTokenAmount)
    ).wait()

    const upExec = UpgradeExecutor__factory.connect(
      await IOwnable__factory.connect(
        _l2Network.ethBridge.rollup,
        deployerL1Wallet
      ).owner(),
      rollupOwner
    )
    const gwRegistrationTx = await upExec.executeCall(
      router.address,
      registrationCalldata
    )
    await waitOnL2Msg(gwRegistrationTx)
    console.log('USDC custom gateway registered')

    /// check gateway registration
    expect(await router.getGateway(l1Usdc.address)).to.be.eq(
      l1USDCCustomGateway.address
    )
    expect(await l1USDCCustomGateway.depositsPaused()).to.be.eq(false)
    expect(await l2Router.getGateway(l1Usdc.address)).to.be.eq(
      l2USDCCustomGateway.address
    )
    expect(await l2USDCCustomGateway.withdrawalsPaused()).to.be.eq(false)

    /// do a deposit
    const depositAmount = ethers.utils.parseEther('2')
    await (await l1Usdc.transfer(userL1Wallet.address, depositAmount)).wait()
    await (
      await l1Usdc
        .connect(userL1Wallet)
        .approve(l1USDCCustomGateway.address, depositAmount)
    ).wait()

    // approve fee amount
    await (
      await nativeToken
        .connect(userL1Wallet)
        .approve(l1USDCCustomGateway.address, totalFeeTokenAmount)
    ).wait()

    const depositTx = await router
      .connect(userL1Wallet)
      .outboundTransferCustomRefund(
        l1Usdc.address,
        userL2Wallet.address,
        userL2Wallet.address,
        depositAmount,
        maxGas,
        gasPriceBid,
        defaultAbiCoder.encode(
          ['uint256', 'bytes', 'uint256'],
          [maxSubmissionCost, '0x', totalFeeTokenAmount]
        )
      )
    await waitOnL2Msg(depositTx)
    expect(await l2Usdc.balanceOf(userL2Wallet.address)).to.be.eq(depositAmount)
    expect(await l1Usdc.balanceOf(l1USDCCustomGateway.address)).to.be.eq(
      depositAmount
    )
    console.log('Deposited USDC')

    /// pause deposits
    await (await l1USDCCustomGateway.pauseDeposits()).wait()
    expect(await l1USDCCustomGateway.depositsPaused()).to.be.eq(true)

    /// pause withdrawals
    await (await l2USDCCustomGateway.pauseWithdrawals()).wait()
    expect(await l2USDCCustomGateway.withdrawalsPaused()).to.be.eq(true)

    /// transfer ownership to circle
    const circleWallet = ethers.Wallet.createRandom().connect(parentProvider)
    await (
      await deployerL1Wallet.sendTransaction({
        to: circleWallet.address,
        value: ethers.utils.parseEther('1'),
      })
    ).wait()

    await (await l1Usdc.setOwner(circleWallet.address)).wait()
    await (await l1USDCCustomGateway.setOwner(circleWallet.address)).wait()
    console.log('L1 USDC and L1 USDC gateway ownership transferred to circle')

    /// circle checks that deposits are paused, all in-flight deposits and withdrawals are processed

    /// add minter rights to usdc gateway so it can burn USDC
    await (
      await l1Usdc.connect(circleWallet).addMinter(l1USDCCustomGateway.address)
    ).wait()
    console.log('Minter rights added to USDC gateway')

    /// burn USDC
    await (
      await l1USDCCustomGateway.connect(circleWallet).burnLockedUSDC()
    ).wait()
    expect(await l1Usdc.balanceOf(l1USDCCustomGateway.address)).to.be.eq(0)
    expect(await l2Usdc.balanceOf(userL2Wallet.address)).to.be.eq(depositAmount)
    console.log('USDC burned')
  })
})

/**
 * helper function to fund user wallet on L2
 */
async function depositNativeToL2() {
  /// deposit tokens
  const amountToDeposit = ethers.utils.parseEther('2.0')
  await (
    await nativeToken!
      .connect(userL1Wallet)
      .approve(_l2Network.ethBridge.inbox, amountToDeposit)
  ).wait()

  const depositFuncSig = {
    name: 'depositERC20',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
  }
  const inbox = new ethers.Contract(
    _l2Network.ethBridge.inbox,
    [depositFuncSig],
    userL1Wallet
  )

  const depositTx = await inbox.depositERC20(amountToDeposit)

  // wait for deposit to be processed
  const depositRec = await L1TransactionReceipt.monkeyPatchEthDepositWait(
    depositTx
  ).wait()
  await depositRec.waitForL2(childProvider)
}

async function waitOnL2Msg(tx: ethers.ContractTransaction) {
  const retryableReceipt = await tx.wait()
  const l1TxReceipt = new L1TransactionReceipt(retryableReceipt)
  const messages = await l1TxReceipt.getL1ToL2Messages(childProvider)

  // 1 msg expected
  const messageResult = await messages[0].waitForStatus()
  const status = messageResult.status
  expect(status).to.be.eq(L1ToL2MessageStatus.REDEEMED)
}

const getFeeToken = async (inbox: string, parentProvider: any) => {
  const bridge = await IInbox__factory.connect(inbox, parentProvider).bridge()

  let feeToken = ethers.constants.AddressZero

  try {
    feeToken = await IERC20Bridge__factory.connect(
      bridge,
      parentProvider
    ).nativeToken()
  } catch {}

  return feeToken
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function _deployBridgedUsdcToken(deployer: Wallet) {
  /// deploy library
  const sigCheckerLibBytecode =
    '6106cd610026600b82828239805160001a60731461001957fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c80636ccea6521461003a575b600080fd5b6101026004803603606081101561005057600080fd5b73ffffffffffffffffffffffffffffffffffffffff8235169160208101359181019060608101604082013564010000000081111561008d57600080fd5b82018360208201111561009f57600080fd5b803590602001918460018302840111640100000000831117156100c157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610116945050505050565b604080519115158252519081900360200190f35b600061012184610179565b610164578373ffffffffffffffffffffffffffffffffffffffff16610146848461017f565b73ffffffffffffffffffffffffffffffffffffffff16149050610172565b61016f848484610203565b90505b9392505050565b3b151590565b600081516041146101db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806106296023913960400191505060405180910390fd5b60208201516040830151606084015160001a6101f98682858561042d565b9695505050505050565b60008060608573ffffffffffffffffffffffffffffffffffffffff16631626ba7e60e01b86866040516024018083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561026f578181015183820152602001610257565b50505050905090810190601f16801561029c5780820380516001836020036101000a031916815260200191505b50604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009098169790971787525181519196909550859450925090508083835b6020831061036957805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0909201916020918201910161032c565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855afa9150503d80600081146103c9576040519150601f19603f3d011682016040523d82523d6000602084013e6103ce565b606091505b50915091508180156103e257506020815110155b80156101f9575080517f1626ba7e00000000000000000000000000000000000000000000000000000000906020808401919081101561042057600080fd5b5051149695505050505050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156104a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806106726026913960400191505060405180910390fd5b8360ff16601b141580156104c057508360ff16601c14155b15610516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061064c6026913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610572573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811661061f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f45435265636f7665723a20696e76616c6964207369676e617475726500000000604482015290519081900360640190fd5b9594505050505056fe45435265636f7665723a20696e76616c6964207369676e6174757265206c656e67746845435265636f7665723a20696e76616c6964207369676e6174757265202776272076616c756545435265636f7665723a20696e76616c6964207369676e6174757265202773272076616c7565a2646970667358221220fc883ef3b50f607958f5dc584d21cf2984d25712b89b5e11c0d53a81068ace3664736f6c634300060c0033'
  const sigCheckerFactory = new ethers.ContractFactory(
    [],
    sigCheckerLibBytecode,
    deployer
  )
  const sigCheckerLib = await sigCheckerFactory.deploy()

  // prepare bridged usdc bytecode
  const bytecodeWithPlaceholder: string =
    '0x60806040526001805460ff60a01b191690556000600b553480156200002357600080fd5b506200002f3362000035565b62000057565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b615f6480620000676000396000f3fe608060405234801561001057600080fd5b506004361061038e5760003560e01c806388b7ab63116101de578063b2118a8d1161010f578063dd62ed3e116100ad578063ef55bec61161007c578063ef55bec614611044578063f2fde38b146110b0578063f9f92be4146110e3578063fe575a87146111165761038e565b8063dd62ed3e14610f5c578063e3ee160e14610f97578063e5a6b10f14611003578063e94a01021461100b5761038e565b8063c2eeeebd116100e9578063c2eeeebd14610e7e578063d505accf14610e86578063d608ea6414610ee4578063d916948714610f545761038e565b8063b2118a8d14610d6b578063b7b7289914610dae578063bd10243014610e765761038e565b8063a0cc6a681161017c578063a9059cbb11610156578063a9059cbb14610c99578063aa20e1e414610cd2578063aa271e1a14610d05578063ad38bf2214610d385761038e565b8063a0cc6a6814610c1d578063a297ea5e14610c25578063a457c2d714610c605761038e565b80638da5cb5b116101b85780638da5cb5b14610bfd5780638fa74a0e14610c0557806395d89b4114610c0d5780639fd0506d14610c155761038e565b806388b7ab6314610aad5780638a6db9c314610b915780638c2a993e14610bc45761038e565b806339509351116102c3578063554bab3c1161026157806374f4f5471161023057806374f4f54714610a315780637ecebe0014610a6a5780637f2eecc314610a9d5780638456cb5914610aa55761038e565b8063554bab3c146109755780635a049a70146109a85780635c975abb146109f657806370a08231146109fe5761038e565b806342966c681161029d57806342966c6814610855578063430239b4146108725780634e44d9561461093457806354fd4d501461096d5761038e565b806339509351146107db5780633f4ba83a1461081457806340c10f191461081c5761038e565b80633092afd5116103305780633357162b1161030a5780633357162b146105ae57806335d99f351461079a5780633644e515146107cb57806338a63183146107d35761038e565b80633092afd51461055557806330adf81f14610588578063313ce567146105905761038e565b80631a8952661161036c5780631a8952661461047757806323b872dd146104ac5780632ab60045146104ef5780632fc81e09146105225761038e565b806306fdde0314610393578063095ea7b31461041057806318160ddd1461045d575b600080fd5b61039b611149565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103d55781810151838201526020016103bd565b50505050905090810190601f1680156104025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6104496004803603604081101561042657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356111f5565b604080519115158252519081900360200190f35b610465611296565b60408051918252519081900360200190f35b6104aa6004803603602081101561048d57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661129c565b005b610449600480360360608110156104c257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060400135611359565b6104aa6004803603602081101561050557600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611614565b6104aa6004803603602081101561053857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16611775565b6104496004803603602081101561056b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117dd565b6104656118d6565b6105986118fa565b6040805160ff9092168252519081900360200190f35b6104aa60048036036101008110156105c557600080fd5b8101906020810181356401000000008111156105e057600080fd5b8201836020820111156105f257600080fd5b8035906020019184600183028401116401000000008311171561061457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561066757600080fd5b82018360208201111561067957600080fd5b8035906020019184600183028401116401000000008311171561069b57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092959493602081019350359150506401000000008111156106ee57600080fd5b82018360208201111561070057600080fd5b8035906020019184600183028401116401000000008311171561072257600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050813560ff16925050602081013573ffffffffffffffffffffffffffffffffffffffff90811691604081013582169160608201358116916080013516611903565b6107a2611c45565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b610465611c61565b6107a2611c70565b610449600480360360408110156107f157600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135611c8c565b6104aa611d24565b6104496004803603604081101561083257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135611de7565b6104aa6004803603602081101561086b57600080fd5b50356121b8565b6104aa6004803603604081101561088857600080fd5b8101906020810181356401000000008111156108a357600080fd5b8201836020820111156108b557600080fd5b803590602001918460208302840111640100000000831117156108d757600080fd5b9193909290916020810190356401000000008111156108f557600080fd5b82018360208201111561090757600080fd5b8035906020019184600183028401116401000000008311171561092957600080fd5b50909250905061245a565b6104496004803603604081101561094a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135612611565b61039b6127a4565b6104aa6004803603602081101561098b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166127db565b6104aa600480360360a08110156109be57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060208101359060ff6040820135169060608101359060800135612942565b6104496129e0565b61046560048036036020811015610a1457600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16612a01565b6104aa60048036036040811015610a4757600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135612a12565b61046560048036036020811015610a8057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16612ac1565b610465612ae9565b6104aa612b0d565b6104aa600480360360e0811015610ac357600080fd5b73ffffffffffffffffffffffffffffffffffffffff823581169260208101359091169160408201359160608101359160808201359160a08101359181019060e0810160c0820135640100000000811115610b1c57600080fd5b820183602082011115610b2e57600080fd5b80359060200191846001830284011164010000000083111715610b5057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550612be7945050505050565b61046560048036036020811015610ba757600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16612d4b565b6104aa60048036036040811015610bda57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135612d73565b6107a2612e23565b6107a2612e3f565b61039b612e64565b6107a2612edd565b610465612ef9565b6104aa60048036036040811015610c3b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516612f1d565b61044960048036036040811015610c7657600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561308c565b61044960048036036040811015610caf57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135613124565b6104aa60048036036020811015610ce857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16613287565b61044960048036036020811015610d1b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166133ee565b6104aa60048036036020811015610d4e57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16613419565b6104aa60048036036060811015610d8157600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060400135613580565b6104aa60048036036060811015610dc457600080fd5b73ffffffffffffffffffffffffffffffffffffffff82351691602081013591810190606081016040820135640100000000811115610e0157600080fd5b820183602082011115610e1357600080fd5b80359060200191846001830284011164010000000083111715610e3557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550613611945050505050565b6107a26136a6565b6107a26136c2565b6104aa600480360360e0811015610e9c57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356136e7565b6104aa60048036036020811015610efa57600080fd5b810190602081018135640100000000811115610f1557600080fd5b820183602082011115610f2757600080fd5b80359060200191846001830284011164010000000083111715610f4957600080fd5b509092509050613789565b610465613872565b61046560048036036040811015610f7257600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516613896565b6104aa6004803603610120811015610fae57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060808101359060a08101359060ff60c0820135169060e08101359061010001356138ce565b61039b613a36565b6104496004803603604081101561102157600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060200135613aaf565b6104aa600480360361012081101561105b57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060808101359060a08101359060ff60c0820135169060e0810135906101000135613ae7565b6104aa600480360360208110156110c657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16613c42565b6104aa600480360360208110156110f957600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16613d95565b6104496004803603602081101561112c57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16613e52565b6004805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156111ed5780601f106111c2576101008083540402835291602001916111ed565b820191906000526020600020905b8154815290600101906020018083116111d057829003601f168201915b505050505081565b60015460009074010000000000000000000000000000000000000000900460ff161561128257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b61128d338484613e5d565b50600192915050565b600b5490565b60025473ffffffffffffffffffffffffffffffffffffffff16331461130c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180615be0602c913960400191505060405180910390fd5b61131581613fa4565b60405173ffffffffffffffffffffffffffffffffffffffff8216907f117e3210bb9aa7d9baff172026820255c6f6c30ba8999d1c2fd88e2848137c4e90600090a250565b60015460009074010000000000000000000000000000000000000000900460ff16156113e657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b336113f081613faf565b15611446576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b8461145081613faf565b156114a6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b846114b081613faf565b15611506576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff87166000908152600a6020908152604080832033845290915290205485111561158f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180615cd06028913960400191505060405180910390fd5b61159a878787613fdd565b73ffffffffffffffffffffffffffffffffffffffff87166000908152600a602090815260408083203384529091529020546115d590866141a8565b73ffffffffffffffffffffffffffffffffffffffff88166000908152600a60209081526040808320338452909152902055600193505050509392505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461169a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116611706576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180615b19602a913960400191505060405180910390fd5b600e80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040517fe475e580d85111348e40d8ca33cfdd74c30fe1655c2d8537a13abc10065ffa5a90600090a250565b60125460ff1660011461178757600080fd5b60006117923061421f565b905080156117a5576117a5308383613fdd565b6117ae30614269565b5050601280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166002179055565b60085460009073ffffffffffffffffffffffffffffffffffffffff163314611850576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615bb76029913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166000818152600c6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055600d909152808220829055517fe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb666929190a2506001919050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60065460ff1681565b60085474010000000000000000000000000000000000000000900460ff1615611977576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180615d4b602a913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff84166119e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180615c7d602f913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8316611a4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615af06029913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216611abb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180615cf8602e913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8116611b27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180615e386028913960400191505060405180910390fd5b8751611b3a9060049060208b0190615889565b508651611b4e9060059060208a0190615889565b508551611b62906007906020890190615889565b50600680547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660ff8716179055600880547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff8781169190911790925560018054821686841617905560028054909116918416919091179055611bfc81614274565b5050600880547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1674010000000000000000000000000000000000000000179055505050505050565b60085473ffffffffffffffffffffffffffffffffffffffff1681565b6000611c6b6142bb565b905090565b600e5473ffffffffffffffffffffffffffffffffffffffff1690565b60015460009074010000000000000000000000000000000000000000900460ff1615611d1957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b61128d3384846143b0565b60015473ffffffffffffffffffffffffffffffffffffffff163314611d94576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180615dec6022913960400191505060405180910390fd5b600180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff1690556040517f7805862f689e2f13df9f062ff482ad3ad112aca9e0847911ed832e158c525b3390600090a1565b60015460009074010000000000000000000000000000000000000000900460ff1615611e7457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b336000908152600c602052604090205460ff16611edc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180615c5c6021913960400191505060405180910390fd5b33611ee681613faf565b15611f3c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b83611f4681613faf565b15611f9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8516612008576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180615a856023913960400191505060405180910390fd5b60008411612061576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615b686029913960400191505060405180910390fd5b336000908152600d6020526040902054808511156120ca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180615dbe602e913960400191505060405180910390fd5b600b546120d790866143fa565b600b556120f6866120f1876120eb8361421f565b906143fa565b614475565b61210081866141a8565b336000818152600d6020908152604091829020939093558051888152905173ffffffffffffffffffffffffffffffffffffffff8a16937fab8530f87dc9b59234c4623bf917212bb2536d647574c8e7e5da92c2ede0c9f8928290030190a360408051868152905173ffffffffffffffffffffffffffffffffffffffff8816916000917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350600195945050505050565b60015474010000000000000000000000000000000000000000900460ff161561224257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b336000908152600c602052604090205460ff166122aa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180615c5c6021913960400191505060405180910390fd5b336122b481613faf565b1561230a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b60006123153361421f565b905060008311612370576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615a5c6029913960400191505060405180910390fd5b828110156123c9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180615c366026913960400191505060405180910390fd5b600b546123d690846141a8565b600b556123e7336120f183866141a8565b60408051848152905133917fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5919081900360200190a260408051848152905160009133917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a3505050565b60125460ff1660021461246c57600080fd5b61247860058383615907565b5060005b838110156125ba576003600086868481811061249457fe5b6020908102929092013573ffffffffffffffffffffffffffffffffffffffff168352508101919091526040016000205460ff1661251c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603d8152602001806159a9603d913960400191505060405180910390fd5b61254d85858381811061252b57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff16614269565b6003600086868481811061255d57fe5b6020908102929092013573ffffffffffffffffffffffffffffffffffffffff1683525081019190915260400160002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905560010161247c565b506125c430614269565b505030600090815260036020819052604090912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff009081169091556012805490911690911790555050565b60015460009074010000000000000000000000000000000000000000900460ff161561269e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b60085473ffffffffffffffffffffffffffffffffffffffff16331461270e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615bb76029913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff83166000818152600c6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055600d825291829020859055815185815291517f46980fca912ef9bcdbd36877427b6b90e860769f604e89c0e67720cece530d209281900390910190a250600192915050565b60408051808201909152600181527f3200000000000000000000000000000000000000000000000000000000000000602082015290565b60005473ffffffffffffffffffffffffffffffffffffffff16331461286157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff81166128cd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180615a096028913960400191505060405180910390fd5b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691909117918290556040519116907fb80482a293ca2e013eda8683c9bd7fc8347cfdaeea5ede58cba46df502c2a60490600090a250565b60015474010000000000000000000000000000000000000000900460ff16156129cc57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b6129d98585858585614576565b5050505050565b60015474010000000000000000000000000000000000000000900460ff1681565b6000612a0c8261421f565b92915050565b612a1a612e3f565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612ab357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4f4e4c595f474154455741590000000000000000000000000000000000000000604482015290519081900360640190fd5b612abd82826145b6565b5050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526011602052604090205490565b7fd099cc98ef71107a616c4f0f941f04c322d8e254fe26b3c6668db87aae413de881565b60015473ffffffffffffffffffffffffffffffffffffffff163314612b7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180615dec6022913960400191505060405180910390fd5b600180547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16740100000000000000000000000000000000000000001790556040517f6985a02210a168e66602d3235cb6db0e70f92b3ba4d376a33c0f3d9434bff62590600090a1565b60015474010000000000000000000000000000000000000000900460ff1615612c7157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b86612c7b81613faf565b15612cd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b86612cdb81613faf565b15612d31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b612d408989898989898961487c565b505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff166000908152600d602052604090205490565b612d7b612e3f565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614612e1457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4f4e4c595f474154455741590000000000000000000000000000000000000000604482015290519081900360640190fd5b612e1e8282611de7565b505050565b60005473ffffffffffffffffffffffffffffffffffffffff1690565b7fdbf6298cab77bb44ebfd5abb25ed2538c2a55f7404c47e83e6531361fba28c245490565b6005805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156111ed5780601f106111c2576101008083540402835291602001916111ed565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b7f7c7c6cdb67a18743f49ec6fa9b35f50d52ed05cbed4cc592e13b44501c1a226781565b60125460ff16600314612f2f57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216612fb157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f494e56414c49445f474154455741590000000000000000000000000000000000604482015290519081900360640190fd5b6000612fbb612e3f565b73ffffffffffffffffffffffffffffffffffffffff161461303d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f414c52454144595f494e49540000000000000000000000000000000000000000604482015290519081900360640190fd5b817fdbf6298cab77bb44ebfd5abb25ed2538c2a55f7404c47e83e6531361fba28c2455807f54352c0d7cc5793352a36344bfdcdcf68ba6258544ce1aed71f60a74d882c19155612abd8261499d565b60015460009074010000000000000000000000000000000000000000900460ff161561311957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b61128d338484614a52565b60015460009074010000000000000000000000000000000000000000900460ff16156131b157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b336131bb81613faf565b15613211576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b8361321b81613faf565b15613271576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b61327c338686613fdd565b506001949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461330d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116613379576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180615c7d602f913960400191505060405180910390fd5b600880547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691909117918290556040519116907fdb66dfa9c6b8f5226fe9aac7e51897ae8ee94ac31dc70bb6c9900b2574b707e690600090a250565b73ffffffffffffffffffffffffffffffffffffffff166000908152600c602052604090205460ff1690565b60005473ffffffffffffffffffffffffffffffffffffffff16331461349f57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff811661350b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180615e8e6032913960400191505060405180910390fd5b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691909117918290556040519116907fc67398012c111ce95ecb7429b933096c977380ee6c421175a71a4a4c6c88c06e90600090a250565b600e5473ffffffffffffffffffffffffffffffffffffffff1633146135f0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180615cac6024913960400191505060405180910390fd5b612e1e73ffffffffffffffffffffffffffffffffffffffff84168383614aae565b60015474010000000000000000000000000000000000000000900460ff161561369b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b612e1e838383614b3b565b60025473ffffffffffffffffffffffffffffffffffffffff1681565b7f54352c0d7cc5793352a36344bfdcdcf68ba6258544ce1aed71f60a74d882c1915490565b60015474010000000000000000000000000000000000000000900460ff161561377157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b61378087878787878787614c45565b50505050505050565b60085474010000000000000000000000000000000000000000900460ff1680156137b6575060125460ff16155b6137bf57600080fd5b6137cb60048383615907565b5061384082828080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051808201909152600181527f320000000000000000000000000000000000000000000000000000000000000060208201529150614c879050565b600f555050601280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b7f158b0a9edf7a828aad02f63cd515c68ef2f50ba807396f6d12842833a159742981565b73ffffffffffffffffffffffffffffffffffffffff9182166000908152600a6020908152604080832093909416825291909152205490565b60015474010000000000000000000000000000000000000000900460ff161561395857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b8861396281613faf565b156139b8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b886139c281613faf565b15613a18576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b613a298b8b8b8b8b8b8b8b8b614c9d565b5050505050505050505050565b6007805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f810184900484028201840190925281815292918301828280156111ed5780601f106111c2576101008083540402835291602001916111ed565b73ffffffffffffffffffffffffffffffffffffffff919091166000908152601060209081526040808320938352929052205460ff1690565b60015474010000000000000000000000000000000000000000900460ff1615613b7157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b88613b7b81613faf565b15613bd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b88613bdb81613faf565b15613c31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b613a298b8b8b8b8b8b8b8b8b614ce1565b60005473ffffffffffffffffffffffffffffffffffffffff163314613cc857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8116613d34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180615aa86026913960400191505060405180910390fd5b6000546040805173ffffffffffffffffffffffffffffffffffffffff9283168152918316602083015280517f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09281900390910190a1613d9281614274565b50565b60025473ffffffffffffffffffffffffffffffffffffffff163314613e05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180615be0602c913960400191505060405180910390fd5b613e0e81614269565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fffa4e6181777692565cf28528fc88fd1516ea86b56da075235fa575af6a4b85590600090a250565b6000612a0c82613faf565b73ffffffffffffffffffffffffffffffffffffffff8316613ec9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180615d9a6024913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216613f35576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180615ace6022913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8084166000818152600a6020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b613d92816000614d25565b73ffffffffffffffffffffffffffffffffffffffff1660009081526009602052604090205460ff1c60011490565b73ffffffffffffffffffffffffffffffffffffffff8316614049576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615d756025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff82166140b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260238152602001806159e66023913960400191505060405180910390fd5b6140be8361421f565b811115614116576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180615b916026913960400191505060405180910390fd5b61412d836120f1836141278761421f565b906141a8565b61413e826120f1836120eb8661421f565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60008282111561421957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b73ffffffffffffffffffffffffffffffffffffffff166000908152600960205260409020547f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1690565b613d92816001614d25565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6004805460408051602060026001851615610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190941693909304601f8101849004840282018401909252818152600093611c6b93919290918301828280156143685780601f1061433d57610100808354040283529160200191614368565b820191906000526020600020905b81548152906001019060200180831161434b57829003601f168201915b50505050506040518060400160405280600181526020017f32000000000000000000000000000000000000000000000000000000000000008152506143ab614dae565b614db2565b73ffffffffffffffffffffffffffffffffffffffff8084166000908152600a6020908152604080832093861683529290522054612e1e90849084906143f590856143fa565b613e5d565b60008282018381101561446e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8111156144ee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180615c0c602a913960400191505060405180910390fd5b6144f782613faf565b1561454d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615b436025913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff909116600090815260096020526040902055565b6129d98585848487604051602001808481526020018381526020018260ff1660f81b81526001019350505050604051602081830303815290604052614b3b565b60015474010000000000000000000000000000000000000000900460ff161561464057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015290519081900360640190fd5b336000908152600c602052604090205460ff166146a8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180615c5c6021913960400191505060405180910390fd5b816146b281613faf565b15614708576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ec06025913960400191505060405180910390fd5b60006147138461421f565b90506000831161476e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180615a5c6029913960400191505060405180910390fd5b828110156147c7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180615c366026913960400191505060405180910390fd5b600b805484900390556147dc84848303614475565b60408051848152905173ffffffffffffffffffffffffffffffffffffffff8616917fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5919081900360200190a260408051848152905160009173ffffffffffffffffffffffffffffffffffffffff8716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350505050565b73ffffffffffffffffffffffffffffffffffffffff861633146148ea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615d266025913960400191505060405180910390fd5b6148f687838686614e26565b604080517fd099cc98ef71107a616c4f0f941f04c322d8e254fe26b3c6668db87aae413de860208083019190915273ffffffffffffffffffffffffffffffffffffffff808b1683850152891660608301526080820188905260a0820187905260c0820186905260e080830186905283518084039091018152610100909201909252805191012061498890889083614ee6565b6149928783615064565b613780878787613fdd565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600c6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055600d8252918290207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90819055825181815292519093927f46980fca912ef9bcdbd36877427b6b90e860769f604e89c0e67720cece530d2092908290030190a25050565b612e1e83836143f584604051806060016040528060258152602001615f0a6025913973ffffffffffffffffffffffffffffffffffffffff808a166000908152600a60209081526040808320938c168352929052205491906150e9565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb00000000000000000000000000000000000000000000000000000000179052612e1e90849061519a565b614b458383615272565b614bbf837f158b0a9edf7a828aad02f63cd515c68ef2f50ba807396f6d12842833a159742960001b8585604051602001808481526020018373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200193505050506040516020818303038152906040528051906020012083614ee6565b73ffffffffffffffffffffffffffffffffffffffff8316600081815260106020908152604080832086845290915280822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055518492917f1cdd46ff242716cdaa72d159d339a485b3438398348d68f09d7c8c0a59353d8191a3505050565b61378087878787868689604051602001808481526020018381526020018260ff1660f81b815260010193505050506040516020818303038152906040526152fc565b600046614c95848483614db2565b949350505050565b612d4089898989898988888b604051602001808481526020018381526020018260ff1660f81b815260010193505050506040516020818303038152906040526155c0565b612d4089898989898988888b604051602001808481526020018381526020018260ff1660f81b8152600101935050505060405160208183030381529060405261487c565b80614d3857614d338261421f565b614d81565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600960205260409020547f8000000000000000000000000000000000000000000000000000000000000000175b73ffffffffffffffffffffffffffffffffffffffff90921660009081526009602052604090209190915550565b4690565b8251602093840120825192840192909220604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8187015280820194909452606084019190915260808301919091523060a0808401919091528151808403909101815260c09092019052805191012090565b814211614e7e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180615a31602b913960400191505060405180910390fd5b804210614ed6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526025815260200180615ee56025913960400191505060405180910390fd5b614ee08484615272565b50505050565b73__$715109b5d747ea58b675c6ea3f0dba8c60$__636ccea65284614f12614f0c6142bb565b8661565e565b846040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015614f81578181015183820152602001614f69565b50505050905090810190601f168015614fae5780820380516001836020036101000a031916815260200191505b5094505050505060206040518083038186803b158015614fcd57600080fd5b505af4158015614fe1573d6000803e3d6000fd5b505050506040513d6020811015614ff757600080fd5b5051612e1e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f46696174546f6b656e56323a20696e76616c6964207369676e61747572650000604482015290519081900360640190fd5b73ffffffffffffffffffffffffffffffffffffffff8216600081815260106020908152604080832085845290915280822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055518392917f98de503528ee59b575ef0c0a2576a82497bfc029a5685b209e9ec333479b10a591a35050565b60008184841115615192576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561515757818101518382015260200161513f565b50505050905090810190601f1680156151845780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60606151fc826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166156989092919063ffffffff16565b805190915015612e1e5780806020019051602081101561521b57600080fd5b5051612e1e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180615e0e602a913960400191505060405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260106020908152604080832084845290915290205460ff1615612abd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e815260200180615e60602e913960400191505060405180910390fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82148061532a5750428210155b61539557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f46696174546f6b656e56323a207065726d697420697320657870697265640000604482015290519081900360640190fd5b600061543d6153a26142bb565b73ffffffffffffffffffffffffffffffffffffffff80891660008181526011602090815260409182902080546001810190915582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98184015280840194909452938b166060840152608083018a905260a083019390935260c08083018990528151808403909101815260e09092019052805191012061565e565b905073__$715109b5d747ea58b675c6ea3f0dba8c60$__636ccea6528783856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156154ca5781810151838201526020016154b2565b50505050905090810190601f1680156154f75780820380516001836020036101000a031916815260200191505b5094505050505060206040518083038186803b15801561551657600080fd5b505af415801561552a573d6000803e3d6000fd5b505050506040513d602081101561554057600080fd5b50516155ad57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f454950323631323a20696e76616c6964207369676e6174757265000000000000604482015290519081900360640190fd5b6155b8868686613e5d565b505050505050565b6155cc87838686614e26565b604080517f7c7c6cdb67a18743f49ec6fa9b35f50d52ed05cbed4cc592e13b44501c1a226760208083019190915273ffffffffffffffffffffffffffffffffffffffff808b1683850152891660608301526080820188905260a0820187905260c0820186905260e080830186905283518084039091018152610100909201909252805191012061498890889083614ee6565b6040517f19010000000000000000000000000000000000000000000000000000000000008152600281019290925260228201526042902090565b6060614c958484600085856156ac85615803565b61571757604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b6020831061578157805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101615744565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146157e3576040519150601f19603f3d011682016040523d82523d6000602084013e6157e8565b606091505b50915091506157f8828286615809565b979650505050505050565b3b151590565b6060831561581857508161446e565b8251156158285782518084602001fd5b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181815284516024840152845185939192839260440191908501908083836000831561515757818101518382015260200161513f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106158ca57805160ff19168380011785556158f7565b828001600101855582156158f7579182015b828111156158f75782518255916020019190600101906158dc565b50615903929150615993565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10615966578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008235161785556158f7565b828001600101855582156158f7579182015b828111156158f7578235825591602001919060010190615978565b5b80821115615903576000815560010161599456fe46696174546f6b656e56325f323a20426c61636b6c697374696e672070726576696f75736c7920756e626c61636b6c6973746564206163636f756e742145524332303a207472616e7366657220746f20746865207a65726f20616464726573735061757361626c653a206e65772070617573657220697320746865207a65726f206164647265737346696174546f6b656e56323a20617574686f72697a6174696f6e206973206e6f74207965742076616c696446696174546f6b656e3a206275726e20616d6f756e74206e6f742067726561746572207468616e203046696174546f6b656e3a206d696e7420746f20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737346696174546f6b656e3a206e65772070617573657220697320746865207a65726f2061646472657373526573637561626c653a206e6577207265736375657220697320746865207a65726f206164647265737346696174546f6b656e56325f323a204163636f756e7420697320626c61636b6c697374656446696174546f6b656e3a206d696e7420616d6f756e74206e6f742067726561746572207468616e203045524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636546696174546f6b656e3a2063616c6c6572206973206e6f7420746865206d61737465724d696e746572426c61636b6c69737461626c653a2063616c6c6572206973206e6f742074686520626c61636b6c697374657246696174546f6b656e56325f323a2042616c616e636520657863656564732028325e323535202d20312946696174546f6b656e3a206275726e20616d6f756e7420657863656564732062616c616e636546696174546f6b656e3a2063616c6c6572206973206e6f742061206d696e74657246696174546f6b656e3a206e6577206d61737465724d696e74657220697320746865207a65726f2061646472657373526573637561626c653a2063616c6c6572206973206e6f7420746865207265736375657245524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636546696174546f6b656e3a206e657720626c61636b6c697374657220697320746865207a65726f206164647265737346696174546f6b656e56323a2063616c6c6572206d7573742062652074686520706179656546696174546f6b656e3a20636f6e747261637420697320616c726561647920696e697469616c697a656445524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737346696174546f6b656e3a206d696e7420616d6f756e742065786365656473206d696e746572416c6c6f77616e63655061757361626c653a2063616c6c6572206973206e6f7420746865207061757365725361666545524332303a204552433230206f7065726174696f6e20646964206e6f74207375636365656446696174546f6b656e3a206e6577206f776e657220697320746865207a65726f206164647265737346696174546f6b656e56323a20617574686f72697a6174696f6e2069732075736564206f722063616e63656c6564426c61636b6c69737461626c653a206e657720626c61636b6c697374657220697320746865207a65726f2061646472657373426c61636b6c69737461626c653a206163636f756e7420697320626c61636b6c697374656446696174546f6b656e56323a20617574686f72697a6174696f6e206973206578706972656445524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122038d731178b4dd0e027fef834bc8ab43420dd9ff02d6c94216b764f26362e531d64736f6c634300060c0033'
  const placeholder = '__$715109b5d747ea58b675c6ea3f0dba8c60$__'

  const libAddressStripped = sigCheckerLib.address.replace(/^0x/, '')
  const bridgedUsdcLogicBytecode = bytecodeWithPlaceholder
    .split(placeholder)
    .join(libAddressStripped)

  // deploy bridged usdc logic
  const bridgedUsdcLogicFactory = new ethers.ContractFactory(
    [],
    bridgedUsdcLogicBytecode,
    deployer
  )
  const bridgedUsdcLogic = await bridgedUsdcLogicFactory.deploy()

  return bridgedUsdcLogic
}
