import React, { useState, useEffect }  from 'react'
import styled from 'styled-components'
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useGetStateData from 'hooks/useGetStakeData';
import { useFarms, usePriceLuckyBusd, useLucky2Price } from 'state/hooks'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber } from 'utils/formatBalance'
import useUtilityToken from 'hooks/useUtilityToken';
import { LUCKY_PER_BLOCK  } from 'config'


// import { Row, Col } from 'antd'

const stakingData = {
  name: 'Lucky',
  depositSymbol: 'XLUCKY2',
  rewardSymbol: 'XLUCKY1',
  depositToken: "0xeDa153eF21dCE7BAe808B0265d86564cc26524b6", // XLucky2
  rewardToken: "0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a", // XLucky
  stakingContract: "0x1dde4Fc6ca8121Cb11E988b524B275855F98aAA6",
}

// {
//   sousId: 99,
//   stakingToken: tokens.bdex,
//   earningToken: tokens.bake,
//   contractAddress: {
//     97: '0xa5bd720d5115Dc14E9a04C8349F316252A69F987',
//     56: '0x40918EF8efFF4aA061656013a81E0e5A8A702eA7',
//   },
//   poolCategory: PoolCategory.CORE,
//   harvest: true,
//   sortOrder: 999,
//   tokenPerBlock: '0.005',
// }

function PoolCards() {
  const [activeTab, setActiveTab] = useState('1');
  const [apy, setApy] = useState('');
  const [totalStaked, setTotalStaked] = useState(0);

  const { userAmount, userRewardDebt} = useGetStateData(stakingData);

  const {balanceOf, approve, allowance} =  useUtilityToken(stakingData.depositToken);

  const rewardTokenPrice = usePriceLuckyBusd()
  const stakingTokenPrice = useLucky2Price()


  useEffect(() => { 
  const fetchTotalStaked = async () => {
  if (balanceOf){
    const result =  await balanceOf(stakingData.stakingContract);
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
  },[balanceOf, stakingTokenPrice,rewardTokenPrice,])

  // console.log("reward", rewardTokenPrice, stakingTokenPrice)
  

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Hot
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Earn
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Staking
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >
              Others
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => { toggle('5'); }}
            >
              Earn NFT
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => { toggle('6'); }}
            >
              NFT Staking
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '7' })}
              onClick={() => { toggle('7'); }}
            >
              Ended
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">    
          <PoolCard>
            <Row xs="1" sm="2" md="4">
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
                      <ContentRight>{totalStaked} {stakingData.depositSymbol}</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>{userRewardDebt.div(1e18).toFixed(2)} {stakingData.rewardSymbol}</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>APR:</ContentLeft>
                      <ContentRight>{apy}%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Join</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

              <Col>
                <BoxPool>

                  <figure>
                    <img src="../images/hcats.png" alt=""/>
                  </figure>

                  <CardContent>
                    <Title>HCATS</Title>

                    <FlexSpace>
                      <ContentLeft>Deposit:</ContentLeft>
                      <ContentRight>LUCKY</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>HCATS</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>APR:</ContentLeft>
                      <ContentRight>0%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Join</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

              {/* <Col>
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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>

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
                      <ContentRight>LuckySwap</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>Earn:</ContentLeft>
                      <ContentRight>TLM</ContentRight>
                    </FlexSpace>

                    <FlexSpace>
                      <ContentLeft>ROI:</ContentLeft>
                      <ContentRight>2.38%</ContentRight>
                    </FlexSpace>
                  </CardContent>

                  <Boxbtn>
                    <Button color="primary">
                      <Link to="/PoolCardsDetail">Select</Link>
                    </Button>
                  </Boxbtn>
                </BoxPool>
              </Col>
            */}
            </Row>
          </PoolCard>
          </TabPane>

          {/* <TabPane tabId="2">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>
        
          <TabPane tabId="3">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>

          <TabPane tabId="4">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>
        
          <TabPane tabId="5">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">
                        <Link to="/PoolCardsDetail">Select</Link>
                      </Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>
        
          <TabPane tabId="6">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>
        
          <TabPane tabId="7">
            <PoolCard>
              <Row xs="1" sm="2" md="4">
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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>

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
                        <ContentRight>LuckySwap</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>Earn:</ContentLeft>
                        <ContentRight>TLM</ContentRight>
                      </FlexSpace>

                      <FlexSpace>
                        <ContentLeft>ROI:</ContentLeft>
                        <ContentRight>2.38%</ContentRight>
                      </FlexSpace>
                    </CardContent>

                    <Boxbtn>
                      <Button color="primary">Select</Button>
                    </Boxbtn>
                  </BoxPool>
                </Col>
              </Row>
            </PoolCard>
          </TabPane>
         */}
        </TabContent>
    </div>
  </>
  )
}


const PoolCard = styled.div``

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

export default PoolCards
