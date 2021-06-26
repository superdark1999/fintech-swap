import React, { useState } from 'react'
import { Switch } from 'react-router-dom'
import Page from './components/Page'
import styled from 'styled-components'
import Sidebar from './components/Sidebar/index'
import TrendingBar from './components/TrendingBar/index'
import BannerBar from './components/BannerBar/index'
import HotArtists from './components/HotArtists/index'
import HotArtWorks from './components/HotArtWorks/index'
import HotSwap from './components/HotSwap/index'
import Collection from './components/Collection/index'
import { isMobile } from 'react-device-detect'

const NFTContainer = (props: any) => {
  const [onShowSidebar, setShowSidebar] = useState(false)
  return (
    <Switch>
      <Page>
        <NFTContainerStyled onShowsidebar={onShowSidebar}>
          {!isMobile && (
            <div className="left-sidebar">
              <Sidebar
                setShowSidebar={setShowSidebar}
                onShowSidebar={onShowSidebar}
              />
            </div>
          )}
          <div className="main-nft">
            {/* <div className="trending-nft">
              <TrendingBar />
            </div> */}
            {/* <ModalLucky/> */}
            <div className="banner-nft">
              <BannerBar />
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
              <Collection />
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
  height: 100%;
  /* max-width:2200px; */
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-top: none;
  background-color: #f9fafb;
  .left-sidebar {
    background-color: #fff;
    min-width: ${(props) => (props.onShowsidebar ? '320px' : '60px')};
    transition: 300ms;
    height: ${(props) => (props.onShowsidebar ? '100%' : 'calc(100vh - 80px)')};
    border-right: ${(props) =>
    props.onShowsidebar && '1px solid rgba(0,0,0,0.2)'};
    max-height: 100vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .main-nft {
    flex: ${(props: any) => (props.onShowsidebar ? 1 : '1 240px')};
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100%;
    overflow-y: auto;
    max-width: 1344px;
    margin: 0 auto;
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
      height: ${isMobile ? '110px' : '380px'};
      width: 100%;
      margin: 40px auto;
      padding: 0 30px;
      max-width: 1280px;
      border-radius: 12px;
      img {
        border-radius: 12px;
      }
    }
    .space-collection {
      /* height:600px; */
      width: 100%;
      /* margin-bottom:60px; */
      padding: 0 30px;
    }
    .hot-artists-nft {
    }
    .hot-artworks-nft {
    }
    .collection-nft {
    }
  }
`
export default NFTContainer
