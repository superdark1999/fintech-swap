import React, { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useLotteryV2contract } from 'hooks/useContract'

export const useTicketLotteryV2 = () => {
  const [tickets, setTickets] = useState([]);
  const { account } = useWeb3React()

  const lotteryV2Contract = useLotteryV2contract()

  useEffect(() => {
    const fetchTickets = async () => {
      const currentLotteryId = await lotteryV2Contract.currentLotteryId();
      const userInfoForLottery = await lotteryV2Contract.viewUserInfoForLotteryId(account, currentLotteryId, 0,1000);
      const tempTickets = []
      for (let i =0; i< userInfoForLottery[0].length; i++) {
        const ticket = {
          ticketId: userInfoForLottery[0][i]?.toNumber(),
          ticketNumber: userInfoForLottery[1][i],
          status: userInfoForLottery[2][i]
        }

        tempTickets.push(ticket);
      }

      setTickets(tempTickets);
    } 
    if (account && lotteryV2Contract)
      fetchTickets();
  }, [account, lotteryV2Contract])

  return tickets;
}