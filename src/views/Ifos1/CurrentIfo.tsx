import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@luckyswap/uikit'
import IfoCard from './components/IfoCard'
import Title from './components/Title'

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

/**
 * Note: currently there should be only 1 active IFO at a time
 */

const Ifo = () => {

  return (
    <div>
      <Title/>
      <IfoCard/>
    </div>
  )
}

export default Ifo
