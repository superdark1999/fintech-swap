import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'

import ButtonHead from '../Button/ButtonHead'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <ModalContent>
        <ModalTitle text="Select a wallet provider." />
        <StyledWalletsWrapper>
          <StyledWalletCard className="metamask--custom">
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          <Spacer size="sm" />
          <StyledWalletCard className="wallet--custom">
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <StyledButton>
          <ButtonHead text="Cancel" variant="secondary" onClick={onDismiss}/>
        </StyledButton>
      </ModalActions>
    </Modal>
  )
}

const StyledButton = styled.div`
  button {
    background-image: linear-gradient(to right,rgb(207 235 233) 0%,#f8f9fa 50%,rgb(240 233 231) 100%);
  }
`

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);

  @media (max-width: 767px) {
    flex: 100%;
  }

  &.metamask--custom,&.wallet--custom {
    button {
      background-image: linear-gradient(to right,rgb(207 235 233) 0%,#f8f9fa 50%,rgb(240 233 231) 100%);
    }
  }
`

export default WalletProviderModal
