import { createStore, createHook } from 'react-sweet-state';



const configStore = createStore({
  initialState: {
    isUsingAnimation:false,
  },
  
  actions: {
    updateConfig: (config)=>({getState, setState})=>{
      const configState = getState()
        setState({...configState,...config})
    },
    clearConfig: ()=>({getState, setState})=>{
        setState({
        isUsingAnimation:false,
        })
    },
  },

  name: 'config'
});

export default createHook(configStore)