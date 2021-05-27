/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Menu, Dropdown, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const ProfitHomeContainer = styled.div`
  /* max-height: 280px; */
  margin-top: 30px;
  display: flex;
  width: 100%;
`
const CardProfitStyled = styled.div`
  background-color: ${(props: any) => props.bgColor};
  color: white;
  height: 165px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  border-radius: 6px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    height: 233px;
    padding-left: 50px;
    margin-bottom: 0;
  }

  .top-profit {
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    align-items: center;
    display: flex;
    
    span {
      margin-top: 0;
      color: #245288;

      @media (min-width: 768px) {
        margin-top: 20px;
      }
    }

    .dropdown-profit {
      margin-left: 20px;
    }
  }

  .bottom-profit {
    flex: 1;
    align-items: center;
    display: flex;

    @media (max-width: 768px) {
      overflow-x: scroll;

      &::-webkit-scrollbar-track {
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar {
        height: 6px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #fff;
      }

      .d-flex {
        display: flex;
        flex: 0 0 31px;
        margin-right: 5px;
      }
    }

    span {
      margin-right: 20px;

      &.bold {
        font-weight: bold;
      }
    }

    .green-text {
      color: #9ef3bb;
    }

    .red-text {
      color: #fd5d5d;
    }
  }

  .logo {
    border-radius: 50%;
    width: 31px;
    height: 31px;
    background: rgba(36, 82, 136, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
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

function ProfitHome() {
  return (
    <ProfitHomeContainer>
      <Col md={24}>
        <Row gutter={30}>
          <Col md={12}>
            <CardProfit bgColor="#00A7E1" />
          </Col>
          <Col md={12}>
            <CardProfit bgColor="#232627" />
          </Col>
        </Row>
      </Col>
    </ProfitHomeContainer>
  )
}

const CardProfit = (props) => {
  return (
    <CardProfitStyled {...props}>
      <div className="top-profit">
        <span>
          <b>The most profitable</b> month
        </span>
        <Dropdown className="dropdown-profit" overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} onKeyPress={(e) => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      <div className="bottom-profit">
        <div className="d-flex">
          <img
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
            className="logo"
            alt="logo-BTC"
          />
        </div>
        <span>BTC</span>
        <span className="bold">1.235223</span>
        <span>41.92%</span>
        <span>$7 110.66</span>
        <span className="bold green-text">+ 15.58%</span>
      </div>
    </CardProfitStyled>
  )
}
export default ProfitHome
