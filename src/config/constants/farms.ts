import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BES-DEMO-BNB LP',
    lpAddresses: {
      97: '0xd08A7AfF7952Aaab598121Ad8Ee28e5CC55CFaA1',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.bdex,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'BEDEX-BNB LP',
    lpAddresses: {
      97: '0x44df2f78b2f8a72b15ac317c02b767cea8637477',
      56: '0xb4d63ddf0d16538119269e0894f2122f85b13269',
    },
    token: tokens.bdextest,
    quoteToken: tokens.wbnb,
  }
]

export default farms
