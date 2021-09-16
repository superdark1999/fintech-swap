import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import PoolCard from './PoolCard'
import PoolCards from './PoolCards'
import PoolCardsInactive from './PoolCardsInactive'

export default function NavBar({ activeTab, toggle, pools}) {
  const activePools = pools.filter(p =>  !p.inactive)
  const inactivePools = pools.filter(p =>  p.inactive)
  return (
    <BoxNav>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggle('1')}
          >
            Active
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggle('2')}
          >
            Inactive
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row xs="1" sm="2" md="3">
            {activePools.map((pool) => (
              <PoolCard key={pool._id} pool={pool} />
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row xs="1" sm="2" md="3">
            {inactivePools.map(pool => (
              <PoolCard key={pool._id} pool={pool} />
            ))}
          </Row>
        </TabPane>
      </TabContent>
      {/* <PoolCardsInactive pools={inactivePools} activeTab={activeTab}/> */}
    </BoxNav>
  )
}

const BoxNav = styled.div`
  margin-top: 20px;
`
