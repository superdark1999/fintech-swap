import BigNumber from 'bignumber.js/bignumber'
import { ChainId } from '@luckyswap/v2-sdk'

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
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 25
export const LOTTERY_MAX_TICKET_IN_ROUND = 300;
export const LOTTERY2_MAX_TICKET_IN_ROUND = 100000;
export const LOTTERY_TICKET_PRICE = 1
// export const XLUCKY_TESTNET = '0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a'
export const BASE_API_ADMIN = 'https://dashboard.luckyswap.exchange'
export const BASE_API_ADMIN_PRO = 'https://dashboard-pro.luckyswap.exchange'
export const LUCKY_PRICE = 0.0001 // TODO: this one will call api
export const LUCKY2_PRICE = 15
export const LUCKY_PER_YEAR = LUCKY_PER_BLOCK.times(BLOCKS_PER_YEAR)

// TODO : Deploy XLUCKY to multiple networks
export const XLUCKY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x438b38A747242e09240537Ef5be76Ee89b64C06c',
  [ChainId.BSCTESTNET]: '0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a',
  [ChainId.MATIC]: '0x09FceE7287f882c5eEAb8032A64FDE54Fc1dD055',
  [ChainId.MATIC_TESTNET]: '0xC2Ab68f3bE82a87DAFfE3386A13958A2B936260D',
}

export const NFT_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x438b38A747242e09240537Ef5be76Ee89b64C06c',
  [ChainId.BSCTESTNET]: '0x969a82989D9e410ed0ae36C12479552421C93eB2',
  [ChainId.MATIC]: '0x09FceE7287f882c5eEAb8032A64FDE54Fc1dD055',
  [ChainId.MATIC_TESTNET]: '0xC2Ab68f3bE82a87DAFfE3386A13958A2B936260D',
}

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}
