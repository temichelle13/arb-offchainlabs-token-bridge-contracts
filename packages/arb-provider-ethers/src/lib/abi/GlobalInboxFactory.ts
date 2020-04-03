/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { GlobalInbox } from "./GlobalInbox";

export class GlobalInboxFactory extends ContractFactory {
    constructor(signer?: Signer) {
        super(_abi, _bytecode, signer);
    }

    deploy(): Promise<GlobalInbox> {
        return super.deploy() as Promise<GlobalInbox>;
    }
    getDeployTransaction(): UnsignedTransaction {
        return super.getDeployTransaction();
    }
    attach(address: string): GlobalInbox {
        return super.attach(address) as GlobalInbox;
    }
    connect(signer: Signer): GlobalInboxFactory {
        return super.connect(signer) as GlobalInboxFactory;
    }
    static connect(
        address: string,
        signerOrProvider: Signer | Provider
    ): GlobalInbox {
        return new Contract(address, _abi, signerOrProvider) as GlobalInbox;
    }
}

const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "chain",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "messageNum",
                type: "uint256"
            }
        ],
        name: "ContractTransactionMessageDelivered",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "chain",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "erc20",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "messageNum",
                type: "uint256"
            }
        ],
        name: "ERC20DepositMessageDelivered",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "chain",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "erc721",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "messageNum",
                type: "uint256"
            }
        ],
        name: "ERC721DepositMessageDelivered",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "chain",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "messageNum",
                type: "uint256"
            }
        ],
        name: "EthDepositMessageDelivered",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "chain",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "seqNumber",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "TransactionMessageDelivered",
        type: "event"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "getERC20Balance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_erc721",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "getERC721Tokens",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "getEthBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_erc721",
                type: "address"
            },
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256"
            }
        ],
        name: "hasERC721",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "ownedERC20s",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            }
        ],
        name: "ownedERC721s",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_tokenContract",
                type: "address"
            }
        ],
        name: "withdrawERC20",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_erc721",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256"
            }
        ],
        name: "withdrawERC721",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [],
        name: "withdrawEth",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "getInbox",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes",
                name: "_messages",
                type: "bytes"
            }
        ],
        name: "sendMessages",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_chain",
                type: "address"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_seqNumber",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes"
            }
        ],
        name: "sendTransactionMessage",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_chain",
                type: "address"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            }
        ],
        name: "depositEthMessage",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_chain",
                type: "address"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "address",
                name: "_erc20",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256"
            }
        ],
        name: "depositERC20Message",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_chain",
                type: "address"
            },
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "address",
                name: "_erc721",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256"
            }
        ],
        name: "depositERC721Message",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "address",
                name: "_from",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes"
            }
        ],
        name: "forwardContractTransactionMessage",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_to",
                type: "address"
            },
            {
                internalType: "address",
                name: "_from",
                type: "address"
            }
        ],
        name: "forwardEthMessage",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "_chain",
                type: "address"
            },
            {
                internalType: "address[]",
                name: "_tos",
                type: "address[]"
            },
            {
                internalType: "uint256[]",
                name: "_seqNumbers",
                type: "uint256[]"
            },
            {
                internalType: "uint256[]",
                name: "_values",
                type: "uint256[]"
            },
            {
                internalType: "uint256[]",
                name: "_messageLengths",
                type: "uint256[]"
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes"
            },
            {
                internalType: "bytes",
                name: "_signatures",
                type: "bytes"
            }
        ],
        name: "deliverTransactionBatch",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }
];

