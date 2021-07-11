import React from 'react'
import styled from 'styled-components'
import { Text, Link } from '@luckyswap/uikit'
import Tooltip from '../../views/Farms/components/Tooltip/Tooltip'
import { SCAN_SITES } from '../../constants/index'

const StyledTooltip = styled(Tooltip)`
  bottom: -9px;
  left: 50%;
  right: 0;
  transform: translate(-50%, 100%);

  &:after {
    border-top: none;
    border-bottom: 10px solid ${({ theme }) => theme.tooltip.background};
    top: 0%;
    position: absolute;
    transform: translate(50%, -9px);
    right: 50%;
  }
`

const ToolTipInner = ({ blockNumber, chainId }) => {
  return (
    <>
      <Text color="body" mb="10px" fontWeight="600">
        Block {blockNumber}
      </Text>
      <Link external href={`https://testnet.bscscan.com/block/${blockNumber}`}>
        View on {SCAN_SITES[chainId]}
      </Link>
    </>
  )
}

const TimerTooltip = ({ chainId, blockNumber, children }) => {
  return (
    <StyledTooltip content={<ToolTipInner chainId={chainId} blockNumber={blockNumber} />}>{children}</StyledTooltip>
  )
}

export default TimerTooltip
