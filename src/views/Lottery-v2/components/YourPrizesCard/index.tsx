import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Flex, useModal, AutoRenewIcon, Card } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import useGetUnclaimedRewards from '../../hooks/useGetUnclaimedRewards'

const StyledCard = styled(Card)`
  margin: 0 !important;
  max-width: 100% !important;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isDisabled
      ? `  
        margin-top: 0;
        background-color: unset;
        box-shadow: unset;
        border: 1px solid ${props.theme.colors.textDisabled};

        ${props.theme.mediaQueries.sm} {
          margin-top: 0;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 0;
        }
        `
      : ``}
`

const YourPrizesCard: React.FC = () => {
  const TranslateString = useI18n()
  const { fetchAllRewards, unclaimedRewards, fetchStatus } = useGetUnclaimedRewards()

  const checkNowText = () => {
    // if (lotteryIsNotClaimable) {
    //   return `${t('Calculating rewards')}...`
    // }
    // if (isFetchingRewards) {
    //   return t('Checking')
    // }
    return TranslateString(999, 'Check Now')
  }

  const a = true;
  return (
    // <StyledCard isDisabled={!isAWin} isActive={isAWin}>
    <StyledCard >
      <Flex alignItems="center" justifyContent="center">
        {/* <TicketImage src="/images/lottery/ticket-l.png" alt="lottery ticket" /> */}
        <Flex mx={['4px', null, '16px']} flexDirection="column">
          <Heading textAlign="center" color="#F4EEFF" mb="24px">
            {TranslateString(999,'Are you a winner?')}
          </Heading>
          <Button
            style={{backgroundColor: "#f4c708"}}
            // disabled={isCheckNowDisabled}
            onClick={fetchAllRewards}
            // isLoading={a}
            // endIcon={ <AutoRenewIcon color="currentColor" spin /> }
          >
            {checkNowText()}
          </Button>
        </Flex>
        {/* <TicketImage src="/images/lottery/ticket-r.png" alt="lottery ticket" /> */}
      </Flex>
      {/* <CardBody>{isAWin ? <PrizesWonContent /> : <NoPrizesContent />}</CardBody> */}
    </StyledCard>
  )
}

export default YourPrizesCard
