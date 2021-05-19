import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import ButtonHead from '../../Button/ButtonHead'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import ButtonWeb3Connect from '../..//Button/ButtonWeb3Connect'
import IconLock from '../../../assets/img/icon-lock.png'
import useJus from '../../../hooks/useJus'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])
  const jus: any = useJus()

  return (
    <StyledAccountButton>
      {!!jus && jus.web3.eth.defaultAccount ? (
        <ButtonHead
          onClick={onPresentAccountModal}
          size="sm"
          text="My Wallet"
        />
      ) : (
        // <ButtonHead img = {<img src={IconB} width={17}/>} onClick={handleUnlockClick} size="sm" text="Unlock Wallet" />
        <ButtonWeb3Connect
          img={<img src={''} width={17} />}
          text=" Unlock Wallet"
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
