import React from 'react'
import { Svg, SvgProps } from '@luckyswap/uikit'

const RibbonDownMid: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 142 48" {...props}>
      <rect width="142" height="46" fill="#2b2c3a" />
      <rect y="46" width="142" height="2" fill="#3B2070" />
    </Svg>
  )
}

export default RibbonDownMid
