import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text } from '@luckyswap/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityFarms } from 'config/constants'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'
import {Row, Col} from 'antd'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import StakedNFTAction from './StakedNFTAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'


export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

const Container = styled(Row)`
  background-color: transparent !important;
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  // display: grid;
  // grid-template-columns: repeat(4,1fr);
  justify-self: center;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 20px;
    background-color: transparent !important;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  color: #fff;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #8c8c8c;
  min-height: 140px;
  justify-content: center;
  @media (max-width: 576px) {
    border-left: unset;
  }
  // &:not(:last-child) {
  //   border-left: 1px solid #8c8c8c;
  // }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;
  

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const BoxHead = styled.div`
  background-color: #444444;
  color: #8c8c8c;
  padding: 20px;
  display: block;
  // grid-template-columns: repeat(4, 1fr);
  justify-self: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
`

const Item = styled.div`
`
const ColContent = styled(Col)`
  // & > div:nth-child(2){
  //   border-right: 1px solid #8c8c8c;
  // }
  // @media (max-width: 576px) {
  //   border-right: unset;
  // }
`
const StakedYourNFT = styled.div`
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, multiplier, liquidity }) => {
  const farm = details

  const TranslateString = useI18n()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://testnet.bscscan.com/address/${lpAddress}`
  const info = ``
  const isCommunityFarm = communityFarms.includes(token.symbol)

  return (
    <>
    {/* <BoxHead>
      <Item>Infomation</Item>
      <Item>WAD Earned</Item>
      <Item>Farming</Item>
      <Item>Your NFT</Item>
    </BoxHead> */}

    <Container>
      <ColContent span={24} md={farm.type == "space-hunter" ? 6 : 8}>
        <BoxHead>
          <Item>Infomation</Item>
        </BoxHead>
        <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`https://luckyswap.finance/#/add/${liquidityUrlPathParts}`}>
              {TranslateString(999, `Get ${lpLabel}`, { name: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc} color="#2b2c3a">
          {TranslateString(999, 'View Contract')}
        </StyledLinkExternal>
        <StyledLinkExternal href="#">{TranslateString(999, 'See Pair Info')}</StyledLinkExternal>
        <TagsContainer>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer>

      </ColContent>
      
      <ValueContainer>
        <ValueWrapper>
          <Text>{TranslateString(736, 'APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer>
      <ColContent span={24} md={farm.type == "space-hunter" ? 6 : 8}>
        <BoxHead>
          <Item> Earned</Item>
        </BoxHead>
        <ActionContainer>
        <HarvestAction {...farm} />
      </ActionContainer>
      </ColContent>
      
      <ColContent span={24} md={farm.type == "space-hunter" ? 5 : 8}>
        <BoxHead>
          <Item>Farming</Item>
        </BoxHead>
        <ActionContainer>
          <StakedAction {...farm} />
      </ActionContainer>
      </ColContent>
      
      <ColContent span={farm.type == "space-hunter" ? 24 : 0} md={farm.type == "space-hunter" ? 7 : 0}>
        <BoxHead>
          <Item>Your NFT</Item>
        </BoxHead>
        <ActionContainer>
          <StakedNFTAction {...farm} />
        {/* <StakedYourNFT>
          
        </StakedYourNFT> */}
        </ActionContainer>
      </ColContent>
    </Container>
    </>
  )
}

export default ActionPanel
