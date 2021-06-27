import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import { Row, Col, Tabs } from 'antd'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import useMarketServices from 'services/web3Services/MarketServices'
import _ from 'lodash'
import { getPrice, getCompactString } from 'utils'
import { isMobile } from 'react-device-detect'
export default function OnSaleCard({ data }: any) {
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const marketService = useMarketServices()

  useEffect(() => {
    const getPriceToken = async () => {
      if (data?.tokenId && marketService) {
        if (data?.NFTType == 'buy') {
          const unitPrice = await marketService?.getTokenPrice?.(data?.tokenId)
          const price = getPrice(Number(unitPrice?._hex))
          console.log(unitPrice?._hex)
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
  return (
    <CartStyled>
      <Row gutter={24}>
        <Col
          xl={{ span: 8 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 8 }}
        >
          {data?.type === 'video' ? (
            <video
              muted
              controls
              autoPlay={isMobile ? false : true}
              loop
              className="avatar"
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
        </Col>
        <Col
          className="description"
          xl={{ span: 16 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 16 }}
        >
          <div className="header-card" style={{ marginTop: 10 }}>
            <div className="status">Ready to Sell</div>
            {/* <div className="cancel">
                  Cancel
                </div> */}
          </div>

          <div className="name">{data?.title}</div>
          <div className="number">
            {price} LUCKY <img src={Token} alt="" />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID: </div>
            <div className="number">
              {' '}
              {' ' + getCompactString(data?.TXHash, 6)}
            </div>
          </div>

          {data?.description && (
            <div className="content">{data?.description}</div>
          )}

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
