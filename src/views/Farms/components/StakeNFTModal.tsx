import React, { useState } from 'react'
import { Modal, Row } from 'antd'
import styled from 'styled-components'
import { SwapOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import { BoostedNFT } from '../../../config/constants/types'
import { findNFT, findNFTIndex } from '../../../utils/array'

interface Props {
  visible: any
  setVisible: (visible: boolean) => void
  data: any
  // multiSelect?: boolean,
  title: string
}

const BoxAction = styled.div`
  display: block;
  color: white;
  margin-top: 10px;
  justify-content: space-between;
`
const NFTChosen = styled.div``
const Name = styled.div``
const BonusAndAction = styled.div`
  margin: auto 0;
`
const Bonus = styled.div`
  color: #5ffff8;
  margin-bottom: 14px;
`

const ImgNFT = styled.img`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 30px;
`

const CardItem = ({ image, tokenID, contractAddress, boostedPercent }: BoostedNFT) => {
  return (
    <>
      <BoxAction>
        <NFTChosen>
          <ImgNFT src={image} />
        </NFTChosen>
        <BonusAndAction>
          <Name>Chua co ten</Name>
          <Bonus>{boostedPercent}%</Bonus>
        </BonusAndAction>
      </BoxAction>
    </>
  )
}
export default function ModalSelectSwap({
  visible,
  data,
  setVisible,
  title,
  stakeNFTsToBoost,
  unstakeNFTsBoosting,
  isPendingStake,
  isPendingUnstake,
  pid,
}) {
  const [selectedItems, setSelectedMyItem] = useState<BoostedNFT[]>([])

  const isSelected = (item: BoostedNFT) => {
    return findNFTIndex(selectedItems, item.contractAddress, item.tokenID) !== -1
  }

  const handleCheck = (item: BoostedNFT) => {
    const index = findNFTIndex(selectedItems, item.contractAddress, item.tokenID)
    if (index !== -1) {
      setSelectedMyItem((prevState) =>
        prevState.filter((token) => token.tokenID !== item.tokenID || token.contractAddress !== item.contractAddress),
      )
    } else {
      setSelectedMyItem((prevState) => [...prevState, item])
    }
  }

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      setVisible(false)
      return
    }

    if (selectedItems[0].isUsingToBoost) {
      unstakeNFTsBoosting(pid, selectedItems)
    } else {
      stakeNFTsToBoost(pid, selectedItems)
    }
  }

  const onCloseModal = () => {
    setVisible(false)
  }

  return (
    <ModalStyled
      title={title}
      centered
      visible={visible}
      onCancel={onCloseModal}
      width={500}
      footer={
        <Row justify="center">
          {selectedItems.length > 0 && (
            <ButtonTrade disabled={isPendingStake || isPendingUnstake} onClick={handleSubmit}>
              {selectedItems[0]?.isUsingToBoost ? 'Unstake' : 'Stake'}
            </ButtonTrade>
          )}
        </Row>
      }
    >
      <WrapperModalBody>
        {data.map((item: BoostedNFT) => {
          return (
            <button
              type="button"
              onClick={() => handleCheck(item)}
              key={`${item.tokenID}-${item.contractAddress}`}
              className={isSelected(item) ? 'card-item active' : 'card-item'}
            >
              <div className="card">
                <CardItem
                  tokenID={item.tokenID}
                  image={item.image}
                  contractAddress={item.contractAddress}
                  boostedPercent={item.boostedPercent}
                />
              </div>
            </button>
          )
        })}
      </WrapperModalBody>
    </ModalStyled>
  )
}
const ButtonTrade = styled.button`
  width: max-content;
  height: max-content;
  border-radius: 100px;
  border: 2px solid #35a5fc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  font-weight: 600;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #2b2e2f;
  cursor: pointer;
  margin-right: 10px;
  background-color: #f4c708;
  border-color: #203c46;
  border: 0;
  box-shadow: none;
  :hover {
    opacity: 0.7;
  }
  &.disabled {
    background: #bdbdbd;
    color: #fff;
    border: 2px solid #fff;
  }
  > img,
  span {
    /* margin-right: 5px; */
  }
`
const ModalStyled = styled(Modal)`
  background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
  box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
  border-radius: 24px;
  width: auto;
  min-width: 320px;
  max-width: 100%;
  padding-bottom: 0;
  .ant-modal-body {
    padding-top: 0 !important;
  }
  .ant-modal-content {
    background-color: transparent;
    overflow: hidden;
    .ant-modal-body {
      height: 270px;
      padding: 20px;
      display: flex;
    }
  }
  .ant-modal-header {
    align-items: center;
    background: transparent;
    display: flex;
    padding: 24px;
    border-bottom: 0;
  }
  .ant-modal-footer {
    border-top: 0;
    margin-bottom: 10px;
  }
  .ant-modal-close {
    color: white;
    margin: 12px;
    margin-right: 20px !important;
    &:hover {
      opacity: 0.7;
    }
  }
  .ant-modal-title {
    color: white;
    font-size: 25px;
    font-weight: 600;
    line-height: 1.1;
  }
`

const WrapperModalBody = styled.div`
  width: 100%;
  justify-content: space-around;
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
  max-height: 65vh;
  ::-webkit-scrollbar {
    display: none;
  }
  .card-item {
    cursor: pointer;
    filter: 1;
    margin: ${isMobile ? '0 auto' : ' 10px'};
    box-sizing: border-box;
    position: relative;
    background: transparent;
    border: 0;
    padding: 0;
    &::before {
      box-sizing: border-box;
      border-radius: 15px;
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      padding: 3px;
      background: white;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
    }
    .card {
      pointer-events: none;
      border-radius: 15px;
      background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
    }
    &.active {
      ::before {
        .card {
          pointer-events: none;
        }
        box-sizing: border-box;
        border-radius: 15px;
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        padding: 3px;
        background: #35a5fc !important;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
      }
    }

    /* :hover {
      ::before {
        box-sizing: border-box;
]        border-radius: 8px;
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        padding: 3px;
        background: linear-gradient(
    270deg
    ,#19A3DD -16.5%,#BADEB7 117.25%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
      }
      
    } */
  }
`
