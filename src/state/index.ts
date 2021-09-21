import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import toastsReducer from './toasts'
import poolsReducer from './pools'
import pricesReducer from './prices'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import lotteryReducer from './lottery2'
import spaceHunterCollection from './collection'

import user from './user/reducer'
import swap from './swap/reducer'
import burn from './burn/reducer'

import lists from './lists/reducer'
import application from './application/reducer'
import multicall from './multicall/reducer'
import transactions from './transactions/reducer'
import mint from './mint/reducer'

type MergedState = {
  user: {
    [key: string]: any
  }
  transactions: {
    [key: string]: any
  }
}
const PERSISTED_KEYS: string[] = ['user', 'transactions']
const loadedState = load({ states: PERSISTED_KEYS }) as MergedState
if (loadedState.user) {
  // loadedState.user.userDarkMode = getThemeCache()
}
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    burn,
    mint,
    transactions,
    multicall,
    application,
    lists,
    swap,
    user,
    farms: farmsReducer,
    toasts: toastsReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    profile: profileReducer,
    teams: teamsReducer,
    achievements: achievementsReducer,
    block: blockReducer,
    lottery: lotteryReducer,
    spaceHunterCollection,
  },
  // middleware: [...(getDefaultMiddleware({ thunk: false }) as any), save({ states: PERSISTED_KEYS })],
  // preloadedState: loadedState,
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppState = ReturnType<typeof store.getState>

export default store
