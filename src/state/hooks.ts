import { Toast, toastTypes } from '@luckyswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Team } from 'config/constants/types'
import useRefresh from 'hooks/useRefresh'
import { kebabCase } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3NoAccount } from 'utils/web3'
import { LUCKY2_PRICE, LUCKY_PRICE } from '../config'
import { useActiveWeb3React } from '../hooks/index'
import { fetchAchievements } from './achievements'
import {
  clear as clearToast,
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  push as pushToast,
  remove as removeToast,
  setBlock,
} from './actions'
import { fetchPrices } from './prices'
import { fetchProfile } from './profile'
import { fetchCurrentLotteryId, fetchCurrentLottery, fetchPastLotteries } from './lottery2'

import { fetchTeam, fetchTeams } from './teams'
import { AchievementState, Farm, Pool, PriceState, ProfileState, State, TeamsState } from './types'
import { fetchCurrentLotteryIdAndMaxBuy } from './lottery2/helpers';

export const useFetchPublicData = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const web3NoAccount = useWeb3NoAccount()
  useEffect(() => {
    if (chainId && chainId !== 56){
      dispatch(fetchPoolsPublicDataAsync() as any)
      dispatch(fetchFarmsPublicDataAsync() as any)
    }
  }, [dispatch, slowRefresh, chainId])

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = web3NoAccount && (await web3NoAccount.eth.getBlockNumber())
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch, chainId, web3NoAccount])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// lottery v2
export const useFetchLottery = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const currentLotteryId = useGetCurrentLotteryId()

  useEffect(() => {
    // get current lottery ID, max tickets and historical lottery subgraph data
    dispatch(fetchCurrentLotteryId())
    dispatch(fetchPastLotteries())
  }, [dispatch])

  useEffect(() => {
    // get public data for current lottery
    if (currentLotteryId) {
      dispatch(fetchCurrentLottery({ currentLotteryId })) 
    }
  }, [dispatch, currentLotteryId, fastRefresh])

  useEffect(() => {
    // get user tickets for current lottery, and user lottery subgraph data
    if (account && currentLotteryId) {
      // dispatch(fetchUserTicketsAndLotteries({ account, lotteryId: currentLotteryId }))
    }
  }, [dispatch, currentLotteryId, account])
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account) as any)
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Toasts
export const useToast = () => {
  const dispatch = useAppDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account) as any)
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id) as any)
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeams() as any)
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account) as any)
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPrices() as any)
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }
  return prices[token.toLowerCase()]
}

export const usePriceLuckyBusd = (): BigNumber => {
  return new BigNumber(LUCKY_PRICE) // TODO: this one will call api , current set price default
}

export const useLucky2Price = (): BigNumber => {
  return new BigNumber(LUCKY2_PRICE)
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}


export const useLotteryV2 = async () => {
  const {currentLotteryId, maxNumberTicketsPerBuyOrClaim} = await fetchCurrentLotteryIdAndMaxBuy();
  return {currentLotteryId , maxNumberTicketsPerBuyOrClaim}
}

export const useGetCurrentLotteryId = () => {
  return useSelector((state: State) => state.lottery.currentLotteryId)
}
export const useGetLotteriesGraphData = () => {
  return useSelector((state: State) => state.lottery.lotteriesData)
}
export const useGetUserLotteriesGraphData = () => {
  return useSelector((state: State) => state.lottery.userLotteryData)
}
