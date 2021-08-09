import { Token, TokenAmount } from '@luckyswap/v2-sdk'
import { ApprovalState } from 'config'
import { useMemo } from 'react'

import { useTokenContract, useNFTContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from '../hooks/index'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(
    () => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined),
    [token, allowance],
  )
}

export function useNFTApproval(tokenID: number, contractAddress: string) {
  const NFTContract = useNFTContract(contractAddress)
  const { account } = useActiveWeb3React()

  const inputs = useMemo(() => [tokenID], [tokenID])
  const { result } = useSingleCallResult(NFTContract, 'getApproved', inputs)

  return useMemo(() => {
    if (tokenID && contractAddress && result) {
      if (result[0] === account) {
        return ApprovalState.APPROVED
      }

      return ApprovalState.NOT_APPROVED
    }

    return ApprovalState.UNKNOWN
  }, [tokenID, result, contractAddress, account])
}

export default useTokenAllowance
