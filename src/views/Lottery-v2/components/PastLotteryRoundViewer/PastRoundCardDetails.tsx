import React from 'react'
import styled from 'styled-components'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'

interface PastRoundCardDetailsProps {
  data: DataResponse
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

const Dflex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ data }) => {
  const TranslateString = useI18n()

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
        <CardBody>
          <CardHeading>
            <Timestamp timeValue={lotteryDate} />
            <Heading size="md" mb="24px">
              Round #{lotteryNumber}
            </Heading>
            <TopLotteryCardHeading
              valueToDisplay={`${lotteryNumbers[0]}, ${lotteryNumbers[1]}, ${lotteryNumbers[2]}, ${lotteryNumbers[3]}, 5, 8`}
              // Icon={TicketRound}
            >
              {TranslateString(999, 'Winning numbers')}
            </TopLotteryCardHeading>
            <Dflex>
              <img src="../images/icon-logo-y.png" alt="" />
              <LotteryCardHeading valueToDisplay={TranslateString(999, `${poolSize.toLocaleString()}`)}>
                {TranslateString(999, 'Total prizes')}
              </LotteryCardHeading>
            </Dflex>
          </CardHeading>
        </CardBody>
        <BoxCard>
          <CardFooter className="no-border">
            <PrizeGrid
              lotteryPrizeAmount={poolSize}
              jackpotMatches={jackpotTicket}
              oneTicketMatches={match1Ticket}
              twoTicketMatches={match2Ticket}
              threeTicketMatches={match3Ticket}
              pastDraw
            />
            <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
          </CardFooter>
        </BoxCard>
      </>
    )
  )
}

export default PastRoundCardDetails
