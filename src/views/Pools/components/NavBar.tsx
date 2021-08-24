import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export default function NavBar({ activeTab, toggle }) {
  return (
    <BoxNav>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1')
            }}
          >
            Active
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2')
            }}
          >
            Inactive
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              window.open("#/staking")
            }}
          >
            NFT Staking
          </NavLink>
        </NavItem> */}
        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('5')
            }}
          >
            Earn NFT
          </NavLink>
        </NavItem> */}
        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => {
              toggle('6')
            }}
          >
            Ended
          </NavLink>
        </NavItem> */}
      </Nav>
    </BoxNav>
  )
}

const BoxNav = styled.div`
  margin-top: 20px;
`
