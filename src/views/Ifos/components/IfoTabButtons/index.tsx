import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@luckyswap/uikit'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 39px;
`

const IfoTabButtons = () => {
  const { url, isExact } = useRouteMatch()

  return (
    <Wrapper>
      <div className="custom-bt">
        <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            Launchpad BEP-20
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            Launchpad NFT
          </ButtonMenuItem>
        </ButtonMenu>
      </div>
    </Wrapper>
  )
}

export default IfoTabButtons
