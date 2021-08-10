import React from 'react'
import styled from 'styled-components'
import { Text } from '@luckyswap/uikit'
import formatLotteryDate from '../helpers/formatLotteryDate'

const Wrapper = styled.div`
  padding-top: 20px;
`

const Timestamp = ({ timeValue }) => {
  const { monthAndDay, hours } = formatLotteryDate(timeValue)

  return (
    <Wrapper>
      <Text fontSize="14px">
        {monthAndDay}, {hours}:00 UTC
      </Text>
    </Wrapper>
  )
}

export default Timestamp
