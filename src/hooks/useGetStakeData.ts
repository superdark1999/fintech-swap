import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useERC20, useStakingContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { Pool } from 'config/constants/types'

const useGetStateData = (staking: Pool) => {
  const [state, setState] = useState({
    userAmount: new BigNumber(0),
    userRewardDebt: new BigNumber(0),
    pendingReward: new BigNumber(0),
  })
  const { account } = useWeb3React()

  const contract = useStakingContract(staking.stakingAddress)

  useEffect(() => {
    const fetchStakingData = async () => {
      if (contract && account) {
        const userAmount = await contract.userInfo(account).catch((error) => {
          console.log('error pending reward')
        })
        const pendingReward = await contract.pendingReward(account).catch((error) => {
          console.log('error pending reward')
        })

        setState({
          userAmount: new BigNumber(userAmount.amount._hex),
          userRewardDebt: new BigNumber(userAmount.rewardDebt._hex),
          pendingReward: new BigNumber(pendingReward.toString()),
        })
      }
    }
    fetchStakingData()
  })

  return state
}

export default useGetStateData
