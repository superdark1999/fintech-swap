import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import { Row, Col, Tabs } from 'antd'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import useMarketServices from 'services/web3Services/MarketServices'
import _ from 'lodash'
import { getPrice, getCompactString } from 'utils'
import formatNumber from 'utils/formatNumber'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import InfoCard from '../InfoCard'
import QRCodeComp from 'components-v2/QRcode/index'
import {
  ShareAltOutlined,
} from '@ant-design/icons'
export default function OnSaleCard({ data }: any) {
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const marketService = useMarketServices()
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    const getPriceToken = async () => {
      if (data?.tokenId && marketService) {
        if (data?.NFTType == 'buy') {
          const unitPrice = await marketService?.getTokenPrice?.(data?.tokenId)
          const price = getPrice(Number(unitPrice?._hex))
          setPrice(price)
        } else {
          const bidsArr = await marketService?.getBidsByTokenId?.(data?.tokenId)
          const bidsData =
            bidsArr?.map((item: any) => {
              return {
                key: item?.[0] || '',
                address: item?.[0] || '',
                price: Number(item?.[1]?._hex) / Number(1e18),
              }
            }) || []
          const maxPrice =
            _.maxBy(bidsData, (item: any) => item?.price)?.price || 0
          const unitPrice = await marketService?.getTokenBidPrice(data?.tokenId)
          const price = getPrice(unitPrice?._hex)
          if (price > maxPrice) {
            setPrice(price)
          } else {
            setPrice(maxPrice)
          }
        }
      }
    }
    setLoading(false)
    getPriceToken()
  }, [data?.tokenId])

  if (loading) {
    return null
  }
  const renderQRCode = () => {
    return (
      <div
        className="group-button qrCode-wrapper"
        style={{ justifyContent: 'flex-end' }}
      >
        <button className="btn-qrCode" onClick={() => setShowQR(true)}>
          <ShareAltOutlined style={{ fontSize: '24px' }} />
        </button>
      </div>
    )
  }
  return (
    <CartStyled>
      <Row gutter={24} align={'middle'}>
        <Col
          xl={{ span: 5 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 5 }}
        >
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}>
            {data?.type === 'video' ? (
              <video
                muted
                controls
                autoPlay={isMobile ? false : true}
                loop
                className="avatar"
                style={{ objectFit: 'cover' }}
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
          </Link>
        </Col>
        <Col
          className="description"
          xl={{ span: 18 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 18 }}
        >
          {/* <div className="header-card" style={{ marginTop: 10 }}>
            <div className="status">Ready to Sell</div>
            <div className="cancel">
                  Cancel
                </div>
          </div> */}

          <Link
            className="name"
            to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}
          >
            {data?.title}
          </Link>
          <div className="number">
            {formatNumber(price)} LUCKY <img src={Token} alt="" />
          </div>
          <InfoCard value={data}/>
          {renderQRCode()}
          {/* anss */}
        </Col>
      </Row>
      <QRCodeComp
        isShow={showQR}
        setShowQR={setShowQR}
        url={`${window.location.origin}/artwork/detail/${
          data?.NFTType || 'buy'
        }/${data?._id}`}
      />
    </CartStyled>
  )
}
