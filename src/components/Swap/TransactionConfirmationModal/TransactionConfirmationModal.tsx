import React from 'react'
import { Currency } from '@luckyswap/v2-sdk'
import Modal from '../Modal'
import { useActiveWeb3React } from '../../../hooks'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionSubmittedContent from './TransactionSubmittedContent'

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency
}

const TransactionConfirmationModal = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}: ConfirmationModalProps) => {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          currencyToAdd={currencyToAdd}
          chainId={chainId}
          hash={hash}
          onDismiss={onDismiss}
        />
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal
