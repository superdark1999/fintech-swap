import Page from 'components/layout/Page'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { Row, TabContent, TabPane } from 'reactstrap'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/index'
import { fetchNftUser as fetchNftTokenUser, getImageFromTokens } from '../../state/poolsNft/fetchPoolInfo'
import CardNftToken from './Components/CardToken'
import NavBar from './Components/NavBar'

const Nft: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1')
  const [tokens, setTokens] = useState([])
  const { account } = useActiveWeb3React()

  console.log('tokens : ', tokens)

  useEffect(() => {
    const getUserTokens = async () => {
      let userTokens = await fetchNftTokenUser(account)
      const map = new Map()
      for (let i = 0; i < userTokens.length; i++) {
        const key = `${userTokens[i].tokenID}-${userTokens[i].contractAddress}`
        const temp = map.get(key)
        if (temp) {
          map.set(key, temp + 1)
        } else {
          map.set(key, 1)
        }
      }

      userTokens = userTokens.filter((token) => {
        const key = `${token.tokenID}-${token.contractAddress}`
        if (map.get(key) % 2 === 0) {
          return false
        }
        return true
      })

      const images = await getImageFromTokens(userTokens)

      for (let i = 0; i < userTokens.length; i++) {
        userTokens[i].image = images[i]
      }

      setTokens(userTokens.filter((token) => token.image))
    }

    getUserTokens()
  }, [account])

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const registerHandler = (info) => {
    console.log('register info : ', info)
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab={activeTab} toggle={toggle} />

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              {/* {tokens.map((token) => (
                <CardNftToken
                  image={token.image}
                  nftContract={token.nftContract}
                  tokenId={token.tokenId}
                  onRegisterStaking={registerHandler}
                />
              ))} */}
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

export default Nft
