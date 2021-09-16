import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { Pool } from 'config/constants/types'
import PoolCard from './PoolCard'

interface PoolCardsProps {
  pools: Pool[]
  activeTab: string
}

const PoolCards: React.FC<PoolCardsProps> = ({ pools, activeTab }) => {
  const inactivePools = pools.filter(p =>  p.inactive)
  return (
    <>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row xs="1" sm="2" md="3">
            {pools.map((pool) => (
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
    </>
  )
}

function areEqual(prevProps, nextProps): any {
  return JSON.stringify(prevProps.pools) === JSON.stringify(nextProps.pools)
}

export default React.memo(PoolCards, areEqual)
