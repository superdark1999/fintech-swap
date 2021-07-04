import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'

const getWeb3NoAccount = (chainId = 97) => {
  const RPC_URL = getRpcUrl(chainId)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

export { getWeb3NoAccount }
