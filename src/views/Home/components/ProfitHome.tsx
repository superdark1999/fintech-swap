/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col, Menu, Dropdown, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'

function currencyFormat(num) {
  return  num && num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const ProfitHomeContainer = styled.div`
  /* max-height: 280px; */
  margin-top: 30px;
  display: flex;
  width: 100%;
`
const CardProfitStyled = styled.div`
  background-color: ${(props: any) => props.bgColor};
  color: #fff;
  height: 165px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  border-radius: 20px;
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
    b{
      color: #fff;
    }
    span {
      margin-top: 0;
      color: #fff;
      font-weight:700;
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
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar {
        height: 6px;
        background-color: #f5f5f5;
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
  const [data, setData] = useState([])
  useEffect(() => {
    let coins: any = ['btc', 'eth']
    coins = coins.map((item) => {
      return axios(`https://data.messari.io/api/v1/assets/${item}/metrics/market-data`)
    })
    Promise.all(coins).then((res) => {
      const dataTemp = []
      res.forEach((item: any) => {
        dataTemp.push(item.data.data)
      })
      setData(dataTemp)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ProfitHomeContainer>
      <Col md={24}>
        <Row gutter={30}>
          <Col md={12}>
            <CardProfit icon='https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png' 
            data={data[0]} bgColor="#16426f" />
          </Col>
          <Col md={12}>
            <CardProfit   icon='https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png' 
            data={data[1]} bgColor="#444444" />
          </Col>
        </Row>
      </Col>
    </ProfitHomeContainer>
  )
}

const CardProfit = (props) => {
  const {data, icon} =props
  return (
    <CardProfitStyled {...props}>
      <div className="top-profit">
        <span>
          <b>The most profitable</b> 24h
        </span>
        <Dropdown className="dropdown-profit" overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()} onKeyPress={(e) => e.preventDefault()}>
            {/* <DownOutlined /> */}
          </a>
        </Dropdown>
      </div>
      <div className="bottom-profit">
        <div className="d-flex">
          <img
            src={icon}
            className="logo"
            alt="logo-BTC"
          />
        </div>
        <span>{data && data.symbol}</span>
        <span className="bold">{currencyFormat(data && data.market_data && data.market_data.volume_last_24_hours)}</span>
        {/* <span>{data && data.market_data && data.market_data.percent_change_usd_last_24_hours.toFixed(2)}%</span> */}
        <span>${currencyFormat(data && data.market_data && data.market_data.price_usd)}</span>
        <span className={`bold ${data && data.market_data && data.market_data.percent_change_usd_last_24_hours.toFixed(2)>0?'green':'red'}-text`}>{data && data.market_data && data.market_data.percent_change_usd_last_24_hours.toFixed(2)}%</span>
      </div>
    </CardProfitStyled>
  )
}
export default ProfitHome
