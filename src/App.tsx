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
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
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

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Updaters />
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <Web3ReactManager>
          <Switch>
            <Route path="/" exact>
              <Nft />
            </Route>
            <Route path="/nfts">
              <Nft />
            </Route>
          </Switch>
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
