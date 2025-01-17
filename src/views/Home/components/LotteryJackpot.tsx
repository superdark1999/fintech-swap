import React from 'react'
import { Text } from '@luckyswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { usePriceLuckyBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardBusdValue from './CardBusdValue'

const LotteryJackpot = () => {
  const TranslateString = useI18n()
  const lotteryPrizeAmount = useTotalRewards()
  const balance = getBalanceNumber(lotteryPrizeAmount)
  const lotteryPrizeAmountCake = balance.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const lotteryPrizeAmountBusd = new BigNumber(balance).multipliedBy(usePriceLuckyBusd()).toNumber()

  return (
    <>
      <Text bold fontSize="24px" style={{ lineHeight: '1.5', color: '#2b2c3a' }}>
        {TranslateString(999, `${lotteryPrizeAmountCake} CAKE`, { amount: lotteryPrizeAmountCake })}
      </Text>
      {lotteryPrizeAmountBusd !== 0 && <CardBusdValue value={lotteryPrizeAmountBusd} />}
    </>
  )
}

export default LotteryJackpot
