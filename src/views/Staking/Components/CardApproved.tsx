import { TransactionResponse } from '@ethersproject/providers'
import { Text as UIKitText } from '@luckyswap/uikit'
import { CurrencyAmount } from '@luckyswap/v2-sdk'
import { AutoColumn } from 'components/Column'
import { RowFlat } from 'components/Row'
import CurrencyLogo from 'components/Swap/CurrencyLogo'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/Swap/TransactionConfirmationModal'
import { ApprovalState, XLUCKY_ADDRESSES } from 'config'
import { ethers } from 'ethers'
import { useToken } from 'hooks/Tokens'
import React, { useCallback, useEffect, useState } from 'react'
import { Col } from 'reactstrap'
import styled from 'styled-components'
import { calculatePercentToJSBI } from 'utils/bigNumber'
import { StakingNFT } from '../../../config/constants/types'
import { useApproveNFTCallback } from '../../../hooks/useApproveNFTCallback'
import { useStakingNFTContract } from '../../../hooks/useContract'
import { stakingNftService } from '../../../services/index'
import {
  useIsTransactionConfirmed,
  useIsTransactionPending,
  useTransactionAdder,
} from '../../../state/transactions/hooks'
import notification from './Alert'
import { ConfirmWithdrawModalBottom } from './ConfirmWithdrawModalBottom'
import { useActiveWeb3React } from '../../../hooks/index'
import { ConfirmStakeModalBottom } from './ConfirmStakeModalBottom'

interface StakingCardProps extends StakingNFT {
  approveState?: ApprovalState
  onApprove: any
  changeViewWhenStake: any
}

