import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@luckyswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
  margin: 0 !important;
  max-width: 100% !important;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${(props) =>
    props.isDisabled
      ? `  
        margin-top: 0;
        background-color: unset;
        box-shadow: unset;
        border: 1px solid ${props.theme.colors.textDisabled};

        ${props.theme.mediaQueries.sm} {
          margin-top: 0;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 0;
        }
        `
      : ``}
`

const YourPrizesCard: React.FC = () => {
  const { claimAmount } = useTotalClaim()

  const winnings = getBalanceNumber(claimAmount)
  console.log('winnings?',claimAmount,winnings)
  const isAWin = winnings > 0

  return (
    <StyledCard isDisabled={!isAWin} isActive={isAWin}>
      <CardBody>{isAWin ? <PrizesWonContent /> : <NoPrizesContent />}</CardBody>
    </StyledCard>
  )
}

export default YourPrizesCard
