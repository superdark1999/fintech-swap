import { isApproveForAllNFTs } from 'data/Allowances'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import notification from 'views/Staking/Components/Alert'
import useWeb3Provider from 'hooks/useWeb3Provider'

import { useFarmNFTContract } from '../../../../../hooks/useContract'
import { useStakeNFTsFarm, useUnstakeNFTsFarm } from '../../../../../hooks/useStakeNFTsFarm'
import { useMySpaceHunterCollection } from '../../../../../state/hooks'
import { useTransactionAdder } from '../../../../../state/transactions/hooks'
import StakeNFTModal from '../../StakeNFTModal'
import { Title } from './styles'
import { useActiveWeb3React } from '../../../../../hooks/index'
import { approveForAllNFTs } from '../../../../../data/Allowances'
import { getNFTContract } from '../../../../../utils/contractHelpers'
import { useTotalBonus, useNFTsBoosted } from '../../../../../hooks/useSpaceHunterBoosted'

const StakeNFT = styled.div``
const BoxAction = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`
const NFTChosen = styled.div``
const BonusAndAction = styled.div`
  margin: auto 0;
`
const Bonus = styled.div`
  color: #5ffff8;
  margin-bottom: 14px;
`
const StakeAction = styled.div`
  cursor: pointer;
  border-radius: 16px;
  padding: 14px 24px;
  background-color: transparent;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: none;
  color: rgb(255, 255, 255);
  :hover {
    opacity: 0.7;
  }
`
const ImgNFT = styled.img`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid #ffffff63;
  opacity: 0.8;
`
const TitleNFT = styled(Title)`
  color: white;
  margin-bottom: ;
`
const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, lpSymbol, lpAddresses, quoteToken, token }) => {
  const [isVisibleStakingModal, setIsVisibleStakingModal] = useState(false)
  const [isVisibleCanStakeModal, setIsVisibleCanStakeModal] = useState(false)
  useNFTsBoosted(pid)
  const [totalBonus, setTotalBonus] = useTotalBonus(pid)
  const mySpaceHunterCollection = useMySpaceHunterCollection()
  const farmContract = useFarmNFTContract()
  const addTransaction = useTransactionAdder()
  const [isPendingStake, isConfirmedStake, stakeNFTsFarmCallback] = useStakeNFTsFarm()
  const [isPendingUnstake, isConfirmedUnstake, unstakeNFTsFarmCallback] = useUnstakeNFTsFarm()
  const [isApprovalForAllNfts, setIsApprovalForAllNfts] = useState<boolean>(false)
  const [addressesNeedApprove, setAddressesNeedApprove] = useState<string[]>([])
  const { account } = useActiveWeb3React()
  const [isPendingApprove, setIsPendingApprove] = useState<boolean>(false)
  const provider = useWeb3Provider()

  useEffect(() => {
    const interval = setInterval(async () => {
      const nftsCanStake = mySpaceHunterCollection.filter((item) => !item.isUsingToBoost).map((item) => item)
      const contractAddresses: string[] = []
      nftsCanStake.forEach((item) => {
        if (!contractAddresses.includes(item.contractAddress)) {
          contractAddresses.push(item.contractAddress)
        }
      })

      setAddressesNeedApprove(contractAddresses)

      isApproveForAllNFTs(contractAddresses, farmContract.address, account).then((response) => {
        setIsApprovalForAllNfts(response)
        if (response) {
          clearInterval(interval)
        }
      })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [mySpaceHunterCollection, account, farmContract])

  return (
    <StakeNFT>
      <TitleNFT>Stake NFT to bonus your farm</TitleNFT>
      <BoxAction>
        <NFTChosen>
          <ImgNFT src="/images/farms/image.png" />
        </NFTChosen>
        <BonusAndAction>
          <Bonus>Bonused: {totalBonus ?? '0'}%</Bonus>
          {isApprovalForAllNfts && (
            <>
              <StakeAction
                onClick={() => {
                  setIsVisibleCanStakeModal(false)
                  setIsVisibleStakingModal(true)
                }}
              >
                Staking
              </StakeAction>
              <StakeAction
                onClick={() => {
                  setIsVisibleCanStakeModal(true)
                  setIsVisibleStakingModal(false)
                }}
              >
                Can stake
              </StakeAction>
            </>
          )}

          {addressesNeedApprove.length > 0 && !isApprovalForAllNfts && (
            <StakeAction
              onClick={() => {
                // if (addressesNeedApprove.length === 0) {
                //   notification('error', { message: 'Approve error', description: 'Wait for 5 seconds to click again' })
                //   return
                // }
                setIsPendingApprove(true)
                const contractsNeedApprove = addressesNeedApprove.map((item) =>
                  getNFTContract(item, provider.getSigner()),
                )
                approveForAllNFTs(contractsNeedApprove, farmContract.address)
                  .then(() => {
                    setIsPendingApprove(false)
                  })
                  .catch((err) => {
                    notification('error', { message: 'Approve error', description: err?.message })
                    setIsPendingApprove(false)
                  })
              }}
            >
              Approve all NFTs
            </StakeAction>
          )}
        </BonusAndAction>
      </BoxAction>
      <StakeNFTModal
        pid={pid}
        title="Your staking NFT"
        visible={isVisibleStakingModal}
        setVisible={setIsVisibleStakingModal}
        data={mySpaceHunterCollection.filter((item) => item.isUsingToBoost)}
        stakeNFTsToBoost={stakeNFTsFarmCallback}
        unstakeNFTsBoosting={unstakeNFTsFarmCallback}
        isPendingStake={isPendingStake}
        isPendingUnstake={isPendingUnstake}
        isApprovalForAllNfts={isApprovalForAllNfts}
        isPendingApprove={isPendingApprove}
        setTotalBonus={setTotalBonus}
      />
      <StakeNFTModal
        pid={pid}
        title="Stake your NFT"
        visible={isVisibleCanStakeModal}
        setVisible={setIsVisibleCanStakeModal}
        data={mySpaceHunterCollection.filter((item) => !item.isUsingToBoost)}
        stakeNFTsToBoost={stakeNFTsFarmCallback}
        unstakeNFTsBoosting={unstakeNFTsFarmCallback}
        isPendingStake={isPendingStake}
        isPendingUnstake={isPendingUnstake}
        isApprovalForAllNfts={isApprovalForAllNfts}
        isPendingApprove={isPendingApprove}
        setTotalBonus={setTotalBonus}
      />
    </StakeNFT>
  )
}

export default Staked
