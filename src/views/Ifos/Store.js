import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'

const stateDefault = {
  launchpads: [],
  detailLaunchpad: {},
}
const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    getLaunchpads:
      () =>
      ({ setState, getState }) => {
        axios
          .get('https://dashboard.luckyswap.exchange/launchpads')
          .then((response) => {
            setState({ launchpads: response.data, detailLaunchpad: getState()?.detailLaunchpad})
          })
      },
    setLaunchPad:
      (launchpads) =>
      ({ getState, setState }) => {
        const state = getState()
        setState({...state,launchpads})
      },

    getDetailLaunch:
    (id) => async ({setState, getState}) => {
      const url = `https://dashboard.luckyswap.exchange/launchpads/${id}`;
      const result = await axios.get(url).catch(() => console.log("axios error"));
      console.log("result", result.data);
      console.log("state", {...getState(), detailLaunchpad: result.data})
      setState({...getState(), detailLaunchpad: result.data});
    }

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
