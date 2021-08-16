import { TransactionResponse } from '@ethersproject/providers'
import { Text as UIKitText } from '@luckyswap/uikit'
import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import { AutoColumn } from 'components/Column'
import { RowFlat } from 'components/Row'
import CurrencyLogo from 'components/Swap/CurrencyLogo'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/Swap/TransactionConfirmationModal'
import { BigNumber } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import { StakingNFT } from '../../config/constants/types'
import { XLUCKY_ADDRESSES } from '../../config/index'
import { useActiveWeb3React } from '../../hooks/index'
import { useToken } from '../../hooks/Tokens'
import { useStakingNFTContract } from '../../hooks/useContract'
import { usePendingRewards } from '../../state/poolsNft/hooks'
import { useTransactionAdder, useIsTransactionPending, useIsTransactionConfirmed } from '../../state/transactions/hooks'
import { findNFTIndex } from '../../utils/array'
import { bigNumberToJSBI, calculatePercentToJSBI } from '../../utils/bigNumber'
import notification from './Components/Alert'
import CardStaking from './Components/CardStaking'
import { ConfirmWithdrawModalBottom } from './Components/ConfirmWithdrawModalBottom'

interface StakingPageProps {
  stakingTokens: StakingNFT[]
  changeViewWhenWithdraw: any
}

export const Staked: React.FC<StakingPageProps> = ({ stakingTokens, changeViewWhenWithdraw }) => {
  const { chainId } = useActiveWeb3React()
  const rewardCurrenciesAmount = usePendingRewards(stakingTokens)
  const stakingNftContract = useStakingNFTContract()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHashWithdraw, setTxHashWithdraw] = useState<string>('')
  const isPendingWithdraw = useIsTransactionPending(txHashWithdraw)
  const isConfirmedWithdraw = useIsTransactionConfirmed(txHashWithdraw)
  const addTransaction = useTransactionAdder()
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const XLUCKY_TOKEN = useToken(XLUCKY_ADDRESSES[chainId])
  const [withdrawToken, setWithdrawToken] = useState<StakingNFT>(null) // console.log('staking tokens : ', stakingTokens)
  const [harvestFee, setHarvestFee] = useState<number>(null)

  useEffect(() => {
    stakingNftContract
      .FEE_WITHDRAW()
      .then((response) => {
        setHarvestFee((response as BigNumber).toNumber())
      })
      .catch((error) => {
        notification('error', { message: 'Error when get fee withdraw', description: error?.message })
      })
  }, [stakingNftContract])

  useEffect(() => {
    if (isConfirmedWithdraw) {
      const { tokenID, contractAddress } = withdrawToken
      changeViewWhenWithdraw({ tokenID, contractAddress })
    }
  }, [isConfirmedWithdraw, changeViewWhenWithdraw, withdrawToken])

  const onHarvest = async ({ tokenID, contractAddress }) => {
    stakingNftContract
      .harvest(contractAddress, tokenID)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `
            Claim reward from staking token ${tokenID}
          `,
        })
      })
      .catch((error) => {
        notification('error', { message: 'Error', description: error?.message })
      })
  }

  const onWithdraw = async () => {
    setAttemptingTxn(true)
    const { tokenID, contractAddress } = withdrawToken
    stakingNftContract
      .withdraw(contractAddress, tokenID)
      .then((response: TransactionResponse) => {
        setAttemptingTxn(false)
        addTransaction(response, {
          summary: `
            Withdraw token ${tokenID}
          `,
        })
        setTxHashWithdraw(response.hash)
      })
      .catch((error) => {
        setAttemptingTxn(false)
        notification('error', { message: 'Error', description: error?.message })
      })
  }

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
  }, [])

  const modalHeader = () => {
    return (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <UIKitText fontSize="48px" mr="8px">
            {(withdrawToken?.depositAmount as CurrencyAmount)
              .add(withdrawToken?.pendingReward as CurrencyAmount)
              .subtract(
                CurrencyAmount.fromRawAmount(
                  XLUCKY_TOKEN,
                  calculatePercentToJSBI((withdrawToken?.pendingReward as CurrencyAmount).raw, harvestFee),
                ),
              )
              .toFixed(4)}
          </UIKitText>

          <CurrencyLogo currency={XLUCKY_TOKEN} />
        </RowFlat>
        <UIKitText small textAlign="left" padding="8px 0 0 0 " style={{ fontStyle: 'italic' }}>
          Amount of XLUCKY you receive will increase a little bit
        </UIKitText>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmWithdrawModalBottom
        currency={XLUCKY_TOKEN}
        depositAmount={withdrawToken?.depositAmount as CurrencyAmount}
        rewardAmount={withdrawToken?.pendingReward as CurrencyAmount}
        harvestFee={harvestFee}
        onWithdraw={onWithdraw}
      />
    )
  }

  const pendingText = `You will receive ${(withdrawToken?.depositAmount as CurrencyAmount)?.toSignificant(
    6,
  )} as deposited and ${(withdrawToken?.pendingReward as CurrencyAmount)?.toSignificant(6)} as reward.
  Staking contract will also transfer ownership of this token to you
  `

  return (
    <Row>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txHashWithdraw}
        content={() => (
          <ConfirmationModalContent
            title="You will receive"
            onDismiss={handleDismissConfirmation}
            topContent={modalHeader}
            bottomContent={modalBottom}
          />
        )}
        pendingText={pendingText}
      />
      {stakingTokens.map((token, i) => (
        <CardStaking
          image={token.image}
          contractAddress={token.contractAddress}
          tokenID={token.tokenID}
          pendingReward={rewardCurrenciesAmount[i] ? rewardCurrenciesAmount[i].toFixed(4) : '0.0000'}
          onHarvest={onHarvest}
          onConfirmWithdraw={() => {
            setShowConfirm(true)
            setWithdrawToken({
              ...token,
              pendingReward: rewardCurrenciesAmount[i],
              depositAmount: CurrencyAmount.fromRawAmount(
                XLUCKY_TOKEN,
                bigNumberToJSBI(token.depositAmount as BigNumber),
              ),
            })
          }}
          createdAt={token.createdAt}
          isTxPending={isPendingWithdraw}
        />
      ))}
    </Row>
  )
}

export default Staked
