import { useEffect, useState } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@luckyswap/uikit'

import useAuth from 'hooks/useAuth'

const useQuickConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames
    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    if (connectorId && connectorId !== ConnectorNames.BSC) {
      try {
        login(connectorId)
      } catch (error) {
        console.log('Login error : ', error)
      }
    }
  }, [login])
}

export default useQuickConnect
