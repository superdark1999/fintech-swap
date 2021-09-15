import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon } from '@luckyswap/uikit'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import { useContract, useStakingContract } from 'hooks/useContract'
import useUtilityToken from 'hooks/useUtilityToken'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import SMART_CHEF_ABI from 'config/abi/smartChef.json'

import CardValue from '../../Home/components/CardValue'
import UnStakeModal from './UnStakeModal'
import DepositModal from './DepositModal'

const areEqual = (prevProps, nextProps): any => {
  // return JSON.stringify(prevProps.sortedRecentTransactions.length === nextProps.sortedRecentTransactions.length)
}

const BlockAction = React.memo(({ sortedRecentTransactions, userRewardDebt, userAmount, stakingData, pool }: any) => {
  // console.log('sortedRecentTransactions', sortedRecentTransactions)

  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModel] = useState(false)
  const [isUnStaking, setIsUnStaking] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const { account } = useWeb3React()

  const stakingContract = useStakingContract(stakingData?.stakingAddress)

  const addTransaction = useTransactionAdder()
  const contract = useContract(stakingData?.stakingAddress, SMART_CHEF_ABI)

  useEffect(() => {
    if (contract) {
      contract.on('Withdraw', () => {
        setIsUnStaking(false)
      })
      contract.on('Deposit', () => {
        if (isDepositing) setIsDepositing(false)
        else setIsHarvesting(false)
      })
    }
  }, [contract, isDepositing])

  const depositToggle = () => setDepositModal(!depositModal)
  const unStakeToggle = () => setWithdrawModel(!withdrawModal)
  const getStatus = (str) => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash && tx.attr1 === str)

    return pending.find((x) => x)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

  const { listenApproveEvent, approve, allowance } = useUtilityToken(stakingData.depositTokenAddress)
  const [amountAllowance, setAmountAllowance] = useState('0')
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    const fetchApproval = async () => {
      const data = await allowance(account, stakingData.stakingAddress).catch((error) =>
        console.log('allowance error: ', error),
      )
      setAmountAllowance(data)
    }
    if (account && stakingData.stakingAddress) {
      fetchApproval()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, stakingData.stakingAddress])

  useEffect(() => {
    listenApproveEvent(() => setAmountAllowance('1'))
  }, [listenApproveEvent])

  const handleApprove = async () => {
    setIsApproving(true)
    await approve(stakingData.stakingAddress)
  }

  const handleHarvest = async (type) => {
    if (stakingContract) {
      setIsHarvesting(true)
      const args = [new BigNumber(0).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas
        .deposit(...args)
        .catch(() => console.log('Fails harvest'))
        .catch(() => console.log('Fail estimate gas'))
      const tx = await stakingContract
        .deposit(...args, { gasLimit: gasAm })
        .then((response: any) => {
          addTransaction(response, {
            summary: 'Harvest successfully!',
            attr1: `${stakingData.stakingAddress}${type}`,
          })
        })
        .catch((error: any) => {
          setIsHarvesting(false)
          console.log(error)
        })
      if (!tx) setIsHarvesting(false)
    }
  }

  return (
    <>
      <BoxAction>
        <Title>
          {pool.rewardTokenSymbol} <Bold> EARNED</Bold>{' '}
        </Title>
        {/* <BlockSpace className="content-action"> */}
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

        <Button
          onClick={() => handleHarvest('harvest')}
          isLoading={() => getStatus(`${stakingData?.stakingAddress}harvest`)}
          disabled={!account || getStatus(`${stakingData?.stakingAddress}harvest`)}
        >
          {getStatus(`${stakingData?.stakingAddress}harvest`) && spinnerIcon}
          Harvest
        </Button>
        {/* </BlockSpace> */}
      </BoxAction>
      <BoxAction>
        <Title>
          {pool.depositTokenSymbol}
          <Bold> STAKED</Bold>
        </Title>
        {/* <BlockSpace> */}
        <h3 className="content__title">
          <CardValue
            bold
            color="#fff"
            value={userAmount.div(1e18).toNumber()}
            decimals={2}
            fontSize="10px"
            fontWeight="1000"
          ></CardValue>
        </h3>
        {amountAllowance.toString() === '0' ? (
          <Button color="danger" onClick={handleApprove} isLoading={isApproving} disabled={!account || isApproving}>
            {isApproving && spinnerIcon}
            Approve
          </Button>
        ) : (
          <Dflex>
            <Button
              color="danger"
              onClick={unStakeToggle}
              disabled={!account || getStatus(`${stakingData?.stakingAddress}unstake`)}
            >
              {getStatus(`${stakingData?.stakingAddress}unstake`) && isUnStaking && spinnerIcon}
              UnStake
            </Button>
            <Button
              color="danger"
              onClick={depositToggle}
              disabled={!account || getStatus(`${stakingData?.stakingAddress}deposit`)}
            >
              {getStatus(`${stakingData?.stakingAddress}deposit`) && isDepositing && spinnerIcon}
              Deposit
            </Button>
          </Dflex>
        )}
        {/* </BlockSpace> */}

        <DepositModal
          depositModal={depositModal}
          depositToggle={depositToggle}
          depositSymbol={stakingData.depositTokenSymbol}
          stakingContract={stakingContract}
          addTransaction={addTransaction}
          account={account}
          stakingData={stakingData}
          setIsDepositing={setIsDepositing}
        />

        <UnStakeModal
          withdrawModal={withdrawModal}
          unStakeToggle={unStakeToggle}
          stakingContract={stakingContract}
          addTransaction={addTransaction}
          userAmount={userAmount}
          setIsUnStaking={setIsUnStaking}
          stakingData={stakingData}
          rewardTokenSymbol={stakingData.rewardTokenSymbol}
        />
      </BoxAction>
    </>
  )
}, areEqual)

const BoxAction = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  display: grid;
  grid-gap: 7px 20px;
  text-align: center;
  grid-template-columns: repeat(6, 1fr);
  .content__title {
    font-size: 19px;
    font-weight: 600;
    color: #fff;
    grid-column: 5/ 7;
  }
  button {
    grid-column: 1 / 7;
    background: #f5c606;
    border-color: transparent;
    color: #2b2e2f;
    margin-top: 10px;

    &:hover {
      background: #f5c606 !important;
      border-color: transparent;
      opacity: 0.7;
    }
  }
`

const BlockSpace = styled.div`
  display: grid;
  flex-direction: column;
  font-size: 24px;
  color: white;
  text-align: center;
  &.content-action {
    flex-direction: unset !important;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    button {
      margin: 0;
    }
  }

  button {
    background: #f5c606;
    border-color: transparent;
    color: #2b2e2f;
    margin-top: 10px;

    &:hover {
      background: #f5c606 !important;
      border-color: transparent;
      opacity: 0.7;
    }
  }
`
const BoxValue = styled.div`
  display: block;
  margin: auto;
`
const Bold = styled.span`
  font-weight: 800;
  color: #dd5555;
`
const HeadLine = styled.div`
  background: linear-gradient(90deg, rgba(239, 186, 12, 1) 0%, rgba(251, 219, 59, 1) 100%);
  width: 100%;
  padding: 10px 0;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  color: #212529;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
`

const Title = styled.div`
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  grid-column: 1 / 5;
  text-align: left;
`
const Dflex = styled.div`
  grid-gap: 20px;
  grid-column: 1 / 7;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default BlockAction
