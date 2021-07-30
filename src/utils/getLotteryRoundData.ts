import {BASE_API_ADMIN, BASE_API_ADMIN_PRO } from 'config';
import { getChainId } from './web3React'

export type DataResponse = {
  lotteryNumber: number
  lotteryDate: string
  lotteryNumbers: number[]
  poolSize: number
  burned: number
  contractLink: string
  jackpotTicket: number
  match1Ticket: number | null
  match2Ticket: number
  match3Ticket: number
  match4Ticket: number
  poolJackpot: number
  poolMatch3: number
  poolMatch2: number
  poolMatch1: number | null

  // TODO: Fill in the error type
  error: any
}

/**
 * Get data for a specific lottery
 */
const getLotteryRoundData = async (lotteryNumber: number): Promise<DataResponse> => {
  const chainId = getChainId();

  const URL = chainId === 56 ? BASE_API_ADMIN_PRO : BASE_API_ADMIN

  try {
    const response = await fetch(`${URL}/lotteries/history/${lotteryNumber || 0}`)
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default getLotteryRoundData
