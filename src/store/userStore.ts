import { createStore, createHook } from 'react-sweet-state';

const userStore = createStore({
  initialState: {
    walletAddress:'',
    coverImage:'',
    avatarImage:'',
    name:'',
    socialMediaLink:'',
    biography:'',
    isCanBuy:false
  },
  
  actions: {
    updateUserInfo: (userInfo)=>({getState, setState})=>{
      const userInfoState = getState()
        setState({...userInfoState,...userInfo})
    },
    clearUserInfo: ()=>({getState, setState})=>{
        setState({
          walletAddress:'',
          coverImage:'',
          avatarImage:'',
          name:'',
          socialMediaLink:'',
          biography:'',
          isCanBuy:false
        })
    },
  },

  name: 'user'
});

export default createHook(userStore)