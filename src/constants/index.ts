import { ChainId, JSBI, Percent, Token, WETH } from '@juiceswap/v2-sdk'

export const NETWORK_URL = process.env.REACT_APP_URL
export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? '56',
)
export const PRICE_JUS = 10000

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.BSCMAINNET]: new Token(
    ChainId.BSCMAINNET,
    '0x59ab4584cf661f921c3b25a433f3d8a08b416b7b',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
  [ChainId.BSCTEST]: new Token(
    ChainId.BSCTEST,
    '0x40ad2da0c0a364d05d1aac7c5313ce7330e98afc',
    18,
    'LUCKY',
    'Lucky Finance',
  ),
}

export const API_DASHBOARD = 'https://dashboard.luckyswap.exchange'
export const API_TESTNET = 'https://testnet.bscscan.com'
export const API_S3 = 'https://lucky-swap.s3.ap-southeast-1.amazonaws.com'
