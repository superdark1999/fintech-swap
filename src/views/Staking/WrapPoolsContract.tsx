import { JSBI } from '@luckyswap/v2-sdk'
import { ethers, BigNumber } from 'ethers'
import React, { useEffect, useState } from 'react'
import { TabPane } from 'reactstrap'
import { getMaxBy } from 'utils/array'
import { getBigNumber } from 'utils/bigNumber'
import { useStakingNFTContract } from '../../hooks/useContract'
import notification from './Components/Alert'
import { Staked } from './Staked'
import { Unstaked } from './Unstaked'
import { StakingNFT, NFT } from '../../config/constants/types'
import { useActiveWeb3React } from '../../hooks/index'
import { foundNFT } from '../../utils/array'

interface WrapPoolsContractProps {
  myTokens: NFT[]
}

const WrapPoolsContract: React.FC<WrapPoolsContractProps> = ({ myTokens }) => {
  const [stakingTokens, setStakingTokens] = useState<StakingNFT[]>([])
  const [approvedTokens, setApprovedTokens] = useState<StakingNFT[]>([])
  const [maxDepositAmount, setMaxDepositAmount] = useState<JSBI>(JSBI.BigInt(0))
  const { account } = useActiveWeb3React()

  const stakingNFTContract = useStakingNFTContract()

  useEffect(() => {
    const getTokens = async () => {
      if (stakingNFTContract) {
        stakingNFTContract
          .getAllPools()
          .then((response: StakingNFT[]) => {
            const formatted = response.map((item) => ({
              ...item,
              tokenID: (item.tokenID as BigNumber).toNumber(),
              createdAt: (item.createdAt as any).toNumber(),
            }))
            setApprovedTokens(
              formatted.filter(
                (token) =>
                  token.owner === ethers.constants.AddressZero &&
                  foundNFT(myTokens, token.contractAddress, token.tokenID),
              ),
            )
            setStakingTokens(formatted.filter((token) => token.owner === account))
          })
          .catch((error) => notification('error', { message: 'Error', description: error?.message }))
      }
    }

    if (account && myTokens.length > 0 && stakingNFTContract) {
      getTokens()
    }
  }, [stakingNFTContract, account, myTokens])

  useEffect(() => {
    const max = getMaxBy(approvedTokens, 'depositAmount')
    setMaxDepositAmount(getBigNumber(max))
  }, [approvedTokens])

  return (
    <>
      <TabPane tabId="3">
        {approvedTokens.length > 0 && <Unstaked approvedTokens={approvedTokens} maxDepositAmount={maxDepositAmount} />}
      </TabPane>

      <TabPane tabId="4">{stakingTokens.length > 0 && <Staked stakingTokens={stakingTokens} />}</TabPane>
    </>
  )
}

export default WrapPoolsContract
