import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'LUCKY-BNB LP',
    lpAddresses: {
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      97: '0x5a84e08ef780764aed1c391144aa2b07890dd271',
    },
    token: tokens.xlucky,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'LUCKY-BUSD LP',
    lpAddresses: {
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      97: '0x12b8b1efcc0dd00481475a9dc455efe258981cac',
    },
    token: tokens.xlucky,
    quoteToken: tokens.busd,
  },

  // {
  //   pid: 1,
  //   lpSymbol: 'LUCKY-BUSD LP',
  //   lpAddresses: {
  //     97: '0x311b79db6a2b5783103f5e4e2db5501f8b69d5b7',
  //     56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
  //   },
  //   token: tokens.xlucky,
  //   quoteToken: tokens.busd,
  // },
]

const getFarmConfig = () => {
  console.log('sdfds')
}
getFarmConfig()
// [
//   {
//     pid: 0,
//     lpSymbol: 'LUCKY-BNB LP',
//     lpAddresses: {
//       97: '0x5a84e08ef780764aed1c391144aa2b07890dd271',
//       56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
//     },
//     token: tokens.xlucky,
//     quoteToken: tokens.wbnb,
//   },
//   {
//     pid: 1,
//     lpSymbol: 'LUCKY-BUSD LP',
//     lpAddresses: {
//       97: '0x12b8b1efcc0dd00481475a9dc455efe258981cac',
//       56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
//     },
//     token: tokens.xlucky,
//     quoteToken: tokens.busd,
//   },

//   // {
//   //   pid: 1,
//   //   lpSymbol: 'LUCKY-BUSD LP',
//   //   lpAddresses: {
//   //     97: '0x311b79db6a2b5783103f5e4e2db5501f8b69d5b7',
//   //     56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
//   //   },
//   //   token: tokens.xlucky,
//   //   quoteToken: tokens.busd,
//   // },
// ]

export default farms
