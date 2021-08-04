import React, { useCallback, useEffect } from 'react'
import { Button, Modal } from '@luckyswap/uikit'
import styled from 'styled-components'
import { Ticket  } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useLottery,  } from 'state/hooks'
import TicketNumber from './TicketNumber'


interface UserTicketsModalProps {
  myTicketNumbers: Array<Ticket>
  from?: string
  onDismiss?: () => void
}

const UserTicketsModal: React.FC<UserTicketsModalProps> = ({ myTicketNumbers, onDismiss }) => {
  const winNumbers = [] // todo: improve
  const TranslateString = useI18n()
  const {
    isTransitioning,
    currentRound: { status, userTickets },
  } = useLottery()


  const listItems = userTickets.tickets.map((ticket, index) => {
    return (
      <p style={{ color: 'yellow' }} key={ticket.id}>
         <TicketNumber
                key={ticket.id}
                localId={index + 1}
                id={ticket.id}
                number={ticket.number}
                rewardBracket={ticket.rewardBracket}
                status={ticket.status}
              />
      </p>
    )
  })

  return (
    <Modal
      title={TranslateString(490, `My Tickets (Total: ${myTicketNumbers.length})`, { TICKETS: myTicketNumbers.length })}
      onDismiss={onDismiss}
    >
      <TicketsList>
        <h2>{listItems}</h2>
      </TicketsList>
      <StyledButton variant="secondary" onClick={onDismiss}>
        {TranslateString(438, 'Close')}
      </StyledButton>
    </Modal>
  )
}

const RewardP = styled.div`
  color: #ff8c28;
`

const TicketsList = styled.div`
  text-align: center;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing[2]}px;
`

export default UserTicketsModal
