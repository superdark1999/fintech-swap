import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Pool } from 'config/constants/types'
import { useStakingContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useState } from 'react'

const useGetStateData = (staking: Pool) => {
  const [state, setState] = useState({
    userAmount: new BigNumber(0),
    userRewardDebt: new BigNumber(0),
    pendingReward: new BigNumber(0),
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const contract = useStakingContract(staking.stakingAddress)

  useEffect(() => {
    const fetchStakingData = async () => {
      if (contract && account) {
        try {
          const userAmount = await contract.userInfo(account).catch((error) => {
            console.log('error userAmount')
          })
          const pendingReward = await contract.pendingReward(account).catch((error) => {
            console.log('error pending reward')
          })
          setState({
            userAmount: new BigNumber(userAmount.amount._hex),
            userRewardDebt: new BigNumber(userAmount.rewardDebt._hex),
            pendingReward: new BigNumber(pendingReward.toString()),
          })
        } catch (error) {
          console.log('fetch staking error : ', error)
          setState({
            userAmount: new BigNumber(0),
            userRewardDebt: new BigNumber(0),
            pendingReward: new BigNumber(0),
          })
        }
      }
    }
    fetchStakingData()
  }, [account, contract, fastRefresh])

  return state
}

export default useGetStateData
