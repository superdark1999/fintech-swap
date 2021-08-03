import Page from 'components/layout/Page'
import StakingNftAbi from 'config/abi/StakingNft.json'
import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import { stakingNftService } from 'services'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/index'
import { useStakingNftContract } from '../../hooks/useContract'
import { getStakingNftAddress } from '../../utils/addressHelpers'
import { multicallv2 } from '../../utils/multicall'
import notification from './Components/Alert'
import CardStaking from './Components/CardStaking'
import NavBar from './Components/NavBar'

const WrapStaking: React.FC = () => {
  const [stakingTokens, setStakingTokens] = useState([])

  useEffect(() => {
    const getStakingTokens = async () => {
      const data = await stakingNftService
        .getStakingTokens()
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))
      setStakingTokens(data)
    }
    getStakingTokens()
  }, [])

  return stakingTokens.length && <Staking stakingTokens={stakingTokens} setStakingTokens={setStakingTokens} />
}

interface StakingPageProps {
  stakingTokens: any
  setStakingTokens: any
}

const Staking: React.FC<StakingPageProps> = ({ stakingTokens, setStakingTokens }) => {
  // console.log('staking tokens : ', stakingTokens)
  const stakingNftContract = useStakingNftContract()
  const { chainId } = useActiveWeb3React()
  // const luckyToken = useToken(XLUCKY_ADDRESSES[chainId ?? 97])
  // const results = usePendingRewards(
  //   stakingTokens.map((token) => ({ tokenID: token.tokenID, contractAddress: token.contractAddress })),
  // )

  useEffect(() => {
    console.log('stakingTokens : ', stakingTokens)
    const calls = stakingTokens.map((t) => ({
      address: getStakingNftAddress(),
      name: 'pendingReward',
      params: [t.contractAddress, t.tokenID],
    }))

    multicallv2(StakingNftAbi, calls, { requireSuccess: false }).then((result) => {
      console.log('result : ', result)
    })
  }, [stakingTokens])

  // useEffect(() => {
  //   console.log(stakingTokens[0].contractAddress, stakingTokens[0].tokenID)
  //   stakingNftContract.pendingReward(stakingTokens[0].contractAddress, stakingTokens[0].tokenID).then((response) => {
  //     console.log('response pending reward : ', response)
  //   })
  // })

  // console.log('results : ', results)

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab="3" />
        <Row>
          {stakingTokens.map((token) => (
            <CardStaking image={token.urlImg} contractAddress={token.contractAddress} tokenID={token.tokenID} />
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

export default WrapStaking
