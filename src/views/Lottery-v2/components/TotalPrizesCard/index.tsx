import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody, CardFooter, Text, PancakeRoundIcon, Flex, Skeleton } from '@luckyswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { useTotalRewards } from 'hooks/useTickets'
import { useContract } from 'hooks/useContract'
import { useLottery, usePriceLuckyBusd } from 'state/hooks'
import { getLotteryAddress, getLotteryTicketAddress } from 'utils/addressHelpers'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import lotteryAbi from 'config/abi/lottery.json'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'
import { BigNumber } from 'bignumber.js'
import PrizeGrid from '../PrizeGrid'
import CardBusdValue from '../../../Home/components/CardBusdValue'
import CardValue from '../../../Home/components/CardValue'

// const Container = styled.div`
//   margin-left: auto;
//   margin-right: auto;
//   max-width: 1200px;
//   margin-bottom: 30px;
// `
interface Props {
  account: any
}

const BoxTotal = styled.div`
  background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
  box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
  color: #ffffff;
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 991px) {
    grid-template-columns: 1fr 1fr ;
    margin: 0 auto 60px;
  }
`

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const PrizeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
  padding: 15px;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100%;
  }
`
const CardBodyNew = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  border-radius: 1.25rem;
  padding: 24px;
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

const Dollar = styled.div`
  padding-left: 60px;
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

const TotalPrizesCard = () => {
  const [indexRoute, setIndexRoute]  = useState(0)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { currentLotteryId, isTransitioning, currentRound } = useLottery()
  const { endTime, amountCollectedInCake, userTickets, status } = currentRound
  const [showFooter, setShowFooter] = useState(false)
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)

  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  const cakePriceBusd = usePriceLuckyBusd()
  const prizeInBusd = amountCollectedInCake.times(cakePriceBusd)

  
  useEffect(() => {
    const fetchLotteryIndex = async () => {
      if (lotteryContract) {
        const index = await getLotteryIssueIndex(lotteryContract)

        setIndexRoute(index)
      }
    }

    fetchLotteryIndex()
  }, [lotteryContract])

  return (
    <BoxTotal>
      <CardBody>
        {account && (
          <Flex mb="55px" alignItems="center" justifyContent="space-between">
            {parseInt(currentLotteryId) === 0 && <Skeleton height={20} width={56} />}
            <>
              <RoundPrize>
                {currentLotteryId && TranslateString(720, `Round #${currentLotteryId}`, { num: currentLotteryNumber })}
              </RoundPrize>
            </>
            {/* {currentLotteryNumber > 0 && (
                <>
                  <Text fontSize="12px" style={{ fontWeight: 600 }}>
                    {TranslateString(720, `Round #${currentLotteryNumber}`, { num: currentLotteryNumber })}
                  </Text>
                </>
              )} */}
          </Flex>
        )}
        <CardHeading>
          <Left>
            <PrizeCountWrapper>
              <Text fontSize="24px" fontWeight="500" color="textSubtle">
                {TranslateString(722, 'Total Pot:')}
              </Text>        
              { prizeInBusd.s && ( 
                <div>
                  <BoxLucky>
                      <IconWrapper>
                        <img width="75px" alt="" src="/images/icon-logo-y.png" />
                      </IconWrapper>
                  <Heading style={{ textShadow: 'rgb(255 214 0) 0px 0px 25px', fontSize: '44' }} size="lg">
                  <CardValue
                      bold
                      color=""
                      value={getBalanceNumber(amountCollectedInCake)}
                      decimals={3}
                      fontSize="60px"
                      fontWeight="600"
                    ></CardValue> <span>LUCKY</span>
                      </Heading>
                    </BoxLucky>
                    <Dollar>{prizeInBusd && <CardBusdValue value={getBalanceNumber(prizeInBusd)} />}</Dollar>
                </div>
              )}

            </PrizeCountWrapper>
          </Left>
          <Right>
            <ExpandableSectionButton onClick={() => setShowFooter(!showFooter)} expanded={showFooter} />
          </Right>
        </CardHeading>
      </CardBody>
      <ExpandingWrapper showFooter={showFooter}>
        <CardFooter className="no-border">
          {!currentRound.isLoading && (<PrizeGrid lotteryPrizeAmount={lotteryPrizeAmount}  lotteryData={currentRound}/>)}
        </CardFooter>
      </ExpandingWrapper>
    </BoxTotal>
  )
}

export default TotalPrizesCard
