import { createStore, createHook } from 'react-sweet-state';



const userStore = createStore({
  initialState: {
    walletAddress:'',
    coverImage:'',
    avatarImage:'',
    name:'',
    socialMediaLink:'',
    biography:''
  },
  
  actions: {
    updateUserInfo: (userInfo)=>({getState, setState})=>{
        console.log('call',userInfo)
        setState(userInfo)
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
    }
  },

  name: 'user'
});

export default createHook(userStore)