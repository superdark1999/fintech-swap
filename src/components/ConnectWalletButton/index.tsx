import { Button, ButtonProps, useWalletModal } from '@luckyswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import React from 'react'
import useAuth from '../../hooks/useAuth'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()

  const { login, logout } = useAuth()

  const { onPresentConnectModal } = useWalletModal(login, logout, account as string)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
