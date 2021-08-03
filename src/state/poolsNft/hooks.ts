import { ethers } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useSingleContractMultipleData } from 'state/multicall/hooks'
import { isAddress } from 'utils'
import { useStakingNftContract } from '../../hooks/useContract'

export function usePendingRewards(tokensInfo) {
  const stakingNftContract = useStakingNftContract()

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

  // console.log('formattedTokensInfo : ', formattedTokensInfo)

  // console.log('addresses : ', addresses)

  const results = useSingleContractMultipleData(
    stakingNftContract,
    'pendingReward',
    formattedTokensInfo.map((token) => [token.contractAddress, token.tokenID]),
  )

  return results
}
