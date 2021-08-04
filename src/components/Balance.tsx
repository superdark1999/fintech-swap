import React, { useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { Text } from '@luckyswap/uikit'

interface TextProps {
  isDisabled?: boolean
  fontSize?: string
  color?: string
}

interface BalanceProps extends TextProps {
  value?: number
  decimals?: number
  unit?: string
}

const Balance: React.FC<BalanceProps> = ({ value, fontSize, color, decimals, isDisabled, unit }) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <Text bold color={isDisabled ? 'textDisabled' : color} fontSize={fontSize}>
      <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
      {value && unit && <span>{unit}</span>}
    </Text>
  )
}

Balance.defaultProps = {
  fontSize: '32px',
  isDisabled: false,
  color: 'text',
  decimals: 3,
}

interface Balance2Props extends TextProps {
  value: number
  decimals?: number
  unit?: string
  isDisabled?: boolean
  prefix?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Balance2: React.FC<Balance2Props> = ({
  value,
  color = 'text',
  decimals = 3,
  isDisabled = false,
  unit,
  prefix,
  onClick,
  ...props
}) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <Text color={isDisabled ? 'textDisabled' : color} onClick={onClick} {...props}>
      {prefix && <span>{prefix}</span>}
      <CountUp start={previousValue.current} end={value} decimals={decimals} duration={1} separator="," />
      {unit && <span>{unit}</span>}
    </Text>
  )
}

export default Balance
