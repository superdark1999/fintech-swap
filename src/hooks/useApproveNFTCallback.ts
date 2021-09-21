import { TransactionResponse } from '@ethersproject/providers'
import { ApprovalState } from 'config'
import addresses from 'config/constants/contracts'
import { useCallback, useMemo, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'
import farmNftAbi from 'config/abi/newFarm.json'
import { useNFTApproval, useApproveForAll, useApproveForAllNFTs } from '../data/Allowances'
import { useHasPendingNFTApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { useNFTContract } from './useContract'
import { multicallv2 } from '../utils/multicall'

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveNFTCallback(
  tokenID: number,
  contractAddress: string,
  spender: string,
): [ApprovalState, () => Promise<void>, boolean, string] {
  const [txHashApprove, setTxHashApprove] = useState<string>('')
  const [attemptingApproveTxn, setAttemptingApproveTxn] = useState<boolean>(false)
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

    setAttemptingApproveTxn(true)

    // eslint-disable-next-line consistent-return
    return NFTContract.approve(spender, tokenID, {
      gasLimit: calculateGasMargin(estimatedGas),
    })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${tokenID} to staking contract`,
          approvalNFT: { tokenID, contractAddress, spender },
        })

        setAttemptingApproveTxn(false)
        setTxHashApprove(response.hash)
      })
      .catch((error: Error) => {
        console.error('Failed to approve token', error)
        setAttemptingApproveTxn(false)

        throw error
      })
  }, [approvalState, tokenID, contractAddress, NFTContract, spender, addTransaction])

  return [approvalState, approve, attemptingApproveTxn, txHashApprove]
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveForAllNFTCallback(
  operator: string,
  contractAddress: string,
): [ApprovalState, () => Promise<void>] {
  const currentApproval = useApproveForAll(contractAddress, operator)
  const NFTContract = useNFTContract(contractAddress)
  const [isPending, setIsPending] = useState<boolean>(false)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!operator || !contractAddress) return ApprovalState.UNKNOWN
    if (currentApproval === undefined) return ApprovalState.UNKNOWN

    return !currentApproval ? (isPending ? ApprovalState.PENDING : ApprovalState.NOT_APPROVED) : ApprovalState.APPROVED
  }, [operator, contractAddress, currentApproval, isPending])

  const addTransaction = useTransactionAdder()

  const setApproveForAll = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!operator) {
      console.error('no operator')
      return
    }

    if (!contractAddress) {
      console.error('contract address is null')
      return
    }

    setIsPending(true)
    try {
      const estimatedGas = await NFTContract.estimateGas.setApprovalForAll(operator, true).catch(() => {
        return NFTContract.estimateGas.setApprovalForAll(operator, true)
      })

      // eslint-disable-next-line consistent-return
      const tx = await NFTContract.setApprovalForAll(operator, true, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      addTransaction(tx, {
        summary: `Approve ${contractAddress} to have right on my NFTs`,
      })
    } catch (error) {
      console.error('Failed to approve token', error)

      throw error
    }
  }, [approvalState, contractAddress, NFTContract, operator, addTransaction])

  return [approvalState, setApproveForAll]
}
