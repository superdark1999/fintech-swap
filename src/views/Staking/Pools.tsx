import { JSBI } from '@luckyswap/v2-sdk'
import { ethers, BigNumber } from 'ethers'
import React, { useEffect, useState, useRef } from 'react'
import { TabPane } from 'reactstrap'
import { getMaxBy } from 'utils/array'
import { getBigNumber } from 'utils/bigNumber'
import { useStakingNFTContract } from '../../hooks/useContract'
import notification from './Components/Alert'
import { Staked } from './Staked'
import { Unstaked } from './Unstaked'
import { StakingNFT, NFT } from '../../config/constants/types'
import { useActiveWeb3React } from '../../hooks/index'
import { foundNFT, findNFT } from '../../utils/array'

interface PoolsProps {
  myTokens: NFT[]
  activeTab: string
}

const Pools: React.FC<PoolsProps> = ({ myTokens, activeTab }) => {
  const [stakingTokens, setStakingTokens] = useState<StakingNFT[]>([])
  const [approvedTokens, setApprovedTokens] = useState<StakingNFT[]>([])
  const [maxDepositAmount, setMaxDepositAmount] = useState<JSBI>(JSBI.BigInt(0))
  const isInitial = useRef<boolean>(false)
  const { account } = useActiveWeb3React()

  const stakingNFTContract = useStakingNFTContract()

  useEffect(() => {
    const getTokens = () => {
      if (stakingNFTContract) {
        stakingNFTContract
          .getAllPools()
          .then((response: StakingNFT[]) => {
            const formatted = response.map((item) => ({
              ...item,
              tokenID: (item.tokenID as any).toNumber(),
              createdAt: new Date((item.createdAt as unknown as number) * 1000),
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

    if (
      account &&
      myTokens.length > 0 &&
      stakingNFTContract &&
      (activeTab === '3' || activeTab === '4') &&
      !isInitial.current
    ) {
      getTokens()
      isInitial.current = true
    }
  }, [stakingNFTContract, account, myTokens, isInitial, activeTab])

  useEffect(() => {
    const max = getMaxBy(approvedTokens, 'depositAmount')
    setMaxDepositAmount(getBigNumber(max))
  }, [approvedTokens])

  const changeViewWhenStake = ({ tokenID, contractAddress }) => {
    setApprovedTokens((prevState) =>
      prevState.filter((token) => token.tokenID !== tokenID || token.contractAddress !== contractAddress),
    )
    setStakingTokens((prevState) => [
      ...prevState,
      { ...findNFT(approvedTokens, contractAddress, tokenID), owner: account, createdAt: new Date(Date.now()) },
    ])
  }

  const changeViewWhenWithdraw = ({ tokenID, contractAddress }) => {
    setStakingTokens((prevState) =>
      prevState.filter((token) => token.tokenID !== tokenID || token.contractAddress !== contractAddress),
    )
    setApprovedTokens((prevState) => [
      ...prevState,
      {
        ...findNFT(stakingTokens, contractAddress, tokenID),
        owner: ethers.constants.AddressZero,
      },
    ])
  }

  return (
    <>
      <TabPane tabId="3">
        {approvedTokens.length > 0 && (
          <Unstaked
            changeViewWhenStake={changeViewWhenStake}
            approvedTokens={approvedTokens}
            maxDepositAmount={maxDepositAmount}
          />
        )}
      </TabPane>

      <TabPane tabId="4">
        {stakingTokens.length > 0 && (
          <Staked changeViewWhenWithdraw={changeViewWhenWithdraw} stakingTokens={stakingTokens} />
        )}
      </TabPane>
    </>
  )
}

export default Pools
