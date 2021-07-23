import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { MIN_ETH } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency?.isNative) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.subtract(currencyAmount.raw, MIN_ETH))
    }
    return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.BigInt(0))
  }
  return currencyAmount
}

export default maxAmountSpend
