import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: rgb(243, 193, 17);
  margin-bottom: 5px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  // background: url('../images/large-pc.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 60px;
  padding-top: 60px;
  background-color:#0000001a;
`

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 400px;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const ContentDes = styled.div`
  margin-bottom: 20px;
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <LeftWrapper>
          <img src="images/banner-jackpot.png" alt=""/>
        </LeftWrapper>

        <RightWrapper>
          <ContentDes>
            <Title>{TranslateString(708, 'The LUCKY Lottery')}</Title>
            <Blurb>{TranslateString(710, 'Buy tickets with LUCKY for collect more NFTs')}</Blurb>
            <Blurb>{TranslateString(712, 'Win if 2, 3, or 4 of your ticket numbers match!')}</Blurb>
          </ContentDes>
          <LotteryProgress />
        </RightWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
