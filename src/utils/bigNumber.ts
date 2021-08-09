import { JSBI } from '@luckyswap/v2-sdk'

export function getDecimals(): JSBI {
  return JSBI.exponentiate(JSBI.BigInt('10'), JSBI.BigInt('18'))
}

export function getBigNumber(number: any): JSBI {
  return JSBI.multiply(JSBI.BigInt(number), JSBI.exponentiate(JSBI.BigInt('10'), JSBI.BigInt('18')))
}
