/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'
import classnames from 'classnames'
import { Link, useParams, Redirect } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useGetStateData from 'hooks/useGetStakeData'

import { useFarms, usePriceLuckyBusd, useLucky2Price } from 'state/hooks'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
import useUtilityToken from 'hooks/useUtilityToken'
import { LUCKY_PER_BLOCK, BASE_API_ADMIN } from 'config'
import { useActiveWeb3React } from 'hooks'
import { useCurrentTime } from 'hooks/useTimer'
import { TransactionDetails } from 'state/transactions/reducer'
import { useContract, useStakingContract } from 'hooks/useContract'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'

import { Pool } from 'config/constants/types'
import ApyButtonPool from 'views/Farms/components/FarmCard/ApyButtonPool'
import { useHookPools } from '../Store'
import CardValue from '../../Home/components/CardValue'
import BlockAction from './BlockAction'

interface PoolCardProps {
  stakingData?: Pool
  pool?: Pool
  userRewardDebt?: any
  userAmount?: any
}
const getTimeRemain = (endTime: Date) => {
  const now = new Date()
  if (now.getTime() > endTime.getTime()) {
    endTime.setDate(endTime.getDate() + 1)
  }
  const remain = (endTime.getTime() - now.getTime()) / 1000
  const hh = pad(Math.floor((remain / 60 / 60) % 60))
  const mm = pad(Math.floor((remain / 60) % 60))
  const ss = pad(Math.floor(remain % 60))

  return `${hh}h: ${mm}m: ${ss}s`
}

function pad(num) {
  return '0'.concat(num.toString()).substr(-2)
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { account, chainId } = useActiveWeb3React()
  const [userAmount, setAmount] = useState(new BigNumber(0))
  const [userRewardDebt, setUserRewardDebt] = useState(new BigNumber(0))
  const [unStakingFee, setUnStakingFee] = useState('0')
  const [remainBlockTime, setRemainBlockTime] = useState('')

  const [apy, setApy] = useState('0')
  const [totalStaked, setTotalStaked] = useState(0)
  const { balanceOf } = useUtilityToken(pool.depositTokenAddress)
  const rewardTokenPrice = usePriceLuckyBusd()
  const stakingTokenPrice = useLucky2Price()
  const contract = useStakingContract(pool.stakingAddress)

  const allTransactions = useAllTransactions()
  function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
    return b.addedTime - a.addedTime
  }
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const currentMillis = useCurrentTime()

  useEffect(() => {
    const fetchStakingData = async () => {
      if (contract && account) {
        try {
          const userInfo: any = await contract.userInfo(account).catch((error) => {
            console.log('error userAmount')
          })
          const fee = await contract.feeWithdrawInBlockTokenTime().catch((error) => console.log('error get fee', error))
          const percentFee = fee.toNumber() / 100

          setUnStakingFee(percentFee.toString())
          setAmount(new BigNumber(userInfo.amount._hex))
          setUserRewardDebt(new BigNumber(userInfo.rewardDebt._hex))
        } catch (error) {
          setAmount(new BigNumber(0))
          setUserRewardDebt(new BigNumber(0))
        }
      }
    }
    fetchStakingData()
  }, [account, contract, !!pending.length])

  useEffect(() => {
    let idInterval
    const timeRemain = (endTime) => {
      const endDate = new Date(endTime)
      setRemainBlockTime(getTimeRemain(endDate))
    }

    const fetchStakingData = async () => {
      if (contract && account) {
        try {
          const userInfo: any = await contract.userInfo(account).catch((error) => {
            console.log('error userAmount')
          })

          const endTime = userInfo.withdrawTime.toNumber() * 1000
          const now = new Date()
          if (now.getTime() > endTime) setRemainBlockTime('0s')
          else idInterval = setInterval(() => timeRemain(endTime), 1000)
        } catch (error) {
          console.log('error fetchStakingData', error)
        }
      }
    }
    fetchStakingData()

    return () => clearInterval(idInterval)
  }, [account, contract, !!pending.length])

  useEffect(() => {
    const fetchTotalStaked = async () => {
      if (balanceOf) {
        const result = await balanceOf(pool.stakingAddress)
        const balance = new BigNumber((result && result._hex) || 0).div(1e18).toNumber()
        setTotalStaked(balance)

        const apyValue = getPoolApy(
          stakingTokenPrice.toNumber(),
          rewardTokenPrice.toNumber(),
          balance,
          LUCKY_PER_BLOCK.toNumber(),
        )
        if (apyValue) setApy(parseFloat(apyValue.toString()).toFixed(2))
      }
    }
    fetchTotalStaked()
  }, [balanceOf, stakingTokenPrice, rewardTokenPrice, pool.stakingAddress])

  // --------------

  // Pool Detail
  const [state, actions] = useHookPools()
  const [isLoading, setIsLoading] = useState(true)
  const { poolDetail } = state
  useEffect(() => {
    // console.log('-----fetchPol')
    const fetchPool = () => {
      actions.getPoolDetail(pool._id).then(() => setIsLoading(false))
    }

    fetchPool()
  }, [actions, pool._id])
  // APR
  // const farmsLP = useFarms()
  return (
    <div>
      <Col>
        <BoxPool>
          {/* {pool.isPremium && (
            <HeadLine>
              <span>Premium</span>
            </HeadLine>
          )} */}
          <CardContent>
            <FlexSpace>
              <ContentLeft>
                <figure>
                  <img src={BASE_API_ADMIN.concat('/') + pool.logo} alt="" />
                </figure>
              </ContentLeft>
              <ContentRight className="block">
                <h2 className="name_pool">{pool.name}</h2>
                <BotRight>
                  <NoFee>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 12L20.56 9.21L20.9 5.52L17.29 4.7L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 12L3.44 14.79L3.1 18.49L6.71 19.31L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 12ZM9.38 16.01L7 13.61C6.61 13.22 6.61 12.59 7 12.2L7.07 12.13C7.46 11.74 8.1 11.74 8.49 12.13L10.1 13.75L15.25 8.59C15.64 8.2 16.28 8.2 16.67 8.59L16.74 8.66C17.13 9.05 17.13 9.68 16.74 10.07L10.82 16.01C10.41 16.4 9.78 16.4 9.38 16.01Z"></path>
                    </svg>
                    No Fees
                  </NoFee>
                  <Factor>2X</Factor>
                </BotRight>
              </ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>Deposit:</ContentLeft>
              <ContentRight>{pool.depositTokenSymbol}</ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>APR:</ContentLeft>
              <ContentRight>
                <ApyButtonPool cakePrice={rewardTokenPrice} apy={parseFloat(apy)} />
                <CardValue
                  bold
                  color=""
                  value={parseFloat(apy)}
                  decimals={2}
                  fontSize="60px"
                  text="%"
                  fontWeight="600"
                ></CardValue>
              </ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft> UnStaking Fee:</ContentLeft>
              <ContentRight>{unStakingFee}%</ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>Rewards end in:</ContentLeft>
              <ContentRight>{remainBlockTime}</ContentRight>
            </FlexSpace>
          </CardContent>
          {/* {poolDetail &&<BlockAction stakingData={poolDetail} pool={pool}/>}   */}
          {poolDetail && !isLoading && !pool.inactive ? (
            chainId !== poolDetail.chainId ? (
              <Redirect to="/" />
            ) : (
              <BlockAction
                sortedRecentTransactions={sortedRecentTransactions}
                userAmount={userAmount}
                userRewardDebt={userRewardDebt}
                stakingData={pool}
                pool={pool}
              />
            )
          ) : (
            <div></div>
          )}
        </BoxPool>
      </Col>
    </div>
  )
}
const Factor = styled.div`
  align-items: center;
  background-color: rgb(221, 85, 85);
  border: 2px solid rgb(221, 85, 85);
  border-radius: 16px;
  color: rgb(255, 255, 255);
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;
  height: 28px;
  line-height: 1.5;
  padding: 0px 8px;
  white-space: nowrap;
`
const BotRight = styled.div`
  display: flex;
  justify-content: center;
`
const NoFee = styled.div`
  align-items: center;
  background-color: transparent;
  border: 2px solid rgb(106, 210, 168);
  border-radius: 16px;
  color: rgb(106, 210, 168);
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;
  height: 28px;
  line-height: 1.5;
  padding: 0px 8px;
  white-space: nowrap;
  margin-right: 10px;
  svg {
    margin-right: 2px;
    fill: #6ad2a8;
  }
`

