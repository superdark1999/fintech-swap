import React from 'react'
import styled from 'styled-components'
import pool from '../../assets/img/pool.png'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: rgb(240, 233, 231);
  font-size: 36px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  box-shadow: rgb(226, 214, 207) 4px 4px 8px inset, rgb(247, 244, 242) -6px -6px 12px inset;
  margin: 0px auto 16px;
`

export default CardIcon