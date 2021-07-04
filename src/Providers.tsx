import React from 'react'
import { ModalProvider } from '@luckyswap/uikit'
import { Web3ReactProvider,createWeb3ReactRoot } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import getLibrary from 'utils/web3React'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')
const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <HelmetProvider>
            <ThemeContextProvider>
              <LanguageContextProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageContextProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
