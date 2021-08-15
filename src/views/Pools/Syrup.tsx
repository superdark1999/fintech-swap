import { ChainId } from '@luckyswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { useBlock } from 'state/hooks'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/index'
import NavBar from './components/NavBar'
import PoolCards from './components/PoolCards'
import { useHookPools } from './Store'

const Farm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1')
  let { chainId } = useActiveWeb3React()

  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  // const pools = usePools(account)
  const { currentBlock } = useBlock()
  const [state, actions] = useHookPools()
  let { pools } = state

  chainId = chainId || 56

  pools = pools.filter(p => p.chainId === chainId);

  pools.sort((a, b) => (!a.isPremium && b.isPremium)? 1 : -1)

  useEffect(() => {
    const fetchPools = () => {
      actions.getPools()
    }

    fetchPools()
  }, [chainId, actions])

  if (chainId && chainId !== ChainId.BSCTESTNET && chainId !== ChainId.MAINNET && chainId !== ChainId.MATIC && chainId !== ChainId.MATIC_TESTNET) {
    return <Redirect to="/" />
  }

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  // const [stakedOnly, setStakedOnly] = useState(false)

  // const [finishedPools, openPools] = useMemo(
  //   () => partition(pools, (pool) => pool.isFinished || currentBlock > pool.endBlock),
  //   [currentBlock, pools],
  // )
  // const stakedOnlyPools = useMemo(
  //   () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
  //   [openPools],
  // )

  return (
    <Page>
      {/* <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px" color="#2b2c3a">
            {TranslateString(738, 'Syrup Pool')}
          </Heading>
          <ul className="list">
            <li color="#fda558">{TranslateString(580, 'Stake BDEX to earn new tokens.')}</li>
            <li color="#fda558">{TranslateString(486, 'You can unstake at any time.')}</li>
            <li color="#fda558">{TranslateString(406, 'Rewards are calculated per block.')}</li>
          </ul>
        </div>
        <img src="/images/syrup.png" alt="SYRUP POOL icon" width={410} height={191} />
      </Hero> */}
      {/* <PoolTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} /> */}
      {/* <Divider /> */}
      <NavBar activeTab={activeTab} toggle={toggle} />
      <PoolCards pools={pools} activeTab={activeTab} />
      <FlexLayout>
        {/* <Route exact path={`${path}`}>
          <>
            {stakedOnly
              ? orderBy(stakedOnlyPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)
              : orderBy(openPools, ['sortOrder']).map((pool) => <PoolCard key={pool.sousId} pool={pool} />)}
            <Coming />
          </>
        </Route> */}
        {/* <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route> */}
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
