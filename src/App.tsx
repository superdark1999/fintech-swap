import React, { useState, useEffect, lazy } from 'react'
import { HashRouter, Redirect, BrowserRouter, Route, Switch } from 'react-router-dom'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { ResetCSS } from '@luckyswap/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPriceList, useFetchProfile, useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import GlobalCheckClaimStatus from './views/Collectibles/components/GlobalCheckClaimStatus'
import history from './routerHistory'
import Swap from './views/Swap'
import { RedirectPathToSwapOnly } from './views/Swap/redirects'
import AddLiquidity from './views/AddLiquidity'
import Pool from './views/Pool'
import RemoveLiquidity from './views/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './views/RemoveLiquidity/redirects'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './views/AddLiquidity/redirects'
import './index.css'
import 'antd/dist/antd.css'
import Poolls from './views/Pools/components/PoolCardsDetail'
import IfoDetail from './views/Ifos/IfoDetail'

import { LanguageContext } from './hooks/LanguageContext'
import { TranslationsContext } from './hooks/TranslationsContext'
import { EN, allLanguages } from './constants/localisation/languageCodes'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page .
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const Profile = lazy(() => import('./views/Profile'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))


// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  // useFetchPublicData()
  useFetchProfile()
  useFetchPriceList()

  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6

  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    // const storedLangCode = localStorage.getItem('pancakeSwapLanguage')
    const storedLangCode = localStorage.getItem('bscStationSwapLanguage')
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  return (
    <HashRouter>
      <LanguageContext.Provider
        value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage } as any}
      >
        <TranslationsContext.Provider value={{ translations, setTranslations } as any}>
          <ResetCSS />
          <GlobalStyle />
          <Menu>
            <SuspenseWithChunkError fallback={<PageLoader />}>
              <Switch>
                <Route path="/swap" exact strict>
                  <Swap />
                </Route>
                <Route exact path="/pool" component={Pool} />
                <Route path="/add" exact component={AddLiquidity} />
                <Route path="/add/:currencyIdA" exact component={RedirectOldAddLiquidityPathStructure} />
                <Route path="/add/:currencyIdA/:currencyIdB" exact component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/farms">
                  <Farms />
                </Route>
                <Route path="/pools">
                  <Pools />
                </Route>
                <Route path="/lottery">
                  <Lottery />
                </Route>
                <Route path="/ifo">
                  <Ifos />
                </Route>
                <Route path="/collectibles">
                  <Collectibles />
                </Route>
                <Route exact path="/teams">
                  <Teams />
                </Route>
                <Route path="/teams/:id">
                  <Team />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/competition">
                  <TradingCompetition />
                </Route>
                {/* Redirect */}
                <Route path="/staking">
                  <Redirect to="/pools" />
                </Route>
                <Route path="/syrup">
                  <Redirect to="/pools" />
                </Route>
                <Route path="/nft">
                  <Redirect to="/collectibles" />
                </Route>
                <Route path="/PoolCardsDetail">
                  <Poolls />
                </Route>
                <Route path="/IfoDetail">
                  <IfoDetail/>
                </Route>

                {/* 404 */}
                <Route component={NotFound} />
                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </SuspenseWithChunkError>
          </Menu>
          <EasterEgg iterations={2} />
          <ToastListener />
          <GlobalCheckClaimStatus excludeLocations={['/collectibles']} />
        </TranslationsContext.Provider>
      </LanguageContext.Provider>
    </HashRouter>
  )
}

export default React.memo(App)
