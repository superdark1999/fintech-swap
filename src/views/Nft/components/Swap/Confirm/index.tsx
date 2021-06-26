import React, { useEffect, useState } from 'react'
import { ConfirmStyled } from './styled'
import { CheckOutlined, SyncOutlined } from '@ant-design/icons'
import Swap from 'assets/images/swap.svg'
import { Row } from 'antd'
import isMobile  from 'react-device-detect'
import { ButtonBuy } from 'components-v2/Button'
import { useActiveWeb3React } from 'wallet/hooks'


const STATUS = {
  SUCCESS: "success",
  PROCESSING: "processing",
  CANCELED: "canceled"
}

export default (props: {itemSwap: any, myItems: any, status:string}) => {
const {
  itemSwap, myItems,status
} = props

  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { account, chainId } = useActiveWeb3React()
  useEffect(()=>{
    if(itemSwap?.[0]?.tokenId){
      setIsOwner(itemSwap?.[0]?.ownerWalletAddress==account)
    }
  },[itemSwap?.[0]?.tokenId,account])

  const renderStatus = (status: any) => {
    switch (status) {
      case STATUS.PROCESSING : {
        return (
          <div style={{margin:'auto',textAlign:'center'}}>
            <SyncOutlined className={'rotate'} style={{fontSize: '30px',padding:'18px',color: '#FFFFFF',background:'#F0B90B', borderRadius:'100px'}} />
            <p style={{fontWeight: 'bold', fontSize: 32}}>Processing...</p>
          </div>
        )
      }
      case STATUS.SUCCESS : {
        return (
          <div style={{margin:'auto',textAlign:'center'}}>
            {isOwner?(
              <CheckOutlined style={{fontSize: '30px',padding:'18px',color: '#FFFFFF',background:'#84C87E', borderRadius:'100px'}} />
            ):(
              <SyncOutlined className={'rotate'} style={{fontSize: '30px',padding:'18px',color: '#FFFFFF',background:'#F0B90B', borderRadius:'100px'}} />
            )}
            <p style={{fontWeight: 'bold', fontSize: 32}}>{isOwner?'Swap successfully!':'Offer Success, Please wait owner confirm.'}</p>
          </div>
        )
      }
    }
  }
  return (
    <ConfirmStyled isGrayFilter={status!==STATUS.SUCCESS}>
        {renderStatus(status)}
        
        <Row justify="center">
          <div className="nft-image">
            <img  src={myItems?.[0]?.contentUrl}/>
          </div>

          <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)'} : null} />

          <div className="nft-image">
            <img className="nft-image" src={itemSwap?.[0]?.contentUrl}/>
          </div>
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
          {/* <div className="row-content">
            <div className="label"> Note </div>
            <div> I’ll give you some additional tokens (5 lucky) for this nft</div>
          </div> */}
        </div>
        <Row justify="center"><ButtonBuy>Go to My collection</ButtonBuy></Row>
    </ConfirmStyled>
  )
}
