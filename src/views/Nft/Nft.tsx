import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import Page from './components/Page'
import styled from 'styled-components'
import Sidebar from './components/Sidebar/index'
import BannerBar from './components/BannerBar/index'
import HotArtists from './components/HotArtists/index'
import HotArtWorks from './components/HotArtWorks/index'
import HotSwap from './components/HotSwap/index'
import Collection from './components/Collection/index'
import { isMobile } from 'react-device-detect'
import SidebarMobile from 'views/Nft/components/Sidebar/SidebarMobile'
import NavigationBar from 'components-v2/NavigationBar'
import IconSideBar from 'assets/images/icon-sidebar.png'


import { useHookNTF } from './Store'

const NFTContainer = (props: any) => {
  const [onShowSidebar, setShowSidebar] = useState(false)
  const [stateBanner, actions] = useHookNTF()
  const [price, setPrice] = useState<any>({minPrice: 0, maxPrice: 0})

  const onChangePrice = (price:any) => {
    setPrice(price)
  }

  useEffect(() => {
    actions.getListBannerHome()
  }, [])
  return (
    <Switch>
      <Page>
        <NFTContainerStyled onShowsidebar={onShowSidebar}>
            {
              isMobile ?
              (
                <>
                  <IconMenu >
                      <img src={IconSideBar} alt="" onClick={() => setShowSidebar(true)} />
                  </IconMenu>
                  <SidebarMobile 
                    setMobileMenu={setShowSidebar} 
                    mobileMenu={onShowSidebar} 
                    price={price}
                    onChangePrice={onChangePrice}
                  />
                </>
              )
              : 
              (
                <div className="left-sidebar">
                  <Sidebar
                    setShowSidebar={setShowSidebar}
                    onShowSidebar={onShowSidebar}
                    price={price}
                    onChangePrice={onChangePrice}
                  />
                </div>
              )
            }
 
          <div className="main-nft">
            {/* <ModalLucky/> */}
            <div className="banner-nft">
              <BannerBar banners={stateBanner.listBannerHome} />
            </div>
            <div className="hot-artists-nft space-collection">
              <HotArtists />
            </div>
            <div className="hot-artworks-nft space-collection">
              <HotArtWorks />
            </div>
            <div className="hot-artworks-nft space-collection">
              <HotSwap />
            </div>
            <div className="collection-nft space-collection">
              <Collection price={price}/>
            </div>
          </div>
        </NFTContainerStyled>
      </Page>
    </Switch>
  )
}
const NFTContainerStyled = styled.div<{ onShowsidebar: boolean }>`
  display: flex;
  width: 100%;
  /* height: 100%; */
  margin: auto;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-top: none;
  background-color: #f9fafb;
  .left-sidebar {
    position: sticky;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    min-width: ${(props) => (props.onShowsidebar ? '320px' : '60px')};
    transition: 300ms;
    height: ${(props) => (props.onShowsidebar ? '100%' : 'calc(100vh - 80px)')};
    border-right: ${(props) =>
    props.onShowsidebar && '1px solid rgba(0,0,0,0.2)'};
    height: calc(100vh - 80px);
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .main-nft {
    flex: ${(props: any) => (props.onShowsidebar ? 1 : '1 240px')};
    max-width: 1344px;
    margin: 0 auto;
    width: calc(100% - 320px);
    overflow: hidden;
    padding: ${isMobile && '0px 5px'};
    
    .trending-nft {
      width: 98%;
      height: 80px;
      margin: auto;
      box-shadow: 0px 2px 9px 0px rgb(0 0 0 / 9%);
      border-bottom: 1px solid rgb(0 0 0 / 0%);
      background-color: #fff;
      margin-top: 15px;
      border-radius: 12px;
    }
    .banner-nft {
      width: 100%;
      margin: 24px auto;
      max-width: 1280px;
      border-radius: 12px;
      img {
        border-radius: 12px;
      }
    }
    .space-collection {
      width: 100%;
      padding: 0 30px 30px 30px;
    }
  }
`

const IconMenu = styled.div`
  position: fixed;
  left: -12px;
  top: 40vh;
  box-shadow: rgb(0 0 0 / 36%) 0px 4px 12px -4px;
  box-sizing: border-box;
  /* border-radius: 80px; */
  border-radius: 8px;

  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  >img {
    width: 24px;
    height: 24px;
    border-radius: 80px;
    margin-left: 8px;
  }
  z-index: 1;
`
export default NFTContainer
