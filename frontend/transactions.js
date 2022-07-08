//const NFTabi = require('../constants/NFTABI')
const detectEthereumProvider = require('@metamask/detect-provider');
import ERC20abi from '../constants/ERC20ABI'

export default class transaction {
	constructor(node, chainId) {
		this.node = node
		this.chainId = chainId
	}
  //ethereum like blockchains (BSC, MATIC, ETH)
  
  async ERC20Transaction(contractAddress, to, amount) {

      const provider = await detectEthereumProvider({ 
        mustBeMetaMask: true 
      }) 
        if (provider) { 
          try { 
        
            const web3 = new Web3(this.node);
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); 


            const contract = await new web3.eth.Contract(ERC20abi, contractAddress, {
                from: accounts[0] 
            });
            const decimals = await contract.methods.decimals().call();

            var gasPriceGwei = 15;
            var gasLimit = 300000;

            const rawTransaction = {
                "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
                "gasLimit": web3.utils.toHex(gasLimit),
                "to": contractAddress,
                "data": contract.methods.transfer(to, '0x' + (amount*10**decimals).toString(16)).encodeABI(),
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

           } catch(e) { 
              console.error (e) 
              return false
            } 
        } else { 
           console.error('Please install MetaMask') 
          return false
      } 



}
  //ethereum like blockchains (BSC, MATIC, ETH)
  async NFTTransactions(contractAddress, to, tokenId) {

    const provider = await detectEthereumProvider({ 
      mustBeMetaMask: true 
    }) 
      if (provider) { 
        try { 
      
          const web3 = new Web3(this.node);
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); 
          const from = accounts[0] 

          const contract = await new web3.eth.Contract(NFTabi, contractAddress, {
              from: from
          });

          const rawTransaction = {
              "to": contractAddress,
              "data": contract.methods.transferFrom(from, to, tokenId).encodeABI(),
              "chainId": this.chainId
           };

          const hash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
            from: from,
            ...rawTransaction
            }
            ],
          })

          return new Promise((resolve, reject) => {              
            resolve(hash)
          }) 

         } catch(e) { 
            console.error (e) 
            return false
          } 
      } else { 
         console.error('Please install MetaMask') 
        return false
    }
  }

}



