import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs } from 'antd'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'

import { useActiveWeb3React } from 'wallet/hooks'
import OnsSaleCard from './OnSaleCard'

import { HeartOutlined } from '@ant-design/icons'
import { margin } from 'polished'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'
export default function MyCollectionCard({ data }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(false)
  const [isProcessing, setIsPrcessing] = useState(true)
  const { isTokenReadyToSell, approveTokenToMarket } = useNFTServices()
  const { setTokenPrice } = useMarketServices()
  const { updateNFTInfo, setPrice } = useArtworkServices()
  useEffect(() => {
    if (data?.tokenId) {
      isTokenReadyToSell(data?.tokenId)
        .then((data) => {
          setIsNFTCanSell(data)
        })
        .catch((err) => console.log(err))

      setIsPrcessing(false)
    }
  }, [data?.tokenId])

  const onSellItem = () => {
    setIsPrcessing(true)
    const tokenId = data?.tokenId

    setIsPrcessing(true)
    setTokenPrice(tokenId, 100)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?._id }).then(({ status }) => {
            if (status == 200) {
              setIsPrcessing(false)
            }
          })
        }
      })
      .finally(() => {
        setIsPrcessing(false)
      })
  }

  const onAllowSellItem = () => {
    setIsPrcessing(true)
    setPrice({ id: data?._id }).then(({ status }) => {
      if (status == 200) {
        setIsPrcessing(false)
      }
    })
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    approveTokenToMarket(tokenId)
      .then((dt) => {
        setTimeout(async () => {
          if (dt.hash) {
            const tempIsNFTCanSell = await isTokenReadyToSell(tokenId)
            setIsNFTCanSell(tempIsNFTCanSell)
            setIsPrcessing(false)
          }
        }, 20000)
      })
      .catch((err) => {
        alert('Something wrong, please try again later.')
        setIsPrcessing(false)
      })
  }
  const renderGroupAction = (status: any) => {
    if (status === 'approved') {
      return (
        <div className="group-button">
          <ButtonTrade height="45px">Send</ButtonTrade>
          {isProcessing ? (
            <ButtonBuy height="45px">Processing...</ButtonBuy>
          ) : isNFTCanSell ? (
            <ButtonBuy height="45px" onClick={onSellItem}>
              {'Sell'}
            </ButtonBuy>
          ) : (
            <ButtonBuy height="45px" onClick={onAllowSellItem}>
              {'Allow to Sell'}
            </ButtonBuy>
          )}
          {/* <ButtonBuy height="45px">Auction</ButtonBuy>
              <ButtonBuy height="45px">Swap</ButtonBuy>
              <ButtonBuy height="45px">Public swap</ButtonBuy> */}
          <ButtonBuy borderRadius="100px" width="40px" height="45px">
            <img src={QRCode} />
          </ButtonBuy>
        </div>
      )
    } else if (status === 'pending') {
      return (
        <div className="group-button">
          <ButtonBuy height="45px">Processing...</ButtonBuy>
          <ButtonBuy borderRadius="100px" width="40px" height="45px">
            <img src={QRCode} />
          </ButtonBuy>
        </div>
      )
    } else if (status === 'reject') {
      return null
    }
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
          className="description space-vehicle"
          xl={{ span: 16 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 16 }}
        >
          <div>
            <div className="name">{data?.title}</div>
            {data?.TXHash && (
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
                  TXHash:{' '}
                </div>
                <div className="number">{data?.TXHash?.slice(1, 20)}...</div>
              </div>
            )}
          </div>
          <div>{renderGroupAction(data?.status)}</div>
        </Col>
      </Row>
    </CartStyled>
  )
}
