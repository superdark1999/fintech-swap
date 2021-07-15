import { Web3Provider } from '@ethersproject/providers'
import { ConnectorNames } from '@luckyswap/uikit'
import { ChainId } from '@luckyswap/v2-sdk'
import { bscConnector, injected, walletconnect } from 'connectors'

const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID) || 56

// const injected = new InjectedConnector({ supportedChainIds: [chainId] })
// const injected = new InjectedConnector({ supportedChainIds: [56, 97, 137, 80001] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
}

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

export const getChainId = async (): Promise<ChainId> => {
  const result = await injected.getChainId()

  return parseInt(result.toString(), 16)
}
