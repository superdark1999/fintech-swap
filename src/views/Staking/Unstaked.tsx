// import axios from 'axios'
import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { ethers } from 'ethers'
import { useApproveCallback } from 'hooks/useApproveCallback'
import useWeb3Provider from 'hooks/useWeb3Provider'
import React from 'react'
import { Row } from 'reactstrap'
import { XLUCKY_ADDRESSES } from '../../config/index'
import { useActiveWeb3React } from '../../hooks/index'
// import { useApproveCallback } from 'hooks/useApproveCallback'
import { useToken } from '../../hooks/Tokens'
import { useStakingNFTContract } from '../../hooks/useContract'
// import addresses from 'config/constants/contracts';
import { stakingNftService } from '../../services/index'
import notification from './Components/Alert'
import CardApproved from './Components/CardApproved'

interface UnstakedPageProps {
  approvedTokens: Array<any>
  maxDepositAmount: JSBI
}

export const Unstaked: React.FC<UnstakedPageProps> = ({ approvedTokens, maxDepositAmount }) => {
  const stakingNftContract = useStakingNFTContract()
  const { chainId } = useActiveWeb3React()
  const luckyToken = useToken(XLUCKY_ADDRESSES[chainId])

  const [approvalLucky, approveLuckyCallback] = useApproveCallback(
    CurrencyAmount.fromRawAmount(luckyToken, maxDepositAmount),
    stakingNftContract?.address,
  )

  const stakeHandler = async ({ tokenID, contractAddress }) => {
    try {
      await stakingNftContract.stake(ethers.utils.getAddress(contractAddress), ethers.BigNumber.from(tokenID))
      await stakingNftService.stakeToken({ tokenID, contractAddress })
    } catch (error) {
      notification('error', { message: 'Error', description: error?.message })
    }
  }

  const approveHandler = () => {
    approveLuckyCallback().catch((error) => {
      notification('error', { message: 'Error', description: error?.message })
    })
  }

  return (
    <Row>
      {approvedTokens.map((token) => (
        <CardApproved
          image={token.image}
          contractAddress={token.contractAddress}
          tokenID={token.tokenID}
          onStake={stakeHandler}
          approveState={approvalLucky}
          onApprove={approveHandler}
        />
      ))}
    </Row>
  )
}

export default Unstaked
