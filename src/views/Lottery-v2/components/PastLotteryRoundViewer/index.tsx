import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@luckyswap/uikit'
import getLotteryRoundData from 'utils/getLotteryRoundData'
import useI18n from 'hooks/useI18n'
import useGetRecentLotteryRoundData from 'hooks/useGetRecentLotteryRoundData'
import { useGetCurrentLotteryId, useGetLotteriesGraphData } from 'state/hooks'
import PastLotterySearcher from './PastLotterySearcher'
import PastRoundCard from './PastRoundCard'
import Loading from '../Loading'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledCardBody = styled(CardBody)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 552px; // height of final card
`

const PastLotteryRoundViewer = () => {
  const [state, setState] = useState({
    roundData: null,
    error: { message: null, type: null },
    isInitialized: false,
    isLoading: true,
  })
  const TranslateString = useI18n()
  const { roundData, error, isInitialized, isLoading } = state

  const currentLotteryId = useGetCurrentLotteryId()
  const lotteries = useGetLotteriesGraphData()

  useEffect(() => {
    if (lotteries && currentLotteryId) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isInitialized: true,
        roundData: lotteries[parseInt(currentLotteryId) - 2],
      }))
    }
  }, [lotteries, currentLotteryId])

  const handleSubmit = async (lotteryNumber: number) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }))
    if (lotteryNumber > parseInt(currentLotteryId) || lotteryNumber <= 0) {
      setState((prevState) => ({
        ...prevState,
        error: {
          message: TranslateString(1076, 'The lottery number you provided does not exist'),
          type: 'out of range',
        },
        isLoading: false,
        isInitialized: true,
      }))
    } else {
      setState((prevState) => ({
        ...prevState,
        error: { message: null, type: null },
        roundData: lotteries[lotteryNumber - 1],
        isLoading: false,
        isInitialized: true,
      }))
    }
  }

  return (
    <Wrapper>
      {parseInt(currentLotteryId) >= 2 &&
        roundData && ( // have past round
          <div>
            {!isInitialized || isLoading ? (
              <Card>
                <StyledCardBody>
                  <Loading />
                </StyledCardBody>
              </Card>
            ) : (
              <PastRoundCard
                initialLotteryNumber={parseInt(currentLotteryId) - 1}
                onSubmit={handleSubmit}
                error={error}
                data={roundData}
              />
            )}
          </div>
        )}
      {/* <PastLotterySearcher initialLotteryNumber={mostRecentLotteryNumber} onSubmit={handleSubmit} /> */}
    </Wrapper>
  )
}

export default PastLotteryRoundViewer