const _bytecode =
    "0x608060405234801561001057600080fd5b50612a15806100206000396000f3fe6080604052600436106101095760003560e01c80638f5ed73e11610095578063c3a8962c11610064578063c3a8962c14610527578063d4ce811a14610562578063e4eb8c63146108b0578063f3e414f81461092b578063f4f3b2001461096457610109565b80638f5ed73e146103fb57806396588a271461049b578063a0ef91df146104c9578063bca22b76146104de57610109565b80634d2301cc116100dc5780634d2301cc1461026f5780635bd21290146102b45780636e2b89c5146102e457806384cb7997146103175780638b7010aa146103b257610109565b8063022016811461010e5780630758fb0a1461015a57806333f2ac42146101e557806345a53f0914610218575b600080fd5b34801561011a57600080fd5b506101416004803603602081101561013157600080fd5b50356001600160a01b0316610997565b6040805192835260208301919091528051918290030190f35b34801561016657600080fd5b506101956004803603604081101561017d57600080fd5b506001600160a01b03813581169160200135166109ba565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d15781810151838201526020016101b9565b505050509050019250505060405180910390f35b3480156101f157600080fd5b506101956004803603602081101561020857600080fd5b50356001600160a01b0316610a80565b34801561022457600080fd5b5061025b6004803603606081101561023b57600080fd5b506001600160a01b03813581169160208101359091169060400135610b43565b604080519115158252519081900360200190f35b34801561027b57600080fd5b506102a26004803603602081101561029257600080fd5b50356001600160a01b0316610bc3565b60408051918252519081900360200190f35b6102e2600480360360408110156102ca57600080fd5b506001600160a01b0381358116916020013516610bde565b005b3480156102f057600080fd5b506101956004803603602081101561030757600080fd5b50356001600160a01b0316610bf7565b34801561032357600080fd5b506102e26004803603608081101561033a57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b81111561037457600080fd5b82018360208201111561038657600080fd5b803590602001918460018302840111600160201b831117156103a757600080fd5b509092509050610cae565b3480156103be57600080fd5b506102e2600480360360808110156103d557600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135610cf8565b34801561040757600080fd5b506102e2600480360360a081101561041e57600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561045d57600080fd5b82018360208201111561046f57600080fd5b803590602001918460018302840111600160201b8311171561049057600080fd5b509092509050610d16565b6102e2600480360360408110156104b157600080fd5b506001600160a01b0381358116916020013516610d62565b3480156104d557600080fd5b506102e2610d77565b3480156104ea57600080fd5b506102e26004803603608081101561050157600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135610dc2565b34801561053357600080fd5b506102a26004803603604081101561054a57600080fd5b506001600160a01b0381358116916020013516610dda565b34801561056e57600080fd5b506102e2600480360360e081101561058557600080fd5b6001600160a01b038235169190810190604081016020820135600160201b8111156105af57600080fd5b8201836020820111156105c157600080fd5b803590602001918460208302840111600160201b831117156105e257600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561063157600080fd5b82018360208201111561064357600080fd5b803590602001918460208302840111600160201b8311171561066457600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156106b357600080fd5b8201836020820111156106c557600080fd5b803590602001918460208302840111600160201b831117156106e657600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561073557600080fd5b82018360208201111561074757600080fd5b803590602001918460208302840111600160201b8311171561076857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156107b757600080fd5b8201836020820111156107c957600080fd5b803590602001918460018302840111600160201b831117156107ea57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561083c57600080fd5b82018360208201111561084e57600080fd5b803590602001918460018302840111600160201b8311171561086f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610e43945050505050565b3480156108bc57600080fd5b506102e2600480360360208110156108d357600080fd5b810190602081018135600160201b8111156108ed57600080fd5b8201836020820111156108ff57600080fd5b803590602001918460018302840111600160201b8311171561092057600080fd5b509092509050611003565b34801561093757600080fd5b506102e26004803603604081101561094e57600080fd5b506001600160a01b0381351690602001356110c7565b34801561097057600080fd5b506102e26004803603602081101561098757600080fd5b50356001600160a01b031661118b565b6001600160a01b0316600090815260036020526040902080546001909101549091565b6001600160a01b0380821660009081526002602090815260408083209386168352908390529020546060919080610a035750506040805160008152602081019091529050610a7a565b816001016001820381548110610a1557fe5b9060005260206000209060030201600201805480602002602001604051908101604052809291908181526020018280548015610a7057602002820191906000526020600020905b815481526020019060010190808311610a5c575b5050505050925050505b92915050565b6001600160a01b038116600090815260026020908152604091829020600181015483518181528184028101909301909352606092909183918015610ace578160200160208202803883390190505b50805190915060005b81811015610b3957836001018181548110610aee57fe5b600091825260209091206003909102015483516001600160a01b0390911690849083908110610b1957fe5b6001600160a01b0390921660209283029190910190910152600101610ad7565b5090949350505050565b6001600160a01b03808316600090815260026020908152604080832093871683529083905281205490919080610b7e57600092505050610bbc565b816001016001820381548110610b9057fe5b906000526020600020906003020160010160008581526020019081526020016000205460001415925050505b9392505050565b6001600160a01b031660009081526020819052604090205490565b610be782611258565b610bf382823334611277565b5050565b6001600160a01b03811660009081526001602081815260409283902091820154835181815281830281019092019093526060928391908015610c43578160200160208202803883390190505b50805190915060005b81811015610b3957836001018181548110610c6357fe5b600091825260209091206002909102015483516001600160a01b0390911690849083908110610c8e57fe5b6001600160a01b0390921660209283029190910190910152600101610c4c565b610cf13386868686868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061131592505050565b5050505050565b610d0382858361141f565b610d10848433858561149b565b50505050565b610d5a868633878787878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061153492505050565b505050505050565b610d6b33611258565b610bf333838334611277565b6000610d8233610bc3565b3360008181526020819052604080822082905551929350909183156108fc0291849190818181858888f19350505050158015610bf3573d6000803e3d6000fd5b610dcd8285836115db565b610d108484338585611668565b6001600160a01b03808216600090815260016020908152604080832093861683529083905281205490919080610e1557600092505050610a7a565b816001016001820381548110610e2757fe5b9060005260206000209060020201600101549250505092915050565b855185516000908214610e92576040805162461bcd60e51b81526020600482015260126024820152710eee4dedcce40d2dce0eae840d8cadccee8d60731b604482015290519081900360640190fd5b81865114610edc576040805162461bcd60e51b81526020600482015260126024820152710eee4dedcce40d2dce0eae840d8cadccee8d60731b604482015290519081900360640190fd5b81855114610f26576040805162461bcd60e51b81526020600482015260126024820152710eee4dedcce40d2dce0eae840d8cadccee8d60731b604482015290519081900360640190fd5b6001600160a01b0389166000908152600360205260408120805490915b84811015610feb576000888281518110610f5957fe5b602002602001015190506060610f7a86838b6117019092919063ffffffff16565b905081860195506000610fce8f8f8681518110610f9357fe5b60200260200101518f8781518110610fa757fe5b60200260200101518f8881518110610fbb57fe5b6020026020010151868e8a604102611781565b9050610fda858261192f565b94505060019092019150610f439050565b50815560010180549092019091555050505050505050565b6000808080845b808410156110be5761105387878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525088925061195b915050565b9297509095509350915084611067576110be565b6110aa87878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250889250879150611a1d9050565b9095509350846110b9576110be565b61100a565b50505050505050565b6110d2338383611b21565b611123576040805162461bcd60e51b815260206004820152601860248201527f57616c6c657420646f65736e2774206f776e20746f6b656e0000000000000000604482015290519081900360640190fd5b60408051632142170760e11b81523060048201523360248201526044810183905290516001600160a01b038416916342842e0e91606480830192600092919082900301818387803b15801561117757600080fd5b505af1158015610d5a573d6000803e3d6000fd5b60006111978233610dda565b90506111a4338383611d89565b6111df5760405162461bcd60e51b815260040180806020018281038252602e8152602001806129b3602e913960400191505060405180910390fd5b6040805163a9059cbb60e01b81523360048201526024810183905290516001600160a01b0384169163a9059cbb9160448083019260209291908290030181600087803b15801561122e57600080fd5b505af1158015611242573d6000803e3d6000fd5b505050506040513d6020811015610d1057600080fd5b6001600160a01b03166000908152602081905260409020805434019055565b6001600160a01b038416600090815260036020526040812060019081015401906112a48585854386611f1c565b90506112b08682611f87565b336001600160a01b0316856001600160a01b0316876001600160a01b03167ffd0d0553177fec183128f048fbde54554a3a67302f7ebd7f735215a3582907053486604051808381526020018281526020019250505060405180910390a4505050505050565b6001600160a01b03851660009081526003602052604081206001908101540190611343868686864387611fbd565b905061134f8782611f87565b846001600160a01b0316866001600160a01b0316886001600160a01b03167f362b3acbdbf0277aefa83754ea8d39fc1c55d01d9351cf78969923f8cfee612c8787876040518084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156113da5781810151838201526020016113c2565b50505050905090810190601f1680156114075780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a450505050505050565b604080516323b872dd60e01b81523360048201523060248201526044810183905290516001600160a01b038516916323b872dd91606480830192600092919082900301818387803b15801561147357600080fd5b505af1158015611487573d6000803e3d6000fd5b50505050611496828483612091565b505050565b6001600160a01b038516600090815260036020526040812060019081015401906114c9868686864387612215565b90506114d58782611f87565b604080516001600160a01b0386811682526020820186905281830185905291518288169289811692908b16917f40baf11a4a4a4be2a155dbf303fbaec6fabd52e267268bd7e3de4b4ed8a2e0959181900360600190a450505050505050565b600061154587878787878743612232565b90506115518782611f87565b846001600160a01b0316866001600160a01b0316886001600160a01b03167fcf612c95e8993eca9c6e0be96b26b47022996db601dc12b4cf68ec37829d87b3878787604051808481526020018381526020018060200182810382528381815181526020019150805190602001908083836000838110156113da5781810151838201526020016113c2565b604080516323b872dd60e01b81523360048201523060248201526044810183905290516001600160a01b038516916323b872dd9160648083019260209291908290030181600087803b15801561163057600080fd5b505af1158015611644573d6000803e3d6000fd5b505050506040513d602081101561165a57600080fd5b506114969050828483612327565b6001600160a01b038516600090815260036020526040812060019081015401906116968686868643876123fe565b90506116a28782611f87565b604080516001600160a01b0386811682526020820186905281830185905291518288169289811692908b16917fb13d04085b4a9f87fecfccf9b72081bb8a273498d6b08b4bccf2940d555b5e609181900360600190a450505050505050565b60608183018451101561171357600080fd5b60608215801561172e57604051915060208201604052611778565b6040519150601f8416801560200281840101858101878315602002848b0101015b8183101561176757805183526020928301920161174f565b5050858452601f01601f1916604052505b50949350505050565b600080611846898989898960405160200180866001600160a01b03166001600160a01b031660601b8152601401856001600160a01b03166001600160a01b031660601b815260140184815260200183815260200182805190602001908083835b602083106118005780518252601f1990920191602091820191016117e1565b6001836020036101000a03801982511681845116808217855250505050505090500195505050505050604051602081830303815290604052805190602001208585612410565b905060006118598a8a848b8b8b43612232565b9050816001600160a01b0316896001600160a01b03168b6001600160a01b03167fcf612c95e8993eca9c6e0be96b26b47022996db601dc12b4cf68ec37829d87b38b8b8b6040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156118e65781810151838201526020016118ce565b50505050905090810190601f1680156119135780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a49998505050505050505050565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b60008060008060008060008088905060008a828151811061197857fe5b016020015160019092019160f81c9050600681146119a8575060009750889650879550859450611a149350505050565b6119b28b83612543565b9196509094509150846119d7575060009750889650879550859450611a149350505050565b6119e18b83612543565b919650909350915084611a06575060009750889650879550859450611a149350505050565b506001975095509093509150505b92959194509250565b6000806001831415611a7257600080600080611a3989896125bb565b935093509350935083611a56576000889550955050505050611b19565b611a61338383612608565b506001839550955050505050611b19565b6002831415611acb576000806000806000611a8d8a8a612666565b9450945094509450945084611aad57600089965096505050505050611b19565b611ab93383858461276d565b50600184965096505050505050611b19565b6003831415611b12576000806000806000611ae68a8a612666565b9450945094509450945084611b0657600089965096505050505050611b19565b611ab93383858461279d565b5060009050825b935093915050565b6001600160a01b03808416600090815260026020908152604080832093861683529083905281205490919080611b5c57600092505050610bbc565b6000826001016001830381548110611b7057fe5b600091825260208083208884526001600390930201918201905260409091205490915080611ba5576000945050505050610bbc565b60028201805482916001850191600091906000198101908110611bc457fe5b600091825260208083209091015483528201929092526040019020556002820180546000198101908110611bf457fe5b9060005260206000200154826002016001830381548110611c1157fe5b600091825260208083209091019290925587815260018401909152604081205560028201805480611c3e57fe5b6000828152602081208201600019908101919091550190556002820154611d7b5760018401805484918691600091906000198101908110611c7b57fe5b600091825260208083206003909202909101546001600160a01b031683528201929092526040019020556001840180546000198101908110611cb957fe5b9060005260206000209060030201846001016001850381548110611cd957fe5b60009182526020909120825460039092020180546001600160a01b0319166001600160a01b0390921691909117815560028083018054611d1c92840191906128e9565b5050506001600160a01b03871660009081526020859052604081205560018401805480611d4557fe5b60008281526020812060036000199093019283020180546001600160a01b031916815590611d766002830182612939565b505090555b506001979650505050505050565b600081611d9857506001610bbc565b6001600160a01b03808516600090815260016020908152604080832093871683529083905290205480611dd057600092505050610bbc565b6000826001016001830381548110611de457fe5b906000526020600020906002020190508060010154851115611e0c5760009350505050610bbc565b60018101805486900390819055611f0f5760018301805483918591600091906000198101908110611e3957fe5b600091825260208083206002909202909101546001600160a01b031683528201929092526040019020556001830180546000198101908110611e7757fe5b9060005260206000209060020201836001016001840381548110611e9757fe5b60009182526020808320845460029093020180546001600160a01b0319166001600160a01b0393841617815560019485015490850155908916825285905260408120558301805480611ee557fe5b60008281526020812060026000199093019283020180546001600160a01b03191681556001015590555b5060019695505050505050565b60408051600160f81b6020808301919091526bffffffffffffffffffffffff19606089811b8216602185015288901b166035830152604982018690526069820185905260898083018590528351808403909101815260a9909201909252805191012095945050505050565b6001600160a01b03821660009081526003602052604090208054611fab908361192f565b81556001908101805490910190555050565b60006004878787878787604051602001808860ff1660ff1660f81b8152600101876001600160a01b03166001600160a01b031660601b8152601401866001600160a01b03166001600160a01b031660601b815260140185815260200184805190602001908083835b602083106120445780518252601f199092019160209182019101612025565b51815160209384036101000a600019018019909216911617905292019485525083810192909252506040805180840383018152928101905281519101209c9b505050505050505050505050565b6001600160a01b03808416600090815260026020908152604080832093861683529083905290205480612151576040805180820182526001600160a01b0386811682528251600080825260208083019095528484019182526001878101805491820180825590835291869020855160039092020180546001600160a01b031916919094161783559051805191946121309260028501929091019061295a565b5050506001600160a01b038516600090815260208490526040902081905590505b600082600101600183038154811061216557fe5b90600052602060002090600302019050806001016000858152602001908152602001600020546000146121df576040805162461bcd60e51b815260206004820152601d60248201527f63616e27742061646420616c7265616479206f776e656420746f6b656e000000604482015290519081900360640190fd5b60028101805460018181018355600083815260208082209093018890559254968352909201909152604090209290925550505050565b600061222760038888888888886127c1565b979650505050505050565b60008088888888888888604051602001808960ff1660ff1660f81b8152600101886001600160a01b03166001600160a01b031660601b8152601401876001600160a01b03166001600160a01b031660601b8152601401866001600160a01b03166001600160a01b031660601b815260140185815260200184815260200183805190602001908083835b602083106122da5780518252601f1990920191602091820191016122bb565b51815160001960209485036101000a019081169019919091161790529201938452506040805180850381529382019052825192019190912098505050505050505050979650505050505050565b8061233157611496565b6001600160a01b038084166000908152600160209081526040808320938616835290839052902054806123ca57506040805180820182526001600160a01b0385811680835260006020808501828152600188810180548083018083559186528486209851600290910290980180546001600160a01b03191698909716979097178655905194019390935590815290849052919091208190555b828260010160018303815481106123dd57fe5b60009182526020909120600160029092020101805490910190555050505050565b600061222760028888888888886127c1565b60008060008060606040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600081896040516020018083805190602001908083835b602083106124865780518252601f199092019160209182019101612467565b51815160209384036101000a60001901801990921691161790529201938452506040805180850381529382019052825192019190912092506124cc91508990508861283f565b6040805160008152602080820180845287905260ff8616828401526060820185905260808201849052915194995092975090955060019260a080840193601f198301929081900390910190855afa15801561252b573d6000803e3d6000fd5b5050604051601f1901519a9950505050505050505050565b600080600080855190508481108061255d57506021858203105b8061257f5750600060ff1686868151811061257457fe5b016020015160f81c14155b156125945750600092508391508290506125b4565b6001602186016125ac8888840163ffffffff6128cd16565b935093509350505b9250925092565b60008060008060008060008088905060008a82815181106125d857fe5b016020015160019092019160f81c9050600581146119a8575060009750889650879550859450611a149350505050565b6001600160a01b03831660009081526020819052604081205482111561263057506000610bbc565b506001600160a01b0392831660009081526020819052604080822080548490039055929093168352912080549091019055600190565b6000806000806000806000806000808a905060008c828151811061268657fe5b016020015160019092019160f81c9050600681146126ba5750600099508a9850899750879650869550612763945050505050565b6126c48d83612543565b9197509095509150856126ed5750600099508a9850899750879650869550612763945050505050565b6126f78d83612543565b9197509094509150856127205750600099508a9850899750879650869550612763945050505050565b61272a8d83612543565b9197509093509150856127535750600099508a9850899750879650869550612763945050505050565b5060019950975091955093509150505b9295509295909350565b600061277a858484611d89565b61278657506000612795565b612791848484612327565b5060015b949350505050565b60006127aa858484611b21565b6127b657506000612795565b612791848484612091565b6040805160f89890981b6001600160f81b0319166020808a0191909152606097881b6bffffffffffffffffffffffff1990811660218b015296881b871660358a01529490961b9094166049870152605d860191909152607d850152609d808501929092528251808503909201825260bd909301909152805191012090565b604180820283810160208101516040820151919093015160ff169291601b84101561286b57601b840193505b8360ff16601b148061288057508360ff16601c145b6128c5576040805162461bcd60e51b8152602060048201526011602482015270496e636f727265637420762076616c756560781b604482015290519081900360640190fd5b509250925092565b600081602001835110156128e057600080fd5b50016020015190565b8280548282559060005260206000209081019282156129295760005260206000209182015b8281111561292957825482559160010191906001019061290e565b50612935929150612995565b5090565b50805460008255906000526020600020908101906129579190612995565b50565b828054828255906000526020600020908101928215612929579160200282015b8281111561292957825182559160200191906001019061297a565b6129af91905b80821115612935576000815560010161299b565b9056fe57616c6c657420646f65736e2774206f776e2073756666696369656e742062616c616e6365206f6620746f6b656ea265627a7a7231582083c69cff426b2754f95a2746d5b5ed85086b0c9aaaf13769d0df5f8df60b3d3b64736f6c634300050f0032";
