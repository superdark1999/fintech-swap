import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import classnames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useGetStateData from 'hooks/useGetStakeData'
import { useFarms, usePriceLuckyBusd, useLucky2Price } from 'state/hooks'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
import useUtilityToken from 'hooks/useUtilityToken'
import { LUCKY_PER_BLOCK, BASE_API_ADMIN } from 'config'
import { useActiveWeb3React } from 'hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useContract,  useStakingContract  } from 'hooks/useContract'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import SMART_CHEF_ABI from 'config/abi/smartChef.json'

import { AutoRenewIcon } from '@luckyswap/uikit'
import { Pool } from 'config/constants/types'
import { useHookPools } from '../Store';
import CardValue from '../../Home/components/CardValue'

interface PoolCardProps {
  pool: Pool
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  const [apy, setApy] = useState('0')
  const [totalStaked, setTotalStaked] = useState(0)

  // const { userRewardDebt } = useGetStateData(pool)

  const { balanceOf } = useUtilityToken(pool.depositTokenAddress)

  const rewardTokenPrice = usePriceLuckyBusd()
  const stakingTokenPrice = useLucky2Price()

  //-------
  const [state, actions] = useHookPools()
  // const [stakingData, setStakingData] = useState(pool)
  const { poolDetail } = state
  useEffect(() => {
    const fetchPool = () => {
      actions.getPoolDetail(pool._id).then(() => console.log("get pool Detail"))
    }

    fetchPool()
  }, [actions, pool._id])
  
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
  function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
    return b.addedTime - a.addedTime
  }

  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModel] = useState(false)
  const [isUnStaking, setIsUnStaking] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const { account } = useWeb3React()

  const stakingContract = useStakingContract(poolDetail?.stakingAddress)
  const { userAmount, userRewardDebt } = useGetStateData(poolDetail)

  const addTransaction = useTransactionAdder()
  const contract = useContract(poolDetail?.stakingAddress, SMART_CHEF_ABI)

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

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const getStatus = useCallback(() => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length
  }, [sortedRecentTransactions])

  // Pool Detail(s)
  const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

  const { listenApproveEvent, approve, allowance } = useUtilityToken(poolDetail.depositTokenAddress)
  const [isApproved, setIsApproved] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    const fetchApproval = async () => {
      const data = await allowance(account, poolDetail.stakingAddress).catch((error) =>
        console.log('allowance error: ', error),
      )
      if (data) setIsApproved(data.toString() !== '0')
    }
    if (account) {
      fetchApproval()
    }
  }, [account, allowance, poolDetail.stakingAddress])

  useEffect(() => {
    listenApproveEvent(() => setIsApproved(true))
  }, [listenApproveEvent])

  const handleApprove = async () => {
    setIsApproving(true)
    await approve(poolDetail.stakingAddress)
  }

  const handleHarvest = async () => {
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
    <div>
      <Col>
        <BoxPool>
          {pool.isPremium && (
            <HeadLine>
              <span>Premium</span>
            </HeadLine>
          )}

          <CardContent>
            <FlexSpace>
              <ContentLeft>
                <figure>
                  <img src={BASE_API_ADMIN.concat('/') + pool.logo} alt="" />
                </figure>
              </ContentLeft>
              <ContentRight className="name_pool">{pool.name}</ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>Deposit:</ContentLeft>
              <ContentRight>
                {/* <CardValue
                bold
                color=""
                value={totalStaked}
                decimals={0}
                fontSize="60px"
                text={pool.depositTokenSymbol}
                fontWeight="600"
              ></CardValue> */}
                {pool.depositTokenSymbol}
              </ContentRight>
            </FlexSpace>
            <FlexSpace>
              <ContentLeft>APR:</ContentLeft>
              <ContentRight>
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
          <BoxAction>
            <Title>{pool.rewardTokenSymbol} Earned</Title>
            <FlexSpace>
              <CardValue
                bold
                color=""
                value={userRewardDebt.div(1e18).toNumber()}
                decimals={2}
                fontSize="10px"
                fontWeight="1000"
              ></CardValue>
              <Button
                color="danger"
                onClick={handleHarvest}
                isLoading={isHarvesting}
                disabled={getStatus() || isHarvesting}
              >
                {getStatus() && isHarvesting && spinnerIcon}
                Harvest
              </Button>
            </FlexSpace>
          </BoxAction>
          <BoxAction>
            <Title>{pool.rewardTokenSymbol} STAKED</Title>
            <CardValue
              bold
              color=""
              value={userAmount.div(1e18).toNumber()}
              decimals={2}
              fontSize="10px"
              fontWeight="1000"
            ></CardValue>
            {!isApproved ? (
              <Button color="danger" onClick={handleApprove} isLoading={isApproving} disabled={isApproving}>
                {isApproving && spinnerIcon}
                Approve
              </Button>
            ) : (
              <div>
                <Button color="danger" onClick={unStakeToggle} disabled={getStatus()}>
                  {getStatus() && isUnStaking && spinnerIcon}
                  UnStake
                </Button>
                <Button color="danger" onClick={depositToggle} disabled={getStatus()}>
                  {getStatus() && isDepositing && spinnerIcon}
                  Deposit
                </Button>
              </div>
            )}
          </BoxAction>

          <BoxLink>
            <Link to={`/PoolCardsDetail/${pool._id}`}>Join</Link>
          </BoxLink>
        </BoxPool>
      </Col>
    </div>
  )
}
const BoxAction = styled.div`
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
  margin-top: 40px;
  margin-bottom: 20px;
`

const Title = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 12px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
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
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  &.name_pool {
    margin: auto 0;
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
