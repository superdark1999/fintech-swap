import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'

const STATUS = {
  ALL: 'all',
  OPEN: 'open',
  CLOSE: 'close'
}

const stateDefault = {
  launchpads: [],
  filterLaunchpads: [],
  detailLaunchpad: null,
  filterStatus: STATUS.OPEN
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
            setState({
              ...getState(), 
              filterStatus: STATUS.OPEN,
              launchpads: response.data, 
              filterLaunchpads: response.data.filter(ifo => ifo.isActive)
            })
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
      setState({...getState(), detailLaunchpad: result.data});
    },

    setStatus:
    (status) => ({setState, getState}) =>{
      setState({...getState(), filterStatus: status});
    }, 
    filterLaunchWithStatus: 
    (status) => async({setState, getState}) => {
      let filteredIfos;
      switch(status) {
        case STATUS.ALL: {
          filteredIfos = getState().launchpads;
          break;
        }
        case STATUS.OPEN: {
          filteredIfos = getState().launchpads.filter(ifo => ifo.isActive)
          break;
        }
        case STATUS.CLOSE: {
          filteredIfos = getState().launchpads.filter(ifo => !ifo.isActive)
          break;
        }
      }

      setState({...getState(), filterStatus: status, filterLaunchpads: filteredIfos})
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
