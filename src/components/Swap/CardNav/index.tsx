import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@beswap/uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  // margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
`

const Nav = ({ activeIndex = 0 } : { activeIndex?: number }) => (
  <StyledNav className="nav-swap">
    <ButtonMenu activeIndex={activeIndex} variant="subtle">
      <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
        <TranslatedText translationId={8}>Swap</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link} className='txt-dark'>
        <TranslatedText translationId={74}>Liquidity</TranslatedText>
      </ButtonMenuItem>
    </ButtonMenu>
  </StyledNav>
)

export default Nav
