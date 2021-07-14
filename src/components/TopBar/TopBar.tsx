import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Web3Status from '../../wallet/Web3Status'
import logo from '../../assets/img/logo-no-text.svg'
import { SearchOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom'
import { ButtonBuy, ButtonTrade } from 'components-v2/Button'
import ViewMore from 'assets/images/view-more.svg'
import BinanceCoin from 'assets/symbol/binance.png'
import Token from 'assets/images/token.svg'
import { isMobile } from 'react-device-detect'
import useLuckyServices from 'services/web3Services/LuckyServices'
import BSCScanServices from 'services/axiosServices/BSCScanServices'
import { MARKET_ADDRESS } from 'services/web3Services/MarketServices'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
import { Menu, Dropdown } from 'antd'
import useConfigStore from 'store/configStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { getPrice, SUPPORT_CHAIN_IDS, binanceConfig, binaceText } from 'utils'
import { Modal, Input, Form } from 'antd'
import formatNumber from 'utils/formatNumber'
import useAuth from 'hooks/useAuth'

interface TopBarProps {
  setMobileMenu?: (value: boolean) => void
  mobileMenu?: boolean
}
declare global {
  interface Window {
    animation: any
  }
}
const { SubMenu } = Menu
const TopBar: React.FC<TopBarProps> = ({ setMobileMenu, mobileMenu }) => {
  const [classtSicky, setClassSticky] = useState('')
  const { logout } = useAuth()
  const { account, chainId } = useActiveWeb3React()
  const luckyMethod = useLuckyServices()
  const { login } = useUserServices()
  const [userState, userActions] = useUserStore()
  const [configState, configAction] = useConfigStore()
  const [isShowAlert, setIsShowAlert] = useState(false)

  var prevScrollpos = window.pageYOffset
  let location = useLocation()
  console.log('location: ', location.pathname)
  // const handleScroll = () => {
  //   const currentScrollPos = window.pageYOffset
  //   if (prevScrollpos > currentScrollPos) {
  //     setClassSticky('fixed')
  //     console.log('fixed: ')
  //   } else {
  //     setClassSticky('hidden')
  //   }
  //   prevScrollpos = currentScrollPos;
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', () => handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const { ethereum, BinanceChain } = window as any
    if (
      chainId &&
      !SUPPORT_CHAIN_IDS.includes(chainId) &&
      ethereum.selectedAddress
    ) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: binanceConfig.chainId,
            },
          ],
        })
        .then(() => {
          window.location.reload()
        })
        .catch((err: any) => {
          if (err.code == 4902) {
            ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  binanceConfig
                ],
              })
              .then(() => {
                ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        chainId: binanceConfig.chainId,
                      },
                    ],
                  })
                  .then(() => {
                    window.location.reload()
                  })
              })
              .catch((err: any) => {
                console.log(err)
              })
          }
        })
    } else if (chainId && !SUPPORT_CHAIN_IDS.includes(chainId)) {
      BinanceChain.switchNetwork(binaceText).then(() => {
        window.location.reload()
      })
    }
  }, [chainId])

  useEffect(() => {
    if (luckyMethod) {
      const { LuckyTokenContract } = luckyMethod
      const filter = LuckyTokenContract.filters.Approval(account)

      LuckyTokenContract.on(filter, (author, allowAddress, value) => {
        if (author === account && allowAddress === MARKET_ADDRESS) {
          userActions.updateUserInfo({
            isCanBuy: true,
            isProcessingCanBuy: false,
          })
        }
      })
    }
  }, [luckyMethod, account])

  useEffect(() => {
    if (account) {
      login({ walletAddress: account }).then(({ data, status }) => {
        const artistData = {
          walletAddress: account,
          coverImage: data?.data?.coverImage,
          avatarImage: data?.data?.avatarImage,
          name: data?.data?.name,
          socialMediaLink: data?.data?.socialMediaLink,
          biography: data?.data?.biography,
        }
        if (status === 200) {
          userActions.updateUserInfo(artistData)
        }
        if (luckyMethod) {
          luckyMethod
            .checkApproveLevelAmount(MARKET_ADDRESS)
            .then((dt: any) => {
              const allowance = Number(dt?._hex || 0) > 0
              userActions.updateUserInfo({ isCanBuy: allowance })
            })
            .catch(() => {
              userActions.updateUserInfo({ isCanBuy: false })
            })
        }
      })
    }
  }, [account])

  const onChangeAnimation = (checked: any, e: any) => {
    configAction.updateConfig({ isUsingAnimation: checked })
  }

  const onSearching = (e: any) => {
    //history.push(`/explore?search=${e.target.value}`)
    window.location.replace(`/explore?search=${e.target.value}`)
  }
  const authenAccount = () => {
    const { ethereum } = window as any
    ethereum
      .request({
        method: 'wallet_getPermissions',
        params: [{ eth_accounts: {} }],
      })
      .then((permissions: any) => {
        const accountsPermission = permissions.find(
          (permission: any) => permission.parentCapability === 'eth_accounts',
        )
        if (accountsPermission) {
          console.log('eth_accounts permission successfully requested!')
        }
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          console.log('Permissions needed to continue.')
        } else {
          console.error(error)
        }
      })
  }
  return (
    <StyledTopBar className={classtSicky}>
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
          <MenuUnfoldOutlined
            onClick={() => setMobileMenu(true)}
            style={{ marginLeft: 12, fontSize: 24, marginRight: 12 }}
          />
          <Link to="/">
            <img src={logo} width="30px" />
          </Link>
        </div>
      ) : (
        <a href="/">
          <img src={logo} height="50px" className="logo-h" />
        </a>
      )}

      <div className="nav-bar-wrapper">
        <Input
          placeholder="Search items, collections, and accounts"
          prefix={<SearchOutlined />}
          className="search-nav"
          onPressEnter={onSearching}
        ></Input>
        <Link
          to="/"
          className={`home-nav ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/swap-store"
          className={`swap-nav ${
            location.pathname === '/swap-store' ? 'active' : ''
          }`}
        >
          Swap Store
        </Link>
        <Link
          to="/explore"
          className={`home-nav ${
            location.pathname === '/explore' ? 'active' : ''
          }`}
        >
          Explore
        </Link>
        <Link
          to="/ino"
          className={`ino-nav ${location.pathname === '/ino' ? 'active' : ''}`}
        >
          <span className="label">New</span>
          <span className="btn-ino">INO</span>
        </Link>
        <span className="explore-nav"></span>
        {!!account ? (
          <>
            <Link to={'/create/artwork'} className="create-nav">
              Create
            </Link>
          </>
        ) : (
          <a
            onClick={() => {
              alert('Unblock your wallet before create NFT')
            }}
            className="create-nav"
          >
            Create
          </a>
        )}
        <Link to={'/swap/step=1'} className="create-nav">
          Swap
        </Link>
        {/* <Switch
              checkedChildren="Animation"
              unCheckedChildren="Animation"
              onChange={onChangeAnimation}
            /> */}
        {!isMobile && (
          <>
            <div className="connect-wallet">
              <Web3Status />
            </div>
          </>
        )}
        {!!account ? <UserBalance /> : null}
        {account ? (
          <div className="view-more">
            <ButtonTrade
              padding="10px"
              borderRadius="100px"
              height="40px"
              width="40px"
            >
              <img src={ViewMore} />
            </ButtonTrade>
            <div className="menu">
              {isMobile && (
                <>
                  <div className="menu-item">
                    <div className="connect-wallet">
                      <Web3Status />
                    </div>
                  </div>
                  <div className="menu-item">
                    <Link to={'/create/artwork'}>
                      <ButtonBuy>Create</ButtonBuy>
                    </Link>
                  </div>
                  <div className="menu-item">
                    <Link to={'/swap/step=1'}>
                      <ButtonBuy>Swap</ButtonBuy>
                    </Link>
                  </div>
                </>
              )}
              <Link to="/my-profile/onstore/readyToSell">
                <div className="menu-item">My profile</div>
              </Link>
              <Link to="/my-profile/mycollection/all">
                <div className="menu-item">My collection</div>
              </Link>
              <Link to="/my-profile/settings">
                <div className="menu-item">Settings</div>
              </Link>
              {/* <Link to="/my-profile/login"> */}
              <div
                className="menu-item"
                onClick={() => {
                  logout()
                  window.localStorage.removeItem('connectorId')
                }}
              >
                Log out
              </div>
              {/* </Link> */}
            </div>
          </div>
        ) : (
          <>
            <div className="view-more">
              {isMobile && (
                <>
                  <ButtonTrade
                    padding="10px"
                    borderRadius="100px"
                    height="40px"
                    width="40px"
                  >
                    <img src={ViewMore} />
                  </ButtonTrade>
                  <div className="menu">
                    {isMobile && (
                      <>
                        <div className="menu-item">
                          <div className="connect-wallet">
                            <Web3Status />
                          </div>
                        </div>
                        <div className="menu-item">
                          <a
                            onClick={() => {
                              alert('Unblock your wallet before create NFT')
                            }}
                          >
                            <ButtonBuy>Create</ButtonBuy>
                          </a>
                        </div>
                        <div className="menu-item">
                          <a
                            onClick={() => {
                              alert('Unblock your wallet before create NFT')
                            }}
                          >
                            <ButtonBuy>Swap</ButtonBuy>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Modal
        title="Notification"
        visible={isShowAlert}
        footer={null}
        width={400}
        style={{ borderRadius: '12px' }}
      >
        <Form
          onFinish={() => {
            window.location.reload()
          }}
        >
          <Form.Item name="pricePlaceBid">
            <label>
              Currently selected chain is not supported, please check provider
              window to change to 'Binance Smart Chain Testnet Network'
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

const UserBalance = () => {
  const { account, chainId } = useActiveWeb3React()
  const [userState, userActions] = useUserStore()
  const { getBNBBalance } = BSCScanServices()
  const luckyMethod = useLuckyServices()
  useEffect(() => {
    if (luckyMethod && account) {
      getBNBBalance(account).then(({ data, status }) => {
        if (status == 200) {
          userActions.updateUserBalance({
            BNB: formatNumber(getPrice(data?.result || 0)),
          })
        }
      })
      luckyMethod?.getLuckyBalance().then((data: any) => {
        userActions.updateUserBalance({
          LUCKY: formatNumber(getPrice(data?._hex || 0)),
        })
      })
    } else {
      userActions.updateUserBalance({ LUCKY: 0, BNB: 0 })
    }
  }, [account])
  const menu = (
    <Menu style={{ maxWidth: '220px', padding: '0 6px', borderRadius: '8px' }}>
      <SubMenu
        style={{ borderRadius: '8px', fontWeight: 'bold', padding: '12px' }}
        icon={<img src={Token} width="18px" />}
        key="3"
        title={`${userState?.balance?.LUCKY || 0} LUCKY`}
      ></SubMenu>
      <SubMenu
        style={{ borderRadius: '8px', fontWeight: 'bold', padding: '12px' }}
        icon={<img src={BinanceCoin} width="18px" />}
        key="3"
        title={`${userState?.balance?.BNB || 0} BNB`}
      ></SubMenu>
    </Menu>
  )
  return (
    <Dropdown className="create-nav-balance" overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <img src={Token} width="18px" style={{ marginRight: '6px' }} />
        <span className="number-balance">{userState?.balance?.LUCKY || 0}</span>
        <span className="label-balance"> LUCKY</span>
      </a>
    </Dropdown>
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
    .active {
      border-bottom: 4px solid;
    }
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
      height: 80px;
      background-color: #35a5fc;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-right: 24px;
      font-weight: 600;
      @media (max-width: 756px) {
        display: none;
      }
    }
    .swap-nav {
      height: 80px;
      margin-right: 24px;
      background-color: #35a5fc;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      @media (max-width: 756px) {
        display: none;
      }
    }
    .ino-nav {
      height: 80px;
      display: flex;
      align-items: center;
      color: #35a5fc;
      font-size: 16px;
      font-weight: 600;
      position: relative;
      .btn-ino {
      }
      .label {
        position: absolute;
        top: 20px;
        right: -20px;
        transform: rotate(35deg);
        font-size: 10px;
        text-transform: capitalize;
        color: #fff;
        background: #ff5917;
        padding: 0 6px;
        border-radius: 10px;
      }
      @media (max-width: 756px) {
        display: none;
      }
    }
    .explore-nav {
      height: 80px;
      margin-right: 24px;
      flex: 1;
      background-color: #35a5fc;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      @media (max-width: 756px) {
        display: none;
      }
    }
    .create-nav {
      width: 100px;
      height: 40px;
      background: #35a5fc;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: '8px 24px';
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      margin-right: 14px;
      color: #fff;
      position: relative;
      cursor: pointer;
      @media (max-width: 756px) {
        display: none;
      }
      @media (max-width: 756px) {
        display: none;
      }
    }
    .create-nav-balance {
      padding: 0 10px;
      height: 40px;
      background: #fff;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: '8px 24px';
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      margin-left: 14px;
      position: relative;
      cursor: pointer;
      color: #35a5fc;
      border: 2px solid #35a5fc;
      .number-balance {
        margin-right: 4px;
      }
      @media (max-width: 756px) {
        display: none;
      }
      @media (max-width: 756px) {
        display: none;
      }
    }
  }
  .view-more {
    position: relative;
    margin-left: 12px;
    margin-right: 12px;
    .menu {
      display: none;
    }
    :hover {
      .menu {
        width: 200px;
        display: block;
        position: absolute;
        background-color: #ffffff;
        color: #333333;
        /* bottom: ${isMobile ? '-380px' : '-235px'}; */
        left: -160px;
        border: 1px solid #e7ebef;
        box-sizing: border-box;
        box-shadow: 0px 24px 48px rgb(35 35 35 / 8%);
        border-radius: 8px;
        .menu-item {
          border-bottom: 0.5px solid #e7ebef;
          padding: 16px 24px;
          font-weight: 500;
          font-size: 16px;
          color: #333333;
          :hover {
            color: #35a5fc;
            background-color: #ffffff;
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
  position: sticky;
  &.hidden {
    height: 0px;
    overflow: hidden;
  }
  &.fixed {
    height: 80px;
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
