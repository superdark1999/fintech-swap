import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Button } from 'reactstrap'
import BigNumber from 'bignumber.js'

import useUtilityToken from 'hooks/useUtilityToken'

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
          <div className="box__item">
            <figure>
              <img src="../images/icon-love.png" alt="" />
            </figure>

            <div className="content">
              <h3 className="content__title">{userRewardDebt.div(1e18).toNumber()}</h3>
              <span className="content__des">LUCKY earned</span>
            </div>

            <div className="box__footer">
              <Button
                color="danger"
                onClick={handleHarvest}
                isLoading={isHarvesting}
                disabled={getStatus() && isHarvesting}
              >
                {getStatus() && isHarvesting && spinnerIcon}
                Harvest
              </Button>
            </div>
          </div>
        </Col>

        <Col span={24} sm={12} md={12}>
          <div className="box__item">
            <figure className="background">
              <img src="../images/icon-logo.png" alt="" />
            </figure>

            <div className="content">
              <h3 className="content__title">{userAmount.div(1e18).toNumber()}</h3>
              <span className="content__des">LuckySwap</span>
            </div>

            <div className="box__footer">
              {!isApproved ? (
                <Button color="danger" onClick={handleApprove} isLoading={isApproving} disabled={isApproving}>
                  {isApproving && spinnerIcon}
                  Approve
                </Button>
              ) : (
                <div>
                  <Button color="danger" onClick={onUnStakeToggle} disabled={getStatus() && isUnStaking}>
                    {getStatus() && isUnStaking && spinnerIcon}
                    UnStake
                  </Button>
                  <Button color="danger" onClick={onDepositToggle} disabled={getStatus() && isDepositing}>
                    {getStatus() && isDepositing && spinnerIcon}
                    Deposit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
