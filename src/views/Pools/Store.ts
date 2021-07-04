import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import { BASE_API_ADMIN } from 'config'
import axios from 'axios'
import {Pool} from 'config/constants/types'


interface State {
  pools: Pool[],
  poolDetail: Pool
}

const stateDefault: State = {
  pools: [],
  // filterLaunchpads: [],
  poolDetail: null,
  // status: [
  //   { key: 'all', name: 'All' },
  //   { key: 'live', name: 'Live' },
  //   { key: 'finished', name: 'Finished' },
  //   { key: 'coming_soon', name: 'Coming Soon' },
  // ],
  // statusCombo: 'live',
  // keySearch: '',
}

const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    getPools:
      () =>
      ({ setState, getState }) => {
        if (getState().pools.length === 0)
          axios
            .get(`${BASE_API_ADMIN}/pools`)
            .then((response) => {
              const data = response.data.map((item) => {
                item.status = ''
                return item
              })
              setState({
                ...getState(),
                pools: data,
              })
            })
            .catch((error) => console.log('error fetching launchpads data'))
      },
  //   changeKeySearch:
  //     (value) =>
  //     ({setState }) => {
  //       setState({ keySearch: value })
  //     },
  //   setLaunchPad:
  //     (launchpads) =>
  //     ({ getState, setState }) => {
  //       const state = getState()
  //       setState({ ...state, launchpads })
  //     },

    getPoolDetail:
      (id) =>
      async ({ setState, getState }) => {
        const url = `${BASE_API_ADMIN}/pools/${id}`
        const result: any = await axios.get(url).catch(() => console.log('axios error'))
        setState({ ...getState(), poolDetail: result.data })
      },

  //   setStatus:
  //     (status) =>
  //     ({ setState, getState }) => {
  //       setState({ ...getState(), filterStatus: status })
  //     },
  //   filterLaunchWithStatus:
  //     (status) =>
  //     ({ setState, getState }) => {
  //       setState({ statusCombo: status })
  //     },
  //   updateStatusLaunchPad:
  //     (id, status) =>
  //     ({ getState, setState }) => {
  //       let { launchpads } = getState()
  //       launchpads = launchpads.map((item) => {
  //         if (item.id === id) {
  //           item.status = status
  //         }
  //         return item
  //       })

  //       setState({ launchpads })
  //     },
  },
  name: 'Pools Store',
})
export const useHookPools = createHook(Store)
export const Container = createContainer(Store, {
  onInit:
    () =>
    ({ setState }, props) => {
      setState({ ...props })
    },
})
export const Subscriber = createSubscriber(Store)
