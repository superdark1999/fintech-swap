import { Menu as UikitMenu, MenuEntry } from '@luckyswap/uikit'
import { Binance, ChainId } from '@luckyswap/v2-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { XLUCKY_ADDRESSES } from 'config'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import React, { useContext, useEffect, useState } from 'react'
import { useProfile } from 'state/hooks'
import { NETWORKS } from '../../constants'
import { useToken } from '../../hooks/Tokens'
import { useCurrencyBalances } from '../../state/wallet/hooks'
import { config, configRestricted } from './config'

const Menu = (props) => {
  const { account, chainId, connector } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const { profile } = useProfile()
  const [links, setLinks] = useState<MenuEntry[]>(config)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const XLUCKY_TOKEN = useToken(XLUCKY_ADDRESSES[chainId])

  const [nativeBalance, xluckyBalance] = useCurrencyBalances(account, [Binance.onChain(chainId ?? 56), XLUCKY_TOKEN])

  useEffect(() => {
    if (connector instanceof InjectedConnector) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [connector])

  useEffect(() => {
    if (chainId && !Object.values(ChainId).includes(chainId)) {
      logout()
    }

    if (chainId === ChainId.MATIC || chainId === ChainId.MATIC_TESTNET) {
      setLinks(configRestricted)
    } else {
      setLinks(config)
    }
  }, [chainId, logout])

  const chainChangeHandler = async (chainIdToChange: ChainId) => {
    const provider = (window as WindowChain).ethereum
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORKS[chainIdToChange]],
        })
        window.location.reload()
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    }
  }

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      chainId={chainId}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={0}
      links={links}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      balanceBNB={nativeBalance?.toSignificant(4)}
      balanceLUCKY={xluckyBalance?.toFixed(3)}
      onChainChange={chainChangeHandler}
      showDropdown={showDropdown}
      {...props}
    />
  )
}

export default Menu
