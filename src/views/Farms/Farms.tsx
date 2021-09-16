import { Heading, Image, RowType, Text } from '@luckyswap/uikit'
import { ChainId } from '@luckyswap/v2-sdk'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { orderBy } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Redirect, Route, useLocation, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { setSpaceHunterCollection } from 'state/collection'
import useI18n from '../../hooks/useI18n'
import useRefresh from '../../hooks/useRefresh'
import { useAppDispatch } from '../../state'
import { fetchFarmUserDataAsync } from '../../state/actions'
import { useFarms, useGetApiPrices, usePriceLuckyBusd } from '../../state/hooks'
import { Farm } from '../../state/types'
import { getFarmApr } from '../../utils/apy'
import { getBalanceNumber } from '../../utils/formatBalance'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import SearchInput from './components/SearchInput'
import Select, { OptionProps } from './components/Select/Select'
import { DesktopColumnSchema, ViewMode } from './components/types'
import { FarmType } from '../../constants/index'
import { useSpaceHunterCollection } from '../../hooks/useCollection'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  padding: 32px 0px;
  background: url('../images/bg-farm.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 50px;

  @media (min-width: 768px) {
    background-repeat: no-repeat;
    background-position: unset;
    background-size: cover;
    padding-left: 120px;
  }
`

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const luckyPrice = usePriceLuckyBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account, chainId } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()

  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account) as any)
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const mySpaceHunterCollection = useSpaceHunterCollection()

  useEffect(() => {
    if (mySpaceHunterCollection.length > 0) {
      dispatch(setSpaceHunterCollection(mySpaceHunterCollection))
    }
  }, [mySpaceHunterCollection, dispatch])

  const isActive = !pathname.includes('history')

  // farmsLP = farmsLP.filter((farm) => farm.type === type)

  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')

  // console.log("---data table:", farmsLP)
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, (farm: FarmWithStakedValue) => farm.apy, 'desc')
      case 'multiplier':
        return orderBy(
          farms,
          (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = 361 // TODO: This will handel API get price BUSD/BNB
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apy = isActive ? getFarmApr(new BigNumber(farm.poolWeight), luckyPrice, totalLiquidity) : 0

        return { ...farm, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPY
    },
    [luckyPrice, prices, query, isActive],
  )

  if (chainId && chainId !== ChainId.BSCTESTNET && chainId !== ChainId.MAINNET) {
    return <Redirect to="/" />
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  let farmsStaked = []

  if (isActive) {
    farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)
  const rowData = farmsStaked.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token?.address
    const quoteTokenAddress = quoteToken?.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')
    // console.log("------farm", farm.type)
    const row: RowProps = {
      apr: {
        value: farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice: luckyPrice,
        originalValue: farm.apy,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      platform: {
        platform: farm.platform,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
      type: farm.type,
    }

    return row
  })

  const renderContent = (type: FarmType): JSX.Element => {
    // console.log("-------", rowData[0].type)
    // rowData =
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema
      const data = rowData.filter((farm) => farm.type === type)
      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={data} columns={columns} type={type} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={luckyPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={luckyPrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header>
        <Heading as="h1" size="xxl" color="#fff" mb="24px">
          {TranslateString(674, 'Farms')}
        </Heading>
        <Heading size="lg" color="#fff">
          Provide a farming platform for any projects.
          <br /> Farms Stake Liquidity Pool (LP) tokens to earn.
        </Heading>
      </Header>

      <Page>
        <ControlContainer>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle('1')
                }}
              >
                Space Hunter
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2')
                }}
              >
                Luckyswap
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => {
                  toggle('3')
                }}
              >
                Other
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <FilterContainer>
              <LabelWrapper>
                <Text color="#fff" fontWeight="600" fontSize="16px">
                  SORT BY
                </Text>

                <Select
                  options={[
                    {
                      label: 'Hot',
                      value: 'hot',
                    },
                    {
                      label: 'APR',
                      value: 'apr',
                    },
                    {
                      label: 'Multiplier',
                      value: 'multiplier',
                    },
                    {
                      label: 'Earned',
                      value: 'earned',
                    },
                    {
                      label: 'Liquidity',
                      value: 'liquidity',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </LabelWrapper>

              <LabelWrapper style={{ marginLeft: 16 }}>
                <Text color="#fff" fontWeight="600" fontSize="16px">
                  SEARCH
                </Text>
                <SearchInput onChange={handleChangeQuery} value={query} />
              </LabelWrapper>
            </FilterContainer>

            <TabPane tabId="1">{renderContent(FarmType.SPACEHUNTER)}</TabPane>

            <TabPane tabId="2">{renderContent(FarmType.LUCKYSWAP)}</TabPane>

            {/* <TabPane tabId="3">{renderContent('other')}</TabPane> */}
          </TabContent>
        </ControlContainer>
      </Page>
    </>
  )
}

export default Farms
