import { JSBI, Percent, Token, ChainId, WNATIVE } from '@luckyswap/v2-sdk'

// export const ROUTER_ADDRESS = '0x4eED75a231D8A1d265B283A67b5b37D1Ec80d379'

// New Binance testnet
// export const ROUTER_ADDRESS = '0x09FceE7287f882c5eEAb8032A64FDE54Fc1dD055'

// Polygon testnet
// export const ROUTER_ADDRESS = '0x037D2Ab45B62aaf282473c20425B8EA1eF3d4dDd'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  18,
  'UST',
  'Wrapped UST Token',
)

// export const WNATIVE = {
//   [ChainId.MAINNET]: new Token(
//     ChainId.MAINNET,
//     '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
//     18,
//     'WBNB',
//     'Wrapped BNB',
//   ),
//   [ChainId.BSCTESTNET]: new Token(
//     ChainId.BSCTESTNET,
//     '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
//     18,
//     'WBNB',
//     'Wrapped BNB',
//   ),
//   [ChainId.MATIC]: new Token(
//     ChainId.MATIC,
//     '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
//     18,
//     'WMATIC',
//     'Wrapped Matic',
//   ),
//   [ChainId.MATIC_TESTNET]: new Token(
//     ChainId.MATIC_TESTNET,
//     '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
//     18,
//     'WMATIC',
//     'Wrapped Matic',
//   ),
// }

export const ROUTER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
  [ChainId.MATIC]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
  [ChainId.MATIC_TESTNET]: '0x037D2Ab45B62aaf282473c20425B8EA1eF3d4dDd',
  [ChainId.BSCTESTNET]: '0x09FceE7287f882c5eEAb8032A64FDE54Fc1dD055',
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WNATIVE[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WNATIVE[ChainId.BSCTESTNET]],
  [ChainId.MATIC]: [WNATIVE[ChainId.MATIC]],
  [ChainId.MATIC_TESTNET]: [WNATIVE[ChainId.MATIC_TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT, UST],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x43bd1Db5b882b081cCbA03CA26311e3Fa9f69924', 18, 'BSCS', 'BSCSswap-Test Token'),
      new Token(ChainId.MAINNET, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    ],
    [BUSD, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const RPC_URLS: {
  [chainId in ChainId]?: string[]
} = {
  [ChainId.MAINNET]: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
  ],
  [ChainId.BSCTESTNET]: [
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
  ],
  [ChainId.MATIC]: ['https://rpc-mainnet.matic.network'],
  [ChainId.MATIC_TESTNET]: ['https://rpc-mumbai.matic.today', 'https://rpc-mumbai.maticvigil.com'],
}

export const BLOCK_EXPLORER_URLS: {
  [chainId in ChainId]?: string[]
} = {
  [ChainId.MAINNET]: ['https://bscscan.com'],
  [ChainId.BSCTESTNET]: ['https://testnet.bscscan.com/'],
  [ChainId.MATIC]: ['https://polygonscan.com/'],
  [ChainId.MATIC_TESTNET]: ['https://mumbai.polygonscan.com/'],
}

export const SCAN_NAMES: {
  [chainId in ChainId]?: string
} = {
  [ChainId.MAINNET]: 'bscscan',
  [ChainId.BSCTESTNET]: 'bscscan',
  [ChainId.MATIC]: 'polygonscan',
  [ChainId.MATIC_TESTNET]: 'polygonscan',
}
