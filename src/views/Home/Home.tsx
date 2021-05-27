import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import BannerHome from './components/BannerHome'
import BalanceHome from './components/BalanceHome'
import ProfitHome from './components/ProfitHome'
import InterestHome from './components/InterestHome'
import ListArtHome from './components/ListArtHome'

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
      <BannerHome />
      <Page>
        <BalanceHome />
        <ProfitHome />
        <InterestHome />
        <ListArtHome />
      </Page>
    </>
  )
}

export default Home
