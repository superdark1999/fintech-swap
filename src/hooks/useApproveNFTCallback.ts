import { TransactionResponse } from '@ethersproject/providers'
import { ApprovalState } from 'config'
import addresses from 'config/constants/contracts'
import { useCallback, useMemo } from 'react'
import { getAddress } from 'utils/addressHelpers'
import { useNFTApproval } from '../data/Allowances'
import { useHasPendingNFTApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { useNFTContract } from './useContract'

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveNFTCallback(
  tokenID: number,
  contractAddress: string,
  spender: string,
): [ApprovalState, () => Promise<void>] {
  const currentApproval = useNFTApproval(tokenID, contractAddress)
  const NFTContract = useNFTContract(contractAddress)
  const pendingApproval = useHasPendingNFTApproval(tokenID, contractAddress, getAddress(addresses.stakingNft))

  // check the current approval statuuse
  const approvalState: ApprovalState = useMemo(() => {
    if (!tokenID || !contractAddress || !spender) return ApprovalState.UNKNOWN
    if (!currentApproval) return ApprovalState.UNKNOWN

    return currentApproval !== spender
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [tokenID, contractAddress, spender, currentApproval, pendingApproval])

  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!tokenID) {
      console.error('no token id')
      return
    }

    if (!contractAddress) {
      console.error('contract address is null')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    const estimatedGas = await NFTContract.estimateGas.approve(spender, tokenID).catch(() => {
      return NFTContract.estimateGas.approve(spender, tokenID)
    })

    // eslint-disable-next-line consistent-return
    return NFTContract.approve(spender, tokenID, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${tokenID} to staking contract`,
          approvalNFT: { tokenID, contractAddress, spender },
        })
      })
      .catch((error: Error) => {
        console.error('Failed to approve token', error)
        throw error
      })
  }, [approvalState, tokenID, contractAddress, NFTContract, spender, addTransaction])

  return [approvalState, approve]
}
