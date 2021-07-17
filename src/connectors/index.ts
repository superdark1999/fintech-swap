import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@luckyswap/v2-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import getLibrary from 'utils/getLibrary'
import { BscConnector } from './bsc/bscConnector'
import { NetworkConnector } from './NetworkConnector'
import { ALL_SUPPORTED_CHAIN_IDS } from '../constants/index'

const RPC = {
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC]:
    'https://apis.ankr.com/e22bfa5f5a124b9aa1f911b742f6adfe/c06bb163c3c2a10a4028959f4d82836d/polygon/full/main',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.MAINNET]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSCTESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
}

export const NETWORK_CHAIN_ID: number = parseInt('56' ?? '56')


export const network = new NetworkConnector({
  urls: RPC,
  defaultChainId: 56,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})