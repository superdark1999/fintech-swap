import React from 'react'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return <CardValue fontSize="14px" lineHeight="1.1" color="#2b2c3a" prefix="~$" bold={false} decimals={3} {...props} />
}

export default CardBusdValue
