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

const PoolCards: React.FC<PoolCardsProps> = memo(({ pools, activeTab }) => {
  // console.log('pools>>>', pools)
  return (
    <>
      <div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row xs="1" sm="2" md="3">
              {pools.map((pool) => (
                <PoolCard key={pool._id} pool={pool} />
              ))}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  )
})

const HeadLine = styled.div`
  background: linear-gradient(90deg, rgba(239, 186, 12, 1) 0%, rgba(251, 219, 59, 1) 100%);
  width: 100%;
  padding: 10px 0;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  color: #212529;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
`

const BoxPool = styled.div`
  background: rgb(41 41 41);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 11px 0px rgb(29 26 26 / 57%);
  border-radius: 20px;
  padding: 24px 15px 15px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  figure {
    border-radius: 4px;
    width: 78px;
    height: 78px;
    display: flex;
    margin: 28px auto 0 auto;
    padding: 10px;
  }
`

const CardContent = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const Title = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`

const FlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const ContentLeft = styled.div`
  color: #979797;
  text-align: left;
`

const ContentRight = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
`

const Boxbtn = styled.div`
  text-align: center;
  border-top: 1px solid #d8d8d8;
  padding-top: 15px;

  button {
    background: #f5c606;
    font-weight: 600;
    border-color: transparent;
    color: #2b2e2f;

    &:hover {
      background-color: #40a9ff;
      transition: 0.5s;
    }

    a {
      &:hover {
        color: rgb(255, 253, 250);
      }
    }
  }
`
function areEqual(prevProps, nextProps): any {
  return JSON.stringify(prevProps.pools) === JSON.stringify(nextProps.pools)
}

export default React.memo(PoolCards, areEqual)
