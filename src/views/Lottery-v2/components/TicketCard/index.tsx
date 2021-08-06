import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody, AutoRenewIcon, Text, Heading } from '@luckyswap/uikit'
import axios from 'axios'

import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import {useTicketLotteryV2} from 'hooks/useTicketLotteryV2'
import { useLottery } from 'state/hooks'
import { useCurrentTime } from 'hooks/useTimer'
import useRefresh from 'hooks/useRefresh'
import { LotteryStatus } from 'config/constants/types'
import { useActiveWeb3React } from 'hooks';
import { BASE_API_ADMIN, BASE_API_ADMIN_PRO } from 'config'
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


const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const TicketCard: React.FC<CardProps> = ({ isSecondCard = false }) => {
  const { chainId }  = useActiveWeb3React();
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()

  const {
    isTransitioning,
    currentRound: { status, userTickets },
  } = useLottery()
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const tickets = useTicketLotteryV2()
  const ticketsLength = tickets.length

  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = lotteryHasDrawn && getTicketSaleTime(currentMillis)

  const { fastRefresh } = useRefresh()
  const [timeRemainDraw, setTimeRemainDraw] = useState("");
  const [timeRemainSale, setTimeRemainSale] = useState("");

  const URL = chainId === 56 ? BASE_API_ADMIN_PRO : BASE_API_ADMIN;

  useEffect(() => {
    const fetchTimeLottery = async () => {
      const timeEndLottery = new Date();
      const timeStartLottery = new Date();
      const {data} = await axios.get(`${URL}/lotteries`);

      // set time remain to end lottery phase
      timeEndLottery.setHours(data[0].timeDrawLottery.hh, data[0].timeDrawLottery.mm, 0);
      setTimeRemainDraw(getTimeRemainDraw(timeEndLottery));

      // set time remain to start new lottery phase
      timeStartLottery.setHours(data[0].timeStartNewPhase.hh, data[0].timeStartNewPhase.mm, 0);
      setTimeRemainSale(getTimeRemainDraw(timeStartLottery));
    }
    fetchTimeLottery();
  },[fastRefresh, URL])

  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardBody>
        <CardHeader>
          <IconWrapper>
            <img alt="" src="../images/icon-lottery.svg" />
          </IconWrapper>
          {ticketBuyIsDisabled ? (
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
              <Heading size="lg">{ userTickets.isLoading ? spinnerIcon : (userTickets.tickets !== null ? userTickets.tickets.length: 0)}</Heading>
            </TicketCountWrapper>
          )}
        </CardHeader>
        <TicketActions />
      </CardBody>
    </StyledCard>
  )
}

export default TicketCard
