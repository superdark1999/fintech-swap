import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Heading, Won, useModal, AutoRenewIcon } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { useMultiClaimLottery } from 'hooks/useBuyLottery'
import useTickets, { useTotalClaim } from 'hooks/useTickets'
import {  useContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { getLotteryAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'
import Loading from '../Loading'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const WinningsWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const IconWrapper = styled.div`
  margin-bottom: 16px;

  svg {
    width: 80px;
    height: 80px;
  }
`

const StyledCardActions = styled.div`
  margin-top: ${(props) => props.theme.spacing[3]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing[1]}px;
`

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />


const PrizesWonContent: React.FC = () => {
  const [requestedClaim, setRequestedClaim] = useState(false)
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const TranslateString = useI18n()
  const { claimLoading, claimAmount } = useTotalClaim()
  const { onMultiClaim } = useMultiClaimLottery()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  const tickets = useTickets()
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const addTransaction = useTransactionAdder()

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true)
      setIsClaimLoading(true);
      const txHash = await onMultiClaim();
      if (!txHash) 
        setIsClaimLoading(false);
        setRequestedClaim(false)
      addTransaction(txHash, {
        summary: 'Claim successfully!',
      })
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedClaim(false)
      }
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMultiClaim, setRequestedClaim])

  useEffect(() => {
    lotteryContract.on("MultiClaim", () => {
      setIsClaimLoading(false);
    })
  })

  const winnings = getBalanceNumber(claimAmount).toFixed(2)


  return (
    <StyledCardContentInner>
      <IconWrapper>
        <img src="images/icon-gif.svg" alt="gif" />
      </IconWrapper>
      <Heading as="h3" size="lg" color="#1CFFBB">
        {TranslateString(660, 'You won!')}
      </Heading>
      {claimLoading && <Loading />}
      {!claimLoading && (
        <>
          <WinningsWrapper>
            <Heading as="h4" size="xl" style={{ marginRight: '6px' }}>
              {winnings}
            </Heading>
            <Heading as="h4" size="lg">
              LUCKY
            </Heading>
          </WinningsWrapper>
        </>
      )}
      <StyledCardActions>
        <Button
          className="border-yellow"
          variant="secondary"
          width="100%"
          disabled={requestedClaim || isClaimLoading}
          onClick={handleClaim}
        >
          {isClaimLoading && spinnerIcon}
          {TranslateString(1056, 'Collect')}
        </Button>
      </StyledCardActions>
      <StyledButton variant="text" onClick={onPresentMyTickets}>
        {TranslateString(432, 'View your tickets')}
      </StyledButton>
    </StyledCardContentInner>
  )
}

export default PrizesWonContent
