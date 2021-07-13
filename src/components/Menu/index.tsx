import { Menu as UikitMenu, MenuEntry } from '@luckyswap/uikit'
import { ChainId } from '@luckyswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import { XLUCKY_TESTNET_ADDRESSES } from 'config'
import bep20Abi from 'config/abi/erc20.json'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useAuth from 'hooks/useAuth'
import { useContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { useNativeBalance } from 'hooks/useTokenBalance'
import React, { useContext, useEffect, useState } from 'react'
import { useProfile } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { NETWORKS } from '../../constants'
import config from './config'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const { profile } = useProfile()
  const [links, setLinks] = useState<MenuEntry[]>(config)
  const nativeBalance = useNativeBalance()

  const [balanceToken, setBalanceToken] = useState(0)

  const useContractTemp = useContract(XLUCKY_TESTNET_ADDRESSES[chainId], bep20Abi)

  useEffect(() => {
    if (chainId && chainId !== ChainId.BSCTESTNET && chainId !== ChainId.MAINNET) {
      setLinks(
        config.map((item) => {
          if (item.label === 'Launchpad' || item.label === 'Farms' || item.label === 'Pools') {
            item.href = '#'
            item.calloutClass += ' icon-hot'
          }

          return item
        }),
      )
    }
  }, [chainId])

  useEffect(() => {
    if (useContractTemp) {
      useContractTemp
        .balanceOf(account)
        .then((data) => {
          setBalanceToken(data / 1e18)
        })
        .catch((error) => {
          console.log('get xlucky balance error : ', error)
          setBalanceToken(0)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  const changeChainIdHandler = async (chainIdToChange: ChainId) => {
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
      balanceBNB={getBalanceNumber(nativeBalance).toFixed(3)}
      balanceLUCKY={balanceToken.toFixed(3)}
      onChainChange={changeChainIdHandler}
      {...props}
    />
  )
}

export default Menu
