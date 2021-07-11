import { useCallback, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useContract, useLottery, useLotteryTicket } from 'hooks/useContract'
import { getLotteryAddress, getLotteryTicketAddress } from 'utils/addressHelpers'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import lotteryAbi from 'config/abi/lottery.json'
import useRefresh from './useRefresh'
import {
  getTotalRewards,
  getTotalClaim,
  getMatchingRewardLength,
  getWinningNumbers,
  getTickets,
} from '../utils/lotteryUtils'

const useTickets = (lotteryNumber = null) => {
  const [tickets, setTickets] = useState([])
  const { account } = useWeb3React()
  const ticketsContract = useContract(getLotteryTicketAddress(), lotteryTicketAbi)
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTickets(lotteryContract, ticketsContract, account, lotteryNumber)
      setTickets(res)
    }

    if (account && lotteryContract && ticketsContract) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, lotteryContract, ticketsContract, fastRefresh, lotteryNumber])

  return tickets
}

export const useTotalRewards = () => {
  const [rewards, setRewards] = useState(new BigNumber(0))
  const { fastRefresh } = useRefresh()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalRewards(lotteryContract)

      setRewards(new BigNumber(res.toString()))
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [lotteryContract, fastRefresh])
  return rewards
}

export const useTotalClaim = () => {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0))
  const [claimLoading, setClaimLoading] = useState(false)
  const { account } = useWeb3React()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const ticketsContract = useContract(getLotteryTicketAddress(), lotteryTicketAbi)

  const fetchBalance = useCallback(async () => {
    setClaimLoading(true)
    const claim = await getTotalClaim(lotteryContract, ticketsContract, account)
    setClaimAmount(claim)
    setClaimLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, lotteryContract, ticketsContract])

  useEffect(() => {
    if (account && lotteryContract && ticketsContract) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchBalance, lotteryContract, ticketsContract])
  return { claimLoading, claimAmount }
}

export const useWinningNumbers = () => {
  const [winningNumbers, setWinningNumbers] = useState([0, 0, 0, 0])
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rewards = await getWinningNumbers(lotteryContract)
      setWinningNumbers(rewards)
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [fastRefresh, lotteryContract, setWinningNumbers])

  return winningNumbers
}

export const useMatchingRewardLength = (numbers) => {
  const [matchingNumbers, setMatchingNumbers] = useState(0)
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const matchedNumbaers = await getMatchingRewardLength(lotteryContract, numbers)

      setMatchingNumbers(matchedNumbaers)
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [lotteryContract, numbers, fastRefresh])
  return matchingNumbers
}

export default useTickets
