import React from 'react'
import { Button, useWalletModal } from '@luckyswap/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

const CustomBtn = styled(Button)`
  border-radius: 100px;
`

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <div className="custom-btn">
      <CustomBtn variant="secondary" onClick={onPresentConnectModal} {...props}>
        {TranslateString(292, 'Unlock Wallet')}
      </CustomBtn>
    </div>
  )
}

export default UnlockButton
