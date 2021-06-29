import React, {useState, useEffect}from 'react'
import { Row, Col } from 'antd'
import { Button } from 'reactstrap';
import BigNumber from 'bignumber.js'

import bep20Abi from 'config/abi/erc20.json'
import useUtilityToken from 'hooks/useUtilityToken';
import { useContract } from 'hooks/useContract'
import { AutoRenewIcon } from '@luckyswap/uikit'


const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

export default function PoolCardDetails({
  userRewardDebt, 
  userAmount, 
  onUnStakeToggle,
  onDepositToggle,
  stakingContract,
  addTransaction,
  account,
  stakingData
}) {

  const {listenApproveEvent, approve, allowance} =  useUtilityToken(stakingData.depositToken);
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const fetchApproval = async() => {
      const data = await allowance(account, stakingData.stakingContract);
      setIsApproved(data.toString() !== '0')
    }
    if (account) {
      fetchApproval();
    }
  },[account, allowance, stakingData.stakingContract])

  useEffect(() => {
    listenApproveEvent(() => setIsApproved(true))
  })

  const handleApprove = async () => {
    setIsApproving(true);
    await approve(stakingData.stakingContract);
  }

  const handleWithdraw = async () => {
    if (stakingContract) {
      const args = [new BigNumber(0).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas.deposit(...args)
      .catch(() => console.log("Fail estimate gas"));

      await stakingContract
        .deposit(...args, { gasLimit: gasAm })
        .then((response: any) => {
          addTransaction(response, {
            summary: 'Withdraw successfully!',
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
              <div className="box__item">
                <figure>
                  <img src="../images/icon-love.png" alt=""/>
                </figure>

                <div className="content">
                  <h3 className="content__title">{userRewardDebt.div(1e18).toNumber()}</h3>
                  <span className="content__des">LUCKY earned</span>
                </div>

                <div className="box__footer">
                  <Button color="danger" onClick={handleWithdraw}>Harvest</Button>
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
                      <Button color="danger" onClick={onUnStakeToggle}>UnStake</Button>
                      <Button color="danger" onClick={onDepositToggle}>Deposit</Button>
                    </div>
                  )
                  }
                </div>
              </div>
            </Col>
          </Row>
    </div>
  )
}
