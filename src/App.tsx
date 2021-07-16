import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { ResetCSS } from '@luckyswap/uikit'
import 'antd/dist/antd.css'
import BigNumber from 'bignumber.js'
import useWeb3ReactManager from 'hooks/useWeb3ReactManager'
import React, { lazy, useEffect, useState } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useFetchPriceList, useFetchProfile, useFetchPublicData } from 'state/hooks'
import EasterEgg from './components/EasterEgg'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Popups from './components/Popups'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import { allLanguages, EN } from './constants/localisation/languageCodes'
import { LanguageContext } from './hooks/LanguageContext'
import { TranslationsContext } from './hooks/TranslationsContext'
import './index.css'
import GlobalStyle from './style/Global'
import AddLiquidity from './views/AddLiquidity'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './views/AddLiquidity/redirects'
import GlobalCheckClaimStatus from './views/Collectibles/components/GlobalCheckClaimStatus'
import IfoDetail from './views/Launchpad/components/IfoCard/IfoDetail'
import Pool from './views/Pool'
import Pools from './views/Pools'
import PoolDetail from './views/Pools/components/PoolCardsDetail'
import RemoveLiquidity from './views/RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './views/RemoveLiquidity/redirects'
import Swap from './views/Swap'
import { RedirectPathToSwapOnly } from './views/Swap/redirects'


// Route-based code splitting2
// Only pool is included in the main bundle because of it's the most visited page .
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Launchpad'))
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

  // useEagerConnect()
  useWeb3ReactManager()
  useFetchPublicData()
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
            <Popups />
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
                <Route path="/launchpads">
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
                <Route path="/PoolCardsDetail/:id">
                  <PoolDetail />
                </Route>
                <Route path="/IfoDetail/:id">
                  <IfoDetail />
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
