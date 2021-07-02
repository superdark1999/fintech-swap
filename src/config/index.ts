import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

// LUCKY_PER_BLOCK details
// 40 LUCKY is minted per block
// 18 LUCKY per block is sent to Burn pool (A farm just for burning cake)
// 10 LUCKY per block goes to Bestay syrup pool
// 12 LUCKY per block goes to Yield farms and lottery
// LUCKY_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// LUCKY/Block in components/CakeStats.tsx = 22 (40 - Amount sent to burn pool)

export const LUCKY_PER_BLOCK = new BigNumber(10)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BASE_URL = 'https://luckyswap.finance'
export const BASE_EXCHANGE_URL = 'https://luckyswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const XLUCKY_TESTNET = "0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a"
export const BASE_API_ADMIN = 'https://dashboard.luckyswap.exchange'
export const LUCKY_PRICE = 0.0001 // TODO: this one will call api 
export const LUCKY2_PRICE = 0.00001 
export const LUCKY_PER_YEAR = LUCKY_PER_BLOCK.times(BLOCKS_PER_YEAR)
