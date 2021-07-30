import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal } from '@luckyswap/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TicketInput from 'components/TicketInput'
import ModalActions from 'components/ModalActions'
import { useMultiBuyLottery, useMaxNumber } from 'hooks/useBuyLottery'
import useI18n from 'hooks/useI18n'
import { LOTTERY_MAX_NUMBER_OF_TICKETS, LOTTERY_TICKET_PRICE, LOTTERY_MAX_TICKET_IN_ROUND } from 'config'
import { useContract } from 'hooks/useContract'
import useTickets from 'hooks/useTickets'
import { getLotteryAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'
import { useTransactionAdder } from 'state/transactions/hooks'

interface BuyTicketModalProps {
  max: BigNumber
  onConfirm?: (amount: string, numbers: Array<number>) => void
  onDismiss?: () => void
  tokenName?: string
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ max, onDismiss }) => {
  const [val, setVal] = useState('1')
  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, 18)
  }, [max])
  const maxTickets = useMemo(() => {
    return parseInt(getFullDisplayBalance(max.div(LOTTERY_TICKET_PRICE)), 10)
  }, [max])

  const tickets = useTickets()
  const ticketsLength = tickets.length

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value)

  const { onMultiBuy } = useMultiBuyLottery()
  const maxNumber = useMaxNumber()
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)
  const addTransaction = useTransactionAdder()

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const length = parseInt(val)
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      const numbers = Array.apply(null, { length }).map(() => [
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
        Math.floor(Math.random() * maxNumber) + 1,
      ])
      // await onMultiBuy(LOTTERY_TICKET_PRICE.toString(), numbers)
      const txHash = await lotteryContract
        .multiBuy(new BigNumber(LOTTERY_TICKET_PRICE.toString()).times(new BigNumber(10).pow(18)).toString(), numbers)
        .then((response) => {
          addTransaction(response, {
            summary: 'Buy ticket successfully!',
          })
        })
      // user rejected tx or didn't go thru
      if (txHash) {
        setRequestedBuy(false)
      }
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMultiBuy, setRequestedBuy, maxNumber, val])
  
  const handleSelectMax = useCallback(() => {
    if (Number(maxTickets) > LOTTERY_MAX_NUMBER_OF_TICKETS) {
      if (LOTTERY_MAX_TICKET_IN_ROUND - ticketsLength > LOTTERY_MAX_NUMBER_OF_TICKETS)
        setVal(LOTTERY_MAX_NUMBER_OF_TICKETS.toString())
      else
        setVal((LOTTERY_MAX_TICKET_IN_ROUND - ticketsLength).toString())
    } else if((LOTTERY_MAX_TICKET_IN_ROUND - ticketsLength > Number(maxTickets))) {
      setVal(maxTickets.toString())
    } else {
      setVal(LOTTERY_MAX_NUMBER_OF_TICKETS.toString())
    }
  }, [maxTickets, ticketsLength])

  const cakeCosts = (amount: string): number => {
    return +amount * LOTTERY_TICKET_PRICE
  }
  return (
    <Modal title={TranslateString(450, 'Enter amount of tickets to buy')} onDismiss={onDismiss}>
      <TicketInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol="TICKET"
        availableSymbol="LUCKY"
      />
      <div>
        <Tips>{TranslateString(999, `1 Ticket = ${LOTTERY_TICKET_PRICE} LUCKY`, { num: LOTTERY_TICKET_PRICE })}</Tips>
      </div>
      <div>
        <Announce>
          {TranslateString(
            478,
            'Ticket purchases are final. Your LUCKY cannot be returned to you after buying tickets.',
          )}
        </Announce>
        <Final>{TranslateString(460, `You will spend: ${cakeCosts(val)} LUCKY`)}</Final>
        <Final>{TranslateString(999, `Your ticket: ${ticketsLength}`)}</Final>

      </div>
      <ModalActions>
        <Button width="100%" variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>

        
        <Button
          id="lottery-buy-complete"
          width="100%"
          variant="secondary"
          disabled={
            pendingTx ||
            parseInt(val) > Number(maxTickets) ||
            parseInt(val) > LOTTERY_MAX_NUMBER_OF_TICKETS ||
            parseInt(val) + ticketsLength > LOTTERY_MAX_TICKET_IN_ROUND ||
            parseInt(val) < 1
          }
          onClick={async () => {
            setPendingTx(true)
            await handleBuy()
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default BuyTicketModal

const Tips = styled.div`
  margin-left: 0.4em;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`

const Final = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`
const Announce = styled.div`
  margin-top: 1em;
  margin-left: 0.4em;
  color: #fff;
`
