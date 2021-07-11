import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import HistoryChart from './HistoryChart'
import Legend from './Legend'

const PastDrawsHistoryCard: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <FullWidth>
      <CardBody>
        <Heading size="md">{TranslateString(746, 'History')}</Heading>
        <Legend />
        <HistoryChart />
      </CardBody>
    </FullWidth>
  )
}

const FullWidth = styled(Card)`
  max-width: 100%;
  background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
  box-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 60px;
  border-radius: 14px;
`

export default PastDrawsHistoryCard
