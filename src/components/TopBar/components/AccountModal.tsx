import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useJus from '../../../hooks/useJus'
import { getBalanceNumber } from '../../../utils/formatBalance'
import ButtonHead from '../../Button/ButtonHead'
import CardIconAccount from '../../CardIcon/CardIconAccount'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import jui from '../../../assets/img/user.svg'
import {
  getJusAddress,
  getJusSupply,
  getLuckyBalance,
} from '../../../Jus/utils'
import BigNumber from 'bignumber.js'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const handleSignOutClick = useCallback(() => {
    onDismiss!()
  }, [onDismiss])

  const jus: any = useJus()

  let account = jus && jus.web3.eth.defaultAccount
  const [balance, setTotalBalance] = useState<BigNumber>()
  useEffect(() => {
    async function fetchTotalSupply() {
      const luckBalance = await getLuckyBalance(
        jus,
        jus.web3.eth.defaultAccount,
      )
      setTotalBalance(luckBalance)
    }
    if (jus) {
      fetchTotalSupply()
    }
  }, [jus, setTotalBalance])

  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIconAccount>
              <img src={jui} height={80} />
            </CardIconAccount>
            <StyledBalance>
              <Value
                value={
                  balance ? getBalanceNumber(new BigNumber(balance)) : 'Locked'
                }
                decimals={0}
              />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <ButtonHead
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
        <Spacer />
        <ButtonHead
          onClick={handleSignOutClick}
          text="Sign out"
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <ButtonHead onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
