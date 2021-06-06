
import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import { Row, Col, Tabs} from 'antd';
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import useNFTServices from '../../../../services/NFTServices'; 
import _ from 'lodash'

const getPrice = (price:number)=>{
    if(price?.toString()?.length<24){
      const priceString = _.replace(price?.toString(),'000000000000000000','')
      return Number(priceString)
    }
    return -1
  }
export default function OnSaleCard({data,}:any){
    const [loading, setLoading] = useState(true)
    const [price,setPrice] = useState(0)
    const { getPriceNFT} = useNFTServices()
  
    useEffect(()=>{
      if(data?.tokenId){
        getPriceNFT(data?.tokenId).then(data=>{
          const price = getPrice(Number(data?._hex))
          if(price!=-1){
            setLoading(false)
            setPrice(price)
          }
      })
    }
    },[data?.tokenId])
  
  
    if(loading){
      return null
    }
    return (
      <CartStyled>
        <Row gutter={24}>
          <Col xl={{ span: 8}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 8}}>
            <img className="avatar" src={data?.contentUrl}/>
          </Col>
          <Col className="description" xl={{ span: 16 }} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 16}}>
              <div className="header-card" style={{marginTop:10}}>
                <div className="status">
                   Ready to Sell
                </div>
                {/* <div className="cancel">
                  Cancel
                </div> */}
              </div>
                
              <div className="name">
                {data?.title}
              </div>
              <div className="number">
                {price} LUCKY {' '}
                <img src={Token} alt=""/>
              </div> 
              <div style={{display: "flex"}}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID:</div>
                <div className="number">0x2433bE070fAeE3F9608154 </div>
              </div> 
              
              <div className="content">
              {data?.description}
              </div>  
  
              <div className="organize">
                <img src={Luckyswap} /> 
                  <span className="name">LuckySwapStudio</span>
                <img src={Checkmark} />
              </div>               
          </Col>
        </Row>                
      </CartStyled>
    )
  }
  
  