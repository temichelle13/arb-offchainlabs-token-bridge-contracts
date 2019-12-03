/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, Signer } from 'ethers';
import { Provider } from 'ethers/providers';

import { GlobalPendingInbox } from './GlobalPendingInbox';

export class GlobalPendingInboxFactory {
    static connect(address: string, signerOrProvider: Signer | Provider): GlobalPendingInbox {
        return new Contract(address, _abi, signerOrProvider) as GlobalPendingInbox;
    }
}

const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: '',
                type: 'address',
            },
            {
                name: '_from',
                type: 'address',
            },
            {
                name: '_tokenId',
                type: 'uint256',
            },
            {
                name: '',
                type: 'bytes',
            },
        ],
        name: 'onERC721Received',
        outputs: [
            {
                name: '',
                type: 'bytes4',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'getNFTTokens',
        outputs: [
            {
                name: '',
                type: 'address[]',
            },
            {
                name: '',
                type: 'uint256[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'getTokenBalances',
        outputs: [
            {
                name: '',
                type: 'address[]',
            },
            {
                name: '',
                type: 'uint256[]',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'depositERC20',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'withdrawERC20',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_destination',
                type: 'address',
            },
        ],
        name: 'depositEth',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_value',
                type: 'uint256',
            },
        ],
        name: 'withdrawEth',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_owner',
                type: 'address',
            },
        ],
        name: 'getTokenBalance',
        outputs: [
            {
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_tokenId',
                type: 'uint256',
            },
        ],
        name: 'depositERC721',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_owner',
                type: 'address',
            },
            {
                name: '_tokenId',
                type: 'uint256',
            },
        ],
        name: 'hasNFT',
        outputs: [
            {
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_tokenContract',
                type: 'address',
            },
            {
                name: '_tokenId',
                type: 'uint256',
            },
        ],
        name: 'withdrawERC721',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'vmId',
                type: 'address',
            },
            {
                indexed: false,
                name: 'sender',
                type: 'address',
            },
            {
                indexed: false,
                name: 'tokenType',
                type: 'bytes21',
            },
            {
                indexed: false,
                name: 'value',
                type: 'uint256',
            },
            {
                indexed: false,
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'MessageDelivered',
        type: 'event',
    },
    {
        constant: false,
        inputs: [],
        name: 'pullPendingMessages',
        outputs: [
            {
                name: '',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_messages',
                type: 'bytes',
            },
        ],
        name: 'sendMessages',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [],
        name: 'registerForInbox',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_destination',
                type: 'address',
            },
            {
                name: '_tokenType',
                type: 'bytes21',
            },
            {
                name: '_amount',
                type: 'uint256',
            },
            {
                name: '_data',
                type: 'bytes',
            },
        ],
        name: 'sendMessage',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_destination',
                type: 'address',
            },
            {
                name: '_tokenType',
                type: 'bytes21',
            },
            {
                name: '_amount',
                type: 'uint256',
            },
            {
                name: '_data',
                type: 'bytes',
            },
            {
                name: '_signature',
                type: 'bytes',
            },
        ],
        name: 'forwardMessage',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_destination',
                type: 'address',
            },
            {
                name: '_data',
                type: 'bytes',
            },
        ],
        name: 'sendEthMessage',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                name: '_dest',
                type: 'address',
            },
            {
                name: '_data',
                type: 'bytes32',
            },
            {
                name: '_tokenType',
                type: 'bytes21',
            },
            {
                name: '_value',
                type: 'uint256',
            },
            {
                name: '_sender',
                type: 'address',
            },
        ],
        name: 'generateSentMessageHash',
        outputs: [
            {
                name: '',
                type: 'bytes32',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
