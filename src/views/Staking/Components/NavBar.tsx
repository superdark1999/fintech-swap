import classnames from 'classnames'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'

interface NavbarProps {
  activeTab?: any
}

export default function NavBar({ activeTab }: NavbarProps) {
  const history = useHistory()
  return (
    <BoxNav>
      <Nav tabs>
        <LeftItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                history.push('/staking')
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
                history.push('/staking')
              }}
            >
              My Collection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/staking/pending"
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                history.push('/staking/pending')
              }}
            >
              Pending
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                history.push('/staking/unstaked')
              }}
            >
              unstaked
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              to="/staking/staked"
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                history.push('/staking/staked')
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
