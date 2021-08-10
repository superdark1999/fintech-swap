import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from '@luckyswap/uikit'
import { BigNumber } from 'bignumber.js'
import { usePriceLuckyBusd } from 'state/hooks'
import CardBusdValue from '../../Home/components/CardBusdValue'
import CardValue from '../../Home/components/CardValue';

export interface PrizeGridProps {
  lotteryPrizeAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  oneTicketMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 3 : 2)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  padding: 8px 0;
`

const RightAlignedHeading = styled(Heading)`
  
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
  text-align: center;
  &:nth-child(3), &:nth-child(4){
    background: rgba(243, 193, 17, 0.15);
  }
  &:nth-child(5), &:nth-child(6){
    background: rgba(255, 255, 255, 0.15);
  }
  &:nth-child(7), &:nth-child(8){
    background: rgba(255, 255, 255, 0.05);
  }
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`
const GridPrize = styled.div`
  .text{
    padding: 8px 0;
  }
`
const CardBusd = styled.span`
  font-size: 13px;
  margin-right: 20px;
  color: #F3C111;
`

const PrizeGridLK: React.FC<PrizeGridProps> = ({
  lotteryPrizeAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(0)
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(0)
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(0)
  const TranslateString = useI18n()
  const cakeBusdPrice = usePriceLuckyBusd()

  const getCakeBusdValue = (amount: number) => {
    return new BigNumber(amount).multipliedBy(cakeBusdPrice).toNumber()
  }

  return (
    <GridPrize>
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="24px" color="#F3C111">
          {TranslateString(756, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText padding="0px" fontSize="14px" color="textSubtle">
            {TranslateString(754, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText style={{padding: 0}}  fontSize="24px" color="#F3C111">
          {TranslateString(752, 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading className="text" style={{ textShadow: 'rgb(255 214 0) 0px 0px 25px' }} size="md">
          4
        </Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading className="text" size="md">{jackpotMatches}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading className="text" size="md">
          <CardBusd>
            {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(fourMatchesAmount)} />}  
          </CardBusd>
          <CardValue
                bold
                color=""
                value={fourMatchesAmount}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
          {/* {fourMatchesAmount.toLocaleString()} */}
        </RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem style={{ textShadow: 'rgb(255 214 0) 0px 0px 25px' }}>
        <Text className="text" padding="8px 0" bold>3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem >
          <RightAlignedText className="text" bold>{threeTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>
          <CardBusd>
            {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(threeMatchesAmount)} />}  
          </CardBusd>
          <CardValue
                bold
                color=""
                value={threeMatchesAmount}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
          {/* {threeMatchesAmount.toLocaleString()} */}
        </RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem style={{ textShadow: 'rgb(255 214 0) 0px 0px 25px' }}>
        <Text className="text">2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText className="text">{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>
          <CardBusd>
            {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(twoMatchesAmount)} />}
          </CardBusd>
          <CardValue
                bold
                color=""
                value={twoMatchesAmount}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
          {/* {twoMatchesAmount.toLocaleString()} */}
        </RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0" style={{ alignItems:'center', display: 'flex'}}>
        <Text>{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText>
              <CardBusd>
                {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(burnAmount)} />}
              </CardBusd>
              <CardValue
                bold
                color=""
                value={burnAmount}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
              {/* {burnAmount.toLocaleString()} */}
            </RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText>
            <CardBusd>
              {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(burnAmount)} />}
            </CardBusd>
            <CardValue
                bold
                color=""
                value={burnAmount}
                decimals={0}
                fontSize="60px"
                fontWeight="600"
              ></CardValue>
            {/* {burnAmount.toLocaleString()} */}
            </RightAlignedText>
        </GridItem>
      )}
    </Grid>
    </GridPrize>
  )
}

export default PrizeGridLK
