import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Row, Col } from 'antd'
// import { Row, Col } from 'antd'


function PoolCardsDetail() {
  return (
    <>
      <Page>
        <BoxDetail>
          <BoxHead>
            <figure>
              <img src="../images/icon-logo.png" alt=""/>
            </figure>
            <h2>Lucky Swap</h2>
            <span>Deposit LuckySwap Tokens and earn ABC</span>
          </BoxHead>

          <Row gutter={[24, 16]}>
            <Col span={24} sm={12} md={12}>
            <div className="box__item">
                <figure>
                  <img src="../images/icon-love.png" alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">0.000</h3>
                  <span className="content__des">ABC earned</span>
                </div>

                <div className="box__footer">
                  <button type="button" className="ant-btn ant-btn-primary">Harvest</button>
                </div>
              </div>
            </Col>

            <Col span={24} sm={12} md={12}>
              <div className="box__item">
                <figure className="background">
                  <img src="../images/icon-logo.png" alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">0.000</h3>
                  <span className="content__des">LuckySwap</span>
                </div>

                <div className="box__footer">
                  <button type="button" className="ant-btn ant-btn-primary">Harvest</button>
                </div>
              </div>
            </Col>
          </Row>

          <p className="line__bot"><img src="../images/icon-starts.png" alt=""/>Every time you stake and unstake EL tokens, the contract will automatically harvest ABC rewards for you!</p>
        </BoxDetail>
      </Page>
    </>
  )
}


const BoxHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 35px;

  figure {
    background: #212628;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
    width: 96px;
    height: 96px;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 76px;
    }
  }

  h2 {
    color: #01A8E1;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  span {
    color: #fff;
    font-size: 18px;
    line-height: 18px;
  }
`

const BoxDetail = styled.div`
  .box {
    &__item {
      background-color: #333442;
      border-radius: 6px;
      padding: 46px 18px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      figure {
        &.background {
          background: #212628;
          box-shadow: 0px 0px 12px rgb(0 0 0 / 50%);
          border-radius: 4px;
          padding: 16px;

          img {
            width: 70px;
          }
        }
      }

      .content {
        margin-top: 36px;
        margin-bottom: 26px;
        text-align: center;

        &__title {
          font-size: 36px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 5px;
        }

        &__des {
          font-size: 16px;
          color: #b9b9b9;
        }
      }
    }

    &__footer {
      border-top: 1px solid #D8D8D8;
      padding-top: 20px;
      width: 100%;
      text-align: center;

      button {
        background: #01A8E1;
        border-radius: 4px;
        font-weight: 600;
        width: 100%;
        max-width: 200px;
        min-height: 40px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .line__bot {
    color: #fff;
    font-size: 16px;
    margin-top: 50px;

    img {
      margin-right: 10px;
    }
  }
`



export default PoolCardsDetail
