import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
  getTimeRemainDraw,
} from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 100%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
`
const timeEndLottery = new Date;
timeEndLottery.setHours(23, 0, 0);

const timeStartLottery = new Date;
timeStartLottery.setHours(24, 0, 0);

// const timeStartLottery = new Date(19, 0, 0);

const LotteryProgress = () => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()  
  const timeRemainDraw = getTimeRemainDraw(timeEndLottery)
  const timeRemainSale = getTimeRemainDraw(timeStartLottery);


  // const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  // const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis)

  return (
    <ProgressWrapper>
      <Progress primaryStep={getLotteryDrawStep(currentMillis)} secondaryStep={getTicketSaleStep()} showProgressBunny />
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="yellow">
          {lotteryHasDrawn ? timeRemainSale : timeRemainDraw}
        </StyledPrimaryText>
        <Text fontSize="20px" bold color="invertedContrast">
          {lotteryHasDrawn ? TranslateString(434, 'Until ticket sale') : TranslateString(492, 'Until lottery draw')}
        </Text>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="invertedContrast">
            {/* {timeUntilLotteryDraw} {TranslateString(492, 'Until lottery draw')} */}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
