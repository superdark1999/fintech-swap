import { createStore, createHook } from 'react-sweet-state';



const configStore = createStore({
  initialState: {
    isUsingAnimation:false,
    showLoading:false
  },
  
  actions: {
    updateConfig: (config)=>({getState, setState})=>{
      const configState = getState()
        setState({...configState,...config})
    },
    clearConfig: ()=>({getState, setState})=>{
        setState({
        isUsingAnimation:false,
        showLoading:false
        })
    },
  },

  name: 'config'
});

export default createHook(configStore)