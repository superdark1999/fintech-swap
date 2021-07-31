import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default function NavBar({ activeTab, toggle }) {
  return (
    <BoxNav>
      <Nav tabs>
        <LeftItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              all cards
            </NavLink>
          </NavItem>
        </LeftItem>

        <RightItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              My Collection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
              }}
            >
              Pending
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3')
              }}
            >
              unstaked
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                toggle('4')
              }}
            >
              staked
            </NavLink>
          </NavItem>
        </RightItem>
      </Nav>
    </BoxNav>
  )
}

const BoxNav = styled.div`
  margin-top: 20px;

  .nav-tabs {
    // display: grid;
    // grid-template-columns: 1fr 239px;
    display: flex;
    justify-content: space-between;
    border-color: transparent;
    border-bottom: 1px solid #ffffff8b !important;
  }

  .nav-link {
    text-transform: capitalize;

    @media (max-width: 768px) {
      font-size: 16px;
      white-space: nowrap;
    }

    &.active {
      color: #f4c706 !important;
      border-bottom: none !important;
    }
  }
`

const LeftItem = styled.div``

const RightItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: end;
`
