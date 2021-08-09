import { ApprovalState } from 'config'
import React, { useEffect, useState } from 'react'
import { Col } from 'reactstrap'
import styled from 'styled-components'
import { StakingNFT } from '../../../config/constants/types'
import { useActiveWeb3React } from '../../../hooks/index'
import { useNFTContract, useStakingNFTContract } from '../../../hooks/useContract'
import notification from './Alert'

interface StakingCardProps extends StakingNFT {
  onStake: any
  approveState?: ApprovalState
  onApprove: any
}

const CardApproved: React.FC<StakingCardProps> = ({
  image,
  contractAddress,
  onStake,
  tokenID,
  approveState,
  onApprove,
}: StakingCardProps) => {
  const [approveNFTState, setApproveNFTState] = useState<ApprovalState>(ApprovalState.UNKNOWN)
  const stakingNFTContract = useStakingNFTContract()
  const NFTContract = useNFTContract(contractAddress)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (stakingNFTContract && tokenID && NFTContract) {
      setApproveNFTState(ApprovalState.PENDING)
      NFTContract.getApproved(tokenID)
        .then((response) => {
          if (response !== stakingNFTContract.address) {
            setApproveNFTState(ApprovalState.NOT_APPROVED)
          } else {
            setApproveNFTState(ApprovalState.APPROVED)
          }
        })
        .catch((error) => {
          notification('error', { message: 'Get Approve state NFT Error', description: error?.message })
          setApproveNFTState(ApprovalState.UNKNOWN)
        })

      NFTContract.on('Approval', (owner, approved, tokenId) => {
        if (owner === account && approved === stakingNFTContract.address && tokenId.toNumber() === tokenID) {
          // notification('success', { message: 'Get Approve state NFT Error', description: error?.message })

          setApproveNFTState(ApprovalState.APPROVED)
        }
      })
    }
  }, [stakingNFTContract, tokenID, account, NFTContract])

  const onApproveNFT = async () => {
    try {
      setApproveNFTState(ApprovalState.PENDING)
      NFTContract.approve(stakingNFTContract.address, tokenID)
    } catch (error) {
      notification('error', { message: 'Approve NFT error', description: error?.message })
      setApproveNFTState(ApprovalState.NOT_APPROVED)
    }
  }

  return (
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
              <span className="effect-light">Approving XLUCKY...</span>
            </Btn>
          ) : approveState === ApprovalState.UNKNOWN ? (
            <Btn className="green-color">
              <span className="effect-light">Checking...</span>
            </Btn>
          ) : (
            <> </>
          )}

          {approveNFTState === ApprovalState.NOT_APPROVED ? (
            <Btn className="green-color" onClick={onApproveNFT}>
              <span className="effect-light">Approve NFT</span>
            </Btn>
          ) : approveNFTState === ApprovalState.PENDING ? (
            <Btn className="green-color">
              <span className="effect-light">Approving NFT...</span>
            </Btn>
          ) : approveNFTState === ApprovalState.UNKNOWN ? (
            <Btn className="green-color">
              <span className="effect-light">Checking...</span>
            </Btn>
          ) : (
            <> </>
          )}

          {approveState === ApprovalState.APPROVED && approveNFTState === ApprovalState.APPROVED && (
            <Btn onClick={() => onStake({ tokenID, contractAddress })} className="green-color">
              <span className="effect-light">Stake</span>
            </Btn>
          )}
        </BoxFooter>
      </BoxCenter>
    </Col>
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
