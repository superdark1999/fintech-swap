import React from 'react'
import { Button, useWalletModal } from '@luckyswap/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <div className="custom-btn-farm">
      <Button onClick={onPresentConnectModal} {...props}>
        {TranslateString(292, 'Unlock Wallet')}
      </Button>
    </div>
  )
}

export default UnlockButton
