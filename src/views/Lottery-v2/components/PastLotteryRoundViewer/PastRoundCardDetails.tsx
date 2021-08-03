import React, { useState, useEffect } from 'react'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound, Text } from '@luckyswap/uikit'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'

import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import { usePriceLuckyBusd } from 'state/hooks'
import useGetRecentLotteryRoundData from 'hooks/useGetRecentLotteryRoundData'

import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import {  LotteryRoundGraphEntity, LotteryResponse  } from 'state/types'
import { LotteryStatus } from 'config/constants/types'


import CardBusdValue from '../../../Home/components/CardBusdValue'

import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timest from '../Timestamp'
import PastLotterySearcher from './PastLotterySearcher'
import {  processLotteryResponse, parseRetreivedNumber } from '../../helpers'
import { fetchLottery, useProcessLotteryResponse } from '../../../../state/lottery2/helpers'

interface PastRoundCardDetailsProps {
  data: LotteryRoundGraphEntity
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

  // export interface LotteryRoundGraphEntity {
  //   id: string
  //   totalUsers: string
  //   totalTickets: string
  //   status: LotteryStatus
  //   finalNumber: string
  //   winningTickets: string
  //   startTime: string
  //   endTime: string
  //   ticketPrice: SerializedBigNumber
  //   firstTicket: string
  //   lastTicket: string
  // }

  // export interface LotteryRound extends LotteryRoundGenerics {
  //   userTickets?: LotteryRoundUserTickets
  //   priceTicketInCake: BigNumber
  //   discountDivisor: BigNumber
  //   amountCollectedInCake: BigNumber
  //   cakePerBracket: string[]
  //   countWinnersPerBracket: string[]
  //   rewardsBreakdown: string[]
  // }
  

  const { id, endTime, finalNumber, amountCollectedInCake }  = data;
  const endDate = new Date(parseInt(endTime) * 1000);

  const reversedNumber = parseRetreivedNumber(finalNumber)
  const arrayFinalNumber = reversedNumber.split('');
  const [lotteryData, setLotteryData] = useState<LotteryResponse>({
    priceTicketInCake: '',
    discountDivisor: '',
    amountCollectedInCake: '',
    cakePerBracket: [],
    countWinnersPerBracket: [],
    rewardsBreakdown: [],
    status: LotteryStatus.CLAIMABLE,
    startTime: "123123",
    endTime: "1212312312",
    treasuryFee: "0",
    firstTicketId: "0",
    lastTicketId: '0', 
    finalNumber: 1123123
  });
  const processedCurrentRound = useProcessLotteryResponse(lotteryData)
  console.log("processedCurrentRound", processedCurrentRound.isLoading,  !processedCurrentRound.isLoading)
  console.log("condition", (processedCurrentRound.isLoading && !processedCurrentRound.isLoading) ? "true": "false") 


  useEffect(() => {
    const fetchLotteryInfo = async () => {
      const lotteryInfo = await fetchLottery(id)
      setLotteryData(lotteryInfo)
    }

    fetchLotteryInfo();
  }, [id])

  return (
    data && (
      <>
        <StyledBox>
          <CardBody>
            <CardHeading>
               {/* search */}
              <PastLotterySearcher initialLotteryNumber={initialLotteryNumber} onSubmit={onSubmit} />

              <TopLotteryCardHeading
                valueToDisplay={[
                  arrayFinalNumber[0], arrayFinalNumber[1], 
                  arrayFinalNumber[2], arrayFinalNumber[3], 
                  arrayFinalNumber[4], arrayFinalNumber[5], 
                 ]}
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
                    {getBalanceNumber(new BigNumber(amountCollectedInCake))} <span>LUCKY</span>
                  </Heading>
                </BoxLucky>
                <Dollar>{lotteryPrizeAmountBusd !== 0 && <CardBusdValue value={lotteryPrizeAmountBusd} />}</Dollar>
              </Dflex>
            </CardHeading>
          </CardBody>
          <BoxCard>
            <TopCard>
              <RoundPrize>
                Round #{id}
              </RoundPrize>
              <Timest timeValue={endDate} />
            </TopCard>
            
            <CardFooter className="no-border">
              { processedCurrentRound.isLoading === false && (
                <PrizeGrid
                lotteryPrizeAmount={0}
                lotteryData={processedCurrentRound}
                />
              )}
              {/* <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} /> */}
            </CardFooter>
          </BoxCard>
        
        </StyledBox>

        <PastLotteryActions contractLink='https://testnet.bscscan.com/address/0x3e743ABbc0B7d23Cd6b83af54b0DE87743c145E5#readContract'
         lotteryNumber={parseInt(id)} />
      </>
    )
  )
}

export default PastRoundCardDetails
