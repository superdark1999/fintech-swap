import { JSBI } from '@luckyswap/v2-sdk'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { SerializedBigNumber } from 'state/types'

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)

export const ethersToSerializedBigNumber = (ethersBn: ethers.BigNumber): SerializedBigNumber =>
  ethersToBigNumber(ethersBn).toJSON()

export const ethersToBigNumber = (ethersBn: ethers.BigNumber): BigNumber => new BigNumber(ethersBn.toString())

export function getDecimals(): JSBI {
  return JSBI.exponentiate(JSBI.BigInt('10'), JSBI.BigInt('18'))
}

export function getBigNumber(number: any): JSBI {
  return JSBI.multiply(JSBI.BigInt(number), getDecimals())
}

export function jsbiToBigNumber(number: JSBI): ethers.BigNumber {
  return ethers.BigNumber.from(String(number))
}

export function bigNumberToJSBI(number: ethers.BigNumber): JSBI {
  return JSBI.BigInt(number.toString())
}

export function calculatePercentToJSBI(amount: JSBI, percent: number): JSBI {
  return JSBI.divide(JSBI.multiply(amount, JSBI.BigInt(percent)), JSBI.BigInt(100))
}
