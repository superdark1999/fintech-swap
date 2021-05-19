import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useMemo } from 'react'
import { useTransactionAdder, useHasPendingApproval } from '../wallet/state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { useTokenContract } from '../wallet/hooks/useContract'
import { useActiveWeb3React } from '../wallet/hooks'
import * as BigNumber from 'bignumber.js'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
 APPROVED
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  token?: string,
  addressNeedApprove?:string,
): [() => Promise<void>] {
  const tokenContract = useTokenContract(token)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    

    const estimatedGas = await tokenContract.estimateGas.approve(addressNeedApprove, MaxUint256).catch(() => {
      return tokenContract.estimateGas.approve(addressNeedApprove,MaxUint256)
    })

    return tokenContract
      .approve(addressNeedApprove, MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas)
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Aprrove  successfully!`,
        })
        return response;
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
  }, [tokenContract, addressNeedApprove])

  return [approve]
}

