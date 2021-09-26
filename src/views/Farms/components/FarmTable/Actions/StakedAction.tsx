import { AddIcon, Button, IconButton, MinusIcon, useModal } from '@luckyswap/uikit'
import BigNumber from 'bignumber.js'
import UnlockButton from 'components/UnlockButtonFarm'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { ethers } from 'ethers'
import { useApproveCallbackCustom } from 'hooks/useApproveCallback'
import { useFarmsContract } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import React, { useCallback, useState } from 'react'
import { useFarmUser } from 'state/hooks'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { FarmType } from '../../../../../constants/index'
import { useActiveWeb3React } from '../../../../../hooks/index'
import { useFarmNFTContract } from '../../../../../hooks/useContract'
import { useAppDispatch } from '../../../../../state/index'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionContent, ActionTitles, Earned, Subtle, Title } from './styles'
import { useApproveForAllNFTCallback } from '../../../../../hooks/useApproveNFTCallback'

const IconButtonWrapper = styled.div`
  display: flex;
`

const WrapAction: React.FC<FarmWithStakedValue> = (props) => {
  const { type } = props
  const newFarmContract = useFarmNFTContract()
  const farmContract = useFarmsContract()

  const render = () => {
    switch (type) {
      case FarmType.LUCKYSWAP:
        return <Staked {...props} farmContract={farmContract} />
      case FarmType.SPACEHUNTER:
        return <Staked {...props} farmContract={newFarmContract} />
      default:
        return <Staked {...props} farmContract={farmContract} />
    }
  }
  return <> {render()} </>
}

const Staked: React.FunctionComponent<any> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteToken,
  token,
  type,
  farmContract,
}) => {
  const TranslateString = useI18n()
  const { account, chainId } = useActiveWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const dispatch = useAppDispatch()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = lpAddresses[chainId]
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(amount) => _onStake(amount)}
      tokenName={lpSymbol}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={(amount) => _onUnstake(amount)} tokenName={lpSymbol} />,
  )
  const [approval] = useApproveCallbackCustom(lpAddress, farmContract?.address)

  async function onAttemptToApprove() {
    return approval()
  }
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onAttemptToApprove()
    } catch (e) {
      console.error(e)
    } finally {
      setRequestedApproval(false)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [approval, setRequestedApproval])

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake LP')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" width="14px" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" width="14px" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  async function _onStake(amount) {
    if (farmContract) {
      const args = [pid, ethers.utils.parseUnits(amount, 'ether')]
      await farmContract
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

  async function _onUnstake(amount) {
    if (farmContract) {
      const args = [pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()]
      await farmContract
        .withdraw(...args, { gasLimit: 200000 })
        .then((response: any) => {
          console.log('response>>', response)
        })
        .catch((error: any) => {
          // setAttempting(false)
          console.log(error)
        })
    }
  }

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle color="#2b2c3a">{TranslateString(999, 'START FARMING')}</Subtle>
        </ActionTitles>
        <ActionContent>
          <UnlockButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (rawStakedBalance) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Title>{lpSymbol} </Title>
            <Subtle>{TranslateString(999, 'STAKED')}</Subtle>
          </ActionTitles>
          <ActionContent>
            <div>
              <Earned>{displayBalance}</Earned>
            </div>
            <IconButtonWrapper>
              <IconButton variant="success" onClick={onPresentWithdraw} mr="6px">
                <MinusIcon color="primary" width="14px" />
              </IconButton>
              <IconButton variant="success" onClick={onPresentDeposit}>
                <AddIcon color="primary" width="14px" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Subtle>{TranslateString(999, 'STAKE')} </Subtle>
          <Title>{lpSymbol}</Title>
        </ActionTitles>
        <ActionContent>
          {/* <Button width="100%" onClick={onPresentDeposit} variant="secondary">
            {TranslateString(999, 'Stake LP')}
          </Button> */}
          {renderStakingButtons()}
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Subtle>{TranslateString(999, 'ENABLE FARM')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" disabled={requestedApproval} onClick={handleApprove} variant="secondary">
          {TranslateString(999, 'Enable')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default WrapAction
