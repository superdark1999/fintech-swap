import { Button, CardBody, Text } from '@luckyswap/uikit'
import { NATIVE, Pair } from '@luckyswap/v2-sdk'
import { usePairs } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import styled, { ThemeContext } from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'
import { LightCard } from '../../components/Swap/Card'
import CardNav from '../../components/Swap/CardNav'
import { AutoColumn } from '../../components/Swap/Column'
import FullPositionCard from '../../components/Swap/PositionCard'
import { RowBetween } from '../../components/Swap/Row'
import { StyledInternalLink } from '../../components/Swap/Shared'
import { Dots } from '../../components/Swap/swap/styleds'
import TranslatedText from '../../components/Swap/TranslatedText'
import AppBody from '../AppBody'


export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account, chainId } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()

  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <>
      <AppBody>
        <FlexBox>
          <CardNav activeIndex={1} />
          {/* <PageHeader title="" description="" /> */}
        </FlexBox>

        <div className="custom-btn">
          <Button id="join-pool-button" as={Link} to={`/add/${NATIVE[chainId]?.symbol}`}>
            <TranslatedText translationId={100}>Add Liquidity</TranslatedText>
          </Button>
        </div>
        <AutoColumn gap="lg" justify="center">
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text style={{ color: '#fff' }}>
                  <TranslatedText translationId={102}>Your Liquidity</TranslatedText>
                </Text>
                {/* <Question
                  text={TranslateString(
                    130,
                    'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                  )}
                /> */}
              </RowBetween>

              {!account ? (
                <LightCard padding="40px">
                  <Text className="color-dark" textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </Text>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <Text className="color-dark" textAlign="center">
                    <Dots>Loading</Dots>
                  </Text>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px" className="custom-bg">
                  <Text color="textDisabled" textAlign="center">
                    <TranslatedText translationId={104}>No liquidity found.</TranslatedText>
                  </Text>
                </LightCard>
              )}

              <div>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }} color="#fff">
                  {TranslateString(106, "Don't see a pool you joined?")}{' '}
                  <StyledInternalLink id="import-pool-link" to="/find">
                    {TranslateString(108, 'Import it.')}
                  </StyledInternalLink>
                </Text>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0', color: '#fff' }}>
                  Or, if you staked your FLIP tokens in a farm, unstake them to see them here.
                </Text>
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`
