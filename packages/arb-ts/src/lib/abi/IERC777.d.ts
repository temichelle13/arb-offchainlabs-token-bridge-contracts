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
} from 'ethers'
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from '@ethersproject/contracts'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'

interface IERC777Interface extends ethers.utils.Interface {
  functions: {
    'authorizeOperator(address)': FunctionFragment
    'balanceOf(address)': FunctionFragment
    'burn(uint256,bytes)': FunctionFragment
    'defaultOperators()': FunctionFragment
    'granularity()': FunctionFragment
    'isOperatorFor(address,address)': FunctionFragment
    'name()': FunctionFragment
    'operatorBurn(address,uint256,bytes,bytes)': FunctionFragment
    'operatorSend(address,address,uint256,bytes,bytes)': FunctionFragment
    'revokeOperator(address)': FunctionFragment
    'send(address,uint256,bytes)': FunctionFragment
    'symbol()': FunctionFragment
    'totalSupply()': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'authorizeOperator',
    values: [string]
  ): string
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string
  encodeFunctionData(
    functionFragment: 'burn',
    values: [BigNumberish, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'defaultOperators',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'granularity',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'isOperatorFor',
    values: [string, string]
  ): string
  encodeFunctionData(functionFragment: 'name', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'operatorBurn',
    values: [string, BigNumberish, BytesLike, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'operatorSend',
    values: [string, string, BigNumberish, BytesLike, BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'revokeOperator',
    values: [string]
  ): string
  encodeFunctionData(
    functionFragment: 'send',
    values: [string, BigNumberish, BytesLike]
  ): string
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'totalSupply',
    values?: undefined
  ): string

  decodeFunctionResult(
    functionFragment: 'authorizeOperator',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'defaultOperators',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'granularity', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'isOperatorFor',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'operatorBurn',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'operatorSend',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'revokeOperator',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'send', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result

  events: {
    'AuthorizedOperator(address,address)': EventFragment
    'Burned(address,address,uint256,bytes,bytes)': EventFragment
    'Minted(address,address,uint256,bytes,bytes)': EventFragment
    'RevokedOperator(address,address)': EventFragment
    'Sent(address,address,address,uint256,bytes,bytes)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AuthorizedOperator'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Burned'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Minted'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RevokedOperator'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Sent'): EventFragment
}

export class IERC777 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: IERC777Interface

  functions: {
    authorizeOperator(
      operator: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'authorizeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>

    burn(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'burn(uint256,bytes)'(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    defaultOperators(overrides?: CallOverrides): Promise<[string[]]>

    'defaultOperators()'(overrides?: CallOverrides): Promise<[string[]]>

    granularity(overrides?: CallOverrides): Promise<[BigNumber]>

    'granularity()'(overrides?: CallOverrides): Promise<[BigNumber]>

    isOperatorFor(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    'isOperatorFor(address,address)'(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    name(overrides?: CallOverrides): Promise<[string]>

    'name()'(overrides?: CallOverrides): Promise<[string]>

    operatorBurn(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'operatorBurn(address,uint256,bytes,bytes)'(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    operatorSend(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'operatorSend(address,address,uint256,bytes,bytes)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    revokeOperator(
      operator: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'revokeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    send(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    'send(address,uint256,bytes)'(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>

    symbol(overrides?: CallOverrides): Promise<[string]>

    'symbol()'(overrides?: CallOverrides): Promise<[string]>

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>

    'totalSupply()'(overrides?: CallOverrides): Promise<[BigNumber]>
  }

  authorizeOperator(
    operator: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'authorizeOperator(address)'(
    operator: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

  'balanceOf(address)'(
    owner: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>

  burn(
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'burn(uint256,bytes)'(
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  defaultOperators(overrides?: CallOverrides): Promise<string[]>

  'defaultOperators()'(overrides?: CallOverrides): Promise<string[]>

  granularity(overrides?: CallOverrides): Promise<BigNumber>

  'granularity()'(overrides?: CallOverrides): Promise<BigNumber>

  isOperatorFor(
    operator: string,
    tokenHolder: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  'isOperatorFor(address,address)'(
    operator: string,
    tokenHolder: string,
    overrides?: CallOverrides
  ): Promise<boolean>

  name(overrides?: CallOverrides): Promise<string>

  'name()'(overrides?: CallOverrides): Promise<string>

  operatorBurn(
    account: string,
    amount: BigNumberish,
    data: BytesLike,
    operatorData: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'operatorBurn(address,uint256,bytes,bytes)'(
    account: string,
    amount: BigNumberish,
    data: BytesLike,
    operatorData: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  operatorSend(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    data: BytesLike,
    operatorData: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'operatorSend(address,address,uint256,bytes,bytes)'(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    data: BytesLike,
    operatorData: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  revokeOperator(
    operator: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'revokeOperator(address)'(
    operator: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  send(
    recipient: string,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  'send(address,uint256,bytes)'(
    recipient: string,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>

  symbol(overrides?: CallOverrides): Promise<string>

  'symbol()'(overrides?: CallOverrides): Promise<string>

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>

  'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    authorizeOperator(
      operator: string,
      overrides?: CallOverrides
    ): Promise<void>

    'authorizeOperator(address)'(
      operator: string,
      overrides?: CallOverrides
    ): Promise<void>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    burn(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    'burn(uint256,bytes)'(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    defaultOperators(overrides?: CallOverrides): Promise<string[]>

    'defaultOperators()'(overrides?: CallOverrides): Promise<string[]>

    granularity(overrides?: CallOverrides): Promise<BigNumber>

    'granularity()'(overrides?: CallOverrides): Promise<BigNumber>

    isOperatorFor(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    'isOperatorFor(address,address)'(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<boolean>

    name(overrides?: CallOverrides): Promise<string>

    'name()'(overrides?: CallOverrides): Promise<string>

    operatorBurn(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    'operatorBurn(address,uint256,bytes,bytes)'(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    operatorSend(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    'operatorSend(address,address,uint256,bytes,bytes)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    revokeOperator(operator: string, overrides?: CallOverrides): Promise<void>

    'revokeOperator(address)'(
      operator: string,
      overrides?: CallOverrides
    ): Promise<void>

    send(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    'send(address,uint256,bytes)'(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>

    symbol(overrides?: CallOverrides): Promise<string>

    'symbol()'(overrides?: CallOverrides): Promise<string>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {
    AuthorizedOperator(
      operator: string | null,
      tokenHolder: string | null
    ): EventFilter

    Burned(
      operator: string | null,
      from: string | null,
      amount: null,
      data: null,
      operatorData: null
    ): EventFilter

    Minted(
      operator: string | null,
      to: string | null,
      amount: null,
      data: null,
      operatorData: null
    ): EventFilter

    RevokedOperator(
      operator: string | null,
      tokenHolder: string | null
    ): EventFilter

    Sent(
      operator: string | null,
      from: string | null,
      to: string | null,
      amount: null,
      data: null,
      operatorData: null
    ): EventFilter
  }

  estimateGas: {
    authorizeOperator(
      operator: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    'authorizeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    burn(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    'burn(uint256,bytes)'(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    defaultOperators(overrides?: CallOverrides): Promise<BigNumber>

    'defaultOperators()'(overrides?: CallOverrides): Promise<BigNumber>

    granularity(overrides?: CallOverrides): Promise<BigNumber>

    'granularity()'(overrides?: CallOverrides): Promise<BigNumber>

    isOperatorFor(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    'isOperatorFor(address,address)'(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    name(overrides?: CallOverrides): Promise<BigNumber>

    'name()'(overrides?: CallOverrides): Promise<BigNumber>

    operatorBurn(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    'operatorBurn(address,uint256,bytes,bytes)'(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    operatorSend(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    'operatorSend(address,address,uint256,bytes,bytes)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    revokeOperator(operator: string, overrides?: Overrides): Promise<BigNumber>

    'revokeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<BigNumber>

    send(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    'send(address,uint256,bytes)'(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>

    symbol(overrides?: CallOverrides): Promise<BigNumber>

    'symbol()'(overrides?: CallOverrides): Promise<BigNumber>

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>

    'totalSupply()'(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    authorizeOperator(
      operator: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'authorizeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'balanceOf(address)'(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    burn(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'burn(uint256,bytes)'(
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    defaultOperators(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'defaultOperators()'(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    granularity(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'granularity()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    isOperatorFor(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    'isOperatorFor(address,address)'(
      operator: string,
      tokenHolder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'name()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    operatorBurn(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'operatorBurn(address,uint256,bytes,bytes)'(
      account: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    operatorSend(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'operatorSend(address,address,uint256,bytes,bytes)'(
      sender: string,
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    revokeOperator(
      operator: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'revokeOperator(address)'(
      operator: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    send(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    'send(address,uint256,bytes)'(
      recipient: string,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'symbol()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'totalSupply()'(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
