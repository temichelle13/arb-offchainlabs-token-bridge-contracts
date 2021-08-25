/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import { TypedEventFilter, TypedEvent, TypedListener } from './commons'

interface L2ERC20GatewayInterface extends ethers.utils.Interface {
  functions: {
    'beaconProxyFactory()': FunctionFragment
    'calculateL2TokenAddress(address)': FunctionFragment
    'cloneableProxyHash()': FunctionFragment
    'counterpartGateway()': FunctionFragment
    'exitNum()': FunctionFragment
    'finalizeInboundTransfer(address,address,address,uint256,bytes)': FunctionFragment
    'gasReserveIfCallRevert()': FunctionFragment
    'getOutboundCalldata(address,address,address,uint256,bytes)': FunctionFragment
    'getUserSalt(address)': FunctionFragment
    'inboundEscrowAndCall(address,uint256,address,address,bytes)': FunctionFragment
    'initialize(address,address,address)': FunctionFragment
    'outboundTransfer(address,address,uint256,bytes)': FunctionFragment
    'postUpgradeInit()': FunctionFragment
    'router()': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'beaconProxyFactory',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'calculateL2TokenAddress',
    values: [string]
  ): string
  encodeFunctionData(
    functionFragment: 'cloneableProxyHash',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'counterpartGateway',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'exitNum', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'finalizeInboundTransfer',
    values: [string, string, string, BigNumberish, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'gasReserveIfCallRevert',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'getOutboundCalldata',
    values: [string, string, string, BigNumberish, BytesLike]
  ): string
  encodeFunctionData(functionFragment: 'getUserSalt', values: [string]): string
  encodeFunctionData(
    functionFragment: 'inboundEscrowAndCall',
    values: [string, BigNumberish, string, string, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [string, string, string]
  ): string
  encodeFunctionData(
    functionFragment: 'outboundTransfer',
    values: [string, string, BigNumberish, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'postUpgradeInit',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'router', values?: undefined): string

  decodeFunctionResult(
    functionFragment: 'beaconProxyFactory',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'calculateL2TokenAddress',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'cloneableProxyHash',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'counterpartGateway',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'exitNum', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'finalizeInboundTransfer',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'gasReserveIfCallRevert',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'getOutboundCalldata',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'getUserSalt', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'inboundEscrowAndCall',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'outboundTransfer',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'postUpgradeInit',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'router', data: BytesLike): Result

  events: {
    'DepositFinalized(address,address,address,uint256)': EventFragment
    'TransferAndCallTriggered(bool,address,address,uint256,bytes)': EventFragment
    'TxToL1(address,address,uint256,bytes)': EventFragment
    'WithdrawalInitiated(address,address,address,uint256,uint256,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'DepositFinalized'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TransferAndCallTriggered'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TxToL1'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'WithdrawalInitiated'): EventFragment
}

export class L2ERC20Gateway extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: L2ERC20GatewayInterface

  functions: {
    beaconProxyFactory(overrides?: CallOverrides): Promise<[string]>

    calculateL2TokenAddress(
      l1ERC20: string,
      overrides?: CallOverrides
    ): Promise<[string]>

    cloneableProxyHash(overrides?: CallOverrides): Promise<[string]>

    counterpartGateway(overrides?: CallOverrides): Promise<[string]>

    exitNum(overrides?: CallOverrides): Promise<[BigNumber]>

    finalizeInboundTransfer(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    gasReserveIfCallRevert(overrides?: CallOverrides): Promise<[BigNumber]>

    getOutboundCalldata(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { outboundCalldata: string }>

    getUserSalt(l1ERC20: string, overrides?: CallOverrides): Promise<[string]>

    inboundEscrowAndCall(
      _l2Address: string,
      _amount: BigNumberish,
      _from: string,
      _to: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    initialize(
      _l1Counterpart: string,
      _router: string,
      _beaconProxyFactory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    'outboundTransfer(address,address,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    'outboundTransfer(address,address,uint256,uint256,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _maxGas: BigNumberish,
      _gasPriceBid: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    postUpgradeInit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    router(overrides?: CallOverrides): Promise<[string]>
  }

  beaconProxyFactory(overrides?: CallOverrides): Promise<string>

  calculateL2TokenAddress(
    l1ERC20: string,
    overrides?: CallOverrides
  ): Promise<string>

  cloneableProxyHash(overrides?: CallOverrides): Promise<string>

  counterpartGateway(overrides?: CallOverrides): Promise<string>

  exitNum(overrides?: CallOverrides): Promise<BigNumber>

  finalizeInboundTransfer(
    _token: string,
    _from: string,
    _to: string,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  gasReserveIfCallRevert(overrides?: CallOverrides): Promise<BigNumber>

  getOutboundCalldata(
    _token: string,
    _from: string,
    _to: string,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>

  getUserSalt(l1ERC20: string, overrides?: CallOverrides): Promise<string>

  inboundEscrowAndCall(
    _l2Address: string,
    _amount: BigNumberish,
    _from: string,
    _to: string,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  initialize(
    _l1Counterpart: string,
    _router: string,
    _beaconProxyFactory: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  'outboundTransfer(address,address,uint256,bytes)'(
    _l1Token: string,
    _to: string,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  'outboundTransfer(address,address,uint256,uint256,uint256,bytes)'(
    _l1Token: string,
    _to: string,
    _amount: BigNumberish,
    _maxGas: BigNumberish,
    _gasPriceBid: BigNumberish,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  postUpgradeInit(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  router(overrides?: CallOverrides): Promise<string>

  callStatic: {
    beaconProxyFactory(overrides?: CallOverrides): Promise<string>

    calculateL2TokenAddress(
      l1ERC20: string,
      overrides?: CallOverrides
    ): Promise<string>

    cloneableProxyHash(overrides?: CallOverrides): Promise<string>

    counterpartGateway(overrides?: CallOverrides): Promise<string>

    exitNum(overrides?: CallOverrides): Promise<BigNumber>

    finalizeInboundTransfer(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    gasReserveIfCallRevert(overrides?: CallOverrides): Promise<BigNumber>

    getOutboundCalldata(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    getUserSalt(l1ERC20: string, overrides?: CallOverrides): Promise<string>

    inboundEscrowAndCall(
      _l2Address: string,
      _amount: BigNumberish,
      _from: string,
      _to: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    initialize(
      _l1Counterpart: string,
      _router: string,
      _beaconProxyFactory: string,
      overrides?: CallOverrides
    ): Promise<void>

    'outboundTransfer(address,address,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    'outboundTransfer(address,address,uint256,uint256,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _maxGas: BigNumberish,
      _gasPriceBid: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    postUpgradeInit(overrides?: CallOverrides): Promise<void>

    router(overrides?: CallOverrides): Promise<string>
  }

  filters: {
    DepositFinalized(
      l1Token?: string | null,
      _from?: string | null,
      _to?: string | null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber],
      { l1Token: string; _from: string; _to: string; _amount: BigNumber }
    >

    TransferAndCallTriggered(
      success?: null,
      _from?: string | null,
      _to?: string | null,
      _amount?: null,
      callHookData?: null
    ): TypedEventFilter<
      [boolean, string, string, BigNumber, string],
      {
        success: boolean
        _from: string
        _to: string
        _amount: BigNumber
        callHookData: string
      }
    >

    TxToL1(
      _from?: string | null,
      _to?: string | null,
      _id?: BigNumberish | null,
      _data?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string],
      { _from: string; _to: string; _id: BigNumber; _data: string }
    >

    WithdrawalInitiated(
      l1Token?: null,
      _from?: string | null,
      _to?: string | null,
      _l2ToL1Id?: BigNumberish | null,
      _exitNum?: null,
      _amount?: null
    ): TypedEventFilter<
      [string, string, string, BigNumber, BigNumber, BigNumber],
      {
        l1Token: string
        _from: string
        _to: string
        _l2ToL1Id: BigNumber
        _exitNum: BigNumber
        _amount: BigNumber
      }
    >
  }

  estimateGas: {
    beaconProxyFactory(overrides?: CallOverrides): Promise<BigNumber>

    calculateL2TokenAddress(
      l1ERC20: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    cloneableProxyHash(overrides?: CallOverrides): Promise<BigNumber>

    counterpartGateway(overrides?: CallOverrides): Promise<BigNumber>

    exitNum(overrides?: CallOverrides): Promise<BigNumber>

    finalizeInboundTransfer(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    gasReserveIfCallRevert(overrides?: CallOverrides): Promise<BigNumber>

    getOutboundCalldata(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    getUserSalt(l1ERC20: string, overrides?: CallOverrides): Promise<BigNumber>

    inboundEscrowAndCall(
      _l2Address: string,
      _amount: BigNumberish,
      _from: string,
      _to: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    initialize(
      _l1Counterpart: string,
      _router: string,
      _beaconProxyFactory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    'outboundTransfer(address,address,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    'outboundTransfer(address,address,uint256,uint256,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _maxGas: BigNumberish,
      _gasPriceBid: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    postUpgradeInit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    router(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    beaconProxyFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>

    calculateL2TokenAddress(
      l1ERC20: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    cloneableProxyHash(overrides?: CallOverrides): Promise<PopulatedTransaction>

    counterpartGateway(overrides?: CallOverrides): Promise<PopulatedTransaction>

    exitNum(overrides?: CallOverrides): Promise<PopulatedTransaction>

    finalizeInboundTransfer(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    gasReserveIfCallRevert(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    getOutboundCalldata(
      _token: string,
      _from: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    getUserSalt(
      l1ERC20: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    inboundEscrowAndCall(
      _l2Address: string,
      _amount: BigNumberish,
      _from: string,
      _to: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    initialize(
      _l1Counterpart: string,
      _router: string,
      _beaconProxyFactory: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    'outboundTransfer(address,address,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    'outboundTransfer(address,address,uint256,uint256,uint256,bytes)'(
      _l1Token: string,
      _to: string,
      _amount: BigNumberish,
      _maxGas: BigNumberish,
      _gasPriceBid: BigNumberish,
      _data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    postUpgradeInit(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    router(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
