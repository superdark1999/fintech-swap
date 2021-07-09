import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import getRpcUrl from 'utils/getRpcUrl'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const useWeb3NoAccount = () => {
  const { chainId } = useWeb3React()
  const [web3NoAccount, setWeb3NoAccount] = useState(null)

  useEffect(() => {
    if (chainId) {
      const RPC_URL = getRpcUrl(chainId)
      const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
      setWeb3NoAccount(new Web3(httpProvider))
    }
  }, [chainId])

  return web3NoAccount
}

const getWeb3NoAccount = (chainId?) => {
  const RPC_URL = getRpcUrl(chainId ?? 56)
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

export { useWeb3NoAccount, getWeb3NoAccount }
