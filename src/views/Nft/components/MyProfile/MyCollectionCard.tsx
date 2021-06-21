import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs, Modal, Input, Form, Button, Radio, Menu, Dropdown } from 'antd'
import { DownOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import StatusBar from 'components-v2/StatusBar'
import { ButtonTrade, ButtonBuy, ButtonCancel } from 'components-v2/Button'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import { Alert } from 'antd'
import notification from 'components-v2/Alert';
import { getCompactString } from 'utils'

export default function MyCollectionCard({ data, option }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(false)
  const [isProcessing, setIsPrcessing] = useState(false)
  const [ruleAuctionModal, setRuleAuctionModal] = useState(false)
  const [approvingMarket, setApprovingMarket] = useState(false)
  const NFTServicesMethod = useNFTServices()
  const marketServicesMethod = useMarketServices()
  const { setPrice } = useArtworkServices()
  const history = useHistory()

  const formRef = useRef()

  const [lucky, setLucky] = useState()
  const [isShowModalSetPrice, setShowModalsetPrice] = useState(false)

  useEffect(() => {
    if (data?.tokenId && NFTServicesMethod) {
      NFTServicesMethod?.isTokenReadyToSell(data?.tokenId)
        .then((data) => {
          setIsNFTCanSell(data)
        })
        .catch((err) => console.log(err))
    }
  }, [data?.tokenId])

  const onSellItem = (value: any) => {
    setIsPrcessing(true)
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    marketServicesMethod?.setTokenPrice(tokenId, value.lucky)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id, NFTType: 'buy' }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              notification('error', { message: 'Error', description: 'Something when wrong, please try again later.' })
              setIsPrcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsPrcessing(false)
      })
    setShowModalsetPrice(false)
  }

  const onAllowSellItem = () => {
    const tokenId = data?.tokenId
    setApprovingMarket(true)
    setIsPrcessing(true)
    NFTServicesMethod?.approveTokenToMarket(tokenId)
      .then(
        _.debounce(async (dt) => {
          if (dt.hash) {
            const tempIsNFTCanSell = await NFTServicesMethod?.isTokenReadyToSell(tokenId)
            setIsNFTCanSell(tempIsNFTCanSell)
            setIsPrcessing(false)
            setApprovingMarket(false)
          }
        }, 20000)
      )
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsPrcessing(false)
        setApprovingMarket(false)
        setIsPrcessing(false)
      })
  }
  const onSubmitRuleAuction = (value: any) => {
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    marketServicesMethod?.setTokenBidInfo(tokenId, value.price, value.stepPrice)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id, NFTType: 'auction' }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              notification('error', { message: 'Error', description: 'Something when wrong, please try again later.' })
              setIsPrcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsPrcessing(false)
      })
    setRuleAuctionModal(false)
  }

  const renderQRCode = () => {
    return (
      <button className="btn-qrCode">
        <img src={QRCode} />
      </button>
    )
  }
  const renderGroupAction = (status: any) => {
    if (status === 'approved') {
      return (
        <div className="group-button">
          {!isNFTCanSell && !approvingMarket && (
            <>
              <ButtonBuy height="40px">Transfer</ButtonBuy>
            </>
          )}
          {isNFTCanSell && !isProcessing && (
            <>
              <ButtonBuy height="40px" onClick={() => { setShowModalsetPrice(true) }}>
                Sell
              </ButtonBuy>
              <ButtonBuy height="40px" onClick={() => setRuleAuctionModal(true)}>
                Auction
              </ButtonBuy>
            </>
          )}
          {approvingMarket && !isNFTCanSell && (
            <>
              <ButtonTrade height="40px" className="disabled">Sell</ButtonTrade>
              <ButtonTrade height="40px" className="disabled">Auction</ButtonTrade>
            </>
          )}
          {renderQRCode()}
        </div>
      )
    } else if (status === 'readyToSell') {
      return (
        <div className="group-button">
          <ButtonCancel height="40px" style={{ background: '#FC636B', border: 'none', color: '#fff' }}>Cancel</ButtonCancel>
          {renderQRCode()}
        </div>
      )
    } else if (status === 'reject') {
      return null
    }
  }

  const renderActionItem = () => {
    return (
      <div className="group-btn-action">
        {(isProcessing || option === 'pending' || approvingMarket) && (<StatusBar type='processing' label="processing" />)}
        {!isNFTCanSell && !approvingMarket && data?.status == 'approved' && (
          <Dropdown className="dropdown-action" overlay={menu}>
            <Button>
              Public NFT<DownOutlined />
            </Button>
          </Dropdown>
        )}
      </div>
    )
  }
  const handleMenuClick = (dt: any) => {
    if (dt.key === 'public_to_store') {
      onAllowSellItem()
    } else {
      notification('info', { message: 'Announce', description: 'This feature will comming soon' })
    }
  }
  // menu dropdown choose allow to sell
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="public_to_store" >
        Public to store
      </Menu.Item>
      <Menu.Item key="public_to_swap" >
        Public to swap store
      </Menu.Item>
    </Menu>
  );
  const onCancel = () => {

  }
  //render status from API
  return (
    <CartStyled>
      <Row gutter={24}>
        <Col
          xl={{ span: 8 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 8 }}
        >
          {data.type === 'video' ? (
            <video width="100%" controls muted>
              <source src={data?.contentUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <img className="avatar" src={data?.contentUrl} />
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
            <div className="header-card">
              <div className="name">{data?.title}</div>
              {renderActionItem()}
            </div>
            {data?.TXHash && (
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
                  ID: {' '}
                </div>
                <a href="#" target="_blank" className="number">{getCompactString(data?.TXHash, 10)}</a>
              </div>
            )}
            <div style={{ color: '#AFBAC5', fontWeight: 600, textTransform: 'capitalize' }}>
              Type: {data?.type}
            </div>
          </div>
          <div>{renderGroupAction(data?.status)}</div>
        </Col>
      </Row>

      <Modal
        title="Set price"
        visible={isShowModalSetPrice}
        onCancel={() => setShowModalsetPrice(false)}
        footer={null}
        width={400}
      >
        <Form ref={formRef} onFinish={onSellItem}>
          <Form.Item
            name="lucky"
            label="Price"
            rules={[{ required: true, message: 'This Field is required!' }]}
          >
            <Input
              style={{ borderRadius: '16px', overflow: 'hidden' }}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonTrade htmlType="submit">Submit</ButtonTrade>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Set price"
        visible={ruleAuctionModal}
        onCancel={() => setRuleAuctionModal(false)}
        footer={null}
        width={400}
        style={{ borderRadius: 16 }}
      >
        <Form ref={formRef} onFinish={onSubmitRuleAuction}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'This Field is required' }]}
          >
            <Input
              style={{ borderRadius: '16px', overflow: 'hidden' }}
              placeholder="Enter NFT auction price"
            />
          </Form.Item>
          <Form.Item
            name="stepPrice"
            label="Price Step"
            rules={[{ required: true, message: 'This Field is required' }]}
          >
            <Input
              style={{ borderRadius: '16px', overflow: 'hidden' }}
              placeholder="Enter step price of NFT"
            />
          </Form.Item>
          <p><span style={{ color: 'red' }}>*</span> <b>Note</b>:The price step is the way to calculate the price increase for each offer NFT</p>
          <p>Example: NFT has a current price of 300 LUCKY and a price step of 100 LUCKY</p>
          <p>then the purchase price after that is 400 LUCKY</p>
          <Form.Item>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonTrade htmlType="submit">Submit</ButtonTrade>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </CartStyled>
  )
}
