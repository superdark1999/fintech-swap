import React from 'react'
import styled from 'styled-components'
// import { Card } from '@luckyswap/uikit'
import { LotteryRoundGraphEntity} from 'state/types'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: LotteryRoundGraphEntity
  initialLotteryNumber: number
  onSubmit: (num: number) => void
}

const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data, initialLotteryNumber, onSubmit }) => {
  return (
    <FullWidth>{error.message ? <PastRoundCardError error={error} /> 
    : <PastRoundCardDetails data={data}
    initialLotteryNumber={initialLotteryNumber} 
    onSubmit={onSubmit} />}</FullWidth>
  )
}

const FullWidth = styled.div`
  width: 100%;
  background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
  box-shadow: none;
  display: block;
  margin-bottom: 20px;
  border-radius: 14px;

  @media (min-width: 991px) {
    margin-bottom: 30px;
  }
`

export default PastRoundCard
