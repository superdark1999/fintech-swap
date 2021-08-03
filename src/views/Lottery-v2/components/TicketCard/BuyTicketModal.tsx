import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Modal } from '@luckyswap/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TicketInput from 'components/TicketInput'
import ModalActions from 'components/ModalActions'
import useI18n from 'hooks/useI18n'
import { LOTTERY_MAX_NUMBER_OF_TICKETS, LOTTERY_TICKET_PRICE, LOTTERY2_MAX_TICKET_IN_ROUND } from 'config'
import { useLotteryV2contract } from 'hooks/useContract'
import {useTicketLotteryV2} from 'hooks/useTicketLotteryV2'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useLotteryV2 } from 'hooks/useLotteryV2';
import { useTicketsReducer } from './useTicketsReducer'

interface BuyTicketModalProps {
  max: BigNumber
  onConfirm?: (amount: string, numbers: Array<number>) => void
  onDismiss?: () => void
  tokenName?: string
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ max, onDismiss }) => {
  const [val, setVal] = useState('1')
  const [discountValue, setDiscountValue] = useState('')
  const [ticketCostBeforeDiscount, setTicketCostBeforeDiscount] = useState('');
  const [totalCost, setTotalCost] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [, setRequestedBuy] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, 18)
  }, [max])
  const maxTickets = useMemo(() => {
    return parseInt(getFullDisplayBalance(max.div(LOTTERY_TICKET_PRICE)), 10)
  }, [max])

  const userTickets = useTicketLotteryV2()
  const ticketsLength = userTickets.length;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value)

  const lotteryV2Contract = useLotteryV2contract()
  const addTransaction = useTransactionAdder()

  const {
    currentLotteryId,
    maxNumberTicketsPerBuyOrClaim,
    lotteryData 
  } = useLotteryV2();

  const {
    priceTicketInCake,
    discountDivisor
  } = lotteryData as any;


  const userCurrentTickets = useMemo(() => {return []}, [])

  const [updateTicket, randomize, tickets, allComplete, getTicketsForPurchase] = useTicketsReducer(
    parseInt(val, 10), // number of tickets
    userCurrentTickets,
  )

  const getTicketCostAfterDiscount = useCallback(
    (numberTickets: BigNumber) => {
      const totalAfterDiscount = priceTicketInCake
        .times(numberTickets)
        .times(discountDivisor.plus(1).minus(numberTickets))
        .div(discountDivisor)
      return totalAfterDiscount
    },
    [discountDivisor, priceTicketInCake],
  )

  useEffect(() => {
    const numberOfTicketsToBuy = new BigNumber(val)
    const costAfterDiscount = getTicketCostAfterDiscount(numberOfTicketsToBuy)
    const costBeforeDiscount = priceTicketInCake.times(numberOfTicketsToBuy)
    const discountBeingApplied = costBeforeDiscount.minus(costAfterDiscount)
    setTicketCostBeforeDiscount(costBeforeDiscount.gt(0) ? getFullDisplayBalance(costBeforeDiscount) : '0')
    setTotalCost(costAfterDiscount.gt(0) ? getFullDisplayBalance(costAfterDiscount) : '0')
    setDiscountValue(discountBeingApplied.gt(0) ? getFullDisplayBalance(discountBeingApplied, 18) : '0')
  }, [val, priceTicketInCake, discountDivisor, getTicketCostAfterDiscount])

  const percentageDiscount = () => {
    const percentageAsBn = new BigNumber(discountValue).div(new BigNumber(ticketCostBeforeDiscount)).times(100)
    if (percentageAsBn.isNaN() || percentageAsBn.eq(0)) {
      return 0
    }
    return percentageAsBn.toNumber().toFixed(2)
  }

  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const ticketsForPurchase = getTicketsForPurchase();
      const tx =  await lotteryV2Contract.buyTickets(currentLotteryId, ticketsForPurchase);
    } catch (e) {
      console.error(e)
    }
  }, [lotteryV2Contract, currentLotteryId, getTicketsForPurchase])

  const handleSelectMax = useCallback(() => {
    if (Number(maxTickets) > parseInt(maxNumberTicketsPerBuyOrClaim)) {
      if (LOTTERY2_MAX_TICKET_IN_ROUND - ticketsLength > parseInt(maxNumberTicketsPerBuyOrClaim))
        setVal(maxNumberTicketsPerBuyOrClaim)
      else
        setVal((LOTTERY2_MAX_TICKET_IN_ROUND - ticketsLength).toString())
    } else if((LOTTERY2_MAX_TICKET_IN_ROUND - ticketsLength > Number(maxTickets))) {
      setVal(maxTickets.toString())
    } else {
      setVal(LOTTERY_MAX_NUMBER_OF_TICKETS.toString())
    }
  }, [maxTickets, ticketsLength, maxNumberTicketsPerBuyOrClaim])

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
        <Tips>{TranslateString(999, `Cost: ${priceTicketInCake && getFullDisplayBalance(priceTicketInCake.times(val || 0))} lucky`)}</Tips>
        <Tips>{TranslateString(999, `Discount: ${discountValue && totalCost ? percentageDiscount() : 0} %`)}</Tips>
        <Tips>{TranslateString(999, `~ ${discountValue} Lucky`)}</Tips>
        {/* {priceTicketInCake && getFullDisplayBalance(priceTicketInCake.times(ticketsToBuy || 0))} */}
      </div>
      <div>
        <Announce>
          {TranslateString(
            478,
            'Ticket purchases are final. Your LUCKY cannot be returned to you after buying tickets.',
          )}
        </Announce>s
        <Final>{TranslateString(460, `You will spend: ${totalCost} LUCKY`)}</Final>
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
            parseInt(val) > parseInt(maxNumberTicketsPerBuyOrClaim) ||
            // parseInt(val) + ticketsLength > LOTTERY2_MAX_TICKET_IN_ROUND ||
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
