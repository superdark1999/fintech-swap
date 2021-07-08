import { createStore, createHook } from 'react-sweet-state';

const userStore = createStore({
  initialState: {
    walletAddress:'',
    coverImage:'',
    avatarImage:'',
    name:'',
    socialMediaLink:'',
    biography:'',
    isCanBuy:false,
    isProcessingCanBuy:false,
    balance:{
      BNB:0,
      LUCKY:0
    }
  },
  
  actions: {
    updateUserInfo: (userInfo)=>({getState, setState})=>{
      const userInfoState = getState()
        setState({...userInfoState,...userInfo})
    },
    updateUserBalance:(balance)=>({getState, setState})=>{
      const userInfoState = getState()
      const userBalanceState = getState()?.balance
      console.log({...userBalanceState,...balance})
      setState({...userInfoState,balance:{...userBalanceState,...balance}})
    },
    clearUserInfo: ()=>({getState, setState})=>{
        setState({
          walletAddress:'',
          coverImage:'',
          avatarImage:'',
          name:'',
          socialMediaLink:'',
          biography:'',
          isCanBuy:false,
          balance:{
            BNB:0,
            LUCKY:0,
          }
        })
    },
  },

  name: 'user'
});

export default createHook(userStore)