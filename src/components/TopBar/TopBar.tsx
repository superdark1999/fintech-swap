import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../../wallet/Web3Status'
import logo from '../../assets/img/logo-no-text.svg'
import { Input } from 'antd'
import {
  SearchOutlined,
  MoreOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ButtonBuy } from 'components-v2/Button'
import ViewMore from 'assets/images/view-more.svg'
import Token from 'assets/images/token.svg'
import { isMobile } from 'react-device-detect'
import { useActiveWeb3React } from 'wallet/hooks'
import useLuckyServices from 'services/web3Services/LuckyServices'
import { MARKET_ADDRESS } from 'services/web3Services/MarketServices'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
import { Switch } from 'antd'
import useConfigStore from 'store/configStore'
interface TopBarProps {
  onPresentMobileMenu: () => void
}
declare global {
  interface Window {
    animation: any
  }
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const [classtSicky, setClassSticky] = useState('')
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const { account } = useActiveWeb3React()
  const { checkApproveLevelAmount } = useLuckyServices()
  const { login } = useUserServices()
  const [userState, userActions] = useUserStore()
  const [configState, configAction] = useConfigStore()
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

  useEffect(() => {
    if (account) {
      login({ walletAddress: account }).then(({ data, status }) => {
        const artistData = {
          walletAddress: account,
          coverImage: data?.data?.coverImage,
          avatarImage: data?.data?.avatarImage,
          name: data?.data?.name,
          socialMediaLink: data?.data?.socialLink,
          biography: data?.data?.biography,
        }
        if (status === 200) {
          userActions.updateUserInfo(artistData)
        }
        checkApproveLevelAmount(MARKET_ADDRESS)
          .then((dt: any) => {
            const allowance = Number(dt?._hex || 0) > 0
            userActions.updateUserInfo({ isCanBuy: allowance })
          })
          .catch(() => {
            userActions.updateUserInfo({ isCanBuy: false })
          })
      })
    } else {
      userActions.clearUserInfo()
    }
  }, [account])
  const onChangeAnimation = (checked: any, e: any) => {
    configAction.updateConfig({ isUsingAnimation: checked })
  }
  return (
    <StyledTopBar className={classtSicky}>
      {isMobile ? (
        <div
          onClick={() => setShowMenuMobile(true)}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <MenuUnfoldOutlined
            style={{ marginLeft: 12, fontSize: 24, marginRight: 8 }}
          />
          <Link to="/">
            <img src={Token} width="30px" />
          </Link>
        </div>
      ) : (
        <a href="/">
          <img src={logo} height="50px" className="logo-h" />
        </a>
      )}

          <div className="nav-bar-wrapper">
            <Input placeholder="Search items, collections, and accounts" prefix={<SearchOutlined/>} className="search-nav"></Input>
            <Link to="/" className="home-nav">Home</Link>
            {!!account?(
               <Link to={"/create/artwork"} className="create-nav">Create</Link>
            ):(
              <a onClick={()=>{alert("Unblock your wallet before create NFT")}} className="create-nav" >Create</a>
            )}
            {/* <Switch
              checkedChildren="Animation"
              unCheckedChildren="Animation"
              onChange={onChangeAnimation}
            /> */}
            <div className="connect-wallet">
              <Web3Status />
            </div>
            {account&&(
              <Link to="/my-profile/onsale/readyToSell">
                <ButtonBuy padding="10px"  borderRadius="100px" height="40px" width="40px" className="connect-wallet view-more">
                  <img src={ViewMore} />
                  {/* <div className="menu">
                    <div className="menu-item">
                      My profile
                    </div>
                    <div className="menu-item">
                      My collection
                    </div>
                    <div className="menu-item">
                      Settings
                    </div>
                    <div className="menu-item">
                      Log out
                    </div>
                  </div> */}
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
  .logo-h {
    margin-left: 30px;
  }
  .nav-bar-wrapper {
    flex: 1;
    display: flex;
    z-index: 5;
    align-items: center;
    .search-nav {
      flex: 1;
      border: 1px solid #e7ebef;
      box-sizing: border-box;
      border-radius: 100px;
      height: 40px;
      margin: 0 40px;
      max-width: 250px;
    }
    .home-nav {
      flex: 1;
      background: linear-gradient(270deg, #19a3dd -16.5%, #badeb7 117.25%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      font-weight: 600;
      @media (max-width: 756px) {
        display: none;
      }
    }
    .create-nav {
      background: linear-gradient(270deg, #19a3dd -16.5%, #badeb7 117.25%);
      border-radius: 100px;
      width: 100px;
      width: 100px;
      color: #ffffff;
      text-align: center;
      padding: 8px 24px 8px 20px;
      margin: 0px 16px;
      font-size: 16px;
      @media (max-width: 756px) {
        display: none;
      }
      .connect-wallet{
        &.view-more {
          .menu{
            display: none;
            :hover{
              display: block;
              }
            }
          }
        }
      margin-right:10px;
      @media (max-width:756px){
        display: none;
      }
    }
  }
  .header-wrapper {
    width: 100vw;
    background: #ffffff;
    max-width: 2200px;
    margin: auto;
  }
  display: flex;
  z-index: 20;
  width: 100vw;
  height: 80px;
  top: 0;
  background: #ffffff;
  box-shadow: 0px 4px 16px -4px rgba(35, 35, 35, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  &.fixed {
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
