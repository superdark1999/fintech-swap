import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

const InterestHomeContainer = styled.div`
  height: 280px;
  width: 100%;
  margin-top: 30px;
  span {
    font-weight: normal;
    font-size: 21px;
  }
`

function InterestHome() {
  return (
    <InterestHomeContainer>
      <span>What is interesting</span>
      <Row gutter={[8, 8]} style={{ marginTop: '24px' }}>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
        <Col span={12} md={8}>
          <InterestItem />
        </Col>
      </Row>
    </InterestHomeContainer>
  )
}

const InterestItemStyled = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: #232627;
  padding: 20px 35px;
  color: #acafc0;
  font-size: 14px;
  line-height: 20px;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    text-align: right;
  }

  .label {
    color: white;
    align-items: center;
    font-weight: 700;
  }

  .logo {
    border-radius: 50%;
    width: 31px;
    height: 31px;
    background: #4c56c0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  .percent-value {
    color: #84ce95;
    font-size: 16px;
    font-weight: 900;
  }
`
const InterestItem = (props) => {
  return (
    <InterestItemStyled>
      <div className="left">
        <div className="logo">B</div>
        <div>
          <div className="label">Bitcoin</div>
          <div className="">BTC</div>
        </div>
      </div>
      <div className="right">
        <div>per month</div>
        <div className="percent-value">+ 49.51%</div>
      </div>
    </InterestItemStyled>
  )
}

export default InterestHome
