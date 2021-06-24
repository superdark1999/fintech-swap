import React, { useState, useRef } from 'react'
import { OfferStyled, TableStyled, WrapperListCard, ListCard, Container} from './styled'
import { Select, Row } from 'antd'
import Swap from 'assets/images/swap.svg'
import Token from 'assets/images/token.svg'
import Plus from 'assets/images/plus.svg'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { data, column } from './mock'
import { isMobile } from 'react-device-detect'
import { ButtonBuy } from 'components-v2/Button'
import { CardSwap, CardSelect, CardOffer, CardDefault} from '../components/index'
import {isEmpty} from 'lodash'

interface Props {
  nextStep: (step: number) => void,
  myItems: any,
  itemSwap: any
  setVisible: (value: boolean) => void
  setSelectMethod: (value: number) => void
  selectMetodSwap: number
}

const OptionData = [
  {
    label: 'Lucky',
    value: 'Lucky',
  }
]
const { Option } = Select;
const METHOD_SWAP= {
  NFT_ONLY: 1,
  NFT_TOKEN: 2,
}

export default function (props: Props) {
  const {
    myItems, setVisible, itemSwap, selectMetodSwap, setSelectMethod
  } = props
  const [select, setSelect] = useState<string | null>('Lucky');
  const divRef = useRef(null)

  const scrollLeft = () => {
    divRef.current.scrollLeft += 260
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260
  }
  const renderListCard = () => {
    if (myItems.length > 3) {
      return (
        <>
        <WrapperListCard>
          <ListCard ref={divRef} numOfItem={myItems.length}>
            {
              myItems.map((card: any) => {
                return (
                  <CardSwap data={card} setVisible={setVisible} value='my-item'/>
                )
              })
            }
          </ListCard>
          <RightCircleOutlined
            className="scroll-left"
            onClick={scrollLeft}
            style={{ fontSize: 24 }}
          />
          <LeftCircleOutlined
            className="scroll-right"
            onClick={scrollRight}
            style={{ fontSize: 24 }}
          />
        </WrapperListCard>
        </>
      )
    } else if (myItems.length === 2 || myItems.length === 3) {
      return (
        <ListCard ref={divRef} numOfItem={myItems.length}>
          {
            myItems.map((card: any) => {
              return (
                <CardSwap data={card} setVisible={setVisible} value='my-item'/>
              )
            })
          }
        </ListCard>
      )
    } else if (myItems.length === 1) return <CardSwap data={myItems[0]} setVisible={setVisible} value='my-item'/>
    else return <CardDefault setVisible={setVisible} value='my-item'/>
  }



  const renderMethodSwap = (method: Number) => {
    if (method === METHOD_SWAP.NFT_ONLY) {
      return (
        <>
          {renderListCard()}
          <img src={Plus} style={{ margin: 'auto 20px' }} />
         <CardOffer type={METHOD_SWAP.NFT_ONLY}/>
        </>
      )
    }
    if (method === METHOD_SWAP.NFT_TOKEN) {
      return (
        <>
         {renderListCard()}
         <img src={Plus} style={{ margin: 'auto 20px' }} />
         <CardOffer type={METHOD_SWAP.NFT_TOKEN} />
        </>
      )
    }
    return (
      <>
        <CardSelect setSelectMethod={setSelectMethod}/>
      </>

    )
  }

  const handleNextStep = () => {
    if (!(isEmpty(itemSwap) && isEmpty(myItems))) {
      props.nextStep(3)
    }
  }

  return (
    <>
      <OfferStyled >
        <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
          {OptionData.map((item, i) => (
            <Option key={i} value={item.value}>{item.label} <img src={Token} /></Option>
          ))}    
        </Select>
        <div style={{width: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: "center"}} >
            {renderMethodSwap(selectMetodSwap)}
            
            <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)'} : null} />

            {itemSwap?.[0] ? <CardSwap data={itemSwap?.[0]} /> : <CardDefault setVisible={setVisible} value='item-swap' />}
        </div>
        <Row justify="center" style={{marginTop: 40}}>
           <ButtonBuy width="300px" onClick={handleNextStep}>Offer now</ButtonBuy>
        </Row> 
      </OfferStyled>

      <TableStyled
        columns={column} 
        dataSource={data} 
        size="middle"
        scroll={{ x: 300 }}
        style={{width: '1100px', margin: 'auto'}}
      />            
      {/* <ModalSelectSwap
        visible={visible}
        setVisible={setVisible}
        data={visible.value === 'my-item' ? NFTs : []}
        getItemSelected={getItemSelected}
        multiSelect={visible.value === 'my-item'}
        selectedItem={visible.value === 'my-item' ? myItems : itemSwap}
      /> */}
    </>

  )
}




