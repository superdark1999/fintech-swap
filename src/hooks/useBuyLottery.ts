import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLottery, useContract } from 'hooks/useContract'
import { getLotteryAddress, getLotteryTicketAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import { multiClaim, getMax, multiBuy } from '../utils/lotteryUtils'

export const useMultiClaimLottery = () => {
  const { account } = useWeb3React()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const lotteryTicketContract = useContract(getLotteryTicketAddress(), lotteryTicketAbi)

  const handleClaim = useCallback(async () => {
    try {
      const txHash = await multiClaim(lotteryContract, lotteryTicketContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, lotteryContract, lotteryTicketContract])

  return { onMultiClaim: handleClaim }
}

export const useMultiBuyLottery = () => {
  const { account } = useWeb3React()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  const handleBuy = useCallback(
    async (amount: string, numbers: Array<any>) => {
      try {
        const txHash = await multiBuy(lotteryContract, amount, numbers, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, lotteryContract],
  )

  return { onMultiBuy: handleBuy }
}

export const useMaxNumber = () => {
  const [max, setMax] = useState(5)
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  const fetchMax = useCallback(async () => {
    const maxNumber = await getMax(lotteryContract)
    setMax(maxNumber)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryContract])

  useEffect(() => {
    if (lotteryContract) {
      fetchMax()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryContract, fetchMax])

  return max
}
