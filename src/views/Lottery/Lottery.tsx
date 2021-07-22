import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@luckyswap/uikit'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import { useLottery, useContract } from 'hooks/useContract'
import { getLotteryAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'

import { useWeb3React } from '@web3-react/core'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import Hero from './components/Hero'
import WinningNumbers from './components/WinningNumbers'
import TotalPrizesCard from './components/TotalPrizesCard'
import YourPrizesCard from './components/YourPrizesCard'
import UnlockWalletCard from './components/UnlockWalletCard'
import TicketCard from './components/TicketCard'
import HowItWorks from './components/HowItWorks'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
// import { BaseLayout } from '@luckyswap/uikit'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'
import Divider from './components/Divider'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
  margin-bottom: 30px;

  @media (min-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Dflex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  margin-bottom: 30px;
`

const BoxImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 750px;
  }
`


const Lottery: React.FC = () => {
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)

  const { account } = useWeb3React()
  const { claimAmount } = useTotalClaim()
  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  useEffect(() => {
    fetch(`https://dashboard.luckyswap.exchange/lotteries/history`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.lotteryNumber > b.lotteryNumber ? -1 : 1)
        setHistoryData(data)}
        )
      
      .catch(() => {
        setHistoryError(true)
      })
  }, [])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [lotteryContract])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <Page>
        {/* <BoxImg>
          <img src="../images/coming-soon-lot.png" alt=""/>
        </BoxImg> */}
        <Hero />
        <TotalPrizesCard />
        <SecondCardColumnWrapper isAWin={isAWin}>
          {!account ? (
            <UnlockWalletCard />
          ) : (
            <>
              <TicketCard isSecondCard={isAWin} />
              <YourPrizesCard />
            </>
          )}
        </SecondCardColumnWrapper>
        <WinningNumbers />
        <HowItWorks />
        <PastLotteryDataContext.Provider
          value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
        >
          <PastLotteryRoundViewer />
          <PastDrawsHistoryCard />
        </PastLotteryDataContext.Provider>

        {/* <Wrapper>
          <ButtonMenu activeIndex={activeIndex} onItemClick={handleClick} scale="sm" variant="subtle">
            <ButtonMenuItem>{TranslateString(716, 'Next draw')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(718, 'Past draws')}</ButtonMenuItem>
          </ButtonMenu>
        </Wrapper>
        <Divider />
        <PastLotteryDataContext.Provider
          value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
        >
          {activeIndex === 0 ? <NextDrawPage /> : <PastDrawsPage />}
        </PastLotteryDataContext.Provider> */}
      </Page>
    </>
  )
}

export default Lottery
