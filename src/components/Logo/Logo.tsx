import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/img/logo.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={logo} height="60px" className="logo-h" />
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  // position: fixed;
  // top: 3px;
  // left: 17px;
  display: flex;
  align-items: center;
  width:150px;
  @media (min-width: 768px) {
    top: 20px;
    left: 75px;
    display: flex;
    align-items: center;
  }

  .logo-h {
    margin-left: 50px;
    transform: scale(0.7);
    transition: 0.5s;
    display: flex;
  align-items: center;
    @media (min-width: 991px) {
      transform: unset;
    }
  }
`

// const StyledText = styled.span`
//   color: ${(props) => props.theme.color.brown[300]};
//   font-family: 'Encode Sans', sans-serif;
//   font-size: 20px;
//   font-weight: 700;
//   letter-spacing: 0.03em;
//   margin-left: ${(props) => props.theme.spacing[2]}px;
//   @media (max-width: 400px) {
//     display: none;
//   }
// `

// const MasterChefText = styled.span`
//   font-family: 'Encode Sans', sans-serif;
// `

export default Logo