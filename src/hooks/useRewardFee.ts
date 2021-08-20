import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import notification from 'views/Staking/Components/Alert'
import { useStakingNFTContract } from './useContract'

const useRewardFee = () => {
  const [rewardFee, setRewardFee] = useState<number>(null)

  const stakingNftContract = useStakingNFTContract()

  useEffect(() => {
    stakingNftContract
      .FEE_WITHDRAW()
      .then((response) => {
        setRewardFee((response as BigNumber).toNumber())
      })
      .catch((error) => {
        notification('error', { message: 'Error when get fee withdraw', description: error?.message })
      })
  }, [stakingNftContract])

  return rewardFee
}

export default useRewardFee
