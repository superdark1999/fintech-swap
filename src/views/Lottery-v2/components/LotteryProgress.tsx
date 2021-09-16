import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@luckyswap/uikit'
import axios from 'axios'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useCurrentTime } from 'hooks/useTimer'
import { BASE_API_ADMIN, BASE_API_ADMIN_PRO } from 'config'
import useRefresh from 'hooks/useRefresh'
import { useLottery } from 'state/hooks'
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
  const { chainId } = useActiveWeb3React()
  const { fastRefresh } = useRefresh()
  const [timeRemainDraw, setTimeRemainDraw] = useState('')
  const [timeRemainSale, setTimeRemainSale] = useState('')
  const [percentRemain, setPercentRemain] = useState(0)

  const {
    currentRound: { endTime },
  } = useLottery()

  console.log('endTime', endTime)

  const TranslateString = useI18n()
  const currentMillis = useCurrentTime()

  const URL = chainId === 56 ? BASE_API_ADMIN_PRO : BASE_API_ADMIN

  useEffect(() => {
    const fetchTimeLottery = async () => {
      if (endTime) {
        const timeEndLottery = new Date(parseInt(endTime) * 1000)
        const now = new Date()

        // set time remain to end lottery phase
        if (timeEndLottery.getTime() < now.getTime()) setTimeRemainDraw('0h: 0m')
        else setTimeRemainDraw(getTimeRemainDraw(timeEndLottery))
      }

      // set time remain to start new lottery phase
      // setPercentRemain(100 - ((timeEndLottery.getTime() - now.getTime()) * 100) / 86400000)
    }
    fetchTimeLottery()
  }, [fastRefresh, endTime])

  return (
    <ProgressWrapper>
      {/* <Progress primaryStep={percentRemain} secondaryStep={ (1/24) / 100} /> */}
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="yellow">
          {timeRemainDraw}
        </StyledPrimaryText>
        <Text fontSize="20px" bold color="invertedContrast">
          {TranslateString(492, 'Until next lottery')}
        </Text>
      </TopTextWrapper>
    </ProgressWrapper>
  )
}

export default LotteryProgress
