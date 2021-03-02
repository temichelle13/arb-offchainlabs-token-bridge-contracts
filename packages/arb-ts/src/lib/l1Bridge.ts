/*
 * Copyright 2021, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-env node */
'use strict'
import { Signer, BigNumber } from 'ethers'
import { InboxFactory } from './abi/InboxFactory'
import { EthERC20BridgeFactory } from './abi/EthERC20BridgeFactory'
import { EthERC20Bridge } from './abi/EthERC20Bridge'
import { Inbox } from './abi/Inbox'

export class L1Bridge {
  l1Signer: Signer
  inbox: Inbox
  ethERC20Bridge: EthERC20Bridge
  walletAddressCache?: string

  constructor(
    inboxAddress: string,
    erc20BridgeAddress: string,
    l1Signer: Signer
  ) {
    this.l1Signer = l1Signer

    this.inbox = InboxFactory.connect(inboxAddress, l1Signer)

    this.ethERC20Bridge = EthERC20BridgeFactory.connect(
      erc20BridgeAddress,
      l1Signer
    )
  }

  public async depositETH(value: BigNumber, destinationAddress?: string) {
    if (!this.l1Signer || !this.inbox) {
      throw new Error('No eth signer provider')
    }
    const address = destinationAddress || (await this.getWalletAddress())
    return this.inbox.depositEth(address, {
      value,
    })
  }

  public async depositERC20(
    erc20L1Address: string,
    amount: BigNumber,
    maxGas: BigNumber,
    gasPriceBid: BigNumber,
    destinationAddress?: string
  ) {
    const destination = destinationAddress || (await this.getWalletAddress())
    this.ethERC20Bridge.depositAsERC20(
      erc20L1Address,
      destination,
      amount,
      maxGas,
      gasPriceBid
    )
  }

  public getERC20L2Address(erc20L1Address: string) {
    return this.ethERC20Bridge.customL2Tokens(erc20L1Address)
  }

  public getWalletAddress() {
    const { walletAddressCache } = this
    if (walletAddressCache) {
      return walletAddressCache
    }

    return this.l1Signer.getAddress()
  }
}
