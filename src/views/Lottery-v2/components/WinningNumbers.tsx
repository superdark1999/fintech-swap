import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Image, Card, CardBody } from '@luckyswap/uikit'
import { useWinningNumbers, useMatchingRewardLength } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { getWinningTickets } from 'state/lottery2/fetchUnclaimedUserRewards'

import { fetchLottery } from 'state/lottery2/helpers'
import { LotteryRound } from 'state/types'
import { useGetCurrentLotteryId } from 'state/hooks'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import CardValue from '../../Home/components/CardValue'
import {  processLotteryResponse, parseRetreivedNumber } from '../helpers'



const WinningNumbers: React.FC = () => {
  const { account } = useWeb3React()
  const currentLotteryId = useGetCurrentLotteryId()

  const [lotteryInfo, setLotteryInfo] = useState<LotteryRound>(null)
  useEffect(() => {

    const fetchData = async () => {
      const lotteryData = await fetchLottery(currentLotteryId)
      const processedLotteryData = processLotteryResponse(lotteryData)

      setLotteryInfo(processedLotteryData)
    }
    if (currentLotteryId)
      fetchData()
  }, [currentLotteryId])

  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  const reversedNumber = lotteryInfo && parseRetreivedNumber(lotteryInfo.finalNumber.toString())
  const numAsArray = reversedNumber?.split('')

  
  return (
    <CardWrapper>
      <CardBodyNew>
        <StyledCardContentInner>
          <StyledCardHeader>
            <Title style={{ color: 'rgb(243, 193, 17)' }}>
              {account && lotteryHasDrawn
                ? `${TranslateString(570, 'Latest Winning Numbers')}`
                : TranslateString(440, 'Latest Winning Numbers')}
            </Title>
          </StyledCardHeader>
          <Row>
            {/* <img
              alt=""
              src="https://merlinlab.com/static/media/leftGoldenCoin.6aef3b76.svg"
              className="sc-iCfLBT sc-ezbkgU gvyEtt jElfkq"
            />
            <img
              alt=""
              src="https://merlinlab.com/static/media/rightGoldenCoin.e795d41c.svg"
              className="sc-iCfLBT sc-ezbkgU KkWOV jElfkq"
            /> */}
            { numAsArray && numAsArray.map((number, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TicketNumberBox key={index}>
                <CenteredText>
                  <CardValue
                bold
                color=""
                value={parseInt(number)}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
                  </CenteredText>
              </TicketNumberBox>
            ))}
          </Row>
          <Column>
            <RowNoPadding>
              <CenteredTextWithPadding style={{ color: '#fff' }}>
                {/* {TranslateString(442, 'Tickets matching 4 numbers:')} */}
                Tickets matching<strong style={{fontWeight: 900}}> 4 </strong>numbers:
              </CenteredTextWithPadding>
              <CenteredTextWithPadding>
                <strong style={{ color: '#F3C111', fontWeight: 900 }}>{MatchedNumber4}</strong>
              </CenteredTextWithPadding>
            </RowNoPadding>
            <RowNoPadding>
              <CenteredTextWithPadding style={{ color: '#fff' }}>
                {/* {TranslateString(444, 'Tickets matching 3 numbers:')} */}
                Tickets matching<strong style={{fontWeight: 900}}> 3 </strong>numbers:
              </CenteredTextWithPadding>
              <CenteredTextWithPadding>
                <strong style={{ color: '#F3C111', fontWeight: 900 }}>{MatchedNumber3}</strong>
              </CenteredTextWithPadding>
            </RowNoPadding>
            <RowNoPadding>
              <CenteredTextWithPadding style={{ color: '#fff' }}>
                {/* {TranslateString(446, 'Tickets matching 2 numbers:')} */}
                Tickets matching<strong style={{fontWeight: 900}}> 2 </strong>numbers:
              </CenteredTextWithPadding>
              <CenteredTextWithPadding>
                <strong style={{ color: '#F3C111', fontWeight: 900 }}>{MatchedNumber2}</strong>
              </CenteredTextWithPadding>
            </RowNoPadding>
          </Column>

          {/* <Link href="/" target="_blank">
            {TranslateString(448, 'Export recent winning numbers')}
          </Link> */}
        </StyledCardContentInner>
      </CardBodyNew>
    </CardWrapper>
  )
}

const CardBodyNew = styled.div`
  position: relative;
  background-color: rgb(43 41 41);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  border-radius: 1.25rem;
  padding: 24px;
  min-height: 496px;
`

const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: #101010;
  background-color: transparent ;
  border-radius: 12px;
  padding: 17px 25px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 100px;
  border: 1px solid #F3C111;
  color: #F3C111;
  padding: 11px 60px;
  font-size: 26px;
  line-height: 30px;

  @media (min-width) {
    padding: 10px 25px;
  }

  &:hover {
    background-color: #ffda3b;
    color: #101010;
    transition: 0.5s;
  }
`

const Row = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: row;
  border: 1px solid #f3c111;
  border-radius: 14px;
`

const RabbitRow = styled.div`
  margin-top: -2.3em;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    display: none;
  }
`

const RabbitRowSmall = styled.div`
  margin-top: -2.3em;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    display: none;
  }
`

const CardImage = styled.div`
  text-align: center;
`

const CardImageFirst = styled.div`
  text-align: center;
  margin-left: -1.2em;

  @media (max-width: 600) {
    margin-left: -0.2em;
  }
`

const RowNoPadding = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const Column = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CenteredText = styled.div`
  text-align: center;
  align-items: center;
`

const CenteredTextWithPadding = styled.div`
  text-align: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  font-weight: 500;
  font-size: 26px;
`

const TicketNumberBox = styled.div`
  padding: 10px;
  border-radius: 12px;
  // text-shadow: rgb(255 214 0) 0px 0px 12px;
  // background: linear-gradient(180deg, #54dade 0%, #24c7d6 76.22%);
  color: white;
  font-size: 20px;
  font-weight: 900;
  margin: 10px;
  margin-bottom: 7px;
  width: 40px;
  color: #F3C111;

  @media (min-width: 768px) {
    font-size: 64px;
    margin: 20px;
    background: url('../images/bg-number.svg');
    background-repeat: no-repeat;
    width: 120px;
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

  }
`

const RabbitBox = styled.div`
  /* padding: 10px; */
  border-radius: 12px;
  margin: 16px 20px;
  width: 60px;
`

const RabbitBoxSmall = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 12px;
  margin: 20px;
  width: 20px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div`
  margin-bottom: 30px;
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 34px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    background: url('../images/jackpot-l.png');
    width: 220px;
    height: 496px;

    @media (max-width: 991px) {
      opacity: 0.2;
    }
  }

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    background: url('../images/jackpot-r.png');
    width: 220px;
    height: 496px;

    @media (max-width: 991px) {
      opacity: 0.2;
    }
  }
`

export default WinningNumbers
