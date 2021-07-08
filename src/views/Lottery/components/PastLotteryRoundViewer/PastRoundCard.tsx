import React from 'react'
import styled from 'styled-components'
// import { Card } from '@luckyswap/uikit'
import { DataResponse } from 'utils/getLotteryRoundData'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: DataResponse
}

const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data }) => {
  return <FullWidth>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails data={data} />}</FullWidth>
}

const FullWidth = styled.div`
  width: 100%;
  background: linear-gradient(45deg,rgb(35 35 35) 30%,rgb(45 45 45) 100%);
  box-shadow: none;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 20px;
  border-radius: 14px;

  @media (min-width: 991px) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 30px;
  }
`

export default PastRoundCard
