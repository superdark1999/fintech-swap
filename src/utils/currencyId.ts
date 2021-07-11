import { Currency, Token } from '@luckyswap/v2-sdk'

export function currencyId(currency: Currency): string {
  if (currency?.isNative) return 'ETH'
  if (currency.isToken) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
