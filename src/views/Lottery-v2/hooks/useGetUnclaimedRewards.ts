import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { useGetLotteriesGraphData, useGetUserLotteriesGraphData } from 'state/hooks'
import fetchUnclaimedUserRewards from 'state/lottery2/fetchUnclaimedUserRewards'

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  IN_PROGRESS = 'in-progress',
  SUCCESS = 'success',
}

const useGetUnclaimedRewards = () => {
  const { account } = useWeb3React()
  // const { isTransitioning } = useLottery()
  const userLotteryData = useGetUserLotteriesGraphData()
  const lotteriesData = useGetLotteriesGraphData()
  const [unclaimedRewards, setUnclaimedRewards] = useState([])
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)

  useEffect(() => {
    // Reset on account change and round transition
    setFetchStatus(FetchStatus.NOT_FETCHED)
  }, [account])

  const fetchAllRewards = async () => {
    setFetchStatus(FetchStatus.IN_PROGRESS)
    const unclaimedRewardsResponse = await fetchUnclaimedUserRewards(account, userLotteryData, lotteriesData)
    setUnclaimedRewards(unclaimedRewardsResponse)
    setFetchStatus(FetchStatus.SUCCESS)
  }

  return { fetchAllRewards, unclaimedRewards, fetchStatus }
}

export default useGetUnclaimedRewards
