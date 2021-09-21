import axios from 'axios'
import { BASE_API_ADMIN } from 'config'
import tokens from './tokens'
import { FarmConfig, Token, Address } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'LUCKY-BNB LP',
  //   lpAddresses: {
  //     56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
  //     97: '0x5a84e08ef780764aed1c391144aa2b07890dd271',
  //   },
  //   token: tokens.xlucky,
  //   quoteToken: tokens.wbnb,
  // },
]

export const getFarmConfig = async () => {
  const result = await axios(`${BASE_API_ADMIN}/farms`)
  if (result.data.length === farms.length) return farms
  result.data.forEach((farmConfig) => {
    const token: Token = {
      symbol: farmConfig.token.symbol,
      address: {
        56: farmConfig.token.address['56'],
        97: farmConfig.token.address['97'],
      } as Address,
      decimals: farmConfig.token.decimals,
      projectLink: farmConfig.token.projectLink,
    }
    const parsedFarmConfig: FarmConfig = {
      pid: farmConfig.pid,
      lpSymbol: farmConfig.lpSymbol,
      lpAddresses: farmConfig.lpAddresses,
      token,
      type: farmConfig.type,
      quoteToken: farmConfig.quoteToken as Token,
      contractAddress: farmConfig.contractAddress,
    }
    farms.push(parsedFarmConfig)
  })

  return farms
}
// getFarmConfig()
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