const CardApproved: React.FC<StakingCardProps> = ({
  image,
  contractAddress,
  tokenID,
  approveState,
  onApprove,
  changeViewWhenStake,
  depositAmount,
}: StakingCardProps) => {
  const { chainId } = useActiveWeb3React()
  const stakingNFTContract = useStakingNFTContract()
  const [txHashStake, setTxHashStake] = useState<string>('')
  const addTransaction = useTransactionAdder()
  const [approvalNFT, approveNFTCallback] = useApproveNFTCallback(tokenID, contractAddress, stakingNFTContract.address)
  const isTxStakeConfirmed = useIsTransactionConfirmed(txHashStake)
  const isTxStakePending = useIsTransactionPending(txHashStake)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const XLUCKY_TOKEN = useToken(XLUCKY_ADDRESSES[chainId])
  const [rateReward, setRateReward] = useState<number>(0)

  useEffect(() => {
    if (isTxStakeConfirmed) {
      notification('success', { message: 'Stake', description: `Stake token ${tokenID} successfully` })

      stakingNftService
        .stakeToken({ tokenID, contractAddress })
        .then(() => {
          changeViewWhenStake({ tokenID, contractAddress })
          notification('success', { message: 'Stake', description: `Stake token ${tokenID} successfully` })
        })
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))
    }
  }, [isTxStakeConfirmed, tokenID, contractAddress, changeViewWhenStake])

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await stakingNftService.getTokenByID({ tokenID, contractAddress })
        setRateReward(parseInt(token.rateReward))
      } catch (error) {
        notification('error', { message: 'Get token from db error', description: error?.message })
      }
    }

    if (tokenID && contractAddress) {
      getToken()
    }
  }, [tokenID, contractAddress])

  const onStake = async () => {
    try {
      setAttemptingTxn(true)
      const response: TransactionResponse = await stakingNFTContract.stake(
        ethers.utils.getAddress(contractAddress),
        ethers.BigNumber.from(tokenID),
      )
      setAttemptingTxn(false)

      addTransaction(response, {
        summary: `Stake NFT ${tokenID} from ${contractAddress}`,
      })

      setTxHashStake(response.hash)
    } catch (error) {
      setAttemptingTxn(false)

      notification('error', { message: 'Error', description: error?.message })
    }
  }

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    setTxHashStake('')
  }, [])

  const modalHeader = () => {
    return (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <UIKitText fontSize="48px" mr="8px">
            {(depositAmount as CurrencyAmount).toSignificant(6)}
          </UIKitText>

          <CurrencyLogo currency={XLUCKY_TOKEN} />
        </RowFlat>
        <UIKitText small textAlign="left" padding="8px 0 0 0 " style={{ fontStyle: 'italic' }}>
          You will receive deposit when you withdraw
        </UIKitText>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmStakeModalBottom
        currency={XLUCKY_TOKEN}
        rateReward={rateReward}
        depositAmount={depositAmount as CurrencyAmount}
        onStake={onStake}
      />
    )
  }

  const pendingText = `You are transferring ownership of this token to staking contract and number of XLUCKY to deposit`

  return (
    <>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txHashStake}
        content={() => (
          <ConfirmationModalContent
            title="You will stake this token and transfer to staking contract as deposit"
            onDismiss={handleDismissConfirmation}
            topContent={modalHeader}
            bottomContent={modalBottom}
          />
        )}
        pendingText={pendingText}
      />
      <Col sm="12" md="3" className="align-center space-mb">
        <BoxCenter>
          <Figure>
            <img src={image} className="thumb" alt="" />
            <img src="/images/staking/box-img.png" alt="" className="line-box" />
          </Figure>

          <Launchers>
            <img src="/images/staking/effect.png" alt="" />
          </Launchers>

          <BoxFooter>
            {approveState === ApprovalState.NOT_APPROVED ? (
              <Btn className="green-color" onClick={onApprove}>
                <span className="effect-light">Approve XLUCKY</span>
              </Btn>
            ) : approveState === ApprovalState.PENDING ? (
              <Btn className="green-color">
                <span className="effect-light">Approving...</span>
              </Btn>
            ) : approveState === ApprovalState.UNKNOWN ? (
              <Btn className="green-color">
                <span className="effect-light">Checking...</span>
              </Btn>
            ) : (
              <> </>
            )}

            {approvalNFT === ApprovalState.NOT_APPROVED ? (
              <Btn className="green-color" onClick={() => approveNFTCallback()}>
                <span className="effect-light">Approve NFT</span>
              </Btn>
            ) : approvalNFT === ApprovalState.PENDING ? (
              <Btn className="green-color">
                <span className="effect-light">Approving NFT...</span>
              </Btn>
            ) : approvalNFT === ApprovalState.UNKNOWN ? (
              <Btn className="green-color">
                <span className="effect-light">Checking...</span>
              </Btn>
            ) : (
              <> </>
            )}

            {approveState === ApprovalState.APPROVED &&
              approvalNFT === ApprovalState.APPROVED &&
              (!isTxStakePending ? (
                <Btn
                  onClick={() => {
                    setShowConfirm(true)
                  }}
                  className="green-color"
                >
                  <span className="effect-light">Stake</span>
                </Btn>
              ) : (
                <Btn className="green-color">
                  <span className="effect-light">Staking....</span>
                </Btn>
              ))}
          </BoxFooter>
        </BoxCenter>
      </Col>
    </>
  )
}

const BoxCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: auto;

  @media (min-width: 768px) {
    max-width: 230px;
  }
`

const Figure = styled.div`
  position: relative;
  width: 180px;
  height: 276px;
  overflow: hidden;

  .thumb {
    height: inherit;
    transform: scale(1);
    transition: all 0.9s;
    object-fit: cover;
  }

  .line-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`

const Launchers = styled.div`
  margin-bottom: 15px;
`

const BoxFooter = styled.div`
  background: #2f2f2f;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  width: 280px;

  @media (min-width: 768px) {
    width: 100%;
  }
`

const Btn = styled.button`
  background: url('../images/staking/line-button.png') no-repeat center center;
  background-size: contain;
  width: 100%;
  height: 67px;
  line-height: 67px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  color: #ff3b3b;
  border: 0;

  &.green-color {
    color: #1cbb1c;
  }

  &:hover {
    .effect-light {
      text-align: center;
      font-size: 1.2em;
      color: #fff;
      font-weight: 700;
      text-transform: uppercase;
      animation: blur 0.75s ease-out infinite;
      text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
    }
  }

  @keyframes blur {
    from {
      text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff,
        0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 25px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff,
        0px 0px 50px #7b96b8, 0px 0px 150px #7b96b8, 0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8,
        0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8, 0px -10px 100px #7b96b8, 0px -10px 100px #7b96b8;
    }
  }
`

export default CardApproved
