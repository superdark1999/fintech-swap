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
import { Card, Avatar } from 'antd'
import { SwapOutlined, StarFilled } from '@ant-design/icons'
import useMarketServices from 'services/web3Services/MarketServices'
import { CheckOutlined } from '@ant-design/icons'
// import {getPrice} from 'utils'
import _ from 'lodash'
import Countdown from 'react-countdown'
import { ButtonBuy } from 'components-v2/Button'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from 'wallet/hooks'
import { getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import { isMobile } from 'react-device-detect'
const { Meta } = Card
export default function CardItem(props?: { data?: any }) {
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const history = useHistory()
  const { data } = props
  const { account, chainId } = useActiveWeb3React()
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dayExp, setDayExp] = useState(false)
  const [playVideo, setplayVideo] = useState(true)
  const marketServiceMethod = useMarketServices()
  useEffect(() => {
    const getTokenPrice = async () => {
      if (
        marketServiceMethod &&
        data?.tokenId &&
        data?.NFTType !== 'swap-store'
      ) {
        const price = await marketServiceMethod?.getHighestBidAndPrice(
          data?.tokenId,
          data?.NFTType,
        )
        setPrice(price)
        setLoading(false)
      }
    }
    getTokenPrice()
  }, [data?.tokenId])

  const onSwapItem = () => {
    history.push(`/swap/${data?._id}/step=1`)
  }

  return (
    <div className="create-nav">
      <StyledCart src={data?.contentUrl}>
        <div className="card-art-work">
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}>
            <div className="wrapper-image">
              <div className="gradient-background">
                <div className="title">{data?.title}</div>
              </div>
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
              {/* <ReactFreezeframe ref={useFrameGif} className="avatar"  src={data?.contentUrl}/>      */}
              {data?.type === 'video' ? (
                <video
                  width="300px"
                  height="450px"
                  muted
                  controls
                  autoPlay={isMobile ? false : true}
                  loop
                >
                  <source src={`${data?.contentUrl}#t=0.1`} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="avatar"
                  src={data?.contentUrl}
                  alt=""
                  loading="lazy"
                />
              )}
            </div>
          </Link>
          <div className="wrapper-info">
            <div className="title">
              <Link
                to={`/user-profile/${data.createdBy?.walletAddress}/onstore/readyToSell`}
              >
                <div className="name-artist">
                  <span style={{ fontSize: '10px' }}>Creator by</span>{' '}
                  {data.createdBy.name ? (
                    <a
                      target="_blank"
                      href={embedTokenIdLinkBSCScan(
                        data.tokenId,
                        data?.createdBy?.walletAddress,
                        chainId,
                      )}
                    >
                      {data.createdBy.name}
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      href={embedTokenIdLinkBSCScan(
                        data.tokenId,
                        data?.createdBy?.walletAddress,
                        chainId,
                      )}
                    >
                      {getCompactString(data?.createdBy?.walletAddress, 5)}
                    </a>
                  )}
                  {/* <img src={Checkmark} alt="" /> */}
                </div>
              </Link>
              <div
                className="copy"
                title="copy"
                onClick={() =>
                  handleCopy(
                    `${window.location.href}artwork/detail/${
                      data?.NFTType || 'buy'
                    }/${data?._id}`,
                  )
                }
              >
                {isCopied ? (
                  <span>
                    <CheckOutlined /> copied
                  </span>
                ) : (
                  <>
                    <img src={Copy} alt="copy-artwork" /> Copy
                  </>
                )}
              </div>
            </div>
            <div className="name-artist">
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#333435',
                }}
              >
                Owner by
              </span>
              <a
                target="_blank"
                href={embedTokenIdLinkBSCScan(
                  data.tokenId,
                  data?.contractAddress,
                  chainId,
                )}
              >
                {' '}
                {getCompactString(data?.ownerWalletAddress, 5)}
              </a>
            </div>
            <div className="number">
              {data?.NFTType !== 'swap-store' ? (
                <div>
                  {price} LUCKY <img src={Token} alt="" />
                </div>
              ) : (
                <ButtonBuy className="btn-swap" onClick={onSwapItem}>
                  Swap now
                </ButtonBuy>
              )}
              <div>
                4.8 <StarFilled style={{ color: '#fadb14' }} />{' '}
                <span
                  style={{
                    fontWeight: 'normal',
                    fontSize: 12,
                    color: '#AFBAC5',
                  }}
                >
                  (15)
                </span>{' '}
                {data.NFTType === 'auction' && (
                  <img src={Hammer} alt="auction NFT" title="auction" />
                )}
                {data.NFTType === 'buy' && (
                  <img src={CartGrey} alt="buy NFT" title="buy" />
                )}
              </div>
            </div>
          </div>
        </div>
      </StyledCart>
    </div>
  )
}
