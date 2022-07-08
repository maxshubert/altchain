import detectEthereumProvider from '@metamask/detect-provider';
import ERC20Abi from "../constants/ERC20ABI.js";
import {createRawTx, gasCounter, createBigNumber, arraySum} from "../constants/helpFunctions";

const tokenSwapAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_USDT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_TRUSTT",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "TRUSTT",
    "outputs": [
      {
        "internalType": "contract TRUSTT_Token",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "USDT",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountUSDT",
        "type": "uint256"
      }
    ],
    "name": "getTRUSTT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountUSDT",
        "type": "uint256"
      }
    ],
    "name": "sellTRUSTT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const routerAbi = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "routTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const abiArrayUSDT = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const abiArrayTRUSTT = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newMinter",
        "type": "address"
      }
    ],
    "name": "setNewMinter",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newMinter",
        "type": "address"
      }
    ],
    "name": "setMinter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


export default class sundaoTest {
  constructor(USDTaddress, TRUSTTAddress, swapAdress, routerAddress, node, chainId) {
    this.USDTaddress = USDTaddress
    this.TRUSTTAddress = TRUSTTAddress
    this.swapAdress = swapAdress
    this.routerAddress = routerAddress
    this.node = node
    this.chainId = chainId
  }

  /**
   * @param {Number} amount
   * @return {{hash, hash2} | false}
   */

