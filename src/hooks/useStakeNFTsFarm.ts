import { TransactionResponse } from '@ethersproject/providers'
import { useCallback, useState } from 'react'
import { useIsTransactionConfirmed, useIsTransactionPending, useTransactionAdder } from 'state/transactions/hooks'
import notification from 'views/Staking/Components/Alert'
import { ethers } from 'ethers'
import { useStakingNFTContract, useFarmNFTContract } from './useContract'
import { StakingNFT } from '../config/constants/types'
import { useAppDispatch } from '../state/index'

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useStakeNFTsFarm(): [boolean, boolean, (pid: any, nftsBoosted: any) => Promise<void>] {
  const farmNFTContract = useFarmNFTContract()
  const [txHash, setTxHash] = useState<string>('')
  const addTransaction = useTransactionAdder()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const addNftsBoostedCallback = useCallback(
    async (pid, nftsBoosted) => {
      if (pid === undefined || nftsBoosted.length === 0) {
        console.log('return')
        return
      }
      setIsPending(true)
      try {
        const tx = await farmNFTContract.addNftsBoosted(
          pid,
          nftsBoosted.map((item) => ({
            tokenId: ethers.BigNumber.from(item.tokenID),
            contractAddress: item.contractAddress,
          })),
        )
        console.log('tx : ', tx)
        addTransaction(tx, {
          summary: `
            Stake NFTs to boost pool ${pid}
          `,
        })
        const receipt = await tx.wait()
        if (receipt.status) {
          setIsConfirmed(true)
        }
      } catch (error) {
        notification('error', { message: 'Error', description: (error as any)?.message })
      } finally {
        setIsPending(false)
      }
    },
    [farmNFTContract, addTransaction],
  )

  return [isPending, isConfirmed, addNftsBoostedCallback]
}

export function useUnstakeNFTsFarm(): [boolean, boolean, (pid: any, nftsBoosted: any) => Promise<void>] {
  const farmNFTContract = useFarmNFTContract()
  const [txHash, setTxHash] = useState<string>('')
  const addTransaction = useTransactionAdder()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  const unstakeNftsBoostedCallback = useCallback(
    async (pid, nftsBoosted) => {
      if (pid === undefined || nftsBoosted.length === 0) {
        return
      }
      setIsPending(true)
      try {
        const tx = await farmNFTContract.unsetNftBoosted(
          pid,
          nftsBoosted.map((item) => ({
            tokenId: ethers.BigNumber.from(item.tokenID),
            contractAddress: item.contractAddress,
          })),
        )
        addTransaction(tx, {
          summary: `
            UnStake NFTs to boost pool ${pid}
          `,
        })
        const receipt = await tx.wait()
        if (receipt.status) {
          setIsConfirmed(true)
        }
      } catch (error) {
        notification('error', { message: 'Error', description: (error as any)?.message })
      } finally {
        setIsPending(false)
      }
    },
    [farmNFTContract, addTransaction],
  )

  return [isPending, isConfirmed, unstakeNftsBoostedCallback]
}
