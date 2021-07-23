import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, TicketRound, Text, Heading } from '@luckyswap/uikit'
import axios from 'axios'

import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTickets from 'hooks/useTickets'
import { useCurrentTime } from 'hooks/useTimer'
import useRefresh from 'hooks/useRefresh'
import { BASE_API_ADMIN } from 'config'
import TicketActions from './TicketActions'
import { getTicketSaleTime, getTimeRemainDraw } from '../../helpers/CountdownHelpers'


interface CardProps {
  isSecondCard?: boolean
}

const StyledCard = styled(Card)<CardProps>`
  margin: 0 !important;
  max-width: 100% !important;
  border-radius: 14px;

  ${(props) =>
    props.isSecondCard
      ? `  
        margin-top: 0;

        ${props.theme.mediaQueries.sm} {
          margin-top: 0;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 0;
        }
        `
      : ``}
`

const CardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const IconWrapper = styled.div`
  margin-bottom: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const TicketCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const TicketCard: React.FC<CardProps> = ({ isSecondCard = false }) => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()

  const tickets = useTickets()
  const ticketsLength = tickets.length

  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = lotteryHasDrawn && getTicketSaleTime(currentMillis)

  const { fastRefresh } = useRefresh()
  const [timeRemainDraw, setTimeRemainDraw] = useState("");
  const [timeRemainSale, setTimeRemainSale] = useState("");

  useEffect(() => {
    const fetchTimeLottery = async () => {
      const timeEndLottery = new Date();
      const timeStartLottery = new Date();
      const {data} = await axios.get(`${BASE_API_ADMIN}/lotteries`);

      // set time remain to end lottery phase
      timeEndLottery.setHours(data[0].timeDrawLottery.hh, data[0].timeDrawLottery.mm, 0);
      setTimeRemainDraw(getTimeRemainDraw(timeEndLottery));

      // set time remain to start new lottery phase
      timeStartLottery.setHours(data[0].timeStartNewPhase.hh, data[0].timeStartNewPhase.mm, 0);
      setTimeRemainSale(getTimeRemainDraw(timeStartLottery));
    }
    fetchTimeLottery();
  },[fastRefresh])
  // 12
  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardBody>
        <CardHeader>
          <IconWrapper>
            <img alt="" src="../images/icon-lottery.svg" />
          </IconWrapper>
          {lotteryHasDrawn ? (
            <TicketCountWrapper>
              <Text fontSize="20px" color="textSubtle">
                {TranslateString(870, 'Your ticket for this round')}
              </Text>
              <Heading size="lg" style={{ color: '#F3C111', fontSize: '30px' }}>
                {timeRemainSale}
              </Heading>
            </TicketCountWrapper>
          ) : (
            <TicketCountWrapper>
              <Text fontSize="14px" color="textSubtle">
                {TranslateString(724, 'Your tickets for this round')}
              </Text>
              <Heading size="lg">{ticketsLength}</Heading>
            </TicketCountWrapper>
          )}
        </CardHeader>
        <TicketActions />
      </CardBody>
    </StyledCard>
  )
}

export default TicketCard
