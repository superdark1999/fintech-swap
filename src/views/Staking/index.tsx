// import axios from 'axios'
import Page from 'components/layout/Page'
import React, { useState } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import styled from 'styled-components'
import NavBar from './Components/NavBar'
import MyCollection from './MyCollection'
import Pending from './Pending'
import Pools from './Pools'
import { NFT } from '../../config/constants/types'

const StakingNft: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1')
  const [myTokens, setMyTokens] = useState<NFT[]>([])
  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab={activeTab} toggle={toggle} />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <MyCollection activeTab={activeTab} setMyTokens={setMyTokens} />
          </TabPane>

          <TabPane tabId="2">
            <Pending activeTab={activeTab} />
          </TabPane>

          <Pools activeTab={activeTab} myTokens={myTokens} />
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

export default StakingNft
