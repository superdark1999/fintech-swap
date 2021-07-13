import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { Button } from 'reactstrap';
import { AutoRenewIcon } from '@luckyswap/uikit'
import BigNumber from 'bignumber.js'

import useUtilityToken from 'hooks/useUtilityToken'

import CardValue from '../../Home/components/CardValue';


  const imageTokens = {
  'XLUCKY': '../images/coinslist/xlucky.png',
  'XLUCKY2': '../images/coinslist/lucky.png',
  'BRY': '../images/enlin.svg',
  'BUSD': './images/coinslist/busd.png'}

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

export default function PoolCardDetails({
  userRewardDebt,
  userAmount,
  onUnStakeToggle,
  onDepositToggle,
  stakingContract,
  addTransaction,
  account,
  stakingData,
  getStatus,
  isUnStaking,
  isDepositing,
  isHarvesting,
  setIsHarvesting,
}) {
  const { listenApproveEvent, approve, allowance } = useUtilityToken(stakingData.depositTokenAddress)
  const [isApproved, setIsApproved] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  const imageDepositToken = imageTokens[stakingData.depositTokenSymbol]
  const imageRewardToken = imageTokens[stakingData.rewardTokenSymbol]
  useEffect(() => {
    const fetchApproval = async () => {
      const data = await allowance(account, stakingData.stakingAddress).catch((error) =>
        console.log('allowance error: ', error),
      )
      if (data) setIsApproved(data.toString() !== '0')
    }
    if (account) {
      fetchApproval()
    }
  }, [account, allowance, stakingData.stakingAddress])

  useEffect(() => {
    listenApproveEvent(() => setIsApproved(true))
  }, [listenApproveEvent])

  const handleApprove = async () => {
    setIsApproving(true)
    await approve(stakingData.stakingAddress)
  }

  const handleHarvest = async () => {
    if (stakingContract) {
      setIsHarvesting(true)
      const args = [new BigNumber(0).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas
        .deposit(...args)
        .catch(() => console.log('Fails harvest'))
        .catch(() => console.log('Fail estimate gas'))

      stakingContract
        .deposit(...args, { gasLimit: gasAm })
        .then((response: any) => {
          addTransaction(response, {
            summary: 'Harvest successfully!',
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <Row gutter={[24, 16]}>
            <Col span={24} sm={12} md={12}>
              <BoxDetail>
              <div className="box__item">
                <figure className="background">
                  <img src={imageRewardToken} alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">
                    <CardValue
                      bold
                      color=""
                      value={userRewardDebt.div(1e18).toNumber()}
                      decimals={2}
                      fontSize="10px"
                      fontWeight="1000"
                    ></CardValue>
                  </h3>
                  <span className="content__symbol">{stakingData.rewardTokenSymbol} earned</span>
                </div>

                <div className="box__footer">
                  <Button color="danger" 
                  onClick={handleHarvest}
                  isLoading={isHarvesting}
                  disabled={(getStatus())}
                  >
                  { (getStatus() && isHarvesting) && spinnerIcon}
                    Harvest
                  </Button>
                </div>
              </div>
              </BoxDetail>
              
            </Col>

            <Col span={24} sm={12} md={12}>
              <BoxDetail>
              <div className="box__item">
                <figure className="background">
                  <img src={imageDepositToken} alt=""/>
                </figure>
                <div className="content">
                  <h3 className="content__title">
                    <CardValue
                      bold
                      color=""
                      value={userAmount.div(1e18).toNumber()}
                      decimals={2}
                      fontSize="10px"
                      fontWeight="1000"
                    ></CardValue>
                  </h3>
                  <span className="content__symbol">{stakingData.depositTokenSymbol}</span>
                </div>

                <div className="box__footer">
                  {!isApproved ? (
                    <Button color="danger" 
                      onClick={handleApprove}
                      isLoading={isApproving}
                      disabled={isApproving}
                    >
                      { isApproving && spinnerIcon}
                      Approve
                    </Button>
                  ) :
                  (
                    <div>
                      <Button color="danger" 
                        onClick={onUnStakeToggle}
                        disabled={getStatus() }
                      >
                      { (getStatus() && isUnStaking) && spinnerIcon}
                        UnStake
                      </Button>
                      <Button color="danger" 
                        onClick={onDepositToggle}
                        disabled={getStatus() }
                      >
                      { (getStatus() && isDepositing)&& spinnerIcon}
                        Deposit</Button>
                    </div>
                  )
                  }
                </div>
              </div>
              </BoxDetail>
              
            </Col>
          </Row>
    </div>
  )
}

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
          color: #f5c606 !important;
          margin-bottom: 5px;
        }
        
        &__symbol {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
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
        margin-right: 20px;
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