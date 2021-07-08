import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from '@luckyswap/uikit'
// import { useToast } from 'state/hooks'
import { connectorsByName } from 'utils/web3React'
import {setupNetwork} from 'utils/setupNetwork'
import notification from 'components-v2/Alert'
import { useActiveWeb3React } from 'wallet/hooks'

const useAuth = () => {
  const { chainId, account, connector } = useActiveWeb3React()
  const { activate, deactivate,  } = useWeb3React()
  const loginWallet = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    console.log('connector: ', connector);
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } 
        else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            notification('error', {
                message: 'No provider was found',
                description: '',
              })
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = null
            }
            notification('error', {
                message: 'Please authorize to access your account',
                description: '',
              })
          } else {
            notification('error', {
                message: error.message,
                description: '',
              })
          }
        }
      })
    } else {
        notification('error', {
            message: 'The connector config is wrong',
            description: '',
          })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout  = useCallback(()=>{
    const { ethereum } = window as any
     deactivate()
    // ethereum.request({
    //   method: "wallet_requestPermissions",
    //   params: [
    //     {
    //       eth_accounts: {}
    //     }
    //   ]
    // });
    // const { ethereum } = window as any
    // ethereum.request({ method: 'wallet_switchEthereumChain' })
  },[])

  return { loginWallet, logout }
}

export default useAuth
