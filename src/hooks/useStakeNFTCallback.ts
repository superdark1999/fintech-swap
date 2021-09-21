import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useState } from 'react'
import { useIsTransactionConfirmed, useIsTransactionPending, useTransactionAdder } from 'state/transactions/hooks'
import notification from 'views/Staking/Components/Alert'
import { useStakingNFTContract } from './useContract'
import { StakingNFT } from '../config/constants/types'

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useStakeNFTCallback(): [boolean, boolean, (any) => Promise<void>] {
  const stakingNftContract = useStakingNFTContract()
  const [txHashHarvest, setTxHashHarvest] = useState<string>('')
  const addTransaction = useTransactionAdder()
  const isPendingStake = useIsTransactionPending(txHashHarvest)
  const isConfirmedStake = useIsTransactionConfirmed(txHashHarvest)

  const harvestCallback = useCallback(
    async ({ tokenID, contractAddress }) => {
      if (!tokenID && !contractAddress) {
        return
      }
      stakingNftContract
        .harvest(contractAddress, tokenID)
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `
            Claim reward from staking token ${tokenID}
          `,
          })

          setTxHashHarvest(response.hash)
        })
        .catch((error) => {
          notification('error', { message: 'Error', description: error?.message })
        })
    },
    [stakingNftContract, addTransaction],
  )

  return [isPendingStake, isConfirmedStake, harvestCallback]
}
