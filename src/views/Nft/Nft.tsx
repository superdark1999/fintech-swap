import React, { useCallback, useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Page from './components/Page'
import PageHeader from './components/PageHeader'
import styled from 'styled-components'
import Sidebar from './components/Sidebar/index'
import TrendingBar from './components/TrendingBar/index'
import BannerBar from './components/BannerBar/index'
import HotArtists from './components/HotArtists/index'
import HotArtWorks from './components/HotArtWorks/index'
import Collection from './components/Collection/index'
import ModalLucky from '../../components-v2/Modal'
const NFTContainer: React.FC = () => {
  const [onShowSidebar, setShowSidebar] = useState(true)
  return (
    <Switch>
      <Page>
          <NFTContainerStyled onShowsidebar={onShowSidebar}>
            <div className="left-sidebar">
              <Sidebar setShowSidebar={setShowSidebar} onShowSidebar={onShowSidebar}/>
            </div>
            <div className="main-nft">
              <div className="trending-nft">
                <TrendingBar />
              </div>
              <ModalLucky/>
              <div className="banner-nft">
                <BannerBar/>
              </div>
              <div className="hot-artists-nft space-collection">
                <HotArtists />
              </div>
              <div className="hot-artworks-nft space-collection">
                <HotArtWorks />
              </div>
              <div className="collection-nft space-collection">
                <Collection/>
              </div>
            </div>
          </NFTContainerStyled>
      </Page>
    </Switch>
  )
}
const NFTContainerStyled = styled.div<{ onShowsidebar:boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  max-width:2200px;
  margin:auto;
  border:1px solid rgba(0,0,0,0.2);
  .left-sidebar{
    width: ${(props:any) => props.onShowsidebar ? '320px':'80px'};
    height: 100%;
    border-right: 1px solid rgba(0,0,0,0.2);
  }
  .main-nft{
    flex: ${(props:any) => props.onShowsidebar ? 1:'1 240px'};
    height: 100%;
    overflow-y: auto;
    .trending-nft{
      width:100%;
      height:80px;
      border-bottom: 1px solid rgba(0,0,0,0.2);
    }
    .banner-nft{
      height:240px;
      width:100%;
      margin: 40px 0;
      padding: 0 30px;
    }
    .space-collection{
      height:1000px;
      width:100%;
      margin-bottom:60px;
    }
    .hot-artists-nft{
      background:green;
    }
    .hot-artworks-nft{
      background:violet;
    }
    .collection-nft{
      background:yellow;
    }
  }
`
export default NFTContainer
