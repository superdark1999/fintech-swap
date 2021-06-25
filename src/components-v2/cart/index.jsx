import React, { useState, useEffect } from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
import Hammer from 'assets/images/hammer.svg'
import Hammer2 from 'assets/images/hammer2.svg'

import { Link } from 'react-router-dom'

import { Rate } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import useNFTServices, { MARKET_ADDRESS } from 'services/NFTServices'
import useMarketServices, {
  MARKET_ADDRESS,
} from 'services/web3Services/MarketServices'
import useLuckyServices from 'services/web3Services/LuckyServices'
import useUserStore from 'store/userStore'
import { getPrice } from 'utils'
import _ from 'lodash'
import ReactFreezeframe from 'react-freezeframe'
import Countdown from 'react-countdown'
export default function Cart({ data }) {
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const { getTokenPrice } = useMarketServices()
  const [dayExp, setDayExp] = useState(false)
  useEffect(() => {
    if (data?.tokenId) {
      getTokenPrice(data?.tokenId)
        .then((data) => {
          const price = getPrice(Number(data?._hex))
          if (price != -1) {
            setLoading(false)
            setPrice(price)
          }
        })
        .catch((err) => {})
    }
  }, [data?.tokenId])

  if (loading) {
    return null
  }
  return (
    <StyledCart>
      <Link to={`/artwork/detail/${data?._id}`} className="create-nav">
        <div className="card-art-work">
          {!dayExp && data.NFTType === 'auction' && (
            <div className="header-card-art-work">
              <div className="date-time">
                <Countdown
                  onComplete={() => setDayExp(true)}
                  date={Date.now() + Math.floor(Math.random() * 10000000)}
                />{' '}
                🔥{' '}
              </div>
            </div>
          )}
          <img src={Copy} alt="" />
          <div className="wrapper-image">
            <ReactFreezeframe className="avatar" src={data.contentUrl} />
            <img className="avatar" alt="" />
          </div>
          <div className="title">
            LuckySwapStudio <img src={Checkmark} alt="" />
          </div>
          <div className="number">
            <div>
              {price} LUCKY <img src={Token} alt="" />
            </div>
            <img src={Hammer2} alt="" />
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
