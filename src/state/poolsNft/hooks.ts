import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { XLUCKY_ADDRESSES } from 'config'
import { useActiveWeb3React } from 'hooks'
import { useToken } from 'hooks/Tokens'
import { useMemo } from 'react'
import { useSingleContractMultipleData } from 'state/multicall/hooks'
import { isAddress } from 'utils'
import { useStakingNFTContract } from '../../hooks/useContract'

export function usePendingRewards(tokensInfo) {
  const stakingNftContract = useStakingNFTContract()
  const { chainId } = useActiveWeb3React()
  const luckyToken = useToken(XLUCKY_ADDRESSES[chainId])

  const formattedTokensInfo = useMemo(
    () =>
      tokensInfo
        ? tokensInfo
            .map((token) => ({
              ...token,
              contractAddress: isAddress(token.contractAddress),
            }))
            .filter((token) => token.contractAddress !== false)
            .sort()
        : [],
    [tokensInfo],
  )

  const results = useSingleContractMultipleData(
    stakingNftContract,
    'pendingReward',
    formattedTokensInfo.map((token) => [token.contractAddress, token.tokenID]),
  )

  console.log('results : ', results)

  const response: CurrencyAmount[] = []
  for (let i = 0; i < results.length; i++) {
    const value = results?.[i]?.result?.[0]
    if (value) {
      response.push(CurrencyAmount.fromRawAmount(luckyToken, JSBI.BigInt(value.toString())))
    }
  }

  return response

  // return useMemo(
  //   () =>
  //     tokensInfo.reduce((memo, _, i) => {
  //       const value = results?.[i]?.result?.[0]
  //       if (value) memo.push(CurrencyAmount.fromRawAmount(luckyToken, JSBI.BigInt(value.toString())))
  //       return memo
  //     }, []),
  //   [tokensInfo, results, luckyToken],
  // )
}
