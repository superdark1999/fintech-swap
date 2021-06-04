import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@luckyswap/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  display: flex;
  align-items: center;
  background: url('../images/banner-mobile.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 350px;
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    background: url('../images/banner-tablet.png');
    background-repeat: no-repeat;
    background-size: cover;
 }

 @media (min-width: 991px) {
    background: url('../images/large-pc.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`

const Titletop = styled.h1`
  color: #fff;
  font-weight: 600;
  line-height: 1.1;
  font-size: 40px;
  margin-bottom: 24px;
`

const BoxTitle = styled.div`
  padding-left: 50px;

  @media (min-width: 768px) {
    padding-left: 100px;
  }

  @media (min-width: 991px) {
    padding-left: 120px;
  }
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <BoxTitle>
        <Titletop>Luckyswap Launchpad</Titletop>
        <Blurb>{TranslateString(502, 'Finding the best investment opportunities for you')}</Blurb>
      </BoxTitle>
  </StyledHero>
  )
}

export default Hero
