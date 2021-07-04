import { BscConnector } from '@binance-chain/bsc-connector'
import { Web3Provider } from '@ethersproject/providers'
import { ConnectorNames } from '@luckyswap/uikit'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import getNodeUrl from './getRpcUrl'


const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID) || 56
const rpcUrl = getNodeUrl(chainId)

// const injected = new InjectedConnector({ supportedChainIds: [chainId] })
const injected = new InjectedConnector({ supportedChainIds: [4, 56, 97, 137, 80001] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

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
