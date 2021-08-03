import Page from 'components/layout/Page'
import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import styled from 'styled-components'
import { stakingNftService } from '../../services/index'
import notification from './Components/Alert'
import PendingToken from './Components/CardPending'
import NavBar from './Components/NavBar'

const Pending: React.FC = () => {
  const [pendingTokens, setPendingTokens] = useState([])

  useEffect(() => {
    const fetchPendingTokens = async () => {
      const data = await stakingNftService
        .getPendingTokens()
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))

      setPendingTokens(data)
    }

    fetchPendingTokens()
  }, [])

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab="2" />
        <Row>
          {pendingTokens.map((token) => (
            <PendingToken image={token.urlImg} />
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
export default Pending
