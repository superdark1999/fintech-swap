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

const filterIfoByStatus = (status, ifos) => {
  let filteredIfos;
  switch(status) {
    case STATUS.ALL: {
      filteredIfos = ifos;
      break;
    }
    case STATUS.OPEN: {
      filteredIfos = ifos.filter(ifo => ifo.isActive)
      break;
    }
    case STATUS.CLOSE: {
      filteredIfos = ifos.filter(ifo => !ifo.isActive)
      break;
    }
  }

  return filteredIfos;
}
const Store = createStore({
  initialState: { ...stateDefault },
  actions: {
    getLaunchpads:
      () =>
      ({ setState, getState }) => {
        if (getState().launchpads.length ===0)
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
      const filteredIfos =  filterIfoByStatus(status, getState().launchpads);

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
