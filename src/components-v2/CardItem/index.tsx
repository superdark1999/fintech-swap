import React, { useState, useEffect, useRef } from 'react'
import { StyledCart } from './styled'
import Copy from 'assets/images/copy.svg'
import Token from 'assets/images/token.svg'
import Hammer from 'assets/images/hammer.svg'
import CartGrey from 'assets/icon/cart-grey.svg'
import { Link } from 'react-router-dom'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import { StarFilled } from '@ant-design/icons'
import useMarketServices from 'services/web3Services/MarketServices'
import { CheckOutlined } from '@ant-design/icons'
import _ from 'lodash'
import Countdown from 'react-countdown'
import { ButtonBuy } from 'components-v2/Button'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from 'wallet/hooks'
import Loading from 'assets/images/loading.gif'
import formatNumber from 'utils/formatNumber'
import moment from 'moment'

import { getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import { isMobile } from 'react-device-detect'
export default function CardItem(props?: any) {
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const history = useHistory()
  const { data, isLazy = false, srcSet, isHideButton } = props
  const { account, chainId } = useActiveWeb3React()
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [playVideo, setplayVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>()
  const marketServiceMethod = useMarketServices()
  const [dayExp, setDayExp] = useState({startTime:0, endTime:0})

  useEffect(() => {
    const getTokenPrice = async () => {
      if (marketServiceMethod && data?.tokenId && data?.NFTType == 'auction') {
        const timeInfo = await marketServiceMethod?.getBidTimeByTokenId?.(
          data?.tokenId,
        )
        const startTime = moment.unix(Number(timeInfo?.[1]))?.valueOf()
        const endTime = moment.unix(Number(timeInfo?.[2]))?.valueOf()

        setDayExp({startTime:startTime>moment()?.valueOf()?startTime:0,endTime:endTime>moment()?.valueOf()?endTime:0})
        setPrice(price)
        setLoading(false)
      }
    }
    getTokenPrice()
  }, [data?.tokenId])

  const onSwapItem = () => {
    history.push(`/swap/${data?._id}/step=1`)
  }
  const renderMedia = () => {
    switch (data?.type) {
      case 'video': {
        return (
          <video
            // playsInline
            width="300px"
            height="450px"
            controls
            muted
            ref={videoRef}
            // className={isLazy ? "lazy" : ""}
            // src={`${data?.contentUrl}`}
            // data-srcset={srcSet}
            // data-src={`${data?.contentUrl}#t=0.1`}
            loop
          >
            <source src={`${data?.contentUrl}#t=0.1`} type="video/mp4"></source>
          </video>
        )
      }
      default:
        return (
          <img
            src={isLazy ? Loading : data?.contentUrl}
            className={isLazy ? 'avatar lazy' : 'avatar'}
            alt=""
            srcSet={isLazy ? '' : srcSet}
            data-srcset={srcSet}
            data-src={data?.contentUrl}
          />
        )
    }
  }

  const renderTime = ()=>{
    if(dayExp?.startTime!=0&&moment().valueOf()<dayExp?.startTime){
      return (<>
            {'Comming in '}
              <Countdown
                onComplete={() => setDayExp({startTime:0,endTime:dayExp?.endTime})}
                date={dayExp?.startTime}
              />{' '}
              🔥
            </> )
    }else if(dayExp?.startTime==0 && dayExp?.endTime!=0 && moment().valueOf()<dayExp?.endTime){
      return (
          <>
            <Countdown
              onComplete={() => setDayExp({startTime:0,endTime:0})}
              date={dayExp?.endTime}
            />{' '}
            🔥{' '}
          </> )
    }else if(dayExp?.endTime==0&&dayExp?.startTime==0){
      return(<>Bid time is over</>)
    }
  }

  useEffect(() => {
    if (videoRef) {
      if (playVideo) {
        videoRef.current && videoRef.current.play()
      } else {
        videoRef.current && videoRef.current.pause()
      }
    }
  }, [playVideo])
  return (
    <div className="create-nav">
      <StyledCart src={data?.contentUrl}>
        <div className="card-art-work">
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}>
            <div
              className="wrapper-image"
              onMouseEnter={() => setplayVideo(true)}
              onMouseLeave={() => setplayVideo(false)}
            >
              <div className="gradient-background">
                <div className="title">{data?.title}</div>
              </div>
              {data.NFTType === 'auction' && (
                <div className="header-card-art-work">
                  <div className="date-time">
                    {renderTime()}
                  </div>
                </div>
              )}
              {/* <ReactFreezeframe ref={useFrameGif} className="avatar"  src={data?.contentUrl}/>      */}
              {renderMedia()}
            </div>
          </Link>
          <div className="wrapper-info">
            <div className="title">
              <Link
                to={`/user-profile/${data.createdBy?.walletAddress}/onstore/readyToSell`}
              >
                <div className="name-artist">
                  <span style={{ fontSize: '10px' }}>Creator</span>{' '}
                  {data.createdBy.name ? (
                    <a
                      target="_blank"
                      href={`${window.location.href}user-profile/${data?.createdBy?.walletAddress}/onstore/readyToSell}`}   
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
            <div className="name-artist-2">
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#333435',
                  }}
                >
                  Owner
                </span>
                <a
                  target="_blank"
                  href={embedTokenIdLinkBSCScan(
                    data.tokenId,
                    data?.ownerWalletAddress,
                    chainId,
                  )}
                >
                  {' '}
                  {getCompactString(data?.ownerWalletAddress, 5)}
                </a>
              </div>
              {data.contentInfo && (
                <span>
                  {data?.contentInfo?.width}x{data?.contentInfo?.height}
                </span>
              )}
            </div>
            <div className="number">
              {isHideButton ? null : data?.NFTType !== 'swap-store' ? (
                <div>
                  {data?.price} LUCKY <img src={Token} alt="" />
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
