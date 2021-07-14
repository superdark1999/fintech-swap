import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@luckyswap/v2-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from './bsc/bscConnector'
import { NetworkConnector } from './NetworkConnector'

const RPC = {
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC]:
    'https://apis.ankr.com/e22bfa5f5a124b9aa1f911b742f6adfe/c06bb163c3c2a10a4028959f4d82836d/polygon/full/main',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.MAINNET]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSCTESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
}

// const NETWORK_URL = getNodeUrl(ChainId.MAINNET)
// console.log('get node trong connector')
export const NETWORK_CHAIN_ID: number = parseInt('56' ?? '56')

// if (typeof NETWORK_URL === 'undefined') {
//   throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
// }

export const network = new NetworkConnector({
  urls: RPC,
  defaultChainId: 1,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97, 137, 80001],
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })

// // mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 97: 'https://data-seed-prebsc-1-s1.binance.org:8545/' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: 'https://bsc-dataseed.binance.org/',
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})
