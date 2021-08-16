import { Button, Text } from '@luckyswap/uikit'
import { Currency, CurrencyAmount } from '@luckyswap/v2-sdk'
import { RowBetween, RowFixed } from 'components/Row'
import CurrencyLogo from 'components/Swap/CurrencyLogo'
import React from 'react'

export function ConfirmStakeModalBottom({
  currency,
  depositAmount,
  onStake,
  rateReward,
}: {
  currency: Currency
  depositAmount: CurrencyAmount
  rateReward: number
  onStake: any
}) {
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
        <Text>Rate reward (per year)</Text>
        <RowFixed>
          <CurrencyLogo currency={currency} style={{ marginRight: '8px' }} />
          <Text>{rateReward}%</Text>
        </RowFixed>
      </RowBetween>

      <Button mt="20px" onClick={onStake} className="btn-supply">
        Stake
      </Button>
    </>
  )
}
