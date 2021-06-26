import React, {useState} from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Row, Col } from 'antd'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BigNumber from 'bignumber.js'
import { useERC20, useStakingContract } from 'hooks/useContract'
import useGetStateData from 'hooks/useGetStakeData';
import { Pool } from 'state/types'


const pool = {
  earningToken: "0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a",  // XLUCKY 2
  stakingToken: "0xeDa153eF21dCE7BAe808B0265d86564cc26524b6",   // XLUCKY
  startBlock: 10000000,
  endBlock: 13000000,
  totalStaked: 1000000000000,
  contractAddress: 0x699fAC70A58aeD04078Acf3aE10Af95506BfC45f,
  
}

const staking = {
  depositToken: "0xeDa153eF21dCE7BAe808B0265d86564cc26524b6", // XLucky2
  rewardToken: "0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a",
  stakingContract: "0xF49987840871DC552014893C4625359FD1447D95",
  
}

function PoolCardsDetail() {
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModel] = useState(false);

  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState('');
  const stakingContract = useStakingContract(staking.stakingContract);
  const {pendingReward, userAmount, userRewardDebt} = useGetStateData(staking);

  console.log("userRewardDebt", pendingReward.toNumber());
  const handleDeposit = async () => {
    if (stakingContract) {
      const args = [new BigNumber(value).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas.deposit(...args)
      .catch(() => console.log("Fail estimate gas deposit"));
      await stakingContract
        .deposit(...args, { gasLimit: gasAm })
        .then((response: any) => {
          console.log('>>>>', response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const handleWithdraw = async () => {
    if (stakingContract) {
      const args = [new BigNumber(value).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas.deposit(...args)
      .catch(() => console.log("Fail estimate gas"));

      console.log("gas: ", gasAm);
      await stakingContract
        .withdraw(...args, { gasLimit: gasAm })
        .then((response: any) => {
          console.log('>>>>', response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  
  }

  const depositToggle = () => setDepositModal(!depositModal);
  const withdrawToggle = () => setWithdrawModel(!withdrawModal);

  return (
    <>
      <Page>
        <BoxDetail>
          <BoxHead>
            <figure>
              <img src="../images/icon-logo.png" alt=""/>
            </figure>
            <h2>Lucky Swap</h2>
            <span>Deposit LuckySwap Tokens and earn LUCKY</span>
          </BoxHead>

          <Row gutter={[24, 16]}>
            <Col span={24} sm={12} md={12}>
              <div className="box__item">
                <figure>
                  <img src="../images/icon-love.png" alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">{userRewardDebt.div(1e18).toNumber()}</h3>
                  <span className="content__des">LUCKY earned</span>
                </div>

                <div className="box__footer">
                  <Button color="danger" onClick={withdrawToggle}>Harvest</Button>
                </div>
              </div>
            </Col>

            <Col span={24} sm={12} md={12}>
              <div className="box__item">
                <figure className="background">
                  <img src="../images/icon-logo.png" alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">{userAmount.div(1e18).toNumber()}</h3>
                  <span className="content__des">LuckySwap</span>
                </div>

                <div className="box__footer">
                  <Button color="danger" onClick={depositToggle}>Deposit</Button>
                </div>
              </div>
            </Col>
          </Row>

          <p className="line__bot"><img src="../images/icon-starts.png" alt=""/>Every time you stake and unstake EL tokens, the contract will automatically harvest HCATS rewards for you!</p>
        </BoxDetail>
      </Page>

      <div>
      <Modal isOpen={depositModal} toggle={depositToggle}>
        <ModalHeader toggle={depositToggle}></ModalHeader>

        <ModalBody>
          <Title>Deposit LuckySwap Tokens</Title>
          <Available>0 Lucky Available</Available>

          <BoxInput>
            <input type="text" id="fname" name="fname" placeholder="0.000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              />
            <BoxLink>
              <span className="text-lucky">lucky</span>
              <BoxButton>
                <Button>Max</Button>
              </BoxButton>
            </BoxLink>
          </BoxInput>
        </ModalBody>

        <ModalFooter>
          <CancelButton>
          <Button color="primary" onClick={depositToggle}>Cancel</Button>
          </CancelButton>
          <Button color="secondary" onClick={handleDeposit} disabled={false}>Deposit</Button>
        </ModalFooter>
      </Modal>
      </div>
      <div>
        <Modal isOpen={withdrawModal} toggle={withdrawToggle}>
          <ModalHeader toggle={withdrawToggle}></ModalHeader>

          <ModalBody>
            <Title>Withdraw LuckySwap Tokens</Title>
            <Available>0 Lucky Available</Available>

            <BoxInput>
              <input type="text" id="fname" name="fname" placeholder="0.000"
                value={value}
               onChange={(e) => setValue(e.target.value)}/>
              <BoxLink>
                <span className="text-lucky">lucky</span>
                <BoxButton>
                  <Button>Max</Button>
                </BoxButton>
              </BoxLink>
            </BoxInput>
          </ModalBody>

          <ModalFooter>
            <CancelButton>
              <Button color="primary" onClick={withdrawToggle}>Cancel</Button>
            </CancelButton>
            <Button color="secondary" onClick={handleWithdraw} disabled={false}>Harvest</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}


const Title = styled.h5`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`

const BoxInput = styled.div`
  display: flex;
  align-items: center;
  background: #4d4d50;
  border-radius: 10px;
  height: 72px;
  padding: 0px 16px;
  margin: 16px 0px 48px;

  input {
    flex: 1 1 0%;
    width: 0px;
    background: none;
    border: 0px;
    color: #fff;
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

const CancelButton = styled.div`
  button {
    color: #2b2e2f;
    border: none;
    :hover{
      opacity: .8;
      color: #2b2e2f;
    }
  }

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
    background-color: #f5c606;
    color: #2b2e2f;
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
    color: #f5c606;
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
      background: rgb(41 41 41);
      box-shadow: 0px 0px 11px 0px rgb(29 26 26 / 57%);
      border-radius: 10px;
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
        background: #f5c606;
        border-radius: 4px;
        font-weight: 600;
        width: 100%;
        max-width: 200px;
        min-height: 40px;
        border-color: transparent;
        color: #2b2e2f;


        &:hover {
          opacity: 0.7;
        }

        &:focus {
          border-color: transparent;
          box-shadow: none;
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
