import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import getRpcUrl from 'utils/getRpcUrl'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const useGetWeb3NoAccount = () => {
  const { chainId } = useWeb3React()

  const getWeb3NoAccount = useCallback(() => {
    const RPC_URL = getRpcUrl(chainId ?? 56)
    const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
    const web3NoAccount = new Web3(httpProvider)
    return web3NoAccount
  }, [chainId])

  return getWeb3NoAccount
}

const getWeb3NoAccount = (chainId?) => {
  const RPC_URL = getRpcUrl(chainId ?? 56)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

export { useGetWeb3NoAccount, getWeb3NoAccount }
