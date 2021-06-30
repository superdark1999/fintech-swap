import React, { useState, useEffect, useContext } from 'react'
import { Menu as UikitMenu } from '@luckyswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import { BnbBalance } from 'hooks/useTokenBalance'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { useERC20, useContract } from 'hooks/useContract'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceLuckyBusd, useProfile } from 'state/hooks'
import { XLUCKY_TESTNET } from 'config'
import bep20Abi from 'config/abi/erc20.json'
import BigNumber from 'bignumber.js'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceLuckyBusd()
  const { profile } = useProfile()
  const balance = BnbBalance() //

  const [balanceToken, setBalanceToken] = useState(0)
  const useContractTemp = useContract(XLUCKY_TESTNET, bep20Abi)
  useEffect(() => {
    if (useContractTemp) {
      useContractTemp.balanceOf(account).then((data) => {
        setBalanceToken(data / 1e18)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

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
      balanceLUCKY={balanceToken.toFixed(3)}
      {...props}
    />
  )
}

export default Menu
