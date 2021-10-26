/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  L1CustomGatewayTester,
  L1CustomGatewayTesterInterface,
} from '../L1CustomGatewayTester'

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_sequenceNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'DepositInitiated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'l1Address',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'l2Address',
        type: 'address',
      },
    ],
    name: 'TokenSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_seqNum',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'TxToL2',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'exitNum',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'madeExternalCall',
        type: 'bool',
      },
    ],
    name: 'WithdrawRedirected',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'l1Token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_exitNum',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalFinalized',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'l1ERC20',
        type: 'address',
      },
    ],
    name: 'calculateL2TokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'counterpartGateway',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_exitNum',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_initialDestination',
        type: 'address',
      },
    ],
    name: 'encodeWithdrawal',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'finalizeInboundTransfer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_l1Addresses',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: '_l2Addresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: '_maxGas',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gasPriceBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxSubmissionCost',
        type: 'uint256',
      },
    ],
    name: 'forceRegisterTokenToL2',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_exitNum',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_initialDestination',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_initialData',
        type: 'bytes',
      },
    ],
    name: 'getExternalCall',
    outputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l1Token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'getOutboundCalldata',
    outputs: [
      {
        internalType: 'bytes',
        name: 'outboundCalldata',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inbox',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l1Counterpart',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_l1Router',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_inbox',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'l1ToL2Token',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l1Token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxGas',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gasPriceBid',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'outboundTransfer',
    outputs: [
      {
        internalType: 'bytes',
        name: 'res',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'postUpgradeInit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'redirectedExits',
    outputs: [
      {
        internalType: 'bool',
        name: 'isExit',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: '_newTo',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_newData',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l2Address',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_maxGas',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gasPriceBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxSubmissionCost',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_creditBackAddress',
        type: 'address',
      },
    ],
    name: 'registerTokenToL2',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_l2Address',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_maxGas',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_gasPriceBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxSubmissionCost',
        type: 'uint256',
      },
    ],
    name: 'registerTokenToL2',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_shouldUseInbox',
        type: 'bool',
      },
    ],
    name: 'setInboxUse',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_exitNum',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_initialDestination',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_newDestination',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_newData',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'transferExitAndCall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'whitelist',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b50612936806100206000396000f3fe60806040526004361061011f5760003560e01c8063a7e28d48116100a0578063f26bdead11610064578063f26bdead146107ae578063f68a9082146107e6578063f887ea401461093d578063f8c8765e14610952578063fb0e722b1461099d5761011f565b8063a7e28d48146104ee578063bcf2e6eb14610521578063bd5f3e7d146105e7578063ca346d4a146106d2578063d2ce7d65146107145761011f565b80638a2dc014116100e75780638a2dc0141461032e5780638da5cb5b1461036157806393e59dc11461037657806395fcea781461038b578063a0c76a96146103a05761011f565b8063020a6058146101245780631d3a689f1461016f5780632db09c1c146102395780632e567b361461026a57806369ec2bed14610302575b600080fd5b34801561013057600080fd5b5061015d6004803603604081101561014757600080fd5b50803590602001356001600160a01b03166109b2565b60408051918252519081900360200190f35b61015d600480360360a081101561018557600080fd5b810190602081018135600160201b81111561019f57600080fd5b8201836020820111156101b157600080fd5b803590602001918460208302840111600160201b831117156101d257600080fd5b919390929091602081019035600160201b8111156101ef57600080fd5b82018360208201111561020157600080fd5b803590602001918460208302840111600160201b8311171561022257600080fd5b9193509150803590602081013590604001356109e7565b34801561024557600080fd5b5061024e610c6d565b604080516001600160a01b039092168252519081900360200190f35b610300600480360360a081101561028057600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b8111156102c257600080fd5b8201836020820111156102d457600080fd5b803590602001918460018302840111600160201b831117156102f557600080fd5b509092509050610c81565b005b34801561030e57600080fd5b506103006004803603602081101561032557600080fd5b50351515610e11565b34801561033a57600080fd5b5061024e6004803603602081101561035157600080fd5b50356001600160a01b0316610e24565b34801561036d57600080fd5b5061024e610e3f565b34801561038257600080fd5b5061024e610e4e565b34801561039757600080fd5b50610300610e5d565b3480156103ac57600080fd5b50610479600480360360a08110156103c357600080fd5b6001600160a01b03823581169260208101358216926040820135909216916060820135919081019060a081016080820135600160201b81111561040557600080fd5b82018360208201111561041757600080fd5b803590602001918460018302840111600160201b8311171561043857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610eba945050505050565b6040805160208082528351818301528351919283929083019185019080838360005b838110156104b357818101518382015260200161049b565b50505050905090810190601f1680156104e05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104fa57600080fd5b5061024e6004803603602081101561051157600080fd5b50356001600160a01b0316610fc1565b34801561052d57600080fd5b5061054b6004803603602081101561054457600080fd5b5035610fe2565b6040518084151515158152602001836001600160a01b03166001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156105aa578181015183820152602001610592565b50505050905090810190601f1680156105d75780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156105f357600080fd5b50610300600480360360a081101561060a57600080fd5b8135916001600160a01b03602082013581169260408301359091169190810190608081016060820135600160201b81111561064457600080fd5b82018360208201111561065657600080fd5b803590602001918460018302840111600160201b8311171561067757600080fd5b919390929091602081019035600160201b81111561069457600080fd5b8201836020820111156106a657600080fd5b803590602001918460018302840111600160201b831117156106c757600080fd5b509092509050611099565b61015d600480360360a08110156106e857600080fd5b506001600160a01b038135811691602081013591604082013591606081013591608090910135166113b7565b610479600480360360c081101561072a57600080fd5b6001600160a01b0382358116926020810135909116916040820135916060810135916080820135919081019060c0810160a0820135600160201b81111561077057600080fd5b82018360208201111561078257600080fd5b803590602001918460018302840111600160201b831117156107a357600080fd5b509092509050611743565b61015d600480360360808110156107c457600080fd5b506001600160a01b038135169060208101359060408101359060600135611a7e565b3480156107f257600080fd5b506108ac6004803603606081101561080957600080fd5b8135916001600160a01b0360208201351691810190606081016040820135600160201b81111561083857600080fd5b82018360208201111561084a57600080fd5b803590602001918460018302840111600160201b8311171561086b57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550611a96945050505050565b60405180836001600160a01b03166001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156109015781810151838201526020016108e9565b50505050905090810190601f16801561092e5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561094957600080fd5b5061024e611b81565b34801561095e57600080fd5b506103006004803603608081101561097557600080fd5b506001600160a01b038135811691602081013582169160408201358116916060013516611b90565b3480156109a957600080fd5b5061024e611bc7565b604080516020808201949094526001600160a01b03929092168282015280518083038201815260609092019052805191012090565b6005546000906001600160a01b03163314610a36576040805162461bcd60e51b815260206004820152600a60248201526927a7262cafa7aba722a960b11b604482015290519081900360640190fd5b868514610a7c576040805162461bcd60e51b815260206004820152600f60248201526e494e56414c49445f4c454e4754485360881b604482015290519081900360640190fd5b60005b87811015610b8557868682818110610a9357fe5b905060200201356001600160a01b0316600460008b8b85818110610ab357fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a8154816001600160a01b0302191690836001600160a01b03160217905550868682818110610b1357fe5b905060200201356001600160a01b03166001600160a01b0316898983818110610b3857fe5b905060200201356001600160a01b03166001600160a01b03167f0dd664a155dd89526bb019e22b00291bb7ca9d07ba3ec4a1a76b410da9797ceb60405160405180910390a3600101610a7f565b50606063d4f5532f60e01b898989896040516024018080602001806020018381038352878782818152602001925060200280828437600083820152601f01601f19169091018481038352858152602090810191508690860280828437600083820181905260408051601f909301601f199081169095018381039095018352939093526020810180516001600160e01b03166001600160e01b0319909c169b909b17909a52506002548154999a50610c60996001600160a01b039182169950610100900416965033955034945092508a91508c90508b89611bd6565b9998505050505050505050565b60005461010090046001600160a01b031681565b6002546001600160a01b03166000610c9882611be9565b9050336001600160a01b03821614610ce9576040805162461bcd60e51b815260206004820152600f60248201526e4e4f545f46524f4d5f42524944474560881b604482015290519081900360640190fd5b6000610cf483611c03565b6000549091506001600160a01b038083166101009092041614610d59576040805162461bcd60e51b81526020600482015260186024820152774f4e4c595f434f554e544552504152545f4741544557415960401b604482015290519081900360640190fd5b60006060610d678787611c1f565b915091508051600014610d8557506040805160208101909152600081525b610d90828a83611a96565b509850610d9e8b8a8a611ccc565b81896001600160a01b03168b6001600160a01b03167f891afe029c75c4f8c5855fc3480598bc5a53739344f6ae575bdb7ea2a79f56b38e8c60405180836001600160a01b03166001600160a01b031681526020018281526020019250505060405180910390a45050505050505050505050565b6000805460ff1916911515919091179055565b6004602052600090815260409020546001600160a01b031681565b6005546001600160a01b031681565b6006546001600160a01b031681565b6000610e67611ceb565b9050336001600160a01b03821614610eb7576040805162461bcd60e51b815260206004820152600e60248201526d2727aa2fa32927a6afa0a226a4a760911b604482015290519081900360640190fd5b50565b60408051602081019091526000815260609063172b3d9b60e11b87878787610ee28689611d10565b6040516001600160a01b0380871660248301908152868216604484015290851660648301526084820184905260a060a48301908152835160c484015283519192909160e490910190602085019080838360005b83811015610f4d578181015183820152602001610f35565b50505050905090810190601f168015610f7a5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909a1699909917909852509597505050505050505095945050505050565b6001600160a01b03808216600090815260046020526040902054165b919050565b600360209081526000918252604091829020805460018083018054865160026101009483161585026000190190921691909104601f810187900487028201870190975286815260ff841696929093046001600160a01b03169490919083018282801561108f5780601f106110645761010080835404028352916020019161108f565b820191906000526020600020905b81548152906001019060200180831161107257829003601f168201915b5050505050905083565b60006110b5888860405180602001604052806000815250611a96565b509050336001600160a01b0382161461110b576040805162461bcd60e51b81526020600482015260136024820152722727aa2fa2ac2822a1aa22a22fa9a2a72222a960691b604482015290519081900360640190fd5b8315611150576040805162461bcd60e51b815260206004820152600f60248201526e1393d7d110551057d0531313d5d151608a1b604482015290519081900360640190fd5b61119288888888888080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611e0292505050565b81156112fa576111aa866001600160a01b0316611e93565b6111ed576040805162461bcd60e51b815260206004820152600f60248201526e1513d7d393d517d0d3d395149050d5608a1b604482015290519081900360640190fd5b6000866001600160a01b031663592e2070838b87876040518563ffffffff1660e01b815260040180856001600160a01b03166001600160a01b03168152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505095505050505050602060405180830381600087803b15801561128357600080fd5b505af1158015611297573d6000803e3d6000fd5b505050506040513d60208110156112ad57600080fd5b50519050806112f8576040805162461bcd60e51b81526020600482015260126024820152711514905394d1915497d213d3d2d7d190525360721b604482015290519081900360640190fd5b505b87866001600160a01b0316826001600160a01b03167f56735ccb9dc7d2222ce4177fc3aea44c33882e2a2c73e0fb1c6b93c9c13a04d48888888860008b8b905011604051808060200180602001841515151581526020018381038352888882818152602001925080828437600083820152601f01601f191690910184810383528681526020019050868680828437600083820152604051601f909101601f1916909201829003995090975050505050505050a45050505050505050565b600061a4b160ff16336001600160a01b0316638e5f5ad16040518163ffffffff1660e01b815260040160206040518083038186803b1580156113f857600080fd5b505afa15801561140c573d6000803e3d6000fd5b505050506040513d602081101561142257600080fd5b505160ff161461146b576040805162461bcd60e51b815260206004820152600f60248201526e1393d517d0549097d1539050931151608a1b604482015290519081900360640190fd5b336000908152600460205260409020546001600160a01b031680156114f057866001600160a01b0316816001600160a01b0316146114f0576040805162461bcd60e51b815260206004820152601b60248201527f4e4f5f5550444154455f544f5f444946464552454e545f414444520000000000604482015290519081900360640190fd5b336000908152600460205260409081902080546001600160a01b038a166001600160a01b0319909116179055805160018082528183019092526060918160200160208202803683375050604080516001808252818301909252929350606092915060208083019080368337019050509050338260008151811061156f57fe5b60200260200101906001600160a01b031690816001600160a01b031681525050888160008151811061159d57fe5b60200260200101906001600160a01b031690816001600160a01b031681525050806000815181106115ca57fe5b60200260200101516001600160a01b0316826000815181106115e857fe5b60200260200101516001600160a01b03167f0dd664a155dd89526bb019e22b00291bb7ca9d07ba3ec4a1a76b410da9797ceb60405160405180910390a3606063d4f5532f60e01b8383604051602401808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015611678578181015183820152602001611660565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156116b757818101518382015260200161169f565b50505050905001945050505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050611735600260009054906101000a90046001600160a01b0316600060019054906101000a90046001600160a01b0316883460008c8f8f89611bd6565b9a9950505050505050505050565b606061174e33611e99565b611791576040805162461bcd60e51b815260206004820152600f60248201526e2727aa2fa32927a6afa927aaaa22a960891b604482015290519081900360640190fd5b600080606060006117a133611e99565b156117ba576117b08787611ead565b90945091506117f7565b33935086868080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509294505050505b81806020019051604081101561180c57600080fd5b815160208301805160405192949293830192919084600160201b82111561183257600080fd5b90830190602082018581111561184757600080fd5b8251600160201b81118282018810171561186057600080fd5b82525081516020918201929091019080838360005b8381101561188d578181015183820152602001611875565b50505050905090810190601f1680156118ba5780820380516001836020036101000a031916815260200191505b5060405250508151919450919250159050611912576040805162461bcd60e51b8152602060048201526013602482015272115615149057d110551057d11254d050931151606a1b604482015290519081900360640190fd5b6119248c6001600160a01b0316611e93565b611967576040805162461bcd60e51b815260206004820152600f60248201526e130c57d393d517d0d3d395149050d5608a1b604482015290519081900360640190fd5b60006119728d610fc1565b90506001600160a01b0381166119c1576040805162461bcd60e51b815260206004820152600f60248201526e1393d7d30c97d513d2d15397d4d155608a1b604482015290519081900360640190fd5b6119cc8d868d611eeb565b9a506119db8d868e8e87610eba565b95506119eb858c8c8c868b61200d565b93505050818a6001600160a01b0316846001600160a01b03167fb8910b9960c443aac3240b98585384e3a6f109fbf6969e264c3f183d69aba7e18e8d60405180836001600160a01b03166001600160a01b031681526020018281526020019250505060405180910390a4506040805160208082019390935281518082039093018352810190529998505050505050505050565b6000611a8d85858585336113b7565b95945050505050565b600060606000611aa686866109b2565b600081815260036020526040902080549192509060ff1615611b705780546001808301805460408051602060026101009685161587026000190190941693909304601f8101849004840282018401909252818152939094046001600160a01b0316939192918391830182828015611b5e5780601f10611b3357610100808354040283529160200191611b5e565b820191906000526020600020905b815481529060010190602001808311611b4157829003601f168201915b50505050509050935093505050611b79565b85859350935050505b935093915050565b6001546001600160a01b031681565b611b9b84848461206e565b600580546001600160a01b039092166001600160a01b0319928316179055600680549091169055505050565b6002546001600160a01b031681565b60006117358a8a8a8a8a8a8a8a8a612079565b6000805460ff1615611bfc575080610fdd565b5033610fdd565b6000805460ff1615611bfc57611c188261214f565b9050610fdd565b6000606083836040811015611c3357600080fd5b81359190810190604081016020820135600160201b811115611c5457600080fd5b820183602082011115611c6657600080fd5b803590602001918460018302840111600160201b83111715611c8757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250969b929a509198505050505050505050565b611ce66001600160a01b038416838363ffffffff61227a16565b505050565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035490565b60608282604051602001808060200180602001838103835285818151815260200191508051906020019080838360005b83811015611d58578181015183820152602001611d40565b50505050905090810190601f168015611d855780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015611db8578181015183820152602001611da0565b50505050905090810190601f168015611de55780820380516001836020036101000a031916815260200191505b5060408051601f1981840301815291905298975050505050505050565b6000611e0e85856109b2565b6040805160608101825260018082526001600160a01b0387811660208085019182528486018981526000888152600383529690962085518154935160ff1990941690151517610100600160a81b0319166101009390941692909202929092178155935180519596509294611e89939285019290910190612815565b5050505050505050565b3b151590565b6001546001600160a01b0390811691161490565b6000606083836040811015611ec157600080fd5b6001600160a01b038235169190810190604081016020820135600160201b811115611c5457600080fd5b604080516370a0823160e01b8152306004820152905160009182916001600160a01b038716916370a08231916024808301926020929190829003018186803b158015611f3657600080fd5b505afa158015611f4a573d6000803e3d6000fd5b505050506040513d6020811015611f6057600080fd5b50519050611f7f6001600160a01b03861685308663ffffffff6122cc16565b604080516370a0823160e01b815230600482015290516000916001600160a01b038816916370a0823191602480820192602092909190829003018186803b158015611fc957600080fd5b505afa158015611fdd573d6000803e3d6000fd5b505050506040513d6020811015611ff357600080fd5b50519050612001818361232c565b925050505b9392505050565b6000612063600260009054906101000a90046001600160a01b0316600060019054906101000a90046001600160a01b03168934600060405180606001604052808a81526020018c81526020018b81525088612389565b979650505050505050565b611ce68383836123b4565b60008060608a6001600160a01b031688856040518082805190602001908083835b602083106120b95780518252601f19909201916020918201910161209a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d806000811461211b576040519150601f19603f3d011682016040523d82523d6000602084013e612120565b606091505b509150915081600081146121335761213b565b815160208301fd5b506105399c9b505050505050505050505050565b60008061215b83612471565b6001600160a01b031663ab5d89436040518163ffffffff1660e01b815260040160206040518083038186803b15801561219357600080fd5b505afa1580156121a7573d6000803e3d6000fd5b505050506040513d60208110156121bd57600080fd5b505160408051634032458160e11b815290519192506000916001600160a01b038416916380648b02916004808301926020929190829003018186803b15801561220557600080fd5b505afa158015612219573d6000803e3d6000fd5b505050506040513d602081101561222f57600080fd5b505190506001600160a01b038116612006576040805162461bcd60e51b81526020600482015260096024820152682727afa9a2a72222a960b91b604482015290519081900360640190fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052611ce6908490612482565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052612326908590612482565b50505050565b600082821115612383576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b60006123a88888888888886000015189602001518a604001518a611bd6565b98975050505050505050565b6123be8383612533565b6001600160a01b038216612406576040805162461bcd60e51b815260206004820152600a6024820152692120a22fa927aaaa22a960b11b604482015290519081900360640190fd5b6001600160a01b03811661244d576040805162461bcd60e51b81526020600482015260096024820152680848288be929c849eb60bb1b604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b03929092169190911790555050565b600061247c82611be9565b92915050565b60606124d7826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661260e9092919063ffffffff16565b805190915015611ce6578080602001905160208110156124f657600080fd5b5051611ce65760405162461bcd60e51b815260040180806020018281038252602a8152602001806128d7602a913960400191505060405180910390fd5b6001600160a01b038216612584576040805162461bcd60e51b81526020600482015260136024820152721253959053125117d0d3d55395115494105495606a1b604482015290519081900360640190fd5b60005461010090046001600160a01b0316156125d6576040805162461bcd60e51b815260206004820152600c60248201526b1053149150511657d253925560a21b604482015290519081900360640190fd5b60008054610100600160a81b0319166101006001600160a01b0394851602179055600180546001600160a01b03191691909216179055565b606061261d8484600085612625565b949350505050565b6060824710156126665760405162461bcd60e51b81526004018080602001828103825260268152602001806128b16026913960400191505060405180910390fd5b61266f85611e93565b6126c0576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106126ff5780518252601f1990920191602091820191016126e0565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114612761576040519150601f19603f3d011682016040523d82523d6000602084013e612766565b606091505b509150915061206382828660608315612780575081612006565b8251156127905782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156127da5781810151838201526020016127c2565b50505050905090810190601f1680156128075780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061285657805160ff1916838001178555612883565b82800160010185558215612883579182015b82811115612883578251825591602001919060010190612868565b5061288f929150612893565b5090565b6128ad91905b8082111561288f5760008155600101612899565b9056fe416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c5361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a264697066735822122013c673bbbe378bbec96a610ef85ca03569aaa7d0a09b50daf3c62f9fd7347bbc64736f6c634300060b0033'

export class L1CustomGatewayTester__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<L1CustomGatewayTester> {
    return super.deploy(overrides || {}) as Promise<L1CustomGatewayTester>
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): L1CustomGatewayTester {
    return super.attach(address) as L1CustomGatewayTester
  }
  connect(signer: Signer): L1CustomGatewayTester__factory {
    return super.connect(signer) as L1CustomGatewayTester__factory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): L1CustomGatewayTesterInterface {
    return new utils.Interface(_abi) as L1CustomGatewayTesterInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): L1CustomGatewayTester {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as L1CustomGatewayTester
  }
}
