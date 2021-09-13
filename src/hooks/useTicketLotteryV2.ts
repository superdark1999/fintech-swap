import { useWeb3React } from '@web3-react/core'
import { Ticket } from 'config/constants/types'
import { useLotteryV2contract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useAppDispatch } from 'state'
import { useGetCurrentLotteryId } from 'state/hooks'
import { fetchUserTicketsAndLotteries } from 'state/lottery2'

export const useTicketLotteryV2 = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  const lotteryV2Contract = useLotteryV2contract()
  const currentLotteryId = useGetCurrentLotteryId()

  useEffect(() => {
    lotteryV2Contract.on('TicketsPurchase', () => {
      if (account && currentLotteryId) {
        dispatch(fetchUserTicketsAndLotteries({ account, lotteryId: currentLotteryId }) as any)
      }
    })
    const fetchTickets = async () => {
      try {
        const userInfoForLottery = await lotteryV2Contract.viewUserInfoForLotteryId(account, currentLotteryId, 0, 10000)
        const tempTickets = []
        for (let i = 0; i < userInfoForLottery[0].length; i++) {
          const ticket = {
            ticketId: userInfoForLottery[0][i]?.toNumber(),
            ticketNumber: userInfoForLottery[1][i],
            status: userInfoForLottery[2][i],
          }

          tempTickets.push(ticket)
        }
        setTickets(tempTickets)
      } catch (error) {
        console.log('error fetchTicket', error)
      }
    }
    if (account && currentLotteryId && lotteryV2Contract) fetchTickets()
  }, [account, currentLotteryId, dispatch, lotteryV2Contract])

  return tickets
}
