import { ChainId, Currency, NATIVE } from '@luckyswap/v2-sdk'

export function currencyId(currency: Currency, chainId?: ChainId): string {
  if (currency?.isNative) return NATIVE[chainId]?.symbol
  if (currency.isToken) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
