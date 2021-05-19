import React from 'react'
import styled from 'styled-components'

interface ICard {
  bgPool?:string;
  children?: React.ReactNode,
}

const Card: React.FC<ICard> = ({ bgPool,children }) => <StyledCard bgPool={bgPool}>{children}</StyledCard>

const StyledCard = styled.div<ICard>`
  background: ${props=>props.bgPool};
  border-radius: 12px;
  border: 1px solid rgb(220 255 252);
  box-shadow: 0px 7px 6px -4px rgba(0,0,0,0.75);
  display: flex;
  flex: 1;
  flex-direction: column;
  opacity: 0.9;
`


export default Card
