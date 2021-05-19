import React from 'react'
import styled from 'styled-components'

interface ICard {
  bgPool?: string
  children?: React.ReactNode
}

const CardHome: React.FC<ICard> = ({ bgPool, children }) => (
  <StyledCard bgPool={bgPool}>{children}</StyledCard>
)

const StyledCard = styled.div<ICard>`
  border-radius: 20px!important;
  // box-shadow: 0px 7px 6px -4px rgba(0,0,0,0.75);
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #273a55!important;
`

export default CardHome
