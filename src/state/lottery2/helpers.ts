import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import { request, gql } from 'graphql-request'
import { ethers } from 'ethers'
// import { GRAPH_API_LOTTERY } from 'config/constants/endpoints'
import { LotteryStatus, LotteryTicket } from 'config/constants/types'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import { BASE_API_ADMIN } from 'config'
import { getLotteryV2Address } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'

import {
  LotteryUserGraphEntity,
  LotteryRoundGraphEntity,
  LotteryRound,
  UserTicketsResponse,
  UserRound,
  LotteryRoundUserTickets,
  LotteryResponse,
} from 'state/types'
import { getLotteryV2Contract } from 'utils/contractHelpers'
import { ethersToSerializedBigNumber } from 'utils/bigNumber'
import formatLotteryDate from 'views/Lottery/helpers/formatLotteryDate'

const lotteryV2Contract = getLotteryV2Contract()

export const fetchLottery = async (lotteryId: string): Promise<LotteryResponse> => {
  try {
    const lotteryData = await lotteryV2Contract.viewLottery(lotteryId)
    const {
      status,
      startTime,
      endTime,
      priceTicketInCake,
      discountDivisor,
      treasuryFee,
      firstTicketId,
      firstTicketIdNextLottery,
      amountCollectedInCake,
      finalNumber,
      cakePerBracket,
      countWinnersPerBracket,
      rewardsBreakdown,
    } = lotteryData
    const priceTicket = new BigNumber(ethersToSerializedBigNumber(priceTicketInCake))

    const statusKey = Object.keys(LotteryStatus)[status]
    const serializedCakePerBracket = cakePerBracket.map((cakeInBracket) => ethersToSerializedBigNumber(cakeInBracket))
    const serializedCountWinnersPerBracket = countWinnersPerBracket.map((winnersInBracket) =>
      ethersToSerializedBigNumber(winnersInBracket),
    )
    const serializedRewardsBreakdown = rewardsBreakdown.map((reward) => ethersToSerializedBigNumber(reward))

    return {
      isLoading: false,
      status: LotteryStatus[statusKey],
      startTime: startTime?.toString(),
      endTime: endTime?.toString(),
      priceTicketInCake: priceTicket.div(1e18).toString(),
      discountDivisor: discountDivisor?.toString(),
      treasuryFee: treasuryFee?.toString(),
      firstTicketId: firstTicketId?.toString(),
      lastTicketId: (firstTicketIdNextLottery - 1)?.toString(),
      amountCollectedInCake: ethersToSerializedBigNumber(amountCollectedInCake),
      finalNumber,
      cakePerBracket: serializedCakePerBracket,
      countWinnersPerBracket: serializedCountWinnersPerBracket,
      rewardsBreakdown: serializedRewardsBreakdown,
    }
  } catch (error) {
    return {
      isLoading: true,
      status: LotteryStatus.PENDING,
      startTime: '',
      endTime: '',
      priceTicketInCake: '',
      discountDivisor: '',
      treasuryFee: '',
      firstTicketId: '',
      lastTicketId: '',
      amountCollectedInCake: '',
      finalNumber: null,
      cakePerBracket: [],
      countWinnersPerBracket: [],
      rewardsBreakdown: [],
    }
  }
}

export const fetchCurrentLotteryIdAndMaxBuy = async () => {
  try {
    const calls = ['currentLotteryId', 'maxNumberTicketsPerBuyOrClaim'].map((method) => ({
      address: getLotteryV2Address(),
      name: method,
    }))
    const [[currentLotteryId], [maxNumberTicketsPerBuyOrClaim]] = await multicallv2(lotteryV2Abi, calls)
    return {
      currentLotteryId: currentLotteryId ? currentLotteryId.toString() : null,
      maxNumberTicketsPerBuyOrClaim: maxNumberTicketsPerBuyOrClaim ? maxNumberTicketsPerBuyOrClaim.toString() : null,
    }
  } catch (error) {
    return {
      currentLotteryId: null,
      maxNumberTicketsPerBuyOrClaim: null,
    }
  }
}

export const processRawTicketsResponse = (ticketsResponse: UserTicketsResponse): LotteryTicket[] => {
  const [ticketIds, ticketNumbers, ticketStatuses] = ticketsResponse

  if (ticketIds?.length > 0) {
    return ticketIds.map((ticketId, index) => {
      return {
        id: ticketId.toString(),
        number: ticketNumbers[index].toString(),
        status: ticketStatuses[index],
      }
    })
  }
  return []
}

export const getViewUserTicketInfoCalls = (totalTicketsToRequest: number, account: string, lotteryId: string) => {
  let cursor = 0
  const perRequestLimit = 1000
  const calls = []

  for (let i = 0; i < totalTicketsToRequest; i += perRequestLimit) {
    cursor = i
    calls.push({
      name: 'viewUserInfoForLotteryId',
      address: getLotteryV2Address(),
      params: [account, lotteryId, cursor, perRequestLimit],
    })
  }
  return calls
}

export const mergeViewUserTicketInfoMulticallResponse = (response) => {
  const mergedMulticallResponse: UserTicketsResponse = [[], [], []]

  response.forEach((ticketResponse) => {
    mergedMulticallResponse[0].push(...ticketResponse[0])
    mergedMulticallResponse[1].push(...ticketResponse[1])
    mergedMulticallResponse[2].push(...ticketResponse[2])
  })

  return mergedMulticallResponse
}

