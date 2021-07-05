import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import { BASE_API_ADMIN } from 'config'
import axios from 'axios'

const stateDefault = {
  launchpads: [],
  filterLaunchpads: [],
  detailLaunchpad: null,
  status: [
    { key: 'all', name: 'All' },
    { key: 'live', name: 'Live' },
    { key: 'finished', name: 'Finished' },
    { key: 'coming_soon', name: 'Coming Soon' },
  ],
  statusCombo: 'live',
  keySearch: '',
}

const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    getLaunchpads:
      () =>
      ({ setState, getState }) => {
        if (getState().launchpads.length === 0)
          axios
            .get(`${BASE_API_ADMIN}/launchpads`)
            .then((response) => {
              const data = response.data.map((item) => {
                item.status = ''
                return item
              })

              setState({
                ...getState(),
                launchpads: data,
                filterLaunchpads: data.filter((x) => x.isActive),
              })
            })
            .catch((error) => console.log('error fetching launchpads data'))
      },
    changeKeySearch:
      (value) =>
      ({ setState }) => {
        setState({ keySearch: value })
      },
    setLaunchPad:
      (launchpads) =>
      ({ getState, setState }) => {
        const state = getState()
        setState({ ...state, launchpads })
      },

    getDetailLaunch:
      (id) =>
      async ({ setState, getState }) => {
        const url = `${BASE_API_ADMIN}/launchpads/${id}`
        const result = await axios.get(url).catch(() => console.log('axios error'))
        setState({ ...getState(), detailLaunchpad: result.data })
      },

    setStatus:
      (status) =>
      ({ setState, getState }) => {
        setState({ ...getState(), filterStatus: status })
      },
    filterLaunchWithStatus:
      (status) =>
      ({ setState, getState }) => {
        setState({ statusCombo: status })
      },
    updateStatusLaunchPad:
      (id, status) =>
      ({ getState, setState }) => {
        let { launchpads } = getState()
        launchpads = launchpads.map((item) => {
          if (item.id === id) {
            item.status = status
          }
          return item
        })

        setState({ launchpads })
      },
  },
  name: 'IFOS Store',
})
export const useHookIFOs = createHook(Store)
export const Container = createContainer(Store, {
  onInit:
    () =>
    ({ setState }, props) => {
      setState({ ...props })
    },
})
export const Subscriber = createSubscriber(Store)
