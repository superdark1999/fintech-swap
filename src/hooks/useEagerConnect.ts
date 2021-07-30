import { useEffect, useState } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@luckyswap/uikit'

import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc
        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()
  const { active } = useWeb3React() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState<boolean>(false)

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames
    if (connectorId) {
      try {
        const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
        const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

        // Currently BSC extension doesn't always inject in time.
        // We must check to see if it exists, and if not, wait for it before proceeding.
        // if (isConnectorBinanceChain && !isBinanceChainDefined) {
        if (isConnectorBinanceChain && !isBinanceChainDefined) {
          _binanceChainListener().then(() => {
            login(connectorId)
          })
        } else {
          login(connectorId)
        }
      } catch (error) {
        setTried(true)
      }
    } else {
      setTried(true)
    }
  }, [login])

  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

export default useEagerConnect
