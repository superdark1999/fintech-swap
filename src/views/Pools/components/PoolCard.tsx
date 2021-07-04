import React, {useEffect, useState} from 'react'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components'
import classnames from 'classnames';
import { Link, useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useGetStateData from 'hooks/useGetStakeData';
import { useFarms, usePriceLuckyBusd, useLucky2Price } from 'state/hooks'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
import useUtilityToken from 'hooks/useUtilityToken';
import { LUCKY_PER_BLOCK  } from 'config'
import {Pool} from 'config/constants/types'

interface HarvestProps{
  pool: Pool
}

const PoolCard : React.FC<HarvestProps> = ({ pool })  => {

  const [apy, setApy] = useState('');
  const [totalStaked, setTotalStaked] = useState(0);

  const {  userRewardDebt} = useGetStateData(pool);

  const {balanceOf} =  useUtilityToken(pool.depositTokenAddress);

  const rewardTokenPrice = usePriceLuckyBusd()
  const stakingTokenPrice = useLucky2Price()


  useEffect(() => { 
  const fetchTotalStaked = async () => {
  if (balanceOf){
    const result =  await balanceOf(pool.stakingAddress);
    const balance = new BigNumber(result._hex).div(1e18).toNumber();
    setTotalStaked(balance)

    const apyValue = getPoolApy(
      stakingTokenPrice.toNumber(),
      rewardTokenPrice.toNumber(),
      balance,
      LUCKY_PER_BLOCK.toNumber(),
    )
    if (apyValue)
      setApy(parseFloat(apyValue.toString()).toFixed(2));
    }

  }
    fetchTotalStaked();
  },[balanceOf, stakingTokenPrice,rewardTokenPrice, pool.stakingAddress])


  return (
    <div>
    <Col>
        <BoxPool>
          <HeadLine>
            <span>Premium</span>
          </HeadLine>
          <figure>
            <img src="../images/logo-icon.png" alt=""/>
          </figure>

          <CardContent>
            <Title>LuckySwap</Title>

            <FlexSpace>
              <ContentLeft>Deposit:</ContentLeft>
              <ContentRight>{totalStaked} {pool.depositTokenSymbol}</ContentRight>
            </FlexSpace>

            <FlexSpace>
              <ContentLeft>Earn:</ContentLeft>
              <ContentRight>{userRewardDebt.div(1e18).toFixed(2)} {pool.rewardTokenSymbol}</ContentRight>
            </FlexSpace>

            <FlexSpace>
              <ContentLeft>APR:</ContentLeft>
              <ContentRight>{apy}%</ContentRight>
            </FlexSpace>
          </CardContent>

          <Boxbtn>
            <Button color="primary">
              <Link to={`/PoolCardsDetail/${pool._id}`}>Join</Link>
            </Button>
          </Boxbtn>
        </BoxPool>
      </Col>
    </div>
  )
}



const HeadLine = styled.div`
  background: linear-gradient(90deg, rgba(239,186,12,1) 0%, rgba(251,219,59,1) 100%);
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
    margin: 28px auto 0 auto;
    padding: 10px;
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
`

const Boxbtn = styled.div`
  text-align: center;
  border-top: 1px solid #D8D8D8;
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


export default PoolCard;