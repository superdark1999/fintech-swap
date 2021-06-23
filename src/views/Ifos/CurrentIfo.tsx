import React, {useEffect}from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@luckyswap/uikit'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'
/**
 * Note: currently there should be only 1 active IFO at a time
 */

const Ifo = ({ ifos }) => {

  return (
    <div>
      <IfoCards isSingle>
        {ifos.map((ifo) =>
          <IfoCard ifo={ifo} />
        )}
        
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
  background: url('../images/bg-ido.png');
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  height: 277px;
  margin-bottom: 40px;
  position: relative;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: auto;
    background: unset;
    padding: 20px;
  }

  .content {
    position: relative;
    padding: 20px 200px 10px 211px;
    color: #fff;

    @media (max-width: 768px) {
      padding: 0;
    }
  }

  h4 {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 10px;
    color: #fff;
  }

  p {
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 22px;
    font-weight: 500;
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
