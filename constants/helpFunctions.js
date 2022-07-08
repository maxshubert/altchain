
  /**
  * createRawTx
  * @param data - encode method SC
  * @returns {rawTransaction} body of all transactions
  */
export function createRawTx(gasPriceGwei, gasLimit, to, data, chainId) {

      const rawTransaction = {
        "gasPrice": gasPriceGwei,
        "gasLimit": gasLimit,
        "to": to,
        "data": data,
        "chainId": chainId
      };

    return rawTransaction
    
}

  /**
  * createRawTx
  * @param web3 - const web3 = new Web3(this.node)
  * @returns {gasPrice, gasLimit} body of all transactions
  */


export function arraySum(array) {
  let sum = 0;
  for(var i = 0; i < array.length; i++){
      sum += array[i];
      }
  console.log(sum);
  return sum
}

  /**
  * createRawTx
  * @param web3 - const web3 = new Web3(this.node)
  * @returns {newNumber} newBigNumber/you can use this numb in all web3 tx
  */
export async function createBigNumber(web3, tokenContract, amount) {

  const decimals = await tokenContract.methods.decimals().call();
  const unit = Object.keys(web3.utils.unitMap).find(key => web3.utils.unitMap[key] === web3.utils.toBN(10).pow(web3.utils.toBN(decimals)).toString());
  let newNumber = web3.utils.toWei(amount.toString(), unit)  
  
  return newNumber
}

export async function createNewBNArray(array, web3, tokenContract) {
  let newArray = []

  for(let i = 0; i < array.length; i++) {
    let num = await createBigNumber(web3, tokenContract, array[i])
    newArray.push(num)
  }

  return newArray
}