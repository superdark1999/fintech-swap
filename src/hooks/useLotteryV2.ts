import React, { useCallback, useEffect, useState } from 'react'
import { getLotteryV2Contract } from 'utils/contractHelpers'
// import { fetchCurrentLotteryIdAndMaxBuy } from '../state/lotteryV2/helpers';
import { useLotteryV2contract } from 'hooks/useContract'

export const useLotteryV2 = () => {
  const [state, setState] = useState(
    {
      currentLotteryId: '0',
      maxNumberTicketsPerBuyOrClaim: '0'
    }
  )

  const lotteryV2Contract = useLotteryV2contract()
  // console.log("lotteryV2Contract", lotteryV2Contract)

  useEffect(() => {
    const fetchLotteryV2Data  = async ()=> {
      if (lotteryV2Contract){
        const currentLotteryId = await lotteryV2Contract.currentLotteryId();
        const maxNumberTicketsPerBuyOrClaim = await lotteryV2Contract.maxNumberTicketsPerBuyOrClaim();

        setState({ 
          currentLotteryId: currentLotteryId.toNumber(), 
          maxNumberTicketsPerBuyOrClaim: maxNumberTicketsPerBuyOrClaim.toNumber()
        })
      }
    }
    fetchLotteryV2Data();
  }, [lotteryV2Contract])

  return state;
}