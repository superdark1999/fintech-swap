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
  position: relative;
  background-image: url(${pool});
  font-size: 13px;
  height: 254px;
  width: 256px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  margin: 0 auto ${props => props.theme.spacing[3]}px;

  .box-img {
    border-radius: 50%;
    box-shadow: #c1c7c7 4px 4px 8px inset, #e5e9ec -6px -6px 12px inset;
    width: 90px;
    height: 90px;
    position: absolute;
    top: 30px;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
    height: 75px;
  }
`

export default CardIcon