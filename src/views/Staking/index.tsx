import { useWeb3React } from '@web3-react/core'
import Page from 'components/layout/Page'
import { BigNumber, ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Row, TabContent, TabPane } from 'reactstrap'
import { fetchImagePool, fetchUserPendingRewards } from 'state/poolsNft/fetchPoolUser'
import styled from 'styled-components'
import { useStakingNftContract } from '../../hooks/useContract'
import CardStaking from './Components/CardStaking'
import NavBar from './Components/NavBar'

const Staking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1')
  const [pools, setPools] = useState([])
  const { chainId } = useWeb3React()

  const stakingNftContract = useStakingNftContract()

  useEffect(() => {
    const getPools = async () => {
      if (stakingNftContract) {
        const allPools = await stakingNftContract.getAllPools()

        const images = await fetchImagePool(allPools, chainId)
        const pendingRewards = await fetchUserPendingRewards(allPools, chainId)

        setPools(
          allPools.map((p, index) => ({
            ...p,
            image: images[index],
            pendingReward: pendingRewards[index].toNumber(),
          })),
        )
      }
    }
    getPools()
  }, [stakingNftContract, chainId])

  const stakeHandler = async (nftContract, tokenId) => {
    await stakingNftContract.stake(ethers.utils.getAddress(nftContract), BigNumber.from(tokenId))
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab={activeTab} toggle={toggle} />

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              {pools.map((p, index) => (
                <CardStaking
                  image={p.image}
                  isStaking={p.owner !== ethers.constants.AddressZero}
                  nftContract={p.nftContract}
                  reward={p.reward}
                  tokenId={p.tokenId}
                  onStake={stakeHandler}
                />
              ))}
            </Row>
          </TabPane>
        </TabContent>
      </StakingPage>
    </Page>
  )
}

const StakingPage = styled.div`
  .align-center {
    display: unset;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
    }

    &:hover {
      cursor: pointer;

      .thumb {
        transform: scale(0.9);
        transition: all 0.9s;
      }

      .effect-light {
        text-align: center;
        font-size: 1.2em;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        animation: blur 0.75s ease-out infinite;
        text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
      }
    }
  }

  .space-mb {
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #ffffff57;

      &:last-child {
        border: none;
      }
    }
  }
`

const BoxCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: auto;

  @media (min-width: 768px) {
    max-width: 230px;
  }
`

const Figure = styled.div`
  position: relative;
  width: 180px;
  height: 276px;
  overflow: hidden;

  .thumb {
    height: inherit;
    transform: scale(1);
    transition: all 0.9s;
    object-fit: cover;
  }

  .line-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`

const Launchers = styled.div`
  margin-bottom: 15px;
`

const BoxFooter = styled.div`
  background: #2f2f2f;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  width: 280px;

  @media (min-width: 768px) {
    width: 100%;
  }
`

const Btn = styled.button`
  background: url('../images/staking/line-button.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  height: 67px;
  line-height: 67px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  color: #ff3b3b;
  border: 0;

  &.green-color {
    color: #1cbb1c;
  }

  &:hover {
    .effect-light {
      text-align: center;
      font-size: 1.2em;
      color: #fff;
      font-weight: 700;
      text-transform: uppercase;
      animation: blur 0.75s ease-out infinite;
      text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
    }
  }

  @keyframes blur {
    from {
      text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff,
        0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff,
        0px 0px 50px #7b96b8, 0px 0px 150px #7b96b8, 0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8,
        0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8, 0px -10px 100px #7b96b8, 0px -10px 100px #7b96b8;
    }
  }
`

const Space = styled.div`
  padding: 15px;
`

const Title = styled.h2`
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  margin-bottom: 10px;
`

const Dflex = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
`

const Number = styled.h3`
  color: #f4c708;
  font-size: 24px;
  font-family: 'Roboto Mono', monospace !important;
  font-weight: 600;
  position: relative;
  transform: scale(1);
  text-shadow: -1px 0 1px #c5a354, 0 1px 1px #e0b649, 5px 5px 10px rgb(179 167 106 / 78%),
    -5px -5px 10px rgb(183 155 65 / 40%);

  &:before {
    content: attr(data-heading);
    left: 0;
    top: 0;
    position: absolute;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      #ffe047 22%,
      #fff144 24%,
      #cfc09f 26%,
      #ffe686 27%,
      #ffecb3 40%,
      #ffe14f 78%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: none;
  }
`

const Ticket = styled.div`
  background: url('../images/staking/bg-button.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  height: 36px;
  text-transform: uppercase;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  font-weight: 600;
`

export default Staking
