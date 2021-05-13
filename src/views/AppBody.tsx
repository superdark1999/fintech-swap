import React from 'react'
import styled from 'styled-components'
import { Card } from '@beswap/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 436px;
  width: 100%;
  z-index: 5;
  margin: 0 auto;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper className="color-orange">{children}</BodyWrapper>
}
