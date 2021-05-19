import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.brown[300]};
  font-size: 18px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[1]}px;
  text-align: center;
`

export default CardTitle
