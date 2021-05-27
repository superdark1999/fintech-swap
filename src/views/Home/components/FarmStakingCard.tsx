import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@luckyswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/cake-bg.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  // color: ${({ theme }) => theme.colors.textSubtle};
  color: #2b2c3a;
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #2b2c3a;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        {/* <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading> */}
        <Title>Farms & Staking</Title>
        <CardImage src="/images/cake.png" alt="cake logo" width={64} height={64} />
        <Block>
          {/* <Label>{TranslateString(544, 'CAKE to Harvest')}:</Label> */}
          <Label>BESWAP to Harvest:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          {/* <Label>{TranslateString(546, 'CAKE in Wallet')}:</Label> */}
          <Label>BESWAP in Wallet:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions className="custom">
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting CAKE')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`, {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
