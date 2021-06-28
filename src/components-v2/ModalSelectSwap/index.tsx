import React, { useState } from 'react'
import { Modal, Row } from 'antd'
import CardItem from 'components-v2/CardItem/index'
import styled from 'styled-components'
import { ButtonTrade } from 'components-v2/Button'
import { SwapOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'


interface Props {
  visible: any
  setVisible: (visible: boolean) => void
  data: any,
  multiSelect?: boolean,
  getItemSelected?: (data: any) => void
  selectedItem?: any,
  title:string
}
export default function ModalSelectSwap(props: Props) {

  const { multiSelect, getItemSelected, visible, data, setVisible, selectedItem, title } = props
  const [selectedMyItem, setSelectedMyItem] = useState<any>([])
  const [selectedSwapItem, setSelectedSwapItem] = useState<any>([])


  const arrItem = visible.value === 'my-item' ? selectedMyItem : selectedSwapItem
  const setArrItem = visible.value === 'my-item' ? setSelectedMyItem : setSelectedSwapItem

  const checkItem = (item: any) => {
    const arrItem = visible.value === 'my-item' ? selectedMyItem : selectedSwapItem

    const checkItem = arrItem.find((x: any) => x._id === item._id)
    return !!checkItem
  }

  const handleCheck = (item: any) => {
    if (multiSelect) {
      if (checkItem(item)) {
        const arrSelected = arrItem.filter((x: any) => x._id !== item._id)
        setArrItem(arrSelected)
      }
      else setArrItem(arrItem.concat(item))
    } else {
      setArrItem([item])
    }
  }

  const handleSubmit = () => {
    getItemSelected(arrItem)
    setVisible(false)
  }

  const oncloseModal = () => {
    setArrItem(selectedItem)
    setVisible(false)
  }

  return (
    <ModalStyled
      title={title}
      centered
      visible={visible.isOpen}
      onCancel={oncloseModal}
      width={1000}
      footer={<Row justify="center"><ButtonTrade onClick={handleSubmit} width="200px"><SwapOutlined />{visible.value === 'my-item' ? "Select" : "Swap"}  {multiSelect && `(${arrItem.length})`}</ButtonTrade></Row>}
    >
      <WrapperModalBody>
        {
          data.map((item: any, index: number) => {
            return (
              <div key={item._id} className={checkItem(item) ? "card-item active" : "card-item"} onClick={() => handleCheck(item)}>
                <div className="card">
                  <CardItem data={item} isHideButton={true} />
                </div>
              </div>
            )
          })
        }
      </WrapperModalBody>

    </ModalStyled>
  )
}

const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
    .ant-modal-body{
      padding: 20px;
      display: flex;
    }
  }
`

const WrapperModalBody = styled.div`
  overflow: scroll;
  display: flex;
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
    .card { pointer-events: none;}
    &.active {
      ::before {
        .card { pointer-events: none;}
        box-sizing: border-box;
        border-radius: 8px;
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        padding: 3px;
        background: #35A5FC;
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
