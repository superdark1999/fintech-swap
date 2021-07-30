import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
// import { fetchCurrentLotteryIdAndMaxBuy } from '../state/lotteryV2/helpers';
import { useLotteryV2contract } from 'hooks/useContract'
import { ethersToSerializedBigNumber } from 'utils/bigNumber'


export const useLotteryV2 = () => {
  const [state, setState] = useState(
    {
      currentLotteryId: '0',
      maxNumberTicketsPerBuyOrClaim: '0',
      lotteryData: {
        status: "",
        startTime: 0,
        endTime: 1,
        priceTicketInCake: new BigNumber(0),
        discountDivisor: new BigNumber(0),
        treasuryFee: new BigNumber(0),
        firstTicketId:new BigNumber(0),
        lastTicketId: new BigNumber(0),
        amountCollectedInCake: new BigNumber(0),
        finalNumber: new BigNumber(0),
        cakePerBracket: [],
        countWinnersPerBracket: [],
        rewardsBreakdown: new BigNumber(0),
      }
    }
  )

  const lotteryV2Contract = useLotteryV2contract()
  // console.log("lotteryV2Contract", lotteryV2Contract)

  useEffect(() => {
    const fetchLotteryV2Data  = async ()=> {
      if (lotteryV2Contract){
        const currentLotteryId = await lotteryV2Contract.currentLotteryId();
        const maxNumberTicketsPerBuyOrClaim = await lotteryV2Contract.maxNumberTicketsPerBuyOrClaim();
        const lotteryData = await lotteryV2Contract.viewLottery(currentLotteryId)

        const {
          status,
          startTime,
          endTime,
          priceTicketInCake,
          discountDivisor,
          treasuryFee,
          firstTicketId,
          lastTicketId,
          amountCollectedInCake,
          finalNumber,
          cakePerBracket,
          countWinnersPerBracket,
          rewardsBreakdown,
        } = lotteryData
        console.log('status', status);

        console.log("lotteryData", lotteryData)

        setState({ 
          currentLotteryId: currentLotteryId.toNumber(), 
          maxNumberTicketsPerBuyOrClaim: maxNumberTicketsPerBuyOrClaim.toNumber(),
          lotteryData :{
            status: "",
            startTime: 0,
            endTime: 1,
            priceTicketInCake: new BigNumber(ethersToSerializedBigNumber(priceTicketInCake)),
            discountDivisor: new BigNumber(ethersToSerializedBigNumber(discountDivisor)),
            treasuryFee: new BigNumber(0),
            firstTicketId:new BigNumber(0),
            lastTicketId: new BigNumber(0),
            amountCollectedInCake: new BigNumber(0),
            finalNumber: new BigNumber(0),
            cakePerBracket: [],
            countWinnersPerBracket: [],
            rewardsBreakdown: new BigNumber(0)
          }
        })
      }
    }
    fetchLotteryV2Data();
  }, [lotteryV2Contract])

  return state;
}