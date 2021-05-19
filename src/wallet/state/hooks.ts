import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from '../utils/useRefresh'
import {
  fetchPoolsUserDataAsync,
  fetchPoolsPublicDataAsync
} from './actions'
import { State, Farm, Pool, ProfileState, TeamsState, AchievementState, PriceState } from './types'

// Pools

export const usePools = (account:any): Pool[] => {
  const { fastRefresh } = useRefresh()

  const dispatch = useDispatch()
  useEffect(() => {
    if(account){
      dispatch(fetchPoolsUserDataAsync(account))
      
    }else{
      dispatch(fetchPoolsPublicDataAsync())
    }

  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)

  return pools
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
