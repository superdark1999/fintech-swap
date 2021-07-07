import { ChainId, Currency, CurrencyAmount, NATIVE, Token, TokenAmount, WNATIVE } from '@luckyswap/v2-sdk'

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined,
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? currencyAmount.currency?.wrapped : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WNATIVE[token.chainId])) return NATIVE[token.chainId]
  return token
}
