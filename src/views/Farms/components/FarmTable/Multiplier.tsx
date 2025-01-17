import React from 'react'
import styled from 'styled-components'
import { HelpIcon } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'

import Tooltip from '../Tooltip/Tooltip'

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: auto;
  text-align: right;
  background-color: #BF4855;
  border-radius: 10px;
  padding: 10px;
  font-weight: 600;

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

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : '-'
  const TranslateString = useI18n()

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      {/* <Tooltip
        content={
          <div>
            {TranslateString(999, 'The multiplier represents the amount of LUCKY rewards each farm gets.')}
            <br />
            <br />
            {TranslateString(
              999,
              'For example, if a 1x farm was getting 1 LUCKY per block, a 40x farm would be getting 40 LUCKY per block.',
            )}
          </div>
        }
      >
        <HelpIcon color="textSubtle" />
      </Tooltip> */}
    </Container>
  )
}

export default Multiplier
