import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@luckyswap/uikit'
import axios from 'axios'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import { BASE_API_ADMIN, BASE_API_ADMIN_PRO } from 'config'
import useRefresh from 'hooks/useRefresh'
import { useActiveWeb3React } from 'hooks'
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
// const timeEndLottery = new Date;
// timeEndLottery.setHours(23, 0, 0);

// const timeStartLottery = new Date;
// timeStartLottery.setHours(24, 0, 0);

// const timeStartLottery = new Date(19, 0, 0);

const LotteryProgress = () => {
  const { chainId } = useActiveWeb3React();
  const { fastRefresh } = useRefresh()
  const [timeRemainDraw, setTimeRemainDraw] = useState("");
  const [timeRemainSale, setTimeRemainSale] = useState("");
  const [percentRemain, setPercentRemain] = useState(0)
  

  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()  

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

      if (lotteryHasDrawn){
        setPercentRemain( 100 - ((timeStartLottery.getTime() - currentMillis) * 100 / 86400000));
      }
      else 
        setPercentRemain( 100 - ((timeEndLottery.getTime() - currentMillis) * 100 / 86400000));

    }
    fetchTimeLottery();
  },[fastRefresh, lotteryHasDrawn, currentMillis, URL])

  return (
    <ProgressWrapper>
      <Progress primaryStep={percentRemain} secondaryStep={ (1/24) / 100} />
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
