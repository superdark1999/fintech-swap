import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, ArrowBackIcon, AutoRenewIcon } from '@luckyswap/uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import TicketInput from './TicketInput'
import { UpdateTicketAction, Ticket } from './useTicketsReducer'

const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
  max-height: 552px;

  & div:nth-child(2) {
    padding: 0;
  }
`

const ScrollableContainer = styled.div`
  height: 310px;
  overflow-y: scroll;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.bgbtn}`};
  padding: 24px;
`

const EditNumbersModal: React.FC<{
  totalCost: string
  updateTicket: UpdateTicketAction
  randomize: () => void
  tickets: Ticket[]
  allComplete: boolean
  onConfirm: () => void
  isConfirming: boolean
  onDismiss?: () => void
}> = ({ totalCost, updateTicket, randomize, tickets, allComplete, onConfirm, isConfirming, onDismiss }) => {
  const { theme } = useTheme()
  const TranslateString = useI18n()

  return (
    <StyledModal
      title={TranslateString(999, 'Edit numbers')}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
      onBack={onDismiss}
    >
      <ScrollableContainer>
        <Flex justifyContent="space-between" mb="16px">
          <Text color="textSubtle">{TranslateString(999, 'Total cost')}:</Text>
          <Text>~{totalCost} CAKE</Text>
        </Flex>
        <Text fontSize="12px" color="textSubtle" mb="16px">
          {TranslateString(999,
            'Numbers are randomized, with no duplicates among your tickets. Tap a number to edit it. Available digits: 0-9',
          )}
        </Text>
        <Button disabled={isConfirming} mb="16px" variant="secondary" width="100%" height="32px" onClick={randomize}>
          {TranslateString(999, 'Randomize')}
        </Button>
        {tickets.map((ticket) => (
          <TicketInput
            key={ticket.id}
            ticket={ticket}
            duplicateWith={ticket.duplicateWith}
            updateTicket={updateTicket}
            disabled={isConfirming}
          />
        ))}
      </ScrollableContainer>
      <Flex flexDirection="column" justifyContent="center" m="24px">
        <Button
          id={`lottery_confirm_edit_${tickets?.length}`}
          disabled={!allComplete || isConfirming}
          endIcon={isConfirming ? <AutoRenewIcon spin color="currentColor" /> : undefined}
          onClick={() => {
            onConfirm()
          }}
          variant="secondary" 
        >
          {isConfirming ? TranslateString(999,'Confirming') : TranslateString(999, 'Confirm and buy')}
        </Button>
        <Button mt="8px" variant={isConfirming ? 'secondary' : 'text'} disabled={isConfirming} onClick={onDismiss}>
          <ArrowBackIcon color={isConfirming ? 'disabled' : 'primary'} height="24px" width="24px" /> {TranslateString(999, 'Go back')}
        </Button>
      </Flex>
    </StyledModal>
  )
}

export default EditNumbersModal
