import React, { useEffect, useState } from 'react'
import { ConfirmStyled } from './styled'
import { CheckOutlined, SyncOutlined, CloseOutlined } from '@ant-design/icons'
import Swap from 'assets/images/swap.svg'
import { Row } from 'antd'
import isMobile  from 'react-device-detect'
import { ButtonBuy, ButtonCancel } from 'components-v2/Button'
import { useActiveWeb3React } from 'wallet/hooks'
import { useHistory } from 'react-router-dom'


const STATUS = {
  SUCCESS: "success",
  PROCESSING: "processing",
  CANCELED: "canceled"
}

export default (props: {itemSwap: any, myItems: any, status:string}) => {
const {
  itemSwap, myItems,status
} = props
  const history = useHistory()
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
      case STATUS.CANCELED : {
        return (
          <div style={{margin:'auto',textAlign:'center'}}>
            <CloseOutlined className={'rotate'} style={{fontSize: '30px',padding:'18px',color: '#FFFFFF',background:'#FC636B', borderRadius:'100px'}} />
            <p style={{fontWeight: 'bold', fontSize: 32}}>Processing...</p>
          </div>
        )
      }
    }
  }
  return (
    <ConfirmStyled isGrayFilter={status==STATUS.PROCESSING}>
        {renderStatus(status)}
        
        <Row justify="center">
          <div className="nft-image">
            <img  src={myItems?.[0]?.contentUrl}/>
          </div>

          <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)'} : null} />

          <div className="nft-image">
          { itemSwap?.[0]?.type !='video' ? <img className="nft-image" src={itemSwap?.[0]?.contentUrl}/>:
            <video
            className="nft-image"
            style={{objectFit:'cover'}}
            playsInline
            controls
            muted
            // className={isLazy ? "lazy" : ""}
            src={`${itemSwap?.[0]?.contentUrl}`}
            data-srcset={itemSwap?.[0]?.contentUrl}
            data-src={`${itemSwap?.[0]?.contentUrl}#t=0.1`}
            loop
          />}
          </div>
          
          
        </Row>
        <div className="content">
          <div className="row-content">
            <div className="label"> Name </div>
            <div> {itemSwap?.[0]?.title}</div>
          </div>
          <div className="row-content">
            <div className="label"> Created by </div>
            <div> {itemSwap?.[0]?.createdBy?.name}</div>
          </div>
          <div className="row-content">
            <div className="label"> TokenId </div>
            <div> {itemSwap?.[0]?.tokenId} </div>
          </div>
          {/* <div className="row-content">
            <div className="label"> Note </div>
            <div> I’ll give you some additional tokens (5 lucky) for this nft</div>
          </div> */}
        </div>
        <Row justify="center">
          {!isOwner&&status===STATUS.SUCCESS?(
            <ButtonCancel >Cancel</ButtonCancel>     
          ):(
            <ButtonBuy onClick={()=>{ history.push('/my-profile/mycollection/checkingToSell')}}>Go to My collection</ButtonBuy>
          )}
        </Row>
    </ConfirmStyled>
  )
}
