import React from 'react'
import { ConfirmStyled } from './styled'
import { CheckOutlined } from '@ant-design/icons'
import Swap from 'assets/images/swap.svg'
import { Row } from 'antd'
import isMobile  from 'react-device-detect'
import { ButtonBuy } from 'components-v2/Button'


const STATUS = {
  SUCCESS: "success",
  PROCESSING: "processing",
  CANCELED: "canceled"
}

export default (props: {itemSwap: any, myItems: any}) => {
const {
  itemSwap, myItems,
} = props
  const renderStatus = (status: any) => {
    switch (status) {
      case status === STATUS.SUCCESS : {
        return (
          <div>
            <CheckOutlined style={{width: 52, height: 52, color: '#F0B90B'}}/>
            <p style={{fontWeight: 'bold', fontSize: 32}}>Processing...</p>
          </div>
        )
      }
    }
  }

  return (
    <ConfirmStyled>
        {renderStatus("success")}
        <Row justify="center">
          <img className="nft-image" src={itemSwap?.[0]?.contentUrl}/>
          <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)'} : null} />
          <img className="nft-image" src={myItems?.[0].contentUrl}/>
        </Row>
        <div className="content">
          <div className="row-content">
            <div className="label"> Name </div>
            <div> Legend #29 "Nomad"</div>
          </div>
          <div className="row-content">
            <div className="label"> Previous owner </div>
            <div> LuckySwapStudio</div>
          </div>
          <div className="row-content">
            <div className="label"> New owner </div>
            <div> 26 </div>
          </div>
          <div className="row-content">
            <div className="label"> Note </div>
            <div> I’ll give you some additional tokens (5 lucky) for this nft</div>
          </div>
        </div>
        <Row justify="center"><ButtonBuy>Go to My collection</ButtonBuy></Row>
    </ConfirmStyled>
  )
}