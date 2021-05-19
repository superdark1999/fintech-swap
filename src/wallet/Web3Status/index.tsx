import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  injected,
  portis,
  walletconnect,
  walletlink,
  binanceconnect,
} from '../connectors'
import { NetworkContextName } from '../constants'
import useENSName from '../hooks/useENSName'
import { useHasSocks } from '../hooks/useSocksBalance'
import { useWalletModalToggle } from '../state/application/hooks'
import {
  isTransactionRecent,
  useAllTransactions,
} from '../state/transactions/hooks'
import { TransactionDetails } from '../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary } from '../Button'

import Identicon from '../Identicon'
import Loader from '../Loader'

import WalletModal from '../WalletModal'

const IconWrapper = styled.div<{ size?: number }>`
  align-items: center;
  justify-content: center;
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  font-weight: 500;
  :hover ;
`

const ButtonWallets = styled.button`
  z-index:99;
  background: #1c2d4a;
  border-radius: 12px;
  border: none;
  color: #fff;
  display: flex;
  align-items: center;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  width: unset;
  height: 38px;
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: #1c2d4a;
  font-weight: 500;
  height:38px;
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  color: #fffff;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  const path =`https://luckyswap.finance/images/wallet`;
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img width="25px" src={`${path}/walletConnectIcon.svg`} alt={''} />
      </IconWrapper>
    )
  } else if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <img width="25px" src={`${path}/walletConnectIcon.svg`}  alt={''} />
      </IconWrapper>
    )
  } else if (connector === portis) {
    return (
      <IconWrapper size={16}>
        <img width="25px" src={`${path}/portisIcon.png`}  alt={''} />
      </IconWrapper>
    )
  } else if (connector === binanceconnect) {
    return (
      <IconWrapper size={16}>
        <img width="25px" src={`${path}/binance.png`}  alt={''} />
      </IconWrapper>
    )
  }
  return null
}

function Web3StatusInner() {
  const { t } = useTranslation()
  const { account, connector, error } = useWeb3React()
  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()
  if (account) {
    return (
      <Web3StatusConnected
        id="web3-status-connected"
        onClick={toggleWalletModal}
        pending={hasPendingTransactions}
      >
        {hasPendingTransactions ? (
          <React.Fragment>
            <Text>{pending?.length} Pending</Text> <Loader stroke="white" />
          </React.Fragment>
        ) : (
          <>
            <Text>{ENSName || shortenAddress(account)}</Text>
          </>
        )}
        {!hasPendingTransactions && connector && (
          <StatusIcon connector={connector} />
        )}
      </Web3StatusConnected>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </Text>
      </Web3StatusError>
    )
  } else {
    return (
      <ButtonWallets id="connect-wallet" onClick={toggleWalletModal}>
        <Text>{t('Unblock Wallet')}</Text>
      </ButtonWallets>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .map((tx) => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }
  return (
    <>
      <Web3StatusInner />
      <WalletModal
        ENSName={ENSName ?? undefined}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      />
    </>
  )
}
