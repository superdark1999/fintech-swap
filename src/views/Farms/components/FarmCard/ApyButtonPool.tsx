import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@luckyswap/uikit'
import ApyCalculatorModalPool from './ApyCalculatorModalPool'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: number
  addLiquidityUrl?: string
}

const ApyButtonPool: React.FC<ApyButtonProps> = ({ lpLabel, cakePrice, apy, addLiquidityUrl }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModalPool lpLabel={lpLabel} cakePrice={cakePrice} apy={apy} addLiquidityUrl={addLiquidityUrl} />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButtonPool
