import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text } from '@luckyswap/uikit'


export interface PlatformProps {
  platform: number
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Platform: React.FunctionComponent<PlatformProps> = () => {
  return (
    <Container>
      <LiquidityWrapper>
        <Text>HUT</Text>
      </LiquidityWrapper>
    </Container>
  )
}

export default Platform
