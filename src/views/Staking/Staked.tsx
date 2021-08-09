import React from 'react'
import { Row } from 'reactstrap'
import { useStakingNFTContract } from '../../hooks/useContract'
import { usePendingRewards } from '../../state/poolsNft/hooks'
import notification from './Components/Alert'
import CardStaking from './Components/CardStaking'
import { StakingNFT } from '../../config/constants/types'

interface StakingPageProps {
  stakingTokens: StakingNFT[]
}

export const Staked: React.FC<StakingPageProps> = ({ stakingTokens }) => {
  const pendingRewards = usePendingRewards(stakingTokens)
  const stakingNftContract = useStakingNFTContract()

  // console.log('staking tokens : ', stakingTokens)

  const onHarvest = async ({ tokenID, contractAddress }) => {
    stakingNftContract
      .harvest(contractAddress, tokenID)
      .then((response) => {
        console.log('response : ', response)
      })
      .catch((error) => {
        notification('error', { message: 'Error', description: error?.message })
      })
  }

  const onWithdraw = async ({ tokenID, contractAddress }) => {
    stakingNftContract
      .withdraw(contractAddress, tokenID)
      .then((response) => {
        console.log('response : ', response)
      })
      .catch((error) => {
        notification('error', { message: 'Error', description: error?.message })
      })
  }

  return (
    <Row>
      {stakingTokens.map((token, i) => (
        <CardStaking
          image={token.image}
          contractAddress={token.contractAddress}
          tokenID={token.tokenID}
          pendingReward={pendingRewards[i] ? pendingRewards[i].toFixed(4) : '0.0000'}
          onHarvest={onHarvest}
          onWithdraw={onWithdraw}
          createdAt={new Date((token.createdAt as number) * 1000)}
        />
      ))}
    </Row>
  )
}

export default Staked
