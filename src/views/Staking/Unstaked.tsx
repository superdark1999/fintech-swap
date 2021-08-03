// import axios from 'axios'
import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import Page from 'components/layout/Page'
import NftAbi from 'config/abi/nft.json'
import addresses from 'config/constants/contracts'
import { ethers } from 'ethers'
import { useApproveCallback } from 'hooks/useApproveCallback'
import useWeb3Provider from 'hooks/useWeb3Provider'
import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import styled from 'styled-components'
import { XLUCKY_ADDRESSES } from '../../config/index'
import { useActiveWeb3React } from '../../hooks/index'
// import { useApproveCallback } from 'hooks/useApproveCallback'
import { useToken } from '../../hooks/Tokens'
import { useStakingNftContract } from '../../hooks/useContract'
// import addresses from 'config/constants/contracts';
import { stakingNftService } from '../../services/index'
import { getAddress } from '../../utils/addressHelpers'
import { getContract2 } from '../../utils/contractHelpers'
import notification from './Components/Alert'
import CardApproved from './Components/CardApproved'
import NavBar from './Components/NavBar'

const Unstaked: React.FC = () => {
  const [approvedTokens, setApprovedTokens] = useState([])
  const stakingNftContract = useStakingNftContract()
  const { chainId } = useActiveWeb3React()
  const luckyToken = useToken(XLUCKY_ADDRESSES[chainId ?? 97])
  const [approveAmount, setApproveAmount] = useState<JSBI>(JSBI.BigInt(0))

  const [approvalLucky, approveLuckyCallback] = useApproveCallback(
    CurrencyAmount.fromRawAmount(luckyToken, approveAmount),
    stakingNftContract?.address,
  )
  const provider = useWeb3Provider()

  console.log('approved tokens : ', approvedTokens)

  useEffect(() => {
    const getApprovedTokens = async () => {
      const data = await stakingNftService
        .getApprovedTokens()
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))
      setApprovedTokens(data)
    }
    getApprovedTokens()
  }, [])

  const stakeHandler = async ({ tokenID, contractAddress, depositAmount }) => {
    try {
      const stakingNftAddress = getAddress(addresses.stakingNft)
      setApproveAmount(JSBI.multiply(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)), JSBI.BigInt(depositAmount)))

      // if (approvalLucky !== ApprovalState.APPROVED && approvalLucky !== ApprovalState.PENDING) {
      //   await approveLuckyCallback()
      // }

      const erc721Contract = getContract2(NftAbi, contractAddress, provider.getSigner())
      await erc721Contract.approve(stakingNftAddress, ethers.BigNumber.from(tokenID))
      await stakingNftContract.stake(ethers.utils.getAddress(contractAddress), ethers.BigNumber.from(tokenID))
    } catch (error) {
      console.log('stake error : ', error)
    }
  }

  const approveHandler = () => {
    console.log('approve ne')
    approveLuckyCallback().catch((error) => {
      console.log('approve error : ', error)
    })
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab="3" />
        <Row>
          {approvedTokens.map((token) => (
            <CardApproved
              image={token.urlImg}
              contractAddress={token.contractAddress}
              tokenID={token.tokenID}
              depositAmount={token.depositAmount}
              onStake={stakeHandler}
              approveState={approvalLucky}
              onApprove={approveHandler}
            />
          ))}
        </Row>
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

export default Unstaked
