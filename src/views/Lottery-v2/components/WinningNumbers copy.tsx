import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Image, Card, CardBody } from '@luckyswap/uikit'
import { useWinningNumbers, useMatchingRewardLength } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'

const WinningNumbers: React.FC = () => {
  const { account } = useWeb3React()
  const winNumbers = useWinningNumbers()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  return (
    <CardWrapper>
      <CardBodyNew>
        <StyledCardContentInner>
          <StyledCardHeader>
            <Title style={{ color: 'rgb(243, 193, 17)' }}>{TranslateString(440, 'Latest Winning Numbers')}</Title>
          </StyledCardHeader>
          <Row>
            {/* <img
              alt=""
              src="https://merlinlab.com/static/media/leftGoldenCoin.6aef3b76.svg"
              className="sc-iCfLBT sc-ezbkgU gvyEtt jElfkq"
            />
            <img
              alt=""
              src="https://merlinlab.com/static/media/rightGoldenCoin.e795d41c.svg"
              className="sc-iCfLBT sc-ezbkgU KkWOV jElfkq"
            /> */}
            {winNumbers.map((number, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TicketNumberBox key={index}>
                <CenteredText>{number}</CenteredText>
              </TicketNumberBox>
            ))}
          </Row>

          <Link href="/" target="_blank">
            {TranslateString(448, 'Export recent winning numbers')}
          </Link>
        </StyledCardContentInner>
      </CardBodyNew>
    </CardWrapper>
  )
}

const CardBodyNew = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  border-radius: 1.25rem;
  padding: 24px;
`

const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  border-radius: 100px;
  border: 1px solid #F3C111;
  color: #F3C111;
  padding: 11px 60px;
  font-size: 26px;
  line-height: 30px;
}
`

const Row = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: row;
`

const RabbitRow = styled.div`
  margin-top: -2.3em;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    display: none;
  }
`

const RabbitRowSmall = styled.div`
  margin-top: -2.3em;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    display: none;
  }
`

const CardImage = styled.div`
  text-align: center;
`

const CardImageFirst = styled.div`
  text-align: center;
  margin-left: -1.2em;

  @media (max-width: 600) {
    margin-left: -0.2em;
  }
`

const RowNoPadding = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CenteredText = styled.div`
  text-align: center;
  align-items: center;
  font-size: 26px;
`

const CenteredTextWithPadding = styled.div`
  text-align: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
`

const TicketNumberBox = styled.div`
  padding: 10px;
  border-radius: 12px;
  text-shadow: rgb(255 214 0) 0px 0px 12px;
  // background: linear-gradient(180deg, #54dade 0%, #24c7d6 76.22%);
  color: white;
  font-size: 20px;
  font-weight: 900;
  margin: 10px;
  margin-bottom: 7px;
  width: 40px;

  @media (min-width: 768px) {
    font-size: 40px;
    margin: 20px;
    width: 60px;
  }
`

const RabbitBox = styled.div`
  /* padding: 10px; */
  border-radius: 12px;
  margin: 16px 20px;
  width: 60px;
`

const RabbitBoxSmall = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 12px;
  margin: 20px;
  width: 20px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const CardWrapper = styled.div``

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 24px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default WinningNumbers
