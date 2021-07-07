import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'
import { ChainId } from '@luckyswap/v2-sdk'

const getWeb3NoAccount = (chainId?: ChainId) => {
  const RPC_URL = getRpcUrl(chainId ?? 56)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

export { getWeb3NoAccount }
