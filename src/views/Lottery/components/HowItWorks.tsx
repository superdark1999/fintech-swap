import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  margin-bottom: 30px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  padding: 20px;
  background-color: #2b2a2a;
  text-align: center;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledImage = styled(Image)`
  align-self: center;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
  border: 1px solid #F3C111;
  background-color: transparent;
  color: #F3C111;
  padding: 10px 20px;
  border-radius: 14px;

  &:hover {
    color: #ecf023;
  }
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <StyledHeading size="lg" as="h3" color="rgb(243, 193, 17)">
        {TranslateString(632, 'How it works')}
      </StyledHeading>
      <Text fontSize="16px">
        Spend LUCKY to buy tickets, contributing to the lottery pot.<br/> Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order!
      </Text>
      <StyledLink href="https://docs.luckyswap.io">{TranslateString(610, 'Read more')}</StyledLink>
    </LayoutWrapper>
  )
}
export default HowItWorks
