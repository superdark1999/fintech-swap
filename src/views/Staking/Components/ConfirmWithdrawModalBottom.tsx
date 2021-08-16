import { Button, Text } from '@luckyswap/uikit'
import { Currency, CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { RowBetween, RowFixed } from 'components/Row'
import CurrencyLogo from 'components/Swap/CurrencyLogo'
import React from 'react'
import { calculatePercentToJSBI } from '../../../utils/bigNumber'

export function ConfirmWithdrawModalBottom({
  currency,
  depositAmount,
  rewardAmount,
  onWithdraw,
  harvestFee,
}: {
  currency: Currency
  depositAmount: CurrencyAmount
  rewardAmount: CurrencyAmount
  harvestFee: number
  onWithdraw: () => void
}) {
  const fee: CurrencyAmount = CurrencyAmount.fromRawAmount(
    currency,
    calculatePercentToJSBI(rewardAmount?.raw, harvestFee),
  )

  return (
    <>
      <RowBetween>
        <Text>XLUCKY Deposited</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{depositAmount?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>

      <RowBetween>
        <Text>XLUCKY Reward</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{rewardAmount?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>

      <RowBetween>
        <Text>Fee (in percent)</Text>
        <RowFixed>
          <Text>{harvestFee}%</Text>
        </RowFixed>
      </RowBetween>

      <RowBetween>
        <Text>Fee</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{fee?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>

      <Button mt="20px" onClick={onWithdraw} className="btn-supply">
        Withdraw
      </Button>
    </>
  )
}
