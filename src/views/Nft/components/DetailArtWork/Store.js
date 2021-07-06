import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from 'react-sweet-state'
import { API_DASHBOARD } from '../../../../constants'
import axios from 'axios'
import { getCompactString } from 'utils'
import moment from 'moment'
//moment.setDefault("America/New_York");
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
              item.from =[item.from, item.avtFrom.from, item.avtFrom.name]
              
              item.to = [item.to, item.avtTo.from
                , item.avtTo.name]
              //console.log(new Date(item.timeStamp * 1000).toUTCString())
              item.date = [item.timeStamp &&
                moment(new Date(item.timeStamp * 1000).toUTCString()).fromNow(),
              item.hash]
                
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
