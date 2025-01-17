import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useActiveWeb3React } from 'hooks'
import { JSBI } from '@luckyswap/v2-sdk'
import { BigNumber } from 'ethers'
import { AppDispatch, AppState } from '../index'
import { addTransaction } from './actions'
import { TransactionDetails } from './reducer'

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    attr1?: string
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    approvalNFT?: {
      tokenID: number | JSBI | BigNumber
      contractAddress: string
      spender: string
    }
  },
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        approvalNFT,
        attr1,
      }: {
        attr1?: string
        summary?: string
        approval?: { tokenAddress: string; spender: string }
        approvalNFT?: {
          tokenID: number | JSBI | BigNumber
          contractAddress: string
          spender: string
        }
      } = {},
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      console.log('>>>>>',{ hash, attr1, from: account, chainId, approval, summary, approvalNFT })
      dispatch(addTransaction({ hash, attr1, from: account, chainId, approval, summary, approvalNFT }))
    },
    [dispatch, chainId, account],
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)

  return chainId ? state[chainId] ?? {} : {}
}
export function useTransaction(transactionHash?: string): TransactionDetails | undefined {
  const allTransactions = useAllTransactions()

  if (!transactionHash) {
    return undefined
  }

  return allTransactions[transactionHash]
}

export function useIsTransactionConfirmed(transactionHash?: string): boolean {
  const transactions = useAllTransactions()

  if (!transactionHash || !transactions[transactionHash]) return false

  return Boolean(transactions[transactionHash].receipt)
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions()

  if (!transactionHash || !transactions[transactionHash]) return false

  return !transactions[transactionHash].receipt
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()

  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        }
        const { approval } = tx
        if (!approval) return false
        return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
      }),
    [allTransactions, spender, tokenAddress],
  )
}

// returns whether a token has a pending approval transaction
export function useHasPendingNFTApproval(tokenID: number, contractAddress: string, spender: string): boolean {
  const allTransactions = useAllTransactions()

  return useMemo(
    () =>
      typeof tokenID === 'number' &&
      typeof contractAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        }
        const { approvalNFT } = tx
        if (!approvalNFT) return false
        return (
          approvalNFT.tokenID === tokenID &&
          approvalNFT.contractAddress === contractAddress &&
          approvalNFT.spender === spender &&
          isTransactionRecent(tx)
        )
      }),
    [allTransactions, tokenID, contractAddress, spender],
  )
}
