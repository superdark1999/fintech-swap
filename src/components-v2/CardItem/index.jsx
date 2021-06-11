import React,{useState, useEffect,useRef} from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
// import Hammer from 'assets/images/hammer.svg'
import Hammer from 'assets/images/hammer.svg'
import ReactFreezeframe from 'react-freezeframe';
import {Link} from 'react-router-dom'
import useConfigStore from 'store/configStore'

import { Rate } from 'antd';
import { SwapOutlined, StarFilled } from '@ant-design/icons'
import useMarketServices from 'services/web3Services/MarketServices'
import _ from 'lodash' 

const getPrice = (price)=>{
  if(price?.toString()?.length<24){
    const priceString = _.replace(price?.toString(),'000000000000000000','')
    return Number(priceString)
  }
  return -1
}

export default function CardItem({data}) {
  const [price,setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const  {getTokenPrice} =useMarketServices()
  useEffect(()=>{
    if(data?.tokenId){
      getTokenPrice(data?.tokenId).then((dt)=>{
        const price = getPrice(Number(dt?._hex))
        if(price!=-1){
          setLoading(false)
          setPrice(price)
        }
      }).catch((err)=>{})
    }
  },[data?.tokenId])
  // console.log(configState.isUsingAnimation)
  // useEffect(()=>{
  //   configState.isUsingAnimation&&useFrameGif.current.start()
  //    !configState.isUsingAnimation&&useFrameGif.current.stop()
  // },[configState.isUsingAnimation])
  return (
    <Link to={`/artwork/detail/${data?.id}`} className="create-nav">
      <StyledCart src={data?.contentUrl}>  
        <div className="card-art-work">                     
          <div className="wrapper-image">  
            <div className="gradient-background"><div className="title">CRYPTOCARD 001 - ETH...</div></div>   
            <div className="header-card-art-work">
              <div className="date-time">02h 31m 04s left 🔥 </div>
            </div>
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
              <img src={Hammer} alt=""/>
            </div>      
            </div> 
          </div>      
        </div>   
      </StyledCart>
    </Link> 
  )
}

