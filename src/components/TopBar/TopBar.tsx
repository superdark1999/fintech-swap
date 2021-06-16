import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../../wallet/Web3Status'
import logo from '../../assets/img/logo-no-text.svg'
import {
  SearchOutlined,
  MoreOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ButtonBuy, ButtonTrade } from 'components-v2/Button'
import ViewMore from 'assets/images/view-more.svg'
import Token from 'assets/images/token.svg'
import { isMobile } from 'react-device-detect'
import useLuckyServices from 'services/web3Services/LuckyServices'
import { MARKET_ADDRESS } from 'services/web3Services/MarketServices'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
import { Switch } from 'antd'
import useConfigStore from 'store/configStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { chain } from 'lodash'
import {SUPPORT_CHAIN_IDS} from 'utils'
import { Modal, Input, Form } from 'antd'
import useAuth from 'hooks/useAuth'
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
  const { logout } = useAuth()
  const { account,chainId } = useActiveWeb3React()
  const luckyMethod = useLuckyServices()
  const { login } = useUserServices()
  const [userState, userActions] = useUserStore()
  const [configState, configAction] = useConfigStore()
  const [isShowAlert, setIsShowAlert] = useState(false)
  const handleScroll = () => {
    const position = window.pageYOffset
    if (position > 10) {
      setClassSticky('fixed')
    } else {
      setClassSticky('')
    }
  }

  useEffect(()=>{
    if(!SUPPORT_CHAIN_IDS.includes(chainId)){
      setIsShowAlert(true)
    }
  },[chainId])

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
        if(luckyMethod){
          luckyMethod.checkApproveLevelAmount(MARKET_ADDRESS)
          .then((dt: any) => {
            const allowance = Number(dt?._hex || 0) > 0
            userActions.updateUserInfo({ isCanBuy: allowance })
          })
          .catch(() => {
            userActions.updateUserInfo({ isCanBuy: false })
          })
        }
      })
    } else {
      userActions.clearUserInfo()
    }
  }, [account,luckyMethod])

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
              <>
                <Link to={"/create/artwork"} className="create-nav">Create</Link>
                <Link to={"/swap"} className="create-nav">Swap</Link>
              </>
            ):(
              <a onClick={()=>{alert("Unblock your wallet before create NFT")}} className="create-nav" >Create</a>
            )}
            {/* <Switch
              checkedChildren="Animation"
              unCheckedChildren="Animation"
              onChange={onChangeAnimation}
            /> */}
            {!isMobile && 
              <div className="connect-wallet">
                <Web3Status />
              </div>
            }
            {account ? (
              <div  className="view-more">
                <ButtonBuy padding="10px"  borderRadius="100px" height="40px" width="40px" >
                  <img src={ViewMore} />
                </ButtonBuy>
                <div className="menu">
                    { isMobile &&
                      <>
                        <div className="menu-item">
                          <div className="connect-wallet">
                            <Web3Status />
                          </div>
                        </div>
                        <div className="menu-item"><Link to={"/create/artwork"}><ButtonBuy>Create</ButtonBuy></Link></div>
                        <div className="menu-item"><Link to={"/swap"}><ButtonBuy>Swap</ButtonBuy></Link></div>
                      </>
                      }
                    <Link to="/my-profile/onsale/readyToSell">
                      <div className="menu-item">
                        My profile
                      </div>
                    </Link>
                    <Link to="/my-profile/mycollection/all">
                      <div className="menu-item">
                        My collection
                      </div>
                    </Link>
                    <Link to="/my-profile/settings">
                      <div className="menu-item">
                        Settings
                      </div>
                    </Link>
                    {/* <Link to="/my-profile/login"> */}
                      <div className="menu-item" onClick={logout}>
                        Log out
                      </div>
                    {/* </Link> */}
                  </div>
               </div>
            )
          :
          <div className="view-more">
            <ButtonBuy padding="10px"  borderRadius="100px" height="40px" width="40px" >
              <img src={ViewMore} />
            </ButtonBuy>
            <div className="menu">
                { isMobile &&
                  <>
                    <div className="menu-item">
                      <div className="connect-wallet">
                        <Web3Status />
                      </div>
                    </div>
                    <div className="menu-item"><a onClick={()=>{alert("Unblock your wallet before create NFT")}} ><ButtonBuy>Create</ButtonBuy></a></div>
                    <div className="menu-item"><a onClick={()=>{alert("Unblock your wallet before create NFT")}} ><ButtonBuy>Swap</ButtonBuy></a></div>
                  </>
                }
                </div>
            </div> 
          }
          </div>
          <Modal
                title="Alert"
                visible={isShowAlert}
                footer={null}
                width={400}
              >
                <Form onFinish={() => {window.location.reload()}}>
                  <Form.Item name="pricePlaceBid">
                    <label>
                     Please switch our support chainId 
                    </label>
                  </Form.Item>
                  <Form.Item>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <ButtonTrade type="submit">Reload</ButtonTrade>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
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
      width: 100px;
      height: 40px;
      background: linear-gradient(270deg, #19a3dd -16.5%, #badeb7 117.25%);
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: '8px 24px';
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      margin-right:14px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      cursor: pointer;
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50px;
        padding: 2px;
        background: linear-gradient(270deg, #19a3dd -16.5%, #badeb7 117.25%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }
      @media (max-width: 756px) {
        display: none;
      }
      @media (max-width:756px){
        display: none;
      }
    }
  }
  .view-more {
    position: relative;
    margin-left: 12px;
    margin-right: 12px;
    .menu{
      display: none;
    }
    :hover {
      .menu{
        width: 200px;
        display: block;
        position: absolute;
        background-color: #ffffff;
        color: #333333;
        /* bottom: ${isMobile ? '-380px' : '-235px'}; */
        left: -160px;
        border: 1px solid #E7EBEF;
        box-sizing: border-box;
        box-shadow: 0px 24px 48px rgb(35 35 35 / 8%);
        border-radius: 8px;
        .menu-item {
          border-bottom: 0.5px solid #E7EBEF;
          padding: 16px 24px;
          font-weight: 500;
          font-size: 16px;
          color: #333333;
          :hover {
            background: linear-gradient(270deg,#19A3DD -16.5%,#BADEB7 117.25%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
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
