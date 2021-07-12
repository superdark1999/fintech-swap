import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from 'react-sweet-state'
import { getParam } from '../../utils'
import { getClassWithDraw, formatNumber } from './utils'
import moment from 'moment'
import {
  addressAdminRefer,
  Status,
  listMilestone,
  listPercent,
  NUM_MONTH_WITHDRAW,
} from './constants'
import axios from 'axios'
import { set } from 'react-ga'
import { API_DASHBOARD } from '../../constants'
var _ = require('lodash/core')

const stateDefault = {
  infoAccount: {
    addressAccount: '',
    totalETHDeposit: 0,
    totalJUS: 0,
    toalJUSBlock: 0,
    totalRefer: 0,
    referLevel: 0,
    totalJUSBlock: 0,
    addressRefer: getParam('address') || addressAdminRefer,
  },
  totalETHDefault: 0,
  totalETH: null,
  amountETH: null,
  currentPriceJus: 0,
  listOrder: [],
  paging: {
    total: 0,
    index: 0,
  },
  transactionsPending: [],
  order: {},
  objCol: {},
  historys: []
}
const listBannerHome = []
const listBannerSwap = []
const Store = createStore({
  initialState: { ...stateDefault, listBannerHome, listBannerSwap},
  actions: {
   
    getHistorys: () => ({ setState, getState }) => {
      axios(`https://api.ethplorer.io/getAddressHistory/0x01bb83b35576c9ac92af674e78d7c3ddf62093b6?apiKey=EK-nADEj-MC17mE1-WY7wE`).then((res) => {
        const { operations } = res.data
        setState({ historys: operations })
      })
    },
    getListBannerHome: () => ({ setState, getState }) => {
      axios(`${API_DASHBOARD}/banner/home-nft`).then((res) => {
        console.log(res.data)
        setState({listBannerHome: res.data})
      })
    },
    getListBannerSwap: () => ({ setState, getState }) => {
      axios(`${API_DASHBOARD}/banner/swap`).then((res) => {
        console.log(res.data)
        setState({listBannerSwap: res.data})
      })
    },

  },
  name: 'Sale Store',
})
export const useHookNTF = createHook(Store)
export const Container = createContainer(Store, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(Store)
