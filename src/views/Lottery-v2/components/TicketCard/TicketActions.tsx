import React, { useMemo, useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, useModal } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useContract } from 'hooks/useContract'
import { useApproveCallbackCustom } from 'hooks/useApproveCallback'
import { XLUCKY_TESTNET_ADDRESSES } from 'config'
import bep20Abi from 'config/abi/erc20.json'
import lotteryAbi from 'config/abi/lottery.json'
import useRefresh from 'hooks/useRefresh'
import useUtilityToken from 'hooks/useUtilityToken'
import { useLottery } from 'state/hooks'
import { getLotteryV2Address, getLotteryTicketAddress } from 'utils/addressHelpers'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { LotteryStatus } from 'config/constants/types'
import {useTicketLotteryV2} from 'hooks/useTicketLotteryV2'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}


const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const TicketCard: React.FC = () => {
  const TranslateString = useI18n()
  const [balanceToken, setBalanceToken] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const {
    isTransitioning,
    currentRound: { status, endTime, userTickets },
  } = useLottery()
  
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const isBuyTicketTime = new Date().getTime() < parseInt(endTime)* 1000;

  const { account, chainId } = useWeb3React()
  const contractBEP20 = useContract(XLUCKY_TESTNET_ADDRESSES[chainId], bep20Abi)

  const useContractTemp = useContract(XLUCKY_TESTNET_ADDRESSES[chainId], bep20Abi)

  // const ticketsContract = useContract(getLotteryTicketAddress(), lotteryTicketAbi)
  // const lotteryContract = useContract(getLotteryV2Address(), lotteryAbi)
  const { fastRefresh } = useRefresh()

  const ticketsLength = userTickets.tickets !== null ?userTickets.tickets.length : 0
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={userTickets.tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={new BigNumber(balanceToken)} tokenName="CAKE" />)

  const { listenApproveEvent } = useUtilityToken(XLUCKY_TESTNET_ADDRESSES[chainId])

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     const res = await getTickets(lotteryContract, ticketsContract, account, null)
  //     setTickets(res)
  //   }

  //   if (account && lotteryContract && ticketsContract) {
  //     fetchBalance()
  //   }
  // }, [account, lotteryContract, fastRefresh, ticketsContract])

  useEffect(() => {
    const fetchApprovalData = async () => {
      if (account && contractBEP20) {
        try {
          // const response = await contractBEP20?.allowance?.(account, getLotteryAddress())
          setAllowance(new BigNumber('10000000000000000000000000000000').toNumber())
        } catch (error) {
          console.log(' error fetch approval data')
        }
      }
    }
    listenApproveEvent(() => fetchApprovalData())
  }, [listenApproveEvent, account, contractBEP20])


  useEffect(() => {
    if (useContractTemp) {
      useContractTemp
        .balanceOf(account)
        .then((data) => {
          setBalanceToken(data.toString())
        })
        .catch((error) => console.log('lottery : ', error))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    if (useContractTemp) {
      useContractTemp
        .balanceOf(account)
        .then((data) => {
          setBalanceToken(data.toString())
        })
        .catch((error) => console.log('lottery : ', error))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh])

  useEffect(() => {
    const fetchApprovalData = async () => {
      if (account && contractBEP20) {
        try {
          const response = await contractBEP20?.allowance?.(account, getLotteryV2Address())
          setAllowance(response.toString())
        } catch (error) {
          console.log(' error fetch approval data')
        }
      }
    }

    fetchApprovalData()
  }, [account, contractBEP20])
  const [requestedApproval, setRequestedApproval] = useState(false)

  const [approval] = useApproveCallbackCustom(XLUCKY_TESTNET_ADDRESSES[chainId], getLotteryV2Address())

  async function onAttemptToApprove() {
    return approval()
  }
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onAttemptToApprove().then()
    } catch (e) {
      console.error(e)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [approval, setRequestedApproval])

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const getStatus = () => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length
  }

  const renderLotteryTicketButtons = () => {
    if (allowance.toString() === '0') {
      return (
        <Dflex>
          <Button
            style={{ marginRight: '8px' }}
            width="100%"
            disabled={ticketsLength === 0}
            variant="secondary"
            onClick={onPresentMyTickets}
          >
            {TranslateString(432, 'View your tickets')}
          </Button>
          <Button
            className="border-yellow"
            width="100%"
            disabled={requestedApproval || getStatus()}
            onClick={handleApprove}
          >
            {getStatus() ? spinnerIcon : ''}
            {TranslateString(494, 'Approve')}
          </Button>
        </Dflex>
      )
    }
    return (
      <>
        <Button
          style={{ marginRight: '8px' }}
          width="100%"
          disabled={ticketsLength === 0}
          variant="secondary"
          onClick={onPresentMyTickets}
        >
        {userTickets.isLoading ? spinnerIcon : ''}

          {TranslateString(432, 'View your tickets')}
        </Button>
        <Button variant="secondary" id="lottery-buy-start" width="100%" disabled={!isBuyTicketTime || ticketBuyIsDisabled} onClick={onPresentBuy}>
        {getStatus() ? spinnerIcon : ''}
        {TranslateString(430, 'Buy ticket')}
        </Button>
      </>
    )
  }

  return (
    <CardActions>
      {ticketBuyIsDisabled ? (
        <Button className="btn-center" disabled> {TranslateString(874, 'On sale soon')}</Button>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

const Dflex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
`

export default TicketCard
