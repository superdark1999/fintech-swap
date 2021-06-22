import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'

const stateDefault = {
  launchpads: [],
}
const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    getLaunchpads:
      () =>
      ({ setState }) => {
        axios
          .get('https://dashboard.luckyswap.exchange/launchpads')
          .then(function (response) {
            setState({ launchpads: response.data })
          })
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
