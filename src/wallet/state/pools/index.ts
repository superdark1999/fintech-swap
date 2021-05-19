/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from '../config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStaking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find(
          (entry) => entry.sousId === pool.sousId,
        )
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find(
          (entry: any) => entry.sousId === pool.sousId,
        )
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = {
        ...state.data[index],
        userData: { ...state.data[index].userData, [field]: value },
      }
    },
  },
})

// Actions
export const {
  setPoolsPublicData,
  setPoolsUserData,
  updatePoolsUserData,
} = PoolsSlice.actions

// Thunks

export const fetchPoolsUserDataAsynfetchPoolsAllowancec = (
  account: any,
) => async (dispatch: any) => {
  const allowances: any = await account
  const stakingTokenBalances: any = await fetchUserBalances(account)
  const stakedBalances: any = await fetchUserStakeBalances(account)
  const pendingRewards: any = await fetchUserPendingRewards(account)

  const userData = poolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    pendingReward: pendingRewards[pool.sousId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (
  dispatch: any,
) => {
  const allowances: any = await fetchPoolsAllowance(account)
  dispatch(
    updatePoolsUserData({
      sousId,
      field: 'allowance',
      value: allowances[sousId],
    }),
  )
}

export const updateUserBalance = (sousId: string, account: string) => async (
  dispatch: any,
) => {
  const tokenBalances: any = await fetchUserBalances(account)
  dispatch(
    updatePoolsUserData({
      sousId,
      field: 'stakingTokenBalance',
      value: tokenBalances[sousId],
    }),
  )
}

export const updateUserStakedBalance = (
  sousId: string,
  account: string,
) => async (dispatch: any) => {
  const stakedBalances: any = await fetchUserStakeBalances(account)
  dispatch(
    updatePoolsUserData({
      sousId,
      field: 'stakedBalance',
      value: stakedBalances[sousId],
    }),
  )
}

export const updateUserPendingReward = (
  sousId: string,
  account: string,
) => async (dispatch: any) => {
  const pendingRewards: any = await fetchUserPendingRewards(account)
  dispatch(
    updatePoolsUserData({
      sousId,
      field: 'pendingReward',
      value: pendingRewards[sousId],
    }),
  )
}

export const fetchPoolsPublicDataAsync = () => async (dispatch: any) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStaking()

  let liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
    const totalStaking = totalStakings.find(
      (entry) => entry.sousId === pool.sousId,
    )
    return {
      ...blockLimit,
      ...totalStaking,
    }
  })
  const result = poolsConfig.map((pool, i) => ({
    ...pool,
    userData:{
      totalStaked: liveData[i].totalStaked,
      endBlock: liveData[i].endBlock
    }
  }))
  
  dispatch(setPoolsPublicData(result))
}

export const fetchPoolsUserDataAsync = (account: any) => async (
  dispatch: any,
) => {
  const allowances: any = await fetchPoolsAllowance(account)
  const stakingTokenBalances: any = await fetchUserBalances(account)
  const stakedBalances: any = await fetchUserStakeBalances(account)
  const pendingRewards: any = await fetchUserPendingRewards(account)
  const totalStakings: any = await fetchPoolsTotalStaking()
  const blockLimits = await fetchPoolsBlockLimits()
  const userData = poolsConfig.map((pool, i) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    pendingReward: pendingRewards[pool.sousId],
    totalStaked: totalStakings[i].totalStaked,
    endBlock: blockLimits[i].endBlock,
  }))
  dispatch(setPoolsUserData(userData))
}

export default PoolsSlice.reducer
