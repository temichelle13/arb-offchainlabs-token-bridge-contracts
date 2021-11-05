/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  ChallengeTester,
  ChallengeTesterInterface,
} from '../ChallengeTester'

const _abi = [
  {
    inputs: [
      {
        internalType: 'contract IOneStepProof[]',
        name: '_executors',
        type: 'address[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'challenge',
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
    name: 'challengeCompleted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'challengeExecutionBisectionDegree',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'challengeFactory',
    outputs: [
      {
        internalType: 'contract ChallengeFactory',
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
        name: '_winner',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_loser',
        type: 'address',
      },
    ],
    name: 'completeChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'loser',
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
        internalType: 'bytes32',
        name: 'executionHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'maxMessageCount',
        type: 'uint256',
      },
      {
        internalType: 'address payable',
        name: 'asserter',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'challenger',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'asserterTimeLeft',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'challengerTimeLeft',
        type: 'uint256',
      },
      {
        internalType: 'contract ISequencerInbox',
        name: 'sequencerBridge',
        type: 'address',
      },
      {
        internalType: 'contract IBridge',
        name: 'delayedBridge',
        type: 'address',
      },
    ],
    name: 'startChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'winner',
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
  '0x608060405261019060045534801561001657600080fd5b50604051613a51380380613a518339818101604052602081101561003957600080fd5b810190808051604051939291908464010000000082111561005957600080fd5b90830190602082018581111561006e57600080fd5b825186602082028301116401000000008211171561008b57600080fd5b82525081516020918201928201910280838360005b838110156100b85781810151838201526020016100a0565b50505050905001604052505050806040516100d290610157565b6020808252825181830152825182916040830191858201910280838360005b838110156101095781810151838201526020016100f1565b5050505090500192505050604051809103906000f080158015610130573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b039290921691909117905550610164565b6135bf8061049283390190565b61031f806101736000396000f3fe608060405234801561001057600080fd5b50600436106100785760003560e01c80635dbaf68b1461007d578063d2ef7398146100a1578063dc72a33b146100a9578063dfbf53ae146100c3578063e1022602146100cb578063e82898b3146100e7578063f5aa337c146100ef578063fa7803e614610148575b600080fd5b610085610176565b604080516001600160a01b039092168252519081900360200190f35b610085610185565b6100b1610194565b60408051918252519081900360200190f35b61008561019a565b6100d36101a9565b604080519115158252519081900360200190f35b6100856101b9565b610146600480360361010081101561010657600080fd5b508035906020810135906001600160a01b036040820135811691606081013582169160808201359160a08101359160c082013581169160e00135166101c8565b005b6101466004803603604081101561015e57600080fd5b506001600160a01b03813581169160200135166102a8565b6003546001600160a01b031681565b6000546001600160a01b031681565b60045481565b6001546001600160a01b031681565b600054600160a01b900460ff1681565b6002546001600160a01b031681565b60035460408051638ecaab1160e01b8152306004820152602481018b9052604481018a90526001600160a01b038981166064830152888116608483015260a4820188905260c4820187905285811660e483015284811661010483015291519190921691638ecaab11916101248083019260209291908290030181600087803b15801561025357600080fd5b505af1158015610267573d6000803e3d6000fd5b505050506040513d602081101561027d57600080fd5b5051600080546001600160a01b0319166001600160a01b039092169190911790555050505050505050565b600180546001600160a01b039384166001600160a01b031991821617909155600280549290931691161790556000805460ff60a01b1916600160a01b17905556fea2646970667358221220d9dfa8e6dcff8f5ded3fd1733d8e73f2fa450240b53dfb9b77efc396772ea65464736f6c634300060b0033608060405234801561001057600080fd5b506040516135bf3803806135bf8339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b90830190602082018581111561006857600080fd5b825186602082028301116401000000008211171561008557600080fd5b82525081516020918201928201910280838360005b838110156100b257818101518382015260200161009a565b5050505091909101604052505082516100d492506000915060208401906101bb565b5060006040516100e390610220565b604051809103906000f0801580156100ff573d6000803e3d6000fd5b5090508060405161010f9061022d565b6001600160a01b03909116815260405190819003602001906000f08015801561013c573d6000803e3d6000fd5b50600180546001600160a01b0319166001600160a01b0392831617908190556040805163f2fde38b60e01b81523360048201529051919092169163f2fde38b91602480830192600092919082900301818387803b15801561019c57600080fd5b505af11580156101b0573d6000803e3d6000fd5b505050505050610261565b828054828255906000526020600020908101928215610210579160200282015b8281111561021057825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906101db565b5061021c92915061023a565b5090565b6121ab80610e4383390190565b6105d180612fee83390190565b61025e91905b8082111561021c5780546001600160a01b0319168155600101610240565b90565b610bd3806102706000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806359659e90146100465780638ecaab111461006a578063f97a05df146100cc575b600080fd5b61004e6100e9565b604080516001600160a01b039092168252519081900360200190f35b61004e600480360361012081101561008157600080fd5b506001600160a01b0381358116916020810135916040820135916060810135821691608082013581169160a08101359160c08201359160e081013582169161010090910135166100f8565b61004e600480360360208110156100e257600080fd5b50356102af565b6001546001600160a01b031681565b60015460405160009182916001600160a01b0390911690610118906102d6565b6001600160a01b03909116815260406020820181905260008183018190529051918290036080019190f080158015610154573d6000803e3d6000fd5b509050806001600160a01b031663e0d42b8e60008d8d8d8d8d8d8d8d8d6040518b63ffffffff1660e01b815260040180806020018b6001600160a01b03166001600160a01b031681526020018a8152602001898152602001886001600160a01b03166001600160a01b03168152602001876001600160a01b03166001600160a01b03168152602001868152602001858152602001846001600160a01b03166001600160a01b03168152602001836001600160a01b03166001600160a01b0316815260200182810382528c818154815260200191508054801561025f57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610241575b50509b505050505050505050505050600060405180830381600087803b15801561028857600080fd5b505af115801561029c573d6000803e3d6000fd5b50929d9c50505050505050505050505050565b600081815481106102bc57fe5b6000918252602090912001546001600160a01b0316905081565b6108ba806102e48339019056fe60806040526040516108ba3803806108ba8339818101604052604081101561002657600080fd5b81516020830180516040519294929383019291908464010000000082111561004d57600080fd5b90830190602082018581111561006257600080fd5b825164010000000081118282018810171561007c57600080fd5b82525081516020918201929091019080838360005b838110156100a9578181015183820152602001610091565b50505050905090810190601f1680156100d65780820380516001836020036101000a031916815260200191505b5060408181527f656970313936372e70726f78792e626561636f6e0000000000000000000000008252519081900360140190206000805160206107fa83398151915260001990910114925061012a91505057fe5b61013d82826001600160e01b0361014416565b50506104f3565b610157826102a260201b6100311760201c565b6101925760405162461bcd60e51b815260040180806020018281038252602581526020018061083b6025913960400191505060405180910390fd5b61020a826001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156101ce57600080fd5b505afa1580156101e2573d6000803e3d6000fd5b505050506040513d60208110156101f857600080fd5b50516102a2602090811b61003117901c565b6102455760405162461bcd60e51b81526004018080602001828103825260348152602001806108866034913960400191505060405180910390fd5b6000805160206107fa83398151915282815581511561029d5761029b6102726001600160e01b036102a816565b8360405180606001604052806021815260200161081a6021913961032460201b6100371760201c565b505b505050565b3b151590565b60006102bb6001600160e01b0361043c16565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102f357600080fd5b505afa158015610307573d6000803e3d6000fd5b505050506040513d602081101561031d57600080fd5b5051905090565b6060610338846001600160e01b036102a216565b6103735760405162461bcd60e51b81526004018080602001828103825260268152602001806108606026913960400191505060405180910390fd5b60006060856001600160a01b0316856040518082805190602001908083835b602083106103b15780518252601f199092019160209182019101610392565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d8060008114610411576040519150601f19603f3d011682016040523d82523d6000602084013e610416565b606091505b5090925090506104308282866001600160e01b0361044f16565b925050505b9392505050565b6000805160206107fa8339815191525490565b6060831561045e575081610435565b82511561046e5782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156104b85781810151838201526020016104a0565b50505050905090810190601f1680156104e55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b6102f8806105026000396000f3fe60806040523661001357610011610017565b005b6100115b61001f61002f565b61002f61002a61013c565b6101af565b565b3b151590565b606061004284610031565b61007d5760405162461bcd60e51b815260040180806020018281038252602681526020018061029d6026913960400191505060405180910390fd5b60006060856001600160a01b0316856040518082805190602001908083835b602083106100bb5780518252601f19909201916020918201910161009c565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d806000811461011b576040519150601f19603f3d011682016040523d82523d6000602084013e610120565b606091505b50915091506101308282866101d3565b925050505b9392505050565b6000610146610277565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561017e57600080fd5b505afa158015610192573d6000803e3d6000fd5b505050506040513d60208110156101a857600080fd5b5051905090565b3660008037600080366000845af43d6000803e8080156101ce573d6000f35b3d6000fd5b606083156101e2575081610135565b8251156101f25782518084602001fd5b8160405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561023c578181015183820152602001610224565b50505050905090810190601f1680156102695780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50549056fe416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6e7472616374a264697066735822122053dcbd8c0863f6517a5117ac7b858fc300ba6a67685a286f909e85f8150b82c764736f6c634300060b0033a3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50426561636f6e50726f78793a2066756e6374696f6e2063616c6c206661696c6564426561636f6e50726f78793a20626561636f6e206973206e6f74206120636f6e7472616374416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6e7472616374426561636f6e50726f78793a20626561636f6e20696d706c656d656e746174696f6e206973206e6f74206120636f6e7472616374a2646970667358221220bfe03482afd40c4416f944fd566dc2ab4f1db1cfcc8fd221f8cf19ac35f8f6fd64736f6c634300060b0033608060405234801561001057600080fd5b506000805460ff1916600117905561217e8061002d6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063925f9a9611610092578063925f9a9614610285578063959792011461028d5780639a9e4f441461045e578063a3c4470514610466578063bb4af0b114610483578063deda41151461048b578063e0d42b8e14610517578063e87e3589146105ca578063f97a05df146105d2576100f5565b806214ebe7146100fa57806341e8510c14610104578063534db0e21461011e5780636f791d291461014257806370dea79a1461015e578063843d5a5c146101665780638a8cd2181461016e5780638b299903146101765780638e7b84c5146101a2575b600080fd5b6101026105ef565b005b61010c61064c565b60408051918252519081900360200190f35b610126610652565b604080516001600160a01b039092168252519081900360200190f35b61014a610661565b604080519115158252519081900360200190f35b61010261066b565b61010c6107c4565b6101266107ca565b61017e610859565b6040518082600281111561018e57fe5b60ff16815260200191505060405180910390f35b61010260048036036101008110156101b957600080fd5b810190602081018135600160201b8111156101d357600080fd5b8201836020820111156101e557600080fd5b803590602001918460208302840111600160201b8311171561020657600080fd5b9193909282359260208101359260408201359260608301359260808101359260a082013592909160e081019060c00135600160201b81111561024757600080fd5b82018360208201111561025957600080fd5b803590602001918460208302840111600160201b8311171561027a57600080fd5b509092509050610862565b61010c610e1e565b61010260048036036101c08110156102a457600080fd5b810190602081018135600160201b8111156102be57600080fd5b8201836020820111156102d057600080fd5b803590602001918460208302840111600160201b831117156102f157600080fd5b6040805160608181018352949693958335956020850135959385013594818101359460808201359460a08301949193919261014081019260e090910190600390839083908082843760009201919091525091949392602081019250359050600160201b81111561036057600080fd5b82018360208201111561037257600080fd5b803590602001918460018302840111600160201b8311171561039357600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156103e557600080fd5b8201836020820111156103f757600080fd5b803590602001918460018302840111600160201b8311171561041857600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505050903560ff169150610e249050565b61010c6113cb565b6101266004803603602081101561047c57600080fd5b50356113d1565b6101266113ee565b610102600480360360e08110156104a157600080fd5b810190602081018135600160201b8111156104bb57600080fd5b8201836020820111156104cd57600080fd5b803590602001918460208302840111600160201b831117156104ee57600080fd5b919350915080359060208101359060408101359060608101359060808101359060a001356113fd565b610102600480360361014081101561052e57600080fd5b810190602081018135600160201b81111561054857600080fd5b82018360208201111561055a57600080fd5b803590602001918460208302840111600160201b8311171561057b57600080fd5b91935091506001600160a01b0381358116916020810135916040820135916060810135821691608082013581169160a08101359160c08201359160e081013582169161010090910135166116f5565b61010c611846565b610126600480360360208110156105e857600080fd5b503561188c565b6004546001600160a01b03163314610641576040805162461bcd60e51b815260206004820152601060248201526f2727aa2fa922a9afa922a1a2a4ab22a960811b604482015290519081900360640190fd5b61064a336118b3565b565b600a5481565b6007546001600160a01b031681565b60005460ff165b90565b60006106826008544361193390919063ffffffff16565b905061068c611846565b81116040518060400160405280601081526020016f54494d454f55545f444541444c494e4560801b815250906107405760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156107055781810151838201526020016106ed565b50505050905090810190601f1680156107325780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506001600b5460ff16600281111561075457fe5b1415610790576040517f2b92a4b014281aa2424baba9ea60bf4f26833d1c1fbd873e51cd1a6caeef48f090600090a161078b611995565b6107c1565b6040517f4e1f1f06cf69d199fcdb4d87a5a92d5248ca6b540e9fc2d3698927c5002a236a90600090a16107c1611a12565b50565b600c5481565b60006001600b5460ff1660028111156107df57fe5b14156107f757506006546001600160a01b0316610668565b6002600b5460ff16600281111561080a57fe5b141561082257506007546001600160a01b0316610668565b6040805162461bcd60e51b81526020600482015260076024820152662727afaa2aa92760c91b604482015290519081900360640190fd5b600b5460ff1681565b61086a6107ca565b6001600160a01b0316336001600160a01b0316146040518060400160405280600a8152602001692124a9afa9a2a72222a960b11b815250906108ed5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b506108f6611846565b60085461090a90439063ffffffff61193316565b11156040518060400160405280600c81526020016b4249535f444541444c494e4560a01b8152509061097d5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b5060008282600019810181811061099057fe5b90506020020135146109dd57600186116109dd576040805162461bcd60e51b81526020600482015260096024820152681513d3d7d4d213d49560ba1b604482015290519081900360640190fd5b6000600460009054906101000a90046001600160a01b03166001600160a01b031663dc72a33b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a2d57600080fd5b505afa158015610a41573d6000803e3d6000fd5b505050506040513d6020811015610a5757600080fd5b50519050610a658782611a6e565b6001018214610aa7576040805162461bcd60e51b815260206004820152600960248201526810d55517d0d3d5539560ba1b604482015290519081900360640190fd5b8583836000198101818110610ab857fe5b905060200201351415610afd576040805162461bcd60e51b815260206004820152600860248201526714d0535157d1539160c21b604482015290519081900360640190fd5b610b078585611a86565b83836000818110610b1457fe5b9050602002013514610b62576040805162461bcd60e51b81526020600482015260126024820152717365676d656e74207072652d6669656c647360701b604482015290519081900360640190fd5b600083838281610b6e57fe5b905060200201351415610bbc576040805162461bcd60e51b8152602060048201526011602482015270155394915050d21050931157d4d5105495607a1b604482015290519081900360640190fd5b610bcc888863ffffffff611ab216565b8510610c18576040805162461bcd60e51b81526020600482015260166024820152750d2dcecc2d8d2c840e6cacedacadce840d8cadccee8d60531b604482015290519081900360640190fd5b6000610c39898986866000818110610c2c57fe5b905060200201358a611b13565b9050610c4a600c54828e8e8e611b51565b604051806040016040528060088152602001672124a9afa82922ab60c11b81525090610cb75760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b506000610cfa8585808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508e92508d9150611b9f9050565b905080600c81905550807f0a2bdfea671da507e80b0cbae49dd25100a5bdacc5dff43a9163a3fcbd7c3c7d8b8b888860405180858152602001848152602001806020018281038252848482818152602001925060200280828437600083820152604051601f909101601f191690920182900397509095505050505050a25060029150610d839050565b600b5460ff166002811115610d9457fe5b1415610dd657610dc1610db26008544361193390919063ffffffff16565b600a549063ffffffff61193316565b600a55600b805460ff19166001179055610e0e565b610dfd610dee6008544361193390919063ffffffff16565b6009549063ffffffff61193316565b600955600b805460ff191660021790555b5050436008555050505050505050565b60085481565b610e2c6107ca565b6001600160a01b0316336001600160a01b0316146040518060400160405280600a8152602001692124a9afa9a2a72222a960b11b81525090610eaf5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b50610eb8611846565b600854610ecc90439063ffffffff61193316565b11156040518060400160405280600c81526020016b4249535f444541444c494e4560a01b81525090610f3f5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b506000806000610f4d61205b565b60018560ff1681548110610f5d57fe5b6000918252602090912001546040516323eed0eb60e11b81526001600160a01b03909116906347dda1d6906002908d908d908c908c90600481019060440186825b81546001600160a01b03168152600190910190602001808311610f9e57505085815260200184604080828437600081840152601f19601f8201169050808301925050508060200180602001838103835285818151815260200191508051906020019080838360005b8381101561101e578181015183820152602001611006565b50505050905090810190601f16801561104b5780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b8381101561107e578181015183820152602001611066565b50505050905090810190601f1680156110ab5780820380516001836020036101000a031916815260200191505b5097505050505050505060c06040518083038186803b1580156110cd57600080fd5b505afa1580156110e1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525060c081101561110657600080fd5b5080516020820151600554919550935060409091019150821115611165576040805162461bcd60e51b8152602060048201526011602482015270544f4f5f4d414e595f4d4553534147455360781b604482015290519081900360640190fd5b6111758d8d63ffffffff611ab216565b8851106111b4576040805162461bcd60e51b815260206004820152600860248201526713d4d417d0d3d39560c21b604482015290519081900360640190fd5b6111c48d8d63ffffffff611ab216565b6111e767ffffffffffffffff85168a60005b60200201519063ffffffff611ab216565b1015611226576040805162461bcd60e51b815260206004820152600960248201526813d4d417d4d213d49560ba1b604482015290519081900360640190fd5b611239893560208b01358a868686611ce5565b8b1415611279576040805162461bcd60e51b815260206004820152600960248201526815d493d391d7d1539160ba1b604482015290519081900360640190fd5b6112968d8d6112908d8d3560208f01358e88611d84565b8e611b13565b93505050506112aa600c54828f8f8f611b51565b604051806040016040528060088152602001672124a9afa82922ab60c11b815250906113175760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b506040517f117efdf1fdd8be5a6ff0fb3c32333d7033bbd9523924bd0d9ca28f43540516f590600090a1611349611db5565b506002600b5460ff16600281111561135d57fe5b14156113905761137b610db26008544361193390919063ffffffff16565b600a55600b805460ff191660011790556113b9565b6113a8610dee6008544361193390919063ffffffff16565b600955600b805460ff191660021790555b50504360085550505050505050505050565b60095481565b600281600281106113de57fe5b01546001600160a01b0316905081565b6006546001600160a01b031681565b6114056107ca565b6001600160a01b0316336001600160a01b0316146040518060400160405280600a8152602001692124a9afa9a2a72222a960b11b815250906114885760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b50611491611846565b6008546114a590439063ffffffff61193316565b11156040518060400160405280600c81526020016b4249535f444541444c494e4560a01b815250906115185760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b5060006115258383611a86565b9050600061153587878488611b13565b9050611546600c54828c8c8c611b51565b604051806040016040528060088152602001672124a9afa82922ab60c11b815250906115b35760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b506115c4878763ffffffff611ab216565b841015611603576040805162461bcd60e51b81526020600482015260086024820152671393d517d0d3d39560c21b604482015290519081900360640190fd5b84821415611644576040805162461bcd60e51b815260206004820152600960248201526815d493d391d7d1539160ba1b604482015290519081900360640190fd5b6040517ff62bb8ab32072c0ea3337f57276b8e66418eca0dfcc5e3b8aef4905d43e8f8ca90600090a1611675611db5565b5060029050600b5460ff16600281111561168b57fe5b14156116be576116a9610db26008544361193390919063ffffffff16565b600a55600b805460ff191660011790556116e7565b6116d6610dee6008544361193390919063ffffffff16565b600955600b805460ff191660021790555b505043600855505050505050565b6000600b5460ff16600281111561170857fe5b146040518060400160405280600f81526020016e4348414c5f494e49545f535441544560881b8152509061177d5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b5061178a60018c8c612079565b50600480546001600160a01b03199081166001600160a01b038c8116919091179092556005899055600680548216898416179055600780549091168783161790556009859055600a849055600b805460ff19166002908117909155600c8a905543600855604080518082019091528483168152918316602083015261180f91816120dc565b506040517f7003482dc89fcecb9f14e280f21ee716bd54187f7f3b0ab5ed78f3648218f2de90600090a15050505050505050505050565b60006001600b5460ff16600281111561185b57fe5b141561186a5750600954610668565b6002600b5460ff16600281111561187d57fe5b14156108225750600a54610668565b6001818154811061189957fe5b6000918252602090912001546001600160a01b0316905081565b6000546040805180820190915260098152684e4f545f434c4f4e4560b81b60208201529060ff16156119265760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107055781810151838201526020016106ed565b50806001600160a01b0316ff5b60008282111561198a576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b508082035b92915050565b6004805460075460065460408051637d3c01f360e11b81526001600160a01b039384169581019590955290821660248501525191169163fa7803e691604480830192600092919082900301818387803b1580156119f157600080fd5b505af1158015611a05573d6000803e3d6000fd5b5050505061064a336118b3565b6004805460065460075460408051637d3c01f360e11b81526001600160a01b039384169581019590955290821660248501525191169163fa7803e691604480830192600092919082900301818387803b1580156119f157600080fd5b600081831015611a7f57508161198f565b508061198f565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b600082820183811015611b0c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b604080516020808201969096528082019490945260608401929092526080808401919091528151808403909101815260a09092019052805191012090565b6000611b93848480806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250869250899150611dbc9050565b90951495945050505050565b82516000906000190160608167ffffffffffffffff81118015611bc157600080fd5b50604051908082528060200260200182016040528015611beb578160200160208202803683370190505b5090506000611bfa8584611e8a565b90506000869050611c3581838a600081518110611c1357fe5b60200260200101518b600181518110611c2857fe5b6020026020010151611b13565b83600081518110611c4257fe5b6020908102919091010152611c5d818363ffffffff611ab216565b9050611c698685611ea8565b915060015b84811015611ccf57611c9e82848b8481518110611c8757fe5b60200260200101518c8560010181518110611c2857fe5b848281518110611caa57fe5b6020908102919091010152611cc5828463ffffffff611ab216565b9150600101611c6e565b50611cd983611ebb565b98975050505050505050565b600080611d0e83600260200201518914611d00576001611d03565b60005b60ff168760016111d6565b90506000611d3884600360200201518914611d2a576001611d2d565b60005b60ff168860026111d6565b9050611d77611d5367ffffffffffffffff88168960006111d6565b602086015160408701516060880151611d72928a929091889088612010565b611a86565b9998505050505050505050565b8151815160208401516040850151600093611dab939092611d72928b92918b918b90612010565b9695505050505050565b6000600c55565b8251600090610100811115611dd057600080fd5b8260005b82811015611e805760028606611e2d57868181518110611df057fe5b6020026020010151826040516020018083815260200182815260200192505050604051602081830303815290604052805190602001209150611e72565b81878281518110611e3a57fe5b602002602001015160405160200180838152602001828152602001925050506040516020818303038152906040528051906020012091505b600286049550600101611dd4565b5095945050505050565b6000818381611e9557fe5b06828481611e9f57fe5b04019392505050565b6000818381611eb357fe5b049392505050565b6000815b600181511115611ff35760606002825160010181611ed957fe5b0467ffffffffffffffff81118015611ef057600080fd5b50604051908082528060200260200182016040528015611f1a578160200160208202803683370190505b50905060005b8151811015611feb578251816002026001011015611fb357828160020281518110611f4757fe5b6020026020010151838260020260010181518110611f6157fe5b6020026020010151604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120828281518110611fa257fe5b602002602001018181525050611fe3565b828160020281518110611fc257fe5b6020026020010151828281518110611fd657fe5b6020026020010181815250505b600101611f20565b509050611ebf565b8060008151811061200057fe5b6020026020010151915050919050565b60408051602080820198909852808201969096526060860194909452608085019290925260a084015260c0808401919091528151808403909101815260e09092019052805191012090565b60405180608001604052806004906020820280368337509192915050565b8280548282559060005260206000209081019282156120cc579160200282015b828111156120cc5781546001600160a01b0319166001600160a01b03843516178255602090920191600190910190612099565b506120d8929150612124565b5090565b82600281019282156120cc579160200282015b828111156120cc57825182546001600160a01b0319166001600160a01b039091161782556020909201916001909101906120ef565b61066891905b808211156120d85780546001600160a01b031916815560010161212a56fea264697066735822122004e3428e1101f2e9ca875b69bcd83c6c08a8ff949a012ca33e2e16dfff5819f564736f6c634300060b0033608060405234801561001057600080fd5b506040516105d13803806105d18339818101604052602081101561003357600080fd5b505160006100486001600160e01b036100aa16565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506100a4816001600160e01b036100ae16565b50610124565b3390565b6100c18161011e60201b61034c1760201c565b6100fc5760405162461bcd60e51b815260040180806020018281038252603381526020018061059e6033913960400191505060405180910390fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b3b151590565b61046b806101336000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633659cfe61461005c5780635c60da1b14610084578063715018a6146100a85780638da5cb5b146100b0578063f2fde38b146100b8575b600080fd5b6100826004803603602081101561007257600080fd5b50356001600160a01b03166100de565b005b61008c610180565b604080516001600160a01b039092168252519081900360200190f35b61008261018f565b61008c61023b565b610082600480360360208110156100ce57600080fd5b50356001600160a01b031661024a565b6100e6610352565b6001600160a01b03166100f761023b565b6001600160a01b031614610140576040805162461bcd60e51b81526020600482018190526024820152600080516020610416833981519152604482015290519081900360640190fd5b61014981610356565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6001546001600160a01b031690565b610197610352565b6001600160a01b03166101a861023b565b6001600160a01b0316146101f1576040805162461bcd60e51b81526020600482018190526024820152600080516020610416833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b610252610352565b6001600160a01b031661026361023b565b6001600160a01b0316146102ac576040805162461bcd60e51b81526020600482018190526024820152600080516020610416833981519152604482015290519081900360640190fd5b6001600160a01b0381166102f15760405162461bcd60e51b81526004018080602001828103825260268152602001806103bd6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3b151590565b3390565b61035f8161034c565b61039a5760405162461bcd60e51b81526004018080602001828103825260338152602001806103e36033913960400191505060405180910390fd5b600180546001600160a01b0319166001600160a01b039290921691909117905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573735570677261646561626c65426561636f6e3a20696d706c656d656e746174696f6e206973206e6f74206120636f6e74726163744f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220e082b44760d7484daad017396b93ce8fb7ce2f11f19db0d8429a61aaedbc6f4564736f6c634300060b00335570677261646561626c65426561636f6e3a20696d706c656d656e746174696f6e206973206e6f74206120636f6e7472616374'

export class ChallengeTester__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(
    _executors: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ChallengeTester> {
    return super.deploy(_executors, overrides || {}) as Promise<ChallengeTester>
  }
  getDeployTransaction(
    _executors: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_executors, overrides || {})
  }
  attach(address: string): ChallengeTester {
    return super.attach(address) as ChallengeTester
  }
  connect(signer: Signer): ChallengeTester__factory {
    return super.connect(signer) as ChallengeTester__factory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): ChallengeTesterInterface {
    return new utils.Interface(_abi) as ChallengeTesterInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChallengeTester {
    return new Contract(address, _abi, signerOrProvider) as ChallengeTester
  }
}
