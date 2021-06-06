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
    updateUserName : (name)=>({getState, setState})=>{
        const userInfo = getState()
        setState({...userInfo,name})
    },
    updateSocialMediaLink : (socialMediaLink)=>({getState, setState})=>{
        const userInfo = getState()
        setState({...userInfo,socialMediaLink})
    },
    updateBiography : (biography)=>({getState, setState})=>{
        const userInfo = getState()
        setState({...userInfo,biography})
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