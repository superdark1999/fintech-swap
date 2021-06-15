import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LUCKY-BNB LP',
    lpAddresses: {
      97: '0xd08A7AfF7952Aaab598121Ad8Ee28e5CC55CFaA1',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.bdex,
    quoteToken: tokens.wbnb,
  }
]

export default farms