export const fetchTickets = async (
  account: string,
  lotteryId: string,
  userRoundData?: UserRound,
): Promise<LotteryTicket[]> => {
  // If the subgraph is returning user totalTickets data for the round - use those totalTickets, if not - batch request up to 5000
  const totalTicketsToRequest = userRoundData ? parseInt(userRoundData?.totalTickets, 10) : 5000
  const calls = getViewUserTicketInfoCalls(totalTicketsToRequest, account, lotteryId)
  try {
    const multicallRes = await multicallv2(lotteryV2Abi, calls, { requireSuccess: false })
    // When using a static totalTicketsToRequest value - null responses may be returned
    const filteredForNullResponses = multicallRes.filter((res) => res)
    const mergedMulticallResponse = mergeViewUserTicketInfoMulticallResponse(filteredForNullResponses)
    const completeTicketData = processRawTicketsResponse(mergedMulticallResponse)
    return completeTicketData
  } catch (error) {
    console.error(error)
    return null
  }
}
export const getGraphLotteries = async (): Promise<LotteryRoundGraphEntity[]> => {
  // -------------------------
  // const currentLotteryId = await lotteryV2Contract.viewCurrentLotteryId()
  // const id = ethersToSerializedBigNumber(currentLotteryId)
  // const lotteries = []
  // for (let i = 1; i <= parseInt(id); i++) {
  //   const lotteryData = await fetchLottery(i.toString())
  //   const lottery: LotteryRoundGraphEntity = {
  //     id: i.toString(),
  //     totalUsers: '0',
  //     totalTickets: (parseInt(lotteryData.lastTicketId) - parseInt(lotteryData.firstTicketId + 1)).toString(),
  //     status: lotteryData.status,
  //     finalNumber: lotteryData.finalNumber.toString(),
  //     winningTickets: '',
  //     startTime: lotteryData.startTime,
  //     endTime: lotteryData.endTime,
  //     ticketPrice: lotteryData.priceTicketInCake,
  //     firstTicket: lotteryData.firstTicketId,
  //     lastTicket: lotteryData.lastTicketId,
  //     amountCollectedInCake: lotteryData.amountCollectedInCake,
  //   }
  //   lotteries.push(lottery)
  // }
  // return lotteries
  // -------------------------
  try {
    const { data } = await axios.get(`${BASE_API_ADMIN}/lotteriesv2/all-lottery-data`)
    return data
  } catch (error) {
    console.log('error graph lottery', error)
    return []
  }
}

export const getGraphLotteryUser = async (account: string): Promise<LotteryUserGraphEntity> => {
  // -------------------------
  // const currentLotteryId = await lotteryV2Contract.viewCurrentLotteryId()
  // const id = ethersToSerializedBigNumber(currentLotteryId)
  // const userData = {
  //   account,
  //   totalCake: '0',
  //   totalTickets: '0',
  //   rounds: [],
  // }
  // for (let i = 1; i <= parseInt(id); i++) {
  //   const lotteryData = await fetchLottery(i.toString())
  //   const userInfoForLottery = await lotteryV2Contract.viewUserInfoForLotteryId(account, i, 0, 10000)
  //   if (userInfoForLottery[0].length !== 0) {
  //     // number tickets = 0
  //     const round: UserRound = {
  //       lotteryId: i.toString(),
  //       endTime: lotteryData.endTime,
  //       claimed: false,
  //       totalTickets: userInfoForLottery[0].length,
  //       status: lotteryData.status,
  //     }
  //     userData.rounds.push(round)
  //   }
  // }
  // return userData
  // -------------------------
  try {
    const { data } = await axios.get(`${BASE_API_ADMIN}/lotteriesv2/lottery-user/${account}`)
    return data
  } catch (error) {
    console.log('error graph user', error)
    return null
  }
}

export const useProcessLotteryResponse = (
  lotteryData: LotteryResponse & { userTickets?: LotteryRoundUserTickets },
): LotteryRound => {
  const {
    priceTicketInCake: priceTicketInCakeAsString,
    discountDivisor: discountDivisorAsString,
    amountCollectedInCake: amountCollectedInCakeAsString,
  } = lotteryData

  const discountDivisor = useMemo(() => {
    return new BigNumber(discountDivisorAsString)
  }, [discountDivisorAsString])

  const priceTicketInCake = useMemo(() => {
    return new BigNumber(priceTicketInCakeAsString)
  }, [priceTicketInCakeAsString])

  const amountCollectedInCake = useMemo(() => {
    return new BigNumber(amountCollectedInCakeAsString)
  }, [amountCollectedInCakeAsString])

  return {
    isLoading: lotteryData.isLoading,
    userTickets: lotteryData.userTickets,
    status: lotteryData.status,
    startTime: lotteryData.startTime,
    endTime: lotteryData.endTime,
    priceTicketInCake,
    discountDivisor,
    treasuryFee: lotteryData.treasuryFee,
    firstTicketId: lotteryData.firstTicketId,
    lastTicketId: lotteryData.lastTicketId,
    amountCollectedInCake,
    finalNumber: lotteryData.finalNumber,
    cakePerBracket: lotteryData.cakePerBracket,
    countWinnersPerBracket: lotteryData.countWinnersPerBracket,
    rewardsBreakdown: lotteryData.rewardsBreakdown,
  }
}
