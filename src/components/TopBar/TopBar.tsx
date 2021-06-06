import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../../wallet/Web3Status'
import logo from '../../assets/img/logo.svg'
import { Input } from 'antd';
import { SearchOutlined, MoreOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {ButtonBuy} from 'components-v2/Button'
import ViewMore from 'assets/images/view-more.svg'
import Token from 'assets/images/token.svg'
import { isMobile } from 'react-device-detect'
import { useActiveWeb3React } from '../../wallet/hooks'
import useNFTServices,{MARKET_ADDRESS} from '../../services/NFTServices'; 
import useUserServices from '../../services/UserServices'
import useUserStore from '../../store/userStore'

interface TopBarProps {
  onPresentMobileMenu: () => void,
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const [classtSicky, setClassSticky] = useState('')
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const { account } = useActiveWeb3React()
  const {checkApproveLevelAmount} = useNFTServices()
  const {login} = useUserServices()
  const [userState, userActions] = useUserStore()
  const handleScroll = () => {
    const position = window.pageYOffset
    if (position > 10) {
      setClassSticky('fixed')
    } else {
      setClassSticky('')
    }
  }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  useEffect(()=>{
    console.log('runnnnn')
    if(account){
      login({walletAddress:account}).then(({data, status})=>{
        const artistData = {
          walletAddress: account,
          coverImage: data?.data?.coverImage,
          avatarImage: data?.data?.avatarImage,
          name: data?.data?.name,
          socialMediaLink: data?.data?.socialLink,
          biography: data?.data?.biography,
        }
        console.log(artistData)
          if(status===200){
            userActions.updateUserInfo(artistData)
          }
        checkApproveLevelAmount(MARKET_ADDRESS).then((dt:any)=>{
             userActions.updateUserInfo({isCanBuy:dt})
        })
      })
    }else{
      userActions.clearUserInfo()
    }
  },[account])


  return (
    <StyledTopBar className={classtSicky}>
         
         { isMobile ? 
          (
            <div onClick={()=>setShowMenuMobile(true)} style={{display: 'flex', alignItems: 'center'}}> 
              <MenuUnfoldOutlined style={{ marginLeft: 12, fontSize: 24, marginRight: 8}}/>
              <Link to="/">
                <img src={Token} width="30px" />
              </Link>
            </div>
              
            )
              :
            (
              <a href="/">
                <img src={logo} height="60px" className="logo-h" />
              </a>
            )
          }

          <div className="nav-bar-wrapper">
            <Input placeholder="Search items, collections, and accounts" prefix={<SearchOutlined/>} className="search-nav"></Input>
            <Link to="/" className="home-nav">Home</Link>
            {!!account?(
               <Link to={"/create/artwork"} className="create-nav">Create</Link>
            ):(
              <a onClick={()=>{alert("Unblock your wallet before create NFT")}} className="create-nav" >Create</a>
            )}
            <div className="connect-wallet">
              <Web3Status />
            </div>
            {account&&(
              <Link to="/user-profile">
                <ButtonBuy padding="10px"  borderRadius="100px" height="40px" width="40px" className="connect-wallet">
                  <img src={ViewMore} />
                </ButtonBuy>
              </Link>
            )}
          </div>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
    display: flex;
    align-items: center;
    .logo-h{
      margin-left:30px;
    }
    .nav-bar-wrapper{
      flex:1;
      display: flex;
      z-index: 5;
      align-items: center;     
      .search-nav{
        flex:1;
        border: 1px solid #E7EBEF;
        box-sizing: border-box;
        border-radius: 100px;
        height:40px;
        margin:0 40px;
        max-width: 250px;
      }
      .home-nav{
        flex:1;
        background: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 16px;
        font-weight: 600;
        @media (max-width:756px){
          display: none;
        }
        }
      .create-nav{
        background:  linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
        border-radius: 100px;
        width: 100px;
        width: 100px;
        color: #FFFFFF;
        text-align: center;
        padding: 8px 24px 8px 20px;
        margin: 0px 16px;
        font-size: 16px;
        @media (max-width:756px){
          display: none;
        }
      }
      .connect-wallet{
        margin-right:10px;
        @media (max-width:756px){
          display: none;
        }
      }
    }
  .header-wrapper{
    width:100vw;
    background: #FFFFFF;
    max-width:2200px;
    margin: auto;
  }
  display:flex;
  z-index: 20;
  width: 100vw;
  height:80px;
  top: 0;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px -4px rgba(35, 35, 35, 0.06);
  border-bottom: 1px solid rgba(0,0,0,.06);
  &.fixed {
    /* background: linear-gradient(
      rgb(14, 19, 29),
      rgb(6, 10, 16) 30.65%
    ) !important; */
    position: fixed;
    padding-bottom: 5px;
    left: 0;
    right: 0;
    transition: all 0.2s ease;
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.15);
    z-index: 20;

    @media (min-width: 767px) {
      padding-bottom: 5px;
    }
  }
`

export default TopBar
