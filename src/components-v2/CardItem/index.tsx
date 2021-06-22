import React, { useState, useEffect, useRef } from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
// import Hammer from 'assets/images/hammer.svg'
import Hammer from 'assets/images/hammer.svg'
import CartGrey from 'assets/icon/cart-grey.svg'
import Trade from 'assets/icon/trade.svg'
// import ReactFreezeframe from 'react-freezeframe';
import { Link } from 'react-router-dom'
// import useConfigStore from 'store/configStore'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import { Card, Avatar } from 'antd';
import { SwapOutlined, StarFilled } from '@ant-design/icons'
import useMarketServices from 'services/web3Services/MarketServices'
import { CheckOutlined } from '@ant-design/icons'
// import {getPrice} from 'utils'
import _ from 'lodash'
import Countdown from "react-countdown";
import { ButtonBuy } from 'components-v2/Button'
const { Meta } = Card;
export default function CardItem(props?: { data?: any }) {
  const [isCopied, handleCopy] = useCopyToClipboard(3000);
  const { data } = props
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dayExp, setDayExp] = useState(false)
  const marketServiceMethod = useMarketServices()
  useEffect(() => {
    const getTokenPrice = async () => {
      if (marketServiceMethod && data?.tokenId && data?.NFTType) {
        const price = await marketServiceMethod?.getHighestBidAndPrice(data?.tokenId, data?.NFTType)
        setPrice(price)
        setLoading(false)
      }
    }
    getTokenPrice()
  }, [data?.tokenId])
  // 
  // useEffect(()=>{
  //   configState.isUsingAnimation&&useFrameGif.current.start()
  //    !configState.isUsingAnimation&&useFrameGif.current.stop()
  // },[configState.isUsingAnimation])
  return (
    <div className="create-nav">
      <StyledCart src={data?.contentUrl}>
        <div className="card-art-work">
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?.id}`}>
            <div className="wrapper-image">
              <div className="gradient-background"><div className="title">{data?.title}</div></div>
              {!dayExp && data.NFTType === 'auction' && <div className="header-card-art-work">
                <div className="date-time"><Countdown onComplete={() => setDayExp(true)} date={Date.now() + Math.floor(Math.random() * 10000000)} /> 🔥 </div>
              </div>}
              {/* <ReactFreezeframe ref={useFrameGif} className="avatar"  src={data?.contentUrl}/>      */}
              {data?.type === 'video' ?
                <video width="300" height="450" autoPlay muted><source src={data?.contentUrl} type="video/mp4" /></video>
                : <img className="avatar" src={data?.contentUrl} alt="" loading="lazy" />
              }
            </div>
          </Link>
          <div className="wrapper-info">
            <div className="title">
              <Link to="/user-profile/:id/onsale/readyToSell">
                <div className="name-artist">
                  LuckySwapStudio {' '}
                  <img src={Checkmark} alt="" />
                </div>
              </Link>
              <div className="copy" onClick={() => handleCopy(`${window.location.href}artwork/detail/${data?.NFTType || 'buy'}/${data?.id}`)}>
                {isCopied ? <span><CheckOutlined /> copied</span> : <><img src={Copy} alt="copy-artwork" /> Copy</>}
              </div>
            </div>
            <div className="number">
              {data?.NFTType !== 'swap' ? <div>
                {price} LUCKY {' '}
                <img src={Token} alt="" />
              </div> : <ButtonBuy className="btn-swap">Swap now</ButtonBuy>}
              <div>
                4.8
                {' '}
                <StarFilled style={{ color: '#fadb14' }} />
                {' '}
                <span style={{ fontWeight: 'normal', fontSize: 12, color: '#AFBAC5' }}>(15)</span>
                {' '}
                {data.NFTType === 'auction' && <img src={Hammer} alt="auction NFT" />}
                {data.NFTType === 'buy' && <img src={CartGrey} alt="buy NFT" />}
                {data.NFTType === 'swap' && <span></span>}
              </div>
            </div>
          </div>
        </div>
      </StyledCart>
    </div>
  )
}

