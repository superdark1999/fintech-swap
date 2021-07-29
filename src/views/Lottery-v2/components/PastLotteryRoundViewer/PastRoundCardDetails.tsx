import React from 'react'
import styled from 'styled-components'

import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import { BigNumber } from 'bignumber.js'
import { usePriceLuckyBusd } from 'state/hooks'
import useGetRecentLotteryRoundData from 'hooks/useGetRecentLotteryRoundData'


import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound, Text } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'

import CardBusdValue from '../../../Home/components/CardBusdValue'

import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timest from '../Timestamp'
import PastLotterySearcher from './PastLotterySearcher'


interface PastRoundCardDetailsProps {
  data: DataResponse
  initialLotteryNumber: number
  onSubmit: (num: number) => void
}

const CardHeading = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopLotteryCardHeading = styled(LotteryCardHeading)`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  
`

const BoxCard = styled.div`
  padding: 10px;
`
// const StyledTime = styled(Timest)`
//   padding-top: 20px;
//   position: unset !important;
//   top: 20px;
// `
// const StyledTime = styled(Timest)`
// padding-top: 20px;
//   position: unset !important;
//    top: 20px;
// `

const Dflex = styled.div`
  
  align-items: center;
`
const StyledBox = styled.div`
  display: grid;
  @media (min-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }
`
const RoundPrize = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 44px;
    color: #252525;
    text-shadow: 1px 1px 0 #F3C111,
    -1px 1px 0 #F3C111,
    1px -1px 0 #F3C111,
    -1px -1px 0 #F3C111,
    0px 1px 0 #F3C111,
    0px -1px 0 #F3C111,
    -1px 0px 0 #F3C111,
    1px 0px 0 #F3C111,
    2px 2px 0 #F3C111,
    -2px 2px 0 #F3C111,
    2px -2px 0 #F3C111,
    -2px -2px 0 #F3C111,
    0px 2px 0 #F3C111,
    0px -2px 0 #F3C111,
    -2px 0px 0 #F3C111,
    2px 0px 0 #F3C111,
    1px 2px 0 #F3C111,
    -1px 2px 0 #F3C111,
    1px -2px 0 #F3C111,
    -1px -2px 0 #F3C111,
    2px 1px 0 #F3C111,
    -2px 1px 0 #F3C111,
    2px -1px 0 #F3C111,
    -2px -1px 0 #F3C111;
`
const TopCard = styled.div`
  margin-bottom: 23px;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  position: relative;
`
const BoxLucky = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px 0 5px;

  h2 {
    font-size: 44px;
    position: relative;
    color: #f3c111;
    font-weight: 700;
  }

  span {
    font-size: 16px;
    position: absolute;
    top: 0;
  }
`
const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`
const Dollar = styled.div`
  padding-left: 60px;
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ data, initialLotteryNumber,onSubmit }) => {
  const TranslateString = useI18n()
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const lotteryPrizeWithCommaSeparators = lotteryPrizeAmount.toLocaleString()
  const lotteryPrizeAmountBusd = new BigNumber(lotteryPrizeAmount).multipliedBy(usePriceLuckyBusd()).toNumber() 
  const {
    contractLink,
    jackpotTicket,
    lotteryDate,
    lotteryNumber,
    lotteryNumbers,
    match1Ticket,
    match2Ticket,
    match3Ticket,
    poolSize,
  } = data

  return (
    !data.error &&
    data && (
      <>
        <StyledBox>
          <CardBody>
            <CardHeading>
               {/* search */}
              <PastLotterySearcher initialLotteryNumber={initialLotteryNumber} onSubmit={onSubmit} />

              <TopLotteryCardHeading
                valueToDisplay={[lotteryNumbers[0], lotteryNumbers[1], lotteryNumbers[2], lotteryNumbers[3] ]}
                //  Icon={TicketRound}
                Ic
              >
                {TranslateString(999, 'Winning numbers')}
                {/* <img src="" alt="" /> */}
              </TopLotteryCardHeading>
              <Dflex>
                <Text fontSize="24px" fontWeight="500" color="textSubtle">
                  {TranslateString(722, 'Total Pot:')}
                </Text>
                <BoxLucky>
                  <IconWrapper>
                    <img width="75px" alt="" src="/images/icon-logo-y.png" />
                  </IconWrapper>
                  <Heading style={{ textShadow: 'rgb(255 214 0) 0px 0px 25px', fontSize: '44' }} size="lg">
                    {lotteryPrizeWithCommaSeparators} <span>LUCKY</span>
                  </Heading>
                </BoxLucky>
                <Dollar>{lotteryPrizeAmountBusd !== 0 && <CardBusdValue value={lotteryPrizeAmountBusd} />}</Dollar>
              </Dflex>
            </CardHeading>
          </CardBody>
          <BoxCard>
            <TopCard>
              <RoundPrize>
                Round #{lotteryNumber}
              </RoundPrize>
              <Timest timeValue={lotteryDate} />
            </TopCard>
            
            <CardFooter className="no-border">
              <PrizeGrid
                lotteryPrizeAmount={poolSize}
                jackpotMatches={jackpotTicket}
                oneTicketMatches={match1Ticket}
                twoTicketMatches={match2Ticket}
                threeTicketMatches={match3Ticket}
              />
              {/* <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} /> */}
            </CardFooter>
          </BoxCard>
        
        </StyledBox>

        <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
      </>
    )
  )
}

export default PastRoundCardDetails
