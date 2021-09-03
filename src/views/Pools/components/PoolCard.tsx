/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
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
import { TransactionDetails } from 'state/transactions/reducer'
import { useContract, useStakingContract } from 'hooks/useContract'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import SMART_CHEF_ABI from 'config/abi/smartChef.json'

import { AutoRenewIcon } from '@luckyswap/uikit'
import { Pool } from 'config/constants/types'
import ApyButtonPool from 'views/Farms/components/FarmCard/ApyButtonPool'
import { useHookPools } from '../Store'
import CardValue from '../../Home/components/CardValue'
import UnStakeModal from './UnStakeModal'
import DepositModal from './DepositModal'

interface PoolCardProps {
  stakingData?: Pool
  pool?: Pool
  userRewardDebt?: any
  userAmount?: any
}

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

  // useEffect(() => {
  //   listenApproveEvent(() => setAmountAllowance('0'))
  // }, [listenApproveEvent])

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
        <Title>{pool.rewardTokenSymbol} <Bold> EARNED</Bold> </Title>
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
            disabled={getStatus(`${stakingData?.stakingAddress}harvest`)}
          >
            {getStatus(`${stakingData?.stakingAddress}harvest`) && spinnerIcon}
            Harvest
          </Button>
        {/* </BlockSpace> */}
      </BoxAction>
      <BoxAction>
        <Title>{pool.depositTokenSymbol}<Bold> STAKED</Bold></Title>
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
            <Button color="danger" onClick={handleApprove} isLoading={isApproving} disabled={isApproving}>
              {isApproving && spinnerIcon}
              Approve
            </Button>
          ) : (
            <Dflex>
              <Button color="danger" onClick={unStakeToggle} disabled={getStatus(`${stakingData?.stakingAddress}unstake`)}>
                {getStatus(`${stakingData?.stakingAddress}unstake`) && isUnStaking && spinnerIcon}
                UnStake
              </Button>
              <Button color="danger" onClick={depositToggle} disabled={getStatus(`${stakingData?.stakingAddress}deposit`)}>
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

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const { account, chainId } = useActiveWeb3React()
  const [userAmount, setAmount] = useState(new BigNumber(0))
  const [userRewardDebt, setUserRewardDebt] = useState(new BigNumber(0))

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
  useEffect(() => {
    const fetchStakingData = async () => {
      if (contract && account) {
        try {
          const amount: any = await contract.userInfo(account).catch((error) => {
            console.log('error userAmount')
          })
          setAmount(new BigNumber(amount.amount._hex))
          setUserRewardDebt(new BigNumber(amount.rewardDebt._hex))
        } catch (error) {
          setAmount(new BigNumber(0))
          setUserRewardDebt(new BigNumber(0))
        }
      }
    }
    fetchStakingData()
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
    console.log('-----fetchPol')
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
              <ContentLeft>Deposit Fee:</ContentLeft>
              <ContentRight>3%</ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>Harvest lock:</ContentLeft>
              <ContentRight>8 hours</ContentRight>
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
const BoxAction = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  display: grid;
  grid-gap: 7px 20px;
  text-align: center;
  grid-template-columns: repeat(6,1fr);
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
    &.content-action{
      flex-direction: unset !important;
      grid-template-columns: repeat(2,1fr);
      gap: 20px;
      button{
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

const Title = styled.div`
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  grid-column: 1 / 5;
  text-align: left;
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

const Dflex = styled.div`
  grid-gap: 20px;
  grid-column: 1 / 7;
  display: flex;
  justify-content: space-between;
  button{
    width: 100%;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default PoolCard
