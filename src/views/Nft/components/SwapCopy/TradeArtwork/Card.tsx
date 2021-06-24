import React from 'react'
import { CardStyled } from './styled'
import CheckMark from 'assets/images/checkmark.svg'
import TextGradient from 'components-v2/ID'

const Card = (props: any) => {
const {data} = props
 return (
    <CardStyled center>
      <div className="avatar">
        <img src={data?.contentUrl}/>
      </div>
      <div className="name">{data?.title}</div>
      <div className="organize">
        LuckySwapStudio
        {' '}
        <img src={CheckMark}/>
      </div>
      <TextGradient>{data?.ownerWalletAddress}</TextGradient>
    </CardStyled>
  )
}

export default Card
