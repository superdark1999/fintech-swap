import React from 'react'
import styled from 'styled-components'
import { Button, LinkExternal, useModal } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { useWeb3React } from '@web3-react/core'
import useTickets from 'hooks/useTickets'
import UnlockButton from 'components/UnlockButton'
import { SCAN_SITES } from '../../../../constants'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: block;
  width: max-content;
  & > div {
    flex: 1;
    width: 100%;
  }
`

const ExternalLinkWrap = styled(LinkExternal)`
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`
const StyledButton = styled(Button)`
  width: max-content;
  color: #f3c111 !important;
  padding: 0 70px;
  border-radius: 100px;
  border-color: #F3C111 !important;
  margin: 0 auto;
  display: block;
  margin-right: auto !important;
`

const TicketCard: React.FC<{ contractLink?: string; lotteryNumber?: number }> = ({ contractLink, lotteryNumber }) => {
  const TranslateString = useI18n()
  const tickets = useTickets(lotteryNumber)
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const { account, chainId } = useWeb3React()

  if (!account) {
    return (
      <Wrapper>
        <UnlockButton />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        {/* <StyledButton
          
          width="100%"
          variant="secondary"
          disabled={ticketsLength === 0}
          onClick={onPresentMyTickets}
        >
          {TranslateString(432, 'View Your ticket')}
        </StyledButton> */}
      </div>
      {/* <div>
        <ExternalLinkWrap href={contractLink}>
          {TranslateString(356, `View on ${SCAN_SITES[chainId]}`)}
        </ExternalLinkWrap>
      </div> */}
    </Wrapper>
  )
}

export default TicketCard
