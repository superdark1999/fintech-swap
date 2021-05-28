import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../Logo'
import Nav from './components/Nav'
import Web3Status from '../../wallet/Web3Status'
import { isMobile } from 'react-device-detect'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  const [classtSicky, setClassSticky] = useState('')

  const handleScroll = () => {
    const position = window.pageYOffset

    if (position > 10) {
      setClassSticky('fixed')
    } else {
      setClassSticky('')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <StyledTopBar className={classtSicky}>
      <StyledTopBarInner>
        <div className="header-wrapper">
          <Logo />
          <Nav />
        </div>
      </StyledTopBarInner>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div`
  .header-wrapper{
    width:100vw;
    background: #FFFFFF;
    max-width:2200px;
    margin: auto;
  }
  z-index: 20;
  width: 100vw;
  height:80px;
  top: 0;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px -4px rgba(35, 35, 35, 0.06);
  border-bottom: 1px solid rgba(0,0,0,.06);
  &.fixed {
    background: linear-gradient(
      rgb(14, 19, 29),
      rgb(6, 10, 16) 30.65%
    ) !important;
    position: fixed;
    padding-bottom: 5px;
    left: 0;
    right: 0;
    transition: all 0.2s ease;
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.15);
    z-index: 20;

    @media (min-width: 767px) {
      padding-bottom: 5px;
    }
  }
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  min-height: 80px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;

  @media (max-width: 768px) {
    min-height: 77px;
  }
`

export default TopBar