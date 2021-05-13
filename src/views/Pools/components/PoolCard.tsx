import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image } from '@beswap/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20, useStakingContract } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApy } from 'utils/apy'
import { getAddress } from 'utils/addressHelpers'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'
import { Pool } from 'state/types'
import { useGetApiPrice } from 'state/hooks'
import { useApproveCallbackCustom, ApprovalState } from 'hooks/useApproveCallback'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface HarvestProps {
  pool: Pool
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    harvest,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool

  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { account } = useWeb3React()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)

  // APY
  const rewardTokenPrice = useGetApiPrice(earningToken.address ? getAddress(earningToken.address) : '')
  const stakingTokenPrice = useGetApiPrice(stakingToken.address ? getAddress(stakingToken.address) : '')
  const apy = getPoolApy(
    stakingTokenPrice,
    rewardTokenPrice,
    getBalanceNumber(pool.totalStaked, stakingToken.decimals),
    parseFloat(pool.tokenPerBlock),
  )

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const isOldSyrup = stakingToken.symbol === tokens.syrup.symbol
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(earningToken.decimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={(amount, decimals) => _onStake(amount, decimals)}
      tokenName={stakingLimit ? `${stakingToken.symbol} (${stakingLimit} max)` : stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingToken.symbol} />,
  )
  const poolImage = `${pool.earningToken.symbol}-${pool.stakingToken.symbol}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(amount, decimals) => _onUnstake(amount, decimals)}
      tokenName={stakingToken.symbol}
      stakingTokenDecimals={stakingToken.decimals}
    />,
  )
  const [approval] = useApproveCallbackCustom(getAddress(stakingToken.address), pool.contractAddress[97])

  async function onAttemptToApprove() {
    return approval()
  }
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onAttemptToApprove()
    } catch (e) {
      console.error(e)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [approval, setRequestedApproval])


  const stakingContract = useStakingContract(pool.contractAddress[97]);

  async function _onStake(amount, decimals) {
    if (stakingContract) {
      const args = [new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString()]
      // const gasAm = await stakingContract.estimateGas['deposit'](...args)
      await stakingContract
        .deposit(...args, { gasLimit: 200000 })
        .then((response: any) => {
          console.log('>>>>', response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  async function _onUnstake(amount, decimals) {
    if (stakingContract) {
      const args = [new BigNumber(amount).times(new BigNumber(10).pow(decimals)).toString()]
      // const gasAm = await stakingContract.estimateGas['deposit'](...args)
      await stakingContract
        .withdraw(...args, { gasLimit: 200000 })
        .then((response: any) => {
          console.log('>>>>', response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  async function _onReward() {
    if (stakingContract) {
      const args = [
        new BigNumber(0).times(new BigNumber(10).pow(18)).toString(),
      ]
      // const gasAm = await stakingContract.estimateGas['deposit'](...args)
      await stakingContract
        .deposit(...args, { gasLimit: 200000 })
        .then((response: any) => {
          console.log('response>>', response)
        })
        .catch((error: any) => {
          // setAttempting(false)
          console.log(error)
        })
    }
  }
  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0} className="block-pool">
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px' }}>
        <CardTitle isFinished={isFinished && sousId !== 0}>
          {isOldSyrup && '[OLD]'} {earningToken.symbol} {TranslateString(348, 'Pool')}
        </CardTitle>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Image src={`/images/pools/${poolImage}`} alt={earningToken.symbol} width={64} height={64} />
          </div>
          {account && harvest && !isOldSyrup && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Collecting') : TranslateString(562, 'Harvest')}
              onClick={async () => {
                setPendingTx(true)
                await _onReward()
                setPendingTx(false)
              }}
            />
          )}
        </div>
        {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance value={getBalanceNumber(earnings, earningToken.decimals)} isDisabled={isFinished} />
            {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
                onClick={onPresentCompound}
              />
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
        <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${earningToken.symbol} earned`)} />
        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} width="100%">
                  {`Approve ${stakingToken.symbol}`}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                        setPendingTx(true)
                        await onUnstake('0', stakingToken.decimals)
                        setPendingTx(false)
                      }
                      : onPresentWithdraw
                  }
                >
                  {`Unstake ${stakingToken.symbol}`}
                </Button>
                <StyledActionSpacer />
                {!isOldSyrup && (
                  <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="white" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div className="color-orange">APR</div>
          {isFinished || isOldSyrup || !apy ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div className="color-orange">Your Stake:</div>
          <Balance
            fontSize="14px"
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalance, stakingToken.decimals)}
          />
        </StyledDetails>
      </div>
      <CardFooter
        projectLink={earningToken.projectLink}
        decimals={stakingToken.decimals}
        totalStaked={totalStaked}
        startBlock={startBlock}
        endBlock={endBlock}
        isFinished={isFinished}
        poolCategory={poolCategory}
        tokenName={earningToken.symbol}
        tokenAddress={earningToken.address ? getAddress(earningToken.address) : ''}
        tokenDecimals={earningToken.decimals}
      />
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.png');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

export default PoolCard
