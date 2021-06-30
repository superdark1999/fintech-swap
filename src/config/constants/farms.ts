import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LUCKY-BNB LP',
    lpAddresses: {
      97: '0x5a84e08ef780764aed1c391144aa2b07890dd271',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.xlucky,
    quoteToken: tokens.wbnb,
  }
]

export default farms
