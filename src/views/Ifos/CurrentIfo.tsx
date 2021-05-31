import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@luckyswap/uikit'
import { ifosConfig } from 'config/constants'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid #2b2c3a;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Titletop = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  color: #2b2c3a;
`

const SubTitle = styled.h3`
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  font-size: 20px;
  color: #ef994d;
`

const TextC = styled.p`
  font-size: 16px;
  color: #ef994d;
  margin-bottom: 16px;
`

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
    </div>
  )
}

export default Ifo
