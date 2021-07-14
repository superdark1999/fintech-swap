import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@luckyswap/uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  // margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;

  .active {
    border: 1px double transparent !important;
    background-image: linear-gradient(#444444, #444444), linear-gradient(31deg, #0993ec, #29f4c3) !important;
    background-origin: border-box !important;
    background-clip: padding-box, border-box !important;
  }
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <StyledNav className="nav-swap">
    <BoxNav>
      <ButtonMenu activeIndex={activeIndex} variant="subtle">
        <ButtonMenuItem className={`${activeIndex === 0 ? 'active' : ''}`} id="swap-nav-link" to="/swap" as={Link}>
          <TranslatedText translationId={8}>Swap</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem
          className={`txt-dark ${activeIndex === 1 ? 'active' : ''}`}
          id="pool-nav-link"
          to="/pool"
          as={Link}
        >
          <TranslatedText translationId={74}>Liquidity</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem>
          <a href="https://www.binance.org/en/bridge?utm_source=luckyswap" target="_blank" rel="noopener noreferrer">Bridge</a>
        </ButtonMenuItem>
      </ButtonMenu>
    </BoxNav>
  </StyledNav>
)

export default Nav

const BoxNav = styled.div`
  height: 48px;
`
