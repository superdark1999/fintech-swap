/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from 'styled-components'
import { useNativeBalance } from 'hooks/useTokenBalance'
import { Menu, Dropdown, message } from 'antd'
import Chart from './Chart'

const BalanceContainer = styled.div`
  height: auto;
  width: 100%;
  align-items: center;
  display: flex;
  background-color: #444444;
  color: #9a9eb1;
  border-radius: 20px;
  flex-direction: column;

  @media (min-width: 768px) {
    height: 350px;
    flex-direction: row;
  }

  .left-balance {
    width: 100%;
    margin-left: 0;
    margin-bottom: 15px;
    padding: 10px;

    @media (min-width: 768px) {
      width: 300px;
      margin-bottom: 0;
      margin-left: 75px;
      padding: 0;
    }

    .left-balance-label {
      font-size: 14px;
      margin-bottom: 12px;
    }

    .left-balance-total-balance {
      font-size: 51px;
      color: 51px;
      letter-spacing: 0.196154px;
      margin-bottom: 17px;
      color: #fff;
    }

    .left-balance-estimate {
      color: #84ce95;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 0;

      @media (min-width: 768px) {
        margin-bottom: 46px;
      }
    }

    .left-balance-currency {
      font-weight: 900;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin-bottom: 38px;

      span {
      }
    }

    .left-balance-filter-date {
      span {
        margin-right: 30px;
        cursor: pointer;
        &:hover {
          color: #5ab3ff;
        }
      }
    }
  }

  .right-balance {
    flex: 1;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`)
}
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
)
const listTime = ['1d', '5d', '1m', '1y']
function BalanceHome() {
  const balance = useNativeBalance() //
  return (
    <BalanceContainer>
      <div className="left-balance">
        <div className="left-balance-label">Balance</div>
        <div className="left-balance-total-balance">{(balance.toNumber() / 1e18).toFixed(2)} BNB </div>
        <div className="left-balance-estimate">+ $ 0 (0.00%)</div>
        {/* <div className="left-balance-currency">
          <span>In USD </span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} onKeyPress={(e) => e.preventDefault()}>
              <DownOutlined />
            </a>
          </Dropdown>
        </div> */}
        {/* <div className="left-balance-filter-date">
          {listTime.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div> */}
      </div>
      <div style={{ height: '100%' }} className="right-balance">
        <Chart />
      </div>
    </BalanceContainer>
  )
}

export default BalanceHome
