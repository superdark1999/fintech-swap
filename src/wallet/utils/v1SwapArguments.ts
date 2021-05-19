import { MaxUint256 } from '@ethersproject/constants'
import { CurrencyAmount, ETHER, SwapParameters, Token, Trade, TradeOptionsDeadline, TradeType } from '@juiceswap/v2-sdk'

function toHex(currencyAmount: CurrencyAmount): string {
  return `0x${currencyAmount.raw.toString(16)}`
}