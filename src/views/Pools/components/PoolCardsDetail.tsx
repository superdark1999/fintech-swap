import React, {useState} from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Row, Col } from 'antd'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Row, Col } from 'antd'


function PoolCardsDetail(this: any) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
                  <Button color="danger" onClick={toggle}>Harvest</Button>
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
                  <Button color="danger" onClick={toggle}>Harvest</Button>
                </div>
              </div>
            </Col>
          </Row>

          <p className="line__bot"><img src="../images/icon-starts.png" alt=""/>Every time you stake and unstake EL tokens, the contract will automatically harvest ABC rewards for you!</p>
        </BoxDetail>
      </Page>

      <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>

        <ModalBody>
          <Title>Deposit LuckySwap Tokens</Title>
          <Available>0 Lucky Available</Available>

          <BoxInput>
            <input type="text" id="fname" name="fname" placeholder="0.000"/>
            <BoxLink>
              <span className="text-lucky">lucky</span>
              <BoxButton>
                <Button>Max</Button>
              </BoxButton>
            </BoxLink>
          </BoxInput>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggle}>Cancel</Button>
          <Button color="secondary" onClick={toggle} disabled>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
    </>
  )
}


const Title = styled.h5`
  color: #01A8E1;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`

const BoxInput = styled.div`
  display: flex;
  align-items: center;
  background: #22232E;
  border-radius: 10px;
  height: 72px;
  padding: 0px 16px;
  margin: 16px 0px 48px;

  input {
    flex: 1 1 0%;
    width: 0px;
    background: none;
    border: 0px;
    color: rgb(114, 47, 13);
    font-size: 18px;
    height: 56px;
    margin: 0px;
    padding: 0px;
    outline: none;
  }
`

const BoxLink = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`

const BoxButton = styled.div`
  margin-left: 12px;

  button {
    width: 100%;
    font-weight: 500;
    text-align: center;
    border-radius: 10px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    background-color: #01A8E1;
    color: rgb(255, 253, 250);
    font-family: "Baloo Da";
    padding: 0px 10px;
    height: 40px;
  }
`

const Available = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`

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
