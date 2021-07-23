import { getWeb3NoAccount } from './web3'
import { getChainId } from './web3React'

/**
 * Accepts an array of contract method calls and batches them
 *
 * Example:
 *
 * [
 *  contract.method.balanceOf().call,
 *  contract.method.startBlockNumber().call
 * ]
 */
const makeBatchRequest = async (calls: any[]) => {
  try {
    const chainId = await getChainId()
    const web3 = getWeb3NoAccount(chainId)
    const batch = new web3.BatchRequest()

    const promises = calls.map((call) => {
      return new Promise((resolve, reject) => {
        batch.add(
          call.request({}, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          }),
        )
      })
    })

    batch.execute()

    return Promise.all(promises)
  } catch {
    return null
  }
}

export default makeBatchRequest