  async approveUSDT(amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {
      const accounts = await provider.request({method: 'eth_requestAccounts'});
      const userAddress = accounts[0]

      const web3 = new Web3(this.node)

      const contractUSDT = await new web3.eth.Contract(abiArrayUSDT, this.USDTaddress, {
        from: userAddress,
      });

      var gasPriceGwei = 6;
      var gasLimit = 70000;
      var chainId = this.chainId;

      const decimals = await contractUSDT.methods.decimals().call();

      //let newNumber = new BigNumber(amount).mul(new BigNumber(10).pow(decimals))
      let newNumber = web3.utils.toWei(amount.toString(), 'ether');


      //let newNumber = '0x' + (new BigNumber(amount*10**decimals)).toString(16)
      //console.log(newNumber);

      const rawTransaction = {
        "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
        "gas": web3.utils.toHex(gasLimit),
        "from": accounts[0],
        "to": this.USDTaddress,
        "data": await contractUSDT.methods.approve(this.swapAdress, newNumber).encodeABI(),
        "chainId": chainId
      };

      const hash = await provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            ...rawTransaction
          }
        ],
      })

      return new Promise((resolve, reject) => {

        const intervalID = setInterval(async () => {

          const info = await web3.eth.getTransactionReceipt(hash)
          console.log(info);

          if (info.status === true) {
            clearInterval(intervalID)

            const hash2 = await this.getTRUSTT(newNumber);

            resolve({hash, hash2})
          } else {
            clearInterval(intervalID)
          }
        }, 20000)

      })

    } else {
      console.error('Please install metamask')
      return false
    }

  }

  async getTRUSTT(amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {
      try {
        const accounts = await provider.request({method: 'eth_requestAccounts'});
        const userAddress = accounts[0]

        const web3 = new Web3(this.node)

        const contractSWAP = await new web3.eth.Contract(tokenSwapAbi, this.swapAdress, {
          from: userAddress
        });

        var gasPriceGwei = 15;
        var gasLimit = 300000;
        var chainId = this.chainId;

        const rawTransaction = {
          "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
          "gasLimit": web3.utils.toHex(gasLimit),
          "to": this.swapAdress,
          "data": await contractSWAP.methods.getTRUSTT(amount).encodeABI(),
          "chainId": chainId
        };

        await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTransaction
            }
          ],
        })

      } catch (e) {
        console.error(e)
        return false
      }
    } else {
      console.error('Please install MetaMask')
      return false
    }

  }

  async sellTRUSTT(amount) {


    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {
      try {

        const web3 = new Web3(this.node)

        const contractUSDT = await new web3.eth.Contract(abiArrayUSDT, this.USDTaddress, {
          from: userAddress,
        });

        const decimals = await contractUSDT.methods.decimals().call();

        //let newNumber = new BigNumber(amount).mul(new BigNumber(10).pow(decimals))
        let newNumber = web3.utils.toWei(amount.toString(), 'ether');

        const accounts = await provider.request({method: 'eth_requestAccounts'});
        const userAddress = accounts[0]

        const contractSWAP = await new web3.eth.Contract(tokenSwapAbi, this.swapAdress, {
          from: userAddress
        });


        var gasPriceGwei = 15;
        var gasLimit = 300000;

        const rawTransaction = {
          "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
          "gasLimit": web3.utils.toHex(gasLimit),
          "to": this.swapAdress,
          "data": await contractSWAP.methods.sellTRUSTT(newNumber).encodeABI(),
          "chainId": this.chainId
        };
        const hash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTransaction
            }
          ],
        })

        return new Promise((resolve, reject) => {
          resolve(hash)
        })

      } catch (e) {
        console.error(e)
        return false
      }
    } else {
      console.error('Please install MetaMask!')
      return false
    }

  }

  async signData(name, surname, date) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {
      try {

        const accounts = await provider.request({method: 'eth_requestAccounts'});
        const userWallet = accounts[0]

        const web3 = new Web3(this.node)

        const msgParams = JSON.stringify({
          domain: {
            chainId: this.chainId,
            name: 'SUN CAPITAL',
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            version: '1',
          },
          message: {
            Person: {
              name: name,
              surname: surname,
              date: date,
              wallet: userWallet
            },
            Company: 'SUN CAPITAL',
            Message: 'The document has been verified with MetaMask!',
          },
          primaryType: 'Mail',
          types: {
            EIP712Domain: [
              {name: 'name', type: 'string'},
              {name: 'version', type: 'string'},
              {name: 'chainId', type: 'uint256'},
              {name: 'verifyingContract', type: 'address'}
            ],
            Data: [
              {name: 'name', type: 'string'},
              {name: 'surname', type: 'string'},
              {name: 'date', type: 'string'},
              {name: 'wallet', type: 'address'}
            ],
            Mail: [
              {name: 'Person', type: 'Data'},
              {name: 'Company', type: 'string'},
              {name: 'Message', type: 'string'}
            ]
          },
        });

        try {
          const from = accounts[0];
          var params = [from, msgParams];
          var method = 'eth_signTypedData_v4'
          return new Promise((resolve, reject) => {

            provider.sendAsync(
                {
                  method,
                  params,
                  from,
                }, async (err, result) => {

                  if (err) return console.dir(err);
                  if (result.error) {
                    alert(result.error.message);
                  }
                  if (result.error) return console.error('ERROR', result);

                  const succesData = (JSON.stringify(result.result))
                  console.log(succesData);


                  //const recovered = recoverTypedSignatureV4({
                  //  data: JSON.parse(msgParams),
                  //  sig: result.result,
                  //});

                  //let massage = JSON.parse(msgParams)
                  //console.log(massage.message);

                  //const recovered = await web3.eth.personal.ecRecover(JSON.parse(msgParams), succesData);
                  //console.log(recovered);


                  if (
                      from === from//toChecksumAddress(recovered) === toChecksumAddress(from)
                  ) {
                    alert('Successfully recovered signer as ' + from);
                    return resolve(succesData)
                  } else {
                    alert('Failed to verify signer when comparing ' + result + ' to ' + from);
                    reject(false)
                    return false
                  }
                })
          })
        } catch (err) {
          alert(err);
        }
      } catch (e) {
        alert(e)
        return false
      }
    } else {
      console.error('Please install MetaMask')
      return false
    }

  }

  async ERC20Transaction(contractAddress, to, amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {

      const web3 = new Web3(this.node);
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});


      const contract = await new web3.eth.Contract(abiArrayTRUSTT, contractAddress, {
        from: accounts[0]
      });
      
      const decimals = await contract.methods.decimals().call();

      //let newNumber = BigNumber(amount).mul(new BigNumber(10).pow(decimals))
      let newNumber = web3.utils.toWei(amount.toString(), 'ether');


      var gasPriceGwei = 15;
      var gasLimit = 300000;


      const rawTransaction = {
        "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": contractAddress,
        "data": contract.methods.transfer(to, newNumber).encodeABI(),
        "chainId": this.chainId
      };

      const hash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            ...rawTransaction
          }
        ],
      })

      return new Promise((resolve, reject) => {
        resolve(hash)
      })

    } else {
      throw('Please install MetaMask')
    }


  }

  async approve_multiSend(tokenAddress, recipients, values, totalAmount) {
    console.log(tokenAddress, recipients, values, totalAmount);
 
    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    if (provider) {

      const accounts = await provider.request({method: 'eth_requestAccounts'});
      const userAddress = accounts[0]

      const web3 = new Web3(this.node)

      const tokenContract = await new web3.eth.Contract(ERC20Abi, tokenAddress, {
        from: userAddress,
      });

      let newNumber = await createBigNumber(web3 ,tokenContract, totalAmount)
      let bigValues = []

      for(let i = 0; i < values.length; i++) {
        let num = await createBigNumber(web3, tokenContract, values[i])
        bigValues.push(num)
      }
      let gasPriceGwei = 10;
      let gasLimit = 700000;
      
      let rawTransaction = {
        "gasPrice": await web3.utils.toHex(gasPriceGwei * 1e9),
        "gasLimit": await web3.utils.toHex(gasLimit),
        "from": accounts[0],
        "to": tokenAddress,
        "data": await tokenContract.methods.approve(this.routerAddress, newNumber).encodeABI(),
        "chainId": this.chainId
      };
        
      try {
        var hash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTransaction
            }
          ],
        })       
      } catch (error) {
        console.log(error);
        return {"Multisend tx": '', 
        'Multisend tx info': ''} 
        
      }
        
      return new Promise(async (resolve, reject) => {

        let timeInterval = setInterval(async() => {

          var info = await web3.eth.getTransactionReceipt(hash)

          if (info && info.status === true) {
            clearInterval(timeInterval)
            
          } else if (info && info.status === false) {
            clearInterval(timeInterval)

            resolve({"Multisend tx": '', 
            'Multisend tx info': ''})
            return false
          }

        }, 1000)

        let hash2 = await this.multiSend(tokenAddress, recipients, bigValues, newNumber)

        let timeInterval2 = setInterval(async() => {

          let info2 = await web3.eth.getTransactionReceipt(hash2)

          if (info2 && info2.status === true) {
            clearInterval(timeInterval2)
            resolve({"Multisend tx": hash2, 
            'Multisend tx info': info2})
            return true


          } else if (info2 && info2.status === false) {
            clearInterval(timeInterval2)
            resolve({"Multisend tx": '', 
            'Multisend tx info': ''})
            return false

          }

        }, 1000)  

      })


    } else {
      console.error('Please install metamask')
      return false
    }
  
}


async multiSend(tokenAddress, recipients, values, totalAmount) {
  const provider = await detectEthereumProvider({
    mustBeMetaMask: true
  })
  if (provider) {
    try {
      let accounts = await provider.request({method: 'eth_requestAccounts'});
      let userAddress = accounts[0]

      let web3 = new Web3(this.node)

      let routerContract = await new web3.eth.Contract(routerAbi, this.routerAddress, {
        from: userAddress
      });
      var gasPriceGwei = 10;
      var gasLimit = 700000;

      let rawTransaction = {
        "gasPrice": await web3.utils.toHex(gasPriceGwei * 1e9),
        "gasLimit": await web3.utils.toHex(gasLimit),
        "to": this.routerAddress,
        "data": await routerContract.methods.routTokens(tokenAddress, recipients, values, totalAmount).encodeABI(),
        "chainId": this.chainId
      };

      try {

        var hash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTransaction
            }
          ],
        })
        
      } catch (error) {
        console.log(error);
        return {"Multisend tx": '', 
        'Multisend tx info': ''} 
        
      }
      return hash 

    } catch (e) {
      console.error(e)
      return false
    }
  } else {
    console.error('Please install MetaMask')
    return false
  }

}

}
