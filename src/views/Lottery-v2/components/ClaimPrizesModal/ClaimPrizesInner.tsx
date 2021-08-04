import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, Button, Text, AutoRenewIcon, } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'

import { LotteryTicket, LotteryTicketClaimData } from 'config/constants/types'
import { getBalanceAmount } from 'utils/formatBalance'
import { callWithEstimateGas } from 'utils/calls'
import { useLottery, usePriceLuckyBusd } from 'state/hooks'
import { fetchUserLotteries } from 'state/lottery2'
import { useAppDispatch } from 'state'
import Balance, { Balance2 } from 'components/Balance'
// import useToast from 'hooks/useToast'
import { useEtherLotteryV2Contract } from 'hooks/useContract'
import { ConsoleSqlOutlined } from '@ant-design/icons'

interface ClaimInnerProps {
  roundsToClaim: LotteryTicketClaimData[]
  onSuccess?: () => void
}

const ClaimInnerContainer: React.FC<ClaimInnerProps> = ({ onSuccess, roundsToClaim }) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { maxNumberTicketsPerBuyOrClaim } = useLottery()
  const [activeClaimIndex, setActiveClaimIndex] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)
  const lotteryContract = useEtherLotteryV2Contract()
  const activeClaimData = roundsToClaim[activeClaimIndex]

  const cakePriceBusd = usePriceLuckyBusd()
  const cakeReward = activeClaimData.cakeTotal
  const dollarReward = cakeReward.times(cakePriceBusd)
  const rewardAsBalance = getBalanceAmount(cakeReward).toNumber()
  const dollarRewardAsBalance = getBalanceAmount(dollarReward).toNumber()

  const parseUnclaimedTicketDataForClaimCall = (ticketsWithUnclaimedRewards: LotteryTicket[], lotteryId: string) => {
    const ticketIds = ticketsWithUnclaimedRewards.map((ticket) => {
      return ticket.id
    })
    const brackets = ticketsWithUnclaimedRewards.map((ticket) => {
      return ticket.rewardBracket
    })
    return { lotteryId, ticketIds, brackets }
  }

  const claimTicketsCallData = parseUnclaimedTicketDataForClaimCall(
    activeClaimData.ticketsWithUnclaimedRewards,
    activeClaimData.roundId,
  )

  const shouldBatchRequest = maxNumberTicketsPerBuyOrClaim.lt(claimTicketsCallData.ticketIds.length)

  const totalNumClaimsForRound = () =>
    Math.ceil(
      roundsToClaim[activeClaimIndex].ticketsWithUnclaimedRewards.length / maxNumberTicketsPerBuyOrClaim.toNumber(),
    )

  const handleProgressToNextClaim = () => {
    if (roundsToClaim.length > activeClaimIndex + 1) {
      // If there are still rounds to claim, move onto the next claim
      setActiveClaimIndex(activeClaimIndex + 1)
      dispatch(fetchUserLotteries({ account }))
    } else {
      onSuccess()
    }
  }

  const getTicketBatches = (ticketIds: string[], brackets: number[]): { ticketIds: string[]; brackets: number[] }[] => {
    const requests = []
    const maxAsNumber = maxNumberTicketsPerBuyOrClaim.toNumber()

    for (let i = 0; i < ticketIds.length; i += maxAsNumber) {
      const ticketIdsSlice = ticketIds.slice(i, maxAsNumber + i)
      const bracketsSlice = brackets.slice(i, maxAsNumber + i)
      requests.push({ ticketIds: ticketIdsSlice, brackets: bracketsSlice })
    }

    return requests
  }

  const handleClaim = async () => {
    const { lotteryId, ticketIds, brackets } = claimTicketsCallData
    console.log("maxNumberTicketsPerBuyOrClaim", maxNumberTicketsPerBuyOrClaim)
    console.log('claimData', claimTicketsCallData)
    setPendingTx(true)
    try {
      const tx = await callWithEstimateGas(lotteryContract, 'claimTickets', [lotteryId, ticketIds, brackets])
      const receipt = await tx.wait()
      if (receipt.status) {
        // toastSuccess(
        //   t('Prizes Collected!'),
        //   t('Your CAKE prizes for round %lotteryId% have been sent to your wallet', { lotteryId }),
        // )
        console.log("Prizes Collected!")
        setPendingTx(false)
        handleProgressToNextClaim()
      }
    } catch (error) {
      console.error(error)
      // toastError(t('Error'), t('%error% - Please try again.', { error: error.message }))
      
      setPendingTx(false)
    }
  }

  const handleBatchClaim = async () => {
    const { lotteryId, ticketIds, brackets } = claimTicketsCallData
    const ticketBatches = getTicketBatches(ticketIds, brackets)
    const transactionsToFire = ticketBatches.length
    const receipts = []
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const ticketBatch of ticketBatches) {
      try {
        /* eslint-disable no-await-in-loop */
        const tx = await callWithEstimateGas(lotteryContract, 'claimTickets', [
          lotteryId,
          ticketBatch.ticketIds,
          ticketBatch.brackets,
        ])
        const receipt = await tx.wait()
        /* eslint-enable no-await-in-loop */
        if (receipt.status) {
          // One transaction within batch has succeeded
          receipts.push(receipt)

          // More transactions are to be done within the batch. Issue toast to give user feedback.
          if (receipts.length !== transactionsToFire) {
            // toastSuccess(
            //   t('Prizes Collected!'),
            //   t(
            //     'Claim %claimNum% of %claimTotal% for round %lotteryId% was successful. Please confirm the next transation',
            //     {
            //       claimNum: receipts.length,
            //       claimTotal: transactionsToFire,
            //       lotteryId,
            //     },
            //   ),
            // )
            console.log()
          }
        }
      } catch (error) {
        console.error(error)
        // toastError(t('Error'), t('%error% - Please try again.', { error: error.message }))
      }
    }

    // Batch is finished
    if (receipts.length === transactionsToFire) {
      setPendingTx(false)
      // toastSuccess(
      //   t('Prizes Collected!'),
      //   t('Your CAKE prizes for round %lotteryId% have been sent to your wallet', { lotteryId }),
      // )
      console.log("Prizes Collected!");
      handleProgressToNextClaim()
    }
  }

  return (
    <>
      <Flex flexDirection="column">
        <Text mb="4px" textAlign={['center', null, 'left']}>
          {TranslateString(999, 'You won')}
        </Text>
        <Flex
          alignItems={['flex-start', null, 'center']}
          justifyContent={['flex-start', null, 'space-between']}
          flexDirection={['column', null, 'row']}
        >
          <Balance2
            value={rewardAsBalance}
            fontSize="44px"
            unit=" LUCKY!"
            color="secondary"
            // textAlign={['center', null, 'left']}
          />
          {/* <PresentWonIcon ml={['0', null, '12px']} width="64px" /> */}
        </Flex>
        <Balance2
          // mt={['12px', null, '0']}
          // textAlign={['center', null, 'left']}
          value={dollarRewardAsBalance}
          fontSize="12px"
          color="textSubtle"
          unit=" USD"
          prefix="~"
          decimals={10}
        />
      </Flex>

      <Flex alignItems="center" justifyContent="center">
        <Text mt="8px" fontSize="12px" color="textSubtle">
          {TranslateString(999, 'Round')} #{activeClaimData.roundId}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          mt="20px"
          width="100%"
          variant="secondary" 
          onClick={() => (shouldBatchRequest ? handleBatchClaim() : handleClaim())}
        >
          {pendingTx ? TranslateString(999, 'Claiming') : TranslateString(999, 'Claim')} {totalNumClaimsForRound() > 1 
          ? `(${totalNumClaimsForRound()})` : ''}
        </Button>
      </Flex>
    </>
  )
}

export default ClaimInnerContainer
