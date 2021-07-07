import { Menu as UikitMenu } from '@luckyswap/uikit'
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
import config from './config'

const Menu = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  // const cakePriceUsd = usePriceLuckyBusd()
  const { profile } = useProfile()
  // const balance = useETHBalances(account ? [account] : [''])?.[account ?? '']
  const balance = useNativeBalance()

  const [balanceToken, setBalanceToken] = useState(0)

  const useContractTemp = useContract(XLUCKY_TESTNET_ADDRESSES[chainId], bep20Abi)

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

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={0}
      links={config}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      balanceBNB={getBalanceNumber(balance).toFixed(3)}
      // balanceBNB={balance ? balance.toSignificant(3) : 0}
      balanceLUCKY={balanceToken.toFixed(3)}
      {...props}
    />
  )
}

export default Menu
