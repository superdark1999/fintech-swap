import React, { useCallback, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import TopBar from './components/TopBar'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import theme from './theme'
import Web3ReactManager from './wallet/Web3ReactManager'
import { NetworkContextName } from './wallet/constants'
import { Provider } from 'react-redux'
import store from './wallet/state'
import ReactGA from 'react-ga'
import { isMobile } from 'react-device-detect'
import ApplicationUpdater from './wallet/state/application/updater'
import ListsUpdater from './wallet/state/lists/updater'
import MulticallUpdater from './wallet/state/multicall/updater'
import TransactionUpdater from './wallet/state/transactions/updater'
import UserUpdater from './wallet/state/user/updater'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import Nft from './views/Nft'
import getLibrary from './wallet/utils/getLibrary'
import CreateArtWork from 'views/Nft/components/CreateArtWork/index'
import DetailArtWork from 'views/Nft/components/DetailArtWork'
import Swap from 'views/Nft/components/SwapCopy'
import UserProfile from 'views/Nft/components/UserProfile'
import 'antd/dist/antd.css';
import MyProfile from 'views/Nft/components/MyProfile'
import Page404 from 'views/Nft/components/404'
import Explore from 'views/Nft/components/Explore'
import SwapStore from 'views/Nft/components/SwapStore'
import SidebarMobile from 'views/Nft/components/Sidebar/SidebarMobile'
// 
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ; (window.ethereum as any).autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined =
  process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID)
  ReactGA.set({
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
        ? 'mobileWeb3'
        : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

window.addEventListener('error', (error) => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true,
  })
})

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

const App = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  console.log('mobileMenu: ', mobileMenu)

  return (
    <Providers>
      <Updaters />
      <Router>
        <Web3ReactManager>
          <>
          {
            isMobile &&
            (
              <SidebarMobile setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/>
            )
          }
            <TopBar setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/>
            <Switch>
              <Route path="/" exact>
                <Nft setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/>
              </Route>
              <Route path="/nfts">
                <Nft setMobileMenu={setMobileMenu} mobileMenu={mobileMenu}/>
              </Route>
              <Route path="/create/artwork">
                <CreateArtWork />
              </Route>
              <Route path="/artwork/detail/:type/:id">
                <DetailArtWork />
              </Route>
              <Route path="/user-profile/:id/:tab/:option">
                <UserProfile />
              </Route>
              <Route path="/my-profile/:tab/:option">
                <MyProfile />
              </Route>
              <Route path="/user-profile/:id/:tab">
                <UserProfile />
              </Route>
              <Route path="/my-profile/:tab">
                <MyProfile />
              </Route>
              <Route path="/swap/:id">
                <Swap />
              </Route>
              <Route path="/swap-store">
                <SwapStore />
              </Route>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route component={Page404} />
            </Switch>
          </>
        </Web3ReactManager>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme as any}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>
            <TransactionProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </TransactionProvider>
          </Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </ThemeProvider>
  )
}
export default App
