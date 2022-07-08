import detectEthereumProvider from '@metamask/detect-provider';
import {createRawTx, gasCounter, createBigNumber, arraySum} from "../constants/helpFunctions";
import ERC20Abi from '../constants/ERC20ABI';
import tokenSwapAbi from '../constants/TokenSwapABI.js';
import routerAbi from '../constants/RouterABI';
import abiArrayUSDT from '../constants/USDTABI';
import abiArrayEGOIZM from '../constants/EGOIZMABI';


export default class egoizm {
  constructor(USDTaddress, EGOIZMAddress, swapAdress, routerAddress, node, chainId) {
    this.USDTaddress = USDTaddress
    this.EGOIZMAddress = EGOIZMAddress
    this.swapAdress = swapAdress
    this.routerAddress = routerAddress
    this.node = node
    this.chainId = chainId
  }

  async setNet() {
    if (window.ethereum.networkVersion !== this.chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(this.chainId) }]
        });
      } catch (err) {
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'BSC Mainnet',
                chainId: Web3.utils.toHex(this.chainId),
                nativeCurrency: { name: 'Binance Chain Native Token', decimals: 18, symbol: 'BNB'},
                rpcUrls: 'https://bsc-dataseed.binance.org/'
              }
            ]
          });
        }
      }
    }
  }
  /**
   * @param {Number} amount
   * @return {{hash, hash2} | false}
   */

  async approveUSDT(amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    await this.setNet()
    if (provider) {
      const accounts = await provider.request({method: 'eth_requestAccounts'});
      const userAddress = accounts[0]

      const web3 = new Web3(this.node)

      const contractUSDT = await new web3.eth.Contract(
        abiArrayUSDT,
        this.USDTaddress,
        {
            from: userAddress,
        }
      );

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

            const hash2 = await this.getEGOIZM(newNumber);

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

  async getEGOIZM(amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    await this.setNet()
    if (provider) {
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
          "data": await contractSWAP.methods.getEGOIZM(amount).encodeABI(),
          "chainId": chainId
        };

        let hash = await provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              ...rawTransaction
            }
          ],
        })

        return hash
    } else {
      console.error('Please install MetaMask')
      return false
    }

  }

  async sellEGOIZM(amount) {

    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
    })
    await this.setNet()
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
          "data": await contractSWAP.methods.sellEGOIZM(newNumber).encodeABI(),
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

  async approve_multiSend(tokenAddress, recipients, values, totalAmount) {
    console.log(tokenAddress, recipients, values, totalAmount);
    const provider = await detectEthereumProvider({
        mustBeMetaMask: true
    })
    await this.setNet()
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
            return {
                "Multisend tx": '', 
                'Multisend tx info': ''
            } 
        }
        
        return new Promise(async (resolve, reject) => {

            let timeInterval = setInterval(async() => {
                var info = await web3.eth.getTransactionReceipt(hash)

                if (info && info.status === true) {
                    clearInterval(timeInterval)
                } else if (info && info.status === false) {
                    clearInterval(timeInterval)
                    resolve({
                        "Multisend tx": '', 
                        'Multisend tx info': ''
                    })
                    return false
                }
            }, 1000)

            let hash2 = await this.multiSend(tokenAddress, recipients, bigValues, newNumber)
            let timeInterval2 = setInterval(async() => {
                let info2 = await web3.eth.getTransactionReceipt(hash2)
                if (info2 && info2.status === true) {
                    clearInterval(timeInterval2)
                    resolve({
                        "Multisend tx": hash2, 
                        'Multisend tx info': info2
                    })
                    return true
                } else if (info2 && info2.status === false) {
                    clearInterval(timeInterval2)
                    resolve({
                        "Multisend tx": '', 
                        'Multisend tx info': ''
                    })
                    return false
                }
            }, 1000)  
        })
    } else {
      console.error('Please install metamask')
      return false
    }
  }

  async addCustomToken(tokenAddress, tokenSymbol, tokenDecimals) {
    await this.setNet()
    try {
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals
            },
          },
        });
      
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error);
      }
  }
  
  async multiSend(tokenAddress, recipients, values, totalAmount) {
  const provider = await detectEthereumProvider({
    mustBeMetaMask: true
  })
  await this.setNet()
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
