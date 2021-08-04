import React, { useState, useEffect } from 'react'
import { Button, Modal, Skeleton } from '@luckyswap/uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { LotteryTicket, Ticket,  LotteryTicketClaimData } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { fetchLottery, fetchTickets } from 'state/lottery2/helpers'
import { getWinningTickets } from 'state/lottery2/fetchUnclaimedUserRewards'
import { LotteryRound } from 'state/types'

import { useLottery, useGetUserLotteryGraphRoundById } from 'state/hooks'
import { processLotteryResponse } from '../../helpers'

import TicketNumber from './TicketNumber'


const TicketSkeleton = () => {
  return (
    <>
      <Skeleton width="32px" height="12px" mt="2px" mb="4px" />
      <Skeleton width="100%" height="34px" mb="12px" />
    </>
  )
}

const PreviousUserTicketsModal: React.FC<{ roundId: string }> = ({ roundId }) => {
  // const TranslateString = useI18n()
  // // const {
  // //   isTransitioning,
  // //   currentRound: { status, userTickets },
  // // } = useLottery()
  // const { account } = useWeb3React();
  // const [lotteryInfo, setLotteryInfo] = useState<LotteryRound>(null)
  // const [allUserTickets, setAllUserTickets] = useState<LotteryTicket[]>(null)
  // const [userWinningTickets, setUserWinningTickets] = useState<{
  //   allWinningTickets: LotteryTicket[]
  //   ticketsWithUnclaimedRewards: LotteryTicket[]
  //   isFetched: boolean
  //   claimData: LotteryTicketClaimData
  // }>({ allWinningTickets: null, ticketsWithUnclaimedRewards: null, isFetched: false, claimData: null })

  // const userLotteryRoundData = useGetUserLotteryGraphRoundById(roundId)


  // useEffect(() => {
  //   const addWinningTicketInfoToAllTickets = (
  //     _allTickets: LotteryTicket[],
  //     _allWinningTickets: LotteryTicket[],
  //   ): LotteryTicket[] => {
  //     const allTicketsWithWinningTickets = _allTickets.map((ticket) => {
  //       const winningTicketEquivalent = _allWinningTickets.find((winningTicket) => winningTicket.id === ticket.id)
  //       if (winningTicketEquivalent) {
  //         return winningTicketEquivalent
  //       }
  //       return ticket
  //     })
  //     return allTicketsWithWinningTickets
  //   }

  //   const sortTicketsByWinningBracket = (tickets) => {
  //     return tickets.sort((ticketA, ticketB) => {
  //       const rewardBracket1 = ticketA.rewardBracket === undefined ? 0 : ticketA.rewardBracket + 1
  //       const rewardBracket2 = ticketB.rewardBracket === undefined ? 0 : ticketB.rewardBracket + 1
  //       return rewardBracket2 - rewardBracket1
  //     })
  //   }

  //   const fetchData = async () => {
  //     const userTickets = await fetchTickets(account, roundId, userLotteryRoundData)
  //     const lotteryData = await fetchLottery(roundId)
  //     const processedLotteryData = processLotteryResponse(lotteryData)
  //     const winningTickets = await getWinningTickets({
  //       roundId,
  //       userTickets,
  //       finalNumber: processedLotteryData.finalNumber.toString(),
  //     })

  //     setUserWinningTickets({
  //       isFetched: true,
  //       allWinningTickets: winningTickets?.allWinningTickets,
  //       ticketsWithUnclaimedRewards: winningTickets?.ticketsWithUnclaimedRewards,
  //       claimData: winningTickets,
  //     })
  //     setLotteryInfo(processedLotteryData)

  //     // If the user has some winning tickets - modify the userTickets response to include that data
  //     if (winningTickets?.allWinningTickets) {
  //       const allTicketsWithWinningTicketInfo = addWinningTicketInfoToAllTickets(
  //         userTickets,
  //         winningTickets.allWinningTickets,
  //       )
  //       const ticketsSortedByWinners = sortTicketsByWinningBracket(allTicketsWithWinningTicketInfo)
  //       setAllUserTickets(ticketsSortedByWinners)
  //     } else {
  //       setAllUserTickets(userTickets)
  //     }
  //   }

  //   fetchData()
  // }, [roundId, account, userLotteryRoundData])


  // const listItems =  allUserTickets ? (
  //   allUserTickets.map((ticket) => {
  //     return (
  //       <TicketNumber
  //         key={ticket.id}
  //         id={ticket.id}
  //         number={ticket.number}
  //         rewardBracket={ticket.rewardBracket}
  //         status={ticket.status}
  //       />
  //     )
  //   })
  // ) : (
  //   <>
  //     <TicketSkeleton />
  //     <TicketSkeleton />
  //     <TicketSkeleton />
  //     <TicketSkeleton />
  //   </>
  // )}

  // return (
  //   <Modal
  //     title={TranslateString(490, `My Tickets (Total: ${myTicketNumbers.length})`, { TICKETS: myTicketNumbers.length })}
  //     onDismiss={onDismiss}
  //   >
  //     <TicketsList>
  //       <h2>{listItems}</h2>
  //     </TicketsList>
  //     <StyledButton variant="secondary" onClick={onDismiss}>
  //       {TranslateString(438, 'Close')}
  //     </StyledButton>
  //   </Modal>
  // )
  return <div>previous</div>
}

const RewardP = styled.div`
  color: #ff8c28;
`

const TicketsList = styled.div`
  text-align: center;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing[2]}px;
`

export default PreviousUserTicketsModal
