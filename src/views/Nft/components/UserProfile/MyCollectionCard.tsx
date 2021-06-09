import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs } from 'antd'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from '../../../../services/ArtworkServices'
import useNFTServices from '../../../../services/NFTServices'
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'

import { HeartOutlined } from '@ant-design/icons'
import { margin } from 'polished'
import _ from 'lodash'

export default function MyCollectionCard({ data }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(false)
  const [isProcessing, setIsPrcessing] = useState(true)
  const { isNFTReadyToSell, approveNFTToMarket, setPriceForNFT } =
    useNFTServices()
  const { updateNFTInfo, setPrice } = useArtworkServices()
  useEffect(() => {
    if (data?.tokenId) {
      isNFTReadyToSell(data?.tokenId)
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
    setPriceForNFT(tokenId, 100)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id }).then(({ status }) => {
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
    setPrice({ id: data?.id }).then(({ status }) => {
      if (status == 200) {
        setIsPrcessing(false)
      }
    })
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    approveNFTToMarket(tokenId)
      .then((dt) => {
        setTimeout(async () => {
          if (dt.hash) {
            const tempIsNFTCanSell = await isNFTReadyToSell(tokenId)
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
          <img className="avatar" src={data?.contentUrl} />
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
