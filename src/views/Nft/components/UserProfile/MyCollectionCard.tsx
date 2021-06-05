import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs} from 'antd';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from '../utilComponent/cart/styled'
import  Copy from 'assets/images/copy.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from '../../../../services/ArtworkServices'; 
import useNFTServices from '../../../../services/NFTServices'; 
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'

import { HeartOutlined } from '@ant-design/icons';
import { margin } from 'polished';
import _ from 'lodash'

export default function MyCollectionCard({data,}:any){
    const [isNFTCanSell,setIsNFTCanSell] = useState(false)
    const [isProcessing, setIsPrcessing] = useState(true)
    const {isNFTReadyToSell, approveNFTToMarket,setPriceForNFT} = useNFTServices()
    useEffect(()=>{
      const checkNFTInfo = async()=>{
      if(data?.tokenId){
        const tempIsNFTCanSell = await isNFTReadyToSell(data?.tokenId)
        setIsNFTCanSell(tempIsNFTCanSell)
        setIsPrcessing(false)
      }}
      checkNFTInfo()
    },[data?.tokenId])
  
    const onSellItem = ()=>{
      const tokenId = data?.tokenId;
      setIsPrcessing(true)
      if(isNFTCanSell){
        setPriceForNFT(tokenId,10).then(data=>{
          console.log(data)
        })
      }else{
        approveNFTToMarket(tokenId).then(data=>{
          setTimeout(async()=>{
            const tempIsNFTCanSell = await isNFTReadyToSell(tokenId)
            setIsNFTCanSell(tempIsNFTCanSell)
            setIsPrcessing(false)
          },20000)
        }).catch(err=>{
          alert('Something wrong, please try again later.')
          setIsPrcessing(false)
        })
      }
    }
  
    return (
      <CartStyled>
        <Row gutter={24}>
          <Col xl={{ span: 8}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 8}}>
            <img className="avatar" src={data?.contentUrl}/>
          </Col>
          <Col className="description space-vehicle" xl={{ span: 16 }} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 16}}>
              <div>
                <div className="name">
                      {data?.title}
                </div>
                {data?.TXHash
                &&(<div style={{display: "flex", marginBottom:10}}>
                  <div style={{ color: '#AFBAC5', fontWeight: 600 }}>TXHash: </div>
                  <div className="number">{data?.TXHash?.slice(1,20)}...</div>
                </div>)}
              </div>
              <div>
                <div className="group-button">
                  <ButtonTrade height="45px">Send</ButtonTrade>
                  {isProcessing?(
                    <ButtonBuy height="45px" >Processing...</ButtonBuy>
                  ):(
                    <ButtonBuy height="45px" onClick={onSellItem}>{isNFTCanSell?'Sell':'Allow to Sell'}</ButtonBuy>
                  )}
                  {/* Thêm input set giá cho thằng NFT nha a  */}
                  <ButtonBuy borderRadius="100px" width="40px" height="45px"><img src={QRCode} /></ButtonBuy>
                </div>   
              </div> 
                 
          </Col>
        </Row>                
      </CartStyled>
    )
  }