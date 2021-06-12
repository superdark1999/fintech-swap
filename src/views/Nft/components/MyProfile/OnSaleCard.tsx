
import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import { Row, Col, Tabs} from 'antd';
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import usrMarketServices from 'services/web3Services/MarketServices'; 
import _ from 'lodash'
import {getPrice} from 'utils'

export default function OnSaleCard({data,}:any){
    const [loading, setLoading] = useState(true)
    const [price,setPrice] = useState(0)
    const { getTokenPrice,getBidsByTokenId,getTokenBidPrice} = usrMarketServices()
    console.log('dtata',data)
  
    useEffect(()=>{
      if(data?.tokenId){
        if(data?.NFTType=='buy'){
          getTokenPrice(data?.tokenId).then(data=>{
            const price = getPrice(Number(data?._hex))
            if(price!=-1){
              setLoading(false)
              setPrice(price)
            }
        })
        }else{
          getBidsByTokenId(data?.tokenId).then((bidsArr) => {
            const bidsData =
                bidsArr?.map((item: any) => {
                return {
                  key: item?.[0] || '',
                  address: item?.[0] || '',
                  price: Number(item?.[1]?._hex) / Number(1e18),
                }
              }) || []
            const maxPrice = _.maxBy(bidsData,(item:any)=> item?.price)?.price
            if(!maxPrice){
              getTokenBidPrice(data?.tokenId)
                .then((dt:any) => {
                  const price = getPrice(dt?._hex)
                  if (price != -1) {
                    setLoading(false)
                    setPrice(price)
                  }
                })
                .catch((err:any) => {
                    console.log(err)
                })
                return
            }else{
                setPrice(maxPrice)
            }
            setLoading(false)
        })
        }
        
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
                <div className="number">{data?.TXHash} </div>
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
  
  