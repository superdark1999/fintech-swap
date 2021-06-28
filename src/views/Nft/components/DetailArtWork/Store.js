import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from 'react-sweet-state'
import { API_DASHBOARD } from '../../../../constants'
import axios from 'axios'
import { getCompactString } from 'utils'

const stateDefault = {
  historys: [],
}
const banner = []
const Store = createStore({
  initialState: { ...stateDefault, banner },
  actions: {
    getHistorys:
      (tokenId) =>
      ({ setState, getState }) => {
        axios(`${API_DASHBOARD}/transactions?tokenId=${tokenId}`).then(
          (res) => {
            let parseData = res.data
            parseData = parseData.map((item) => {
              item.price = 0
              item.from = getCompactString(item.from, 6)
              item.to = getCompactString(item.to, 6)
              item.date =
                item.timeStamp &&
                new Date(item.timeStamp * 1000).toLocaleDateString('en-US')
              return item
            })
            setState({ historys: parseData })
          },
        )
      },
  },
  name: 'Detail Store',
})
export const useHookDetail = createHook(Store)
export const Container = createContainer(Store, {
  onInit:
    () =>
    ({ setState }, props) => {
      setState({ ...props })
    },
})
export const Subscriber = createSubscriber(Store)
