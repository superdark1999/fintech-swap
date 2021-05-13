import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@beswap/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import LeadInBanner from 'views/TradingCompetition/components/LeadInBanner'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
    text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/pan-bg2.png'), url('/images/pan-bg.png');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6 / auto;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8 / auto;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6 / auto;
    }
  }
`

const CardsBot = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6 / auto;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8 / auto;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4 / auto;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 8;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 8;
    }
  }
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #F88521;
`

const Subtitle = styled.h3`
  color: #F88521;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
      <LeadInBanner />
      <Page>
        <Hero>
          {/* <Heading as="h1" size="xl" mb="24px" color="secondary">
            {TranslateString(576, 'PancakeSwap')}
          </Heading> */}
          {/* <Text>{TranslateString(578, 'The #1 AMM and yield farm on Binance Smart Chain.')}</Text> */}
          <Title>BeSwap</Title>
          <Subtitle>The AMM and yield farm on Binance Smart Chain.</Subtitle>
        </Hero>

        <div>
          <Cards>
            <FarmStakingCard />
            <CakeStats />
            {/* <LotteryCard /> */}
          </Cards>

          {/* <CTACards>
            <EarnAssetCard />
            <WinCard />
          </CTACards> */}

          <CardsBot>
            <EarnAPYCard />
            <EarnAssetCard />
            <TotalValueLockedCard />
          </CardsBot>
        </div>
      </Page>
    </>
  )
}

export default Home
