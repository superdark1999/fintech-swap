import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { CurrencyAmount, ROUTER_ADDRESSES, TokenAmount, Trade } from '@luckyswap/v2-sdk'
import { ApprovalState } from 'config'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo } from 'react'
import { getAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import { useNFTApproval } from '../data/Allowances'
import { Field } from '../state/swap/actions'
import { useHasPendingApproval, useTransactionAdder, useHasPendingNFTApproval } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'
import { computeSlippageAdjustedAmounts } from '../utils/prices'
import { useTokenContract, useStakingNFTContract } from './useContract'

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveNFTCallback(tokenID: number, contractAddress: string) {
  const { account } = useActiveWeb3React()
  const currentApproval = useNFTApproval(tokenID, contractAddress)
  const stakingContract = useStakingNFTContract()
  const pendingApproval = useHasPendingNFTApproval(tokenID, contractAddress, getAddress(addresses.stakingNft))

  // // check the current approval statuuse
  // const approvalState: ApprovalState = useMemo(() => {
  //   if (!tokenID || !contractAddress) return ApprovalState.UNKNOWN
  //   // we might not have enough data to know whether or not we need to approve
  //   return currentApproval
  // }, [tokenID, contractAddress, currentApproval])

  // const addTransaction = useTransactionAdder()

  // const approve = useCallback(async (): Promise<void> => {
  //   if (approvalState !== ApprovalState.NOT_APPROVED) {
  //     console.error('approve was called unnecessarily')
  //     return
  //   }
  //   if (!token) {
  //     console.error('no token')
  //     return
  //   }

  //   if (!tokenContract) {
  //     console.error('tokenContract is null')
  //     return
  //   }

  //   if (!amountToApprove) {
  //     console.error('missing amount to approve')
  //     return
  //   }

  //   if (!spender) {
  //     console.error('no spender')
  //     return
  //   }

  //   let useExact = false
  //   const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
  //     // general fallback for tokens who restrict approval amounts
  //     useExact = true
  //     return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
  //   })

  //   // eslint-disable-next-line consistent-return
  //   return tokenContract
  //     .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
  //       gasLimit: calculateGasMargin(estimatedGas),
  //     })
  //     .then((response: TransactionResponse) => {
  //       addTransaction(response, {
  //         summary: `Approve ${amountToApprove.currency.symbol}`,
  //         approval: { tokenAddress: token.address, spender },
  //       })
  //     })
  //     .catch((error: Error) => {
  //       console.error('Failed to approve token', error)
  //       throw error
  //     })
  // }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  // return [approvalState, approve]
}
