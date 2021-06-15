import React,{useState, useEffect,useRef} from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
// import Hammer from 'assets/images/hammer.svg'
import Hammer from 'assets/images/hammer.svg'
import CartGrey from 'assets/icon/cart-grey.svg'
import Trade from 'assets/icon/trade.svg'
import ReactFreezeframe from 'react-freezeframe';
import {Link} from 'react-router-dom'
import useConfigStore from 'store/configStore'

import { Card,Avatar } from 'antd';
import { SwapOutlined, StarFilled } from '@ant-design/icons'
import useMarketServices from 'services/web3Services/MarketServices'
import {getPrice} from 'utils'
import _ from 'lodash' 
import Countdown from "react-countdown";
const { Meta } = Card;
export default function CardItem({data}) {
  const [price,setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dayExp, setDayExp] = useState(false)
  const  {getTokenPrice,getTokenBidPrice, getBidsByTokenId} =useMarketServices()
  useEffect(()=>{
    if(data?.tokenId){
      const getPriceToken = async()=>{
        if(data?.tokenId){
          if(data?.NFTType=='buy'){
            const unitPrice =  await getTokenPrice(data?.tokenId)
            const price = getPrice(Number(unitPrice?._hex))
            setPrice(price)
          }else{
            const bidsArr = await getBidsByTokenId(data?.tokenId)
            const bidsData = bidsArr?.map((item) => {
                  return {
                    key: item?.[0] || '',
                    address: item?.[0] || '',
                    price: Number(item?.[1]?._hex) / Number(1e18),
                  }
                }) || []
            const maxPrice = _.maxBy(bidsData,(item)=> item?.price)?.price
            const unitPrice = await getTokenBidPrice(data?.tokenId)
            const price = getPrice(unitPrice?._hex)
            if(price>maxPrice){
              setPrice(price)
            }else{
              setPrice(maxPrice)
            }
          }
        }
      }
      setLoading(false)
      getPriceToken()
    }
  },[data?.tokenId])
  // 
  // useEffect(()=>{
  //   configState.isUsingAnimation&&useFrameGif.current.start()
  //    !configState.isUsingAnimation&&useFrameGif.current.stop()
  // },[configState.isUsingAnimation])
  return (
    <Link to={`/artwork/detail/${data?.NFTType||'buy'}/${data?.id}`} className="create-nav">
      <StyledCart src={data?.contentUrl}>  
        <div className="card-art-work">                     
          <div className="wrapper-image">  
            <div className="gradient-background"><div className="title">{data?.title}</div></div>   
            {!dayExp&&data.NFTType === 'auction'&&<div className="header-card-art-work">
              <div className="date-time"><Countdown onComplete={()=>setDayExp(true)} date={Date.now() + Math.floor(Math.random()*10000000)}/> 🔥 </div>
            </div>}
            {/* <ReactFreezeframe ref={useFrameGif} className="avatar"  src={data?.contentUrl}/>      */}
            <img className="avatar"  src={data?.contentUrl} alt="" loading="lazy"/>
          </div>
          <div className="wrapper-info">
          <div className="title">
            <Link to="/user-profile/:id/onsale/readyToSell">
              <div className="name-artist">
                LuckySwapStudio {' '}
                <img src={Checkmark} alt=""/>
              </div>
            </Link>
            <div className="copy">
              <img src={Copy} alt=""/> Copy
            </div>
            
          </div>
          <div className="number">
            <div>
                {price} LUCKY {' '}
              <img src={Token} alt=""/></div>  
              <div>
                4.8 
                {' '}
                <StarFilled style={{color: '#fadb14'}} />
                {' '}
                <span style={{ fontWeight: 'normal', fontSize: 12, color: '#AFBAC5'}}>(15)</span>
                {' '}
                {data.NFTType === 'auction' &&<img src={Hammer} alt=""/>}
                {data.NFTType === 'buy' &&<img src={CartGrey} alt=""/>}
                {data.NFTType === 'swap' &&<img src={Trade} alt=""/>}
              </div>      
            </div> 
          </div>      
        </div>   
      </StyledCart>
    </Link> 
  )
}

