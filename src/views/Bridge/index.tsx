// import axios from 'axios'
import Page from 'components/layout/Page'
import React, { useState } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import styled from 'styled-components'
import { getAddress } from 'ethers/lib/utils'
import { NFT } from '../../config/constants/types'
import NavBar from './components/Navbar'
import notification from '../Staking/Components/Alert'
import { mapperService } from '../../services/index'
import { useNFTContract } from '../../hooks/useContract'
import { getNFTContract } from '../../utils/contractHelpers'
import { useActiveWeb3React } from '../../hooks/index'
import useWeb3Provider from '../../hooks/useWeb3Provider'
import CardNFT from './components/CardToken'
import { useEthCollectionFullInfo } from '../../hooks/useCollection'

const Bridge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1')
  const myCollection = useEthCollectionFullInfo()
  console.log('my collection : ', myCollection)

  const registerMapping = async (index: number) => {
    try {
      const token = myCollection[index]

      await mapperService.requestMapping({
        chain_id: 80001,
        child_token: '',
        decimals: 0,
        email: 'kh1em9800@gmail.com',
        map_type: 'POS',
        mintable: false,
        name: `${token.tokenName} (PoS)`,
        root_token: getAddress(token.contractAddress),
        symbol: token.tokenSymbol,
        token_type: 'ERC721',
        uri: null,
      })

      notification('success', { message: 'Success', description: 'Mapping request sent to server' })
    } catch (error) {
      notification('error', { message: 'Error', description: error?.message })
    }
  }

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab={activeTab} toggle={toggle} />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            {myCollection.map((item, index) => (
              <CardNFT
                tokenID={item.tokenID}
                contractAddress={item.contractAddress}
                image={item.image}
                index={index}
                onRegister={registerMapping}
              />
            ))}
          </TabPane>

          <TabPane tabId="2"></TabPane>

          <TabPane tabId="3"></TabPane>
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

export default Bridge

// 'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=0x0d5375E211Ce255513f4246Bf934C1762cD2B80F&sort=asc&apikey=H73WJKKZ7PP5WGF9C11EAPU8MJKY9BNHIJ'
