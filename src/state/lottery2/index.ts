/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LotteryTicket, LotteryStatus } from 'config/constants/types'
import { LotteryState, LotteryRoundGraphEntity, LotteryUserGraphEntity, LotteryResponse } from 'state/types'
import {
  getGraphLotteries,
  getGraphLotteryUser,
  fetchLottery,
  fetchCurrentLotteryIdAndMaxBuy,
  fetchTickets,
} from './helpers'

interface PublicLotteryData {
  currentLotteryId: string
  maxNumberTicketsPerBuyOrClaim: string
}

const initialState: LotteryState = {
  currentLotteryId: null,
  isTransitioning: false,
  maxNumberTicketsPerBuyOrClaim: null,
  currentRound: {
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
    userTickets: {
      isLoading: true,
      tickets: [],
    },
  },
  lotteriesData: null,
  userLotteryData: { account: '', totalCake: '', totalTickets: '', rounds: [] },
}

export const fetchCurrentLottery = createAsyncThunk<LotteryResponse, { currentLotteryId: string }>(
  'lottery/fetchCurrentLottery',
  async ({ currentLotteryId }) => {
    const lotteryInfo = await fetchLottery(currentLotteryId)
    return lotteryInfo
  },
)

export const fetchCurrentLotteryId = createAsyncThunk<PublicLotteryData>('lottery/fetchCurrentLotteryId', async () => {
  const currentIdAndMaxBuy = await fetchCurrentLotteryIdAndMaxBuy()
  return currentIdAndMaxBuy
})

export const fetchUserTicketsAndLotteries = createAsyncThunk<
  { userTickets: LotteryTicket[]; userLotteries: LotteryUserGraphEntity },
  { account: string; lotteryId: string }
>('lottery/fetchUserTicketsAndLotteries', async ({ account, lotteryId }) => {
  const userLotteriesRes = await getGraphLotteryUser(account)
  const userRoundData = userLotteriesRes.rounds?.find((round) => round.lotteryId === lotteryId)
  const userTickets = await fetchTickets(account, lotteryId, userRoundData)
  // user has not bought tickets for the current lottery
  if (userTickets.length === 0) {
    return { userTickets: null, userLotteries: userLotteriesRes }
  }

  return { userTickets, userLotteries: userLotteriesRes }
})

export const fetchPastLotteries = createAsyncThunk<LotteryRoundGraphEntity[]>(
  'lottery/fetchPastLotteries',
  async () => {
    const lotteries = await getGraphLotteries()
    return lotteries
  },
)

export const fetchUserLotteries = createAsyncThunk<LotteryUserGraphEntity, { account: string }>(
  'lottery/fetchUserLotteries',
  async ({ account }) => {
    const userLotteries = await getGraphLotteryUser(account)

    return userLotteries
  },
)

export const setLotteryIsTransitioning = createAsyncThunk<{ isTransitioning: boolean }, { isTransitioning: boolean }>(
  `lottery/setIsTransitioning`,
  async ({ isTransitioning }) => {
    return { isTransitioning }
  },
)

export const LotterySlice = createSlice({
  name: 'Lottery',
  initialState,
  reducers: {
    setLotteryPublicData: (state, action) => {
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentLottery.fulfilled, (state, action: PayloadAction<LotteryResponse>) => {
      state.currentRound = { ...state.currentRound, ...action.payload }
    })
    builder.addCase(fetchCurrentLotteryId.fulfilled, (state, action: PayloadAction<PublicLotteryData>) => {
      state.currentLotteryId = action.payload.currentLotteryId
      state.maxNumberTicketsPerBuyOrClaim = action.payload.maxNumberTicketsPerBuyOrClaim
    })
    builder.addCase(
      fetchUserTicketsAndLotteries.fulfilled,
      (state, action: PayloadAction<{ userTickets: LotteryTicket[]; userLotteries: LotteryUserGraphEntity }>) => {
        state.currentRound.userTickets.isLoading = false
        state.currentRound.userTickets.tickets = action.payload.userTickets
        state.userLotteryData = action.payload.userLotteries
      },
    )
    builder.addCase(fetchPastLotteries.fulfilled, (state, action: PayloadAction<LotteryRoundGraphEntity[]>) => {
      state.lotteriesData = action.payload
    })
    builder.addCase(fetchUserLotteries.fulfilled, (state, action: PayloadAction<LotteryUserGraphEntity>) => {
      state.userLotteryData = action.payload
    })
    builder.addCase(
      setLotteryIsTransitioning.fulfilled,
      (state, action: PayloadAction<{ isTransitioning: boolean }>) => {
        state.isTransitioning = action.payload.isTransitioning
      },
    )
  },
})

// Actions
export const { setLotteryPublicData } = LotterySlice.actions

export default LotterySlice.reducer