const BoxPool = styled.div`
  background: rgb(41 41 41);
  border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 11px 0px rgb(29 26 26 / 57%);
  border-radius: 20px;
  padding: 24px 15px 15px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  figure {
    border-radius: 4px;
    width: 78px;
    height: 78px;
    display: flex;
    // margin: 28px auto 0 auto;
    // padding: 10px;
  }
`

const CardContent = styled.div`
  // margin-top: 40px;
  margin-bottom: 30px;
`

const FlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const ContentLeft = styled.div`
  color: #979797;
  text-align: left;
`

const ContentRight = styled.div`
  display: flex;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: right;

  .name_pool {
    margin-bottom: 20px;
    font-size: 20px;
    color: #da982d;
    text-transform: uppercase;
  }

  button {
    height: 16px;
    margin-top: -1px;
  }

  &.block {
    display: block;
  }
`

const Boxbtn = styled.div`
  text-align: center;
  border-top: 1px solid #d8d8d8;
  padding-top: 15px;

  button {
    background: #f5c606;
    font-weight: 600;
    border-color: transparent;
    color: #2b2e2f;

    &:hover {
      background-color: #40a9ff;
      transition: 0.5s;
    }

    a {
      &:hover {
        color: rgb(255, 253, 250);
      }
    }
  }
`

const BoxLink = styled.div`
  display: flex;
  justify-content: center;
  color: #2b2e2f;

  a {
    display: block;
    width: 232px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
    color: #2b2e2f;
    text-align: center;
    background: #f5c606;
    border-radius: 10px;
    text-decoration: none;

    &:hover {
      transition: 0.5s;
      color: #2b2e2f;
      background: #f5c606;
      opacity: 0.8;
    }
  }
`

export default PoolCard
