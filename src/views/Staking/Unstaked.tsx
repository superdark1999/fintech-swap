// import axios from 'axios'
import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { BigNumber } from 'ethers'
import { useApproveCallback } from 'hooks/useApproveCallback'
import React from 'react'
import { Row } from 'reactstrap'
import { bigNumberToJSBI } from 'utils/bigNumber'
import { XLUCKY_ADDRESSES } from '../../config/index'
import { useActiveWeb3React } from '../../hooks/index'
// import { useApproveCallback } from 'hooks/useApproveCallback'
import { useToken } from '../../hooks/Tokens'
import { useStakingNFTContract } from '../../hooks/useContract'
import notification from './Components/Alert'
import CardApproved from './Components/CardApproved'

interface UnstakedPageProps {
  approvedTokens: Array<any>
  maxDepositAmount: JSBI
  changeViewWhenStake: any
}

export const Unstaked: React.FC<UnstakedPageProps> = ({ approvedTokens, maxDepositAmount, changeViewWhenStake }) => {
  const stakingNftContract = useStakingNFTContract()
  const { chainId } = useActiveWeb3React()
  const luckyToken = useToken(XLUCKY_ADDRESSES[chainId])

  const [approvalLucky, approveLuckyCallback] = useApproveCallback(
    CurrencyAmount.fromRawAmount(luckyToken, maxDepositAmount),
    stakingNftContract?.address,
  )

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
          changeViewWhenStake={changeViewWhenStake}
          approveState={approvalLucky}
          onApprove={approveHandler}
          depositAmount={CurrencyAmount.fromRawAmount(luckyToken, bigNumberToJSBI(token?.depositAmount as BigNumber))}
        />
      ))}
    </Row>
  )
}

export default Unstaked
