import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@luckyswap/uikit'
import { ifosConfig } from 'config/constants'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>

      <BoxIDO>
        <div className="content">
          <h4>How to launch your own IDO ?</h4>
          <p>Launch your project with LuckySwap, LuckySwap is a decentralized trading platform that uses the automatic market maker (AMM) model. At the same time LuckySwap is the 1st AMM+NFT exchange on Binance Smart Chain.Various data indicate the rapid growth of LuckySwap in the DEFI ecosystem</p>
          <a href="/">Apply Now</a>
        </div>
      </BoxIDO>
    </div>
  )
}

const BoxIDO = styled.div`
  background: linear-gradient(90deg, rgba(0,167,225,1) 0%, rgba(41,244,195,1) 100%);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 40px;

  .content {
    width: 920px;
    padding: 20px 125px 10px 211px;

  }

  h4 {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 22px;
  }

  a {
    display: inline-block;
    width: 152px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(180.24deg,rgb(114 186 255) 0.21%,rgb(28 144 255) 63.19%);
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-weight: 500;
    margin-top: 18px;

    &:hover {
      opacity: 0.7;
      transition: 0.5s;
    }
  }
`

export default Ifo
