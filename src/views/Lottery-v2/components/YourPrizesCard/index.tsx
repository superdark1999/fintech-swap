import React, { useEffect, useState }from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Button, Heading, Flex, useModal, AutoRenewIcon, Card } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { fetchUserLotteries } from 'state/lottery2'
import { useAppDispatch } from 'state'
import { useGetUserLotteriesGraphData, useLottery } from 'state/hooks'
import useGetUnclaimedRewards, { FetchStatus }  from '../../hooks/useGetUnclaimedRewards'
import ClaimPrizesModal from '../ClaimPrizesModal'

const TicketImage = styled.img`
  height: 60px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 100px;
  }
`

const TornTicketImage = styled.img`
  height: 54px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 84px;
  }
`
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
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const { fetchAllRewards, unclaimedRewards, fetchStatus } = useGetUnclaimedRewards()
  const userLotteryData = useGetUserLotteriesGraphData()
  const [hasCheckedForRewards, setHasCheckedForRewards] = useState(false)
  const [hasRewardsToClaim, setHasRewardsToClaim] = useState(false)
  const isFetchingRewards = fetchStatus === FetchStatus.IN_PROGRESS
  const isCheckNowDisabled = !userLotteryData.account 
  const [onPresentClaimModal] = useModal(<ClaimPrizesModal roundsToClaim={unclaimedRewards} />, false)

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUserLotteries({ account }));
  }, [account, dispatch])

  useEffect(() => {
    if (fetchStatus === FetchStatus.SUCCESS) {
      // Manage showing unclaimed rewards modal once per page load / once per lottery state change
      console.log("condition", unclaimedRewards.length, hasCheckedForRewards)
      if (unclaimedRewards.length !== 0 && !hasCheckedForRewards) {
        setHasRewardsToClaim(true)
        setHasCheckedForRewards(true)
        console.log("opennnnn")
        onPresentClaimModal()
      }

      if (unclaimedRewards.length === 0 && !hasCheckedForRewards) {
        setHasRewardsToClaim(false)
        setHasCheckedForRewards(true)
      }
    }
  }, [unclaimedRewards, hasCheckedForRewards, fetchStatus, onPresentClaimModal])

 // clear user state
 useEffect(() => {
    // Clear local state on account change, or when lottery isTransitioning state changes
    setHasRewardsToClaim(false)
    setHasCheckedForRewards(false)
  }, [account])

  const getBody = () => {
    if (!account) {
      return (
        <Flex alignItems="center" justifyContent="center">
          <TicketImage src="/images/lottery/ticket-l.png" alt="lottery ticket" />
          <Flex mx={['4px', null, '16px']} flexDirection="column" alignItems="center">
            <Heading textAlign="center" color="#F4EEFF">
              {TranslateString(999,'Connect your wallet')}
            </Heading>
            <Heading textAlign="center" color="#F4EEFF" mb="24px">
              {TranslateString(999,"to check if you've won!")}
            </Heading>
          </Flex>
          <TicketImage src="/images/lottery/ticket-r.png" alt="lottery ticket" />
        </Flex>
      )
    }
    if (hasCheckedForRewards && !hasRewardsToClaim) {
      return (
        <Flex alignItems="center" justifyContent="center">
          <TornTicketImage src="/images/lottery/torn-ticket-l.png" alt="torn lottery ticket" />
          <Flex mx={['4px', null, '16px']} flexDirection="column">
            <Heading textAlign="center" color="#F4EEFF">
              {TranslateString(999,'No prizes to collect')}...
            </Heading>
            <Heading textAlign="center" color="#F4EEFF">
              {TranslateString(999,'Better luck next time!')}
            </Heading>
          </Flex>
          <TornTicketImage src="/images/lottery/torn-ticket-r.png" alt="torn lottery ticket" />
        </Flex>
      )
    }
    if (hasCheckedForRewards && hasRewardsToClaim) {
      return (
        <Flex alignItems="center" justifyContent="center">
          <TicketImage src="/images/icon-lottery.svg" alt="lottery ticket" />
          <Flex mx={['4px', null, '16px']} flexDirection="column">
            <Heading textAlign="center" color="#F4EEFF">
              {TranslateString(999, 'Congratulations!')}
            </Heading>
            <Heading textAlign="center" color="#F4EEFF">
              {TranslateString(999,'Why not play again')}
            </Heading>
          </Flex>
          <TicketImage src="/images/icon-lottery.svg" alt="lottery ticket" />
        </Flex>
      )
    }
    const checkNowText = () => {
      // if (lotteryIsNotClaimable) {
      //   return `${TranslateString(999,'Calculating rewards')}...`
      // }
      if (isFetchingRewards) {
        return TranslateString(999,'Checking')
      }
      return TranslateString(999,'Check Now')
    }
    return (
     <Flex alignItems="center" justifyContent="center">
        {/* <TicketImage src="/images/lottery/ticket-l.png" alt="lottery ticket" /> */}
        <Flex mx={['4px', null, '16px']} flexDirection="column">
          <Heading textAlign="center" color="#F4EEFF" mb="24px">
            {TranslateString(999,'Are you a winner?')}
          </Heading>
          <Button
            style={{backgroundColor: "#f4c708"}}
            disabled={isCheckNowDisabled}
            onClick={fetchAllRewards}
            // isLoading={a}
            // endIcon={ <AutoRenewIcon color="currentColor" spin /> }
          >
            {checkNowText()}
          </Button>
        </Flex>
        {/* <TicketImage src="/images/lottery/ticket-r.png" alt="lottery ticket" /> */}
      </Flex>
    )
  }


  return (
    // <StyledCard isDisabled={!isAWin} isActive={isAWin}>
    <StyledCard >
     {getBody()}
    </StyledCard>
  )
}

export default YourPrizesCard
