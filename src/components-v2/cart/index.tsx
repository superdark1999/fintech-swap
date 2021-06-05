import React,{useState, useEffect} from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
import Hammer from 'assets/images/hammer.svg'
import Hammer2 from 'assets/images/hammer2.svg'

import {Link} from 'react-router-dom'

import { Rate } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import useNFTServices,{MARKET_ADDRESS} from '../../../../../services/NFTServices'; 
import useUserStore from '../../../../store/userStore'
import _ from 'lodash'

const getPrice = (price:number)=>{
  if(price?.toString()?.length<24){
    const priceString = _.replace(price?.toString(),'000000000000000000','')
    return Number(priceString)
  }
  return -1
}
export default function Cart({data}: any) {
  const [loading, setLoading] = useState(true)
  const [userState, userActions] = useUserStore()
  const [price,setPrice] = useState(0)
  const {getPriceNFT,approveLevelAmount,buyNFT} = useNFTServices()
  useEffect(()=>{
    if(data?.tokenId){
      getPriceNFT(data?.tokenId).then(data=>{
        const price = getPrice(Number(data?._hex))
        if(price!=-1){
          setLoading(false)
          setPrice(price)
        }
      }).catch(err=>{})
    }
  },[data?.tokenId])

  const onApproveBuyOnMarket = ()=>{
    approveLevelAmount(MARKET_ADDRESS).then((data:any)=>{
      console.log(data)
    }).catch(console.log)
  }

  const onBuyItem = ()=>{
    const tokenId = "41"
    buyNFT(tokenId).then(data=>{
      console.log(data)
    })
  }

  if(loading){
    return null
  }
  return (
    <StyledCart>
       <Link to={`/artwork/detail/${data?.id}`} className="create-nav">
      <div className="card-art-work">               
        <div className="header-card-art-work">
          <div className="date-time">02h 31m 04s left 🔥 </div>
          <img src={Copy} alt=""/>
        </div>
        <div className="wrapper-image">
          <img className="avatar"  src={data.contentUrl}/>
        </div>
        <div className="title">
          LuckySwapStudio {' '}
          <img src={Checkmark} alt=""/>
        </div>
        <div className="number">
          <div>
            {price} LUCKY {' '}
            <img src={Token} alt=""/></div>  
          <img src={Hammer2} alt=""/>
        </div> 
        <div className="rating">
          <Rate disabled defaultValue={2} />
          (15 reviews)
        </div>
        {/* <div className="action-button">
          <Link to="/trade-artwork">
            <ButtonStyle>
              <SwapOutlined />
              {' '} Trade
            </ButtonStyle>
          </Link>
          <Link to="/artwork/detail" className="create-nav"><ButtonBuyStyle>Buy</ButtonBuyStyle></Link>
        </div>
        }
        <div className="or-text">OR</div>
        <div className="action-button justify-center">
          <ButtonStyle className="btn-donate">
            <img src={Hammer} /> 
              Enter auction 
          </ButtonStyle>
        </div> */}
      </div>
      </Link>
    </StyledCart>
  )
}
