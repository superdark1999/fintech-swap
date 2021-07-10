import React from 'react'
import styled from 'styled-components'
import { Card } from '@luckyswap/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 664px;
  width: 100%;
  z-index: 5;
  margin: 0 auto;
  background: linear-gradient(45deg,rgb(35 35 35) 30%,rgb(45 45 45) 100%);
  box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
  border-radius: 40px;
  padding: 30px;
  margin-top: 20px;

  @media (min-width: 768px) {
    padding: 45px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper className="color-orange">{children}</BodyWrapper>
}
