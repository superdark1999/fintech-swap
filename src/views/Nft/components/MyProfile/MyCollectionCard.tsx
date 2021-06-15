import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs, Modal, Input, Form, Button, Radio,Menu, Dropdown } from 'antd'
import { DownOutlined,SyncOutlined,CheckOutlined} from '@ant-design/icons';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import StatusBar from 'components-v2/StatusBar'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useHistory } from 'react-router-dom'
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import { Alert } from 'antd'

export default function MyCollectionCard({ data }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(false)
  const [isProcessing, setIsPrcessing] = useState(true)
  const [ruleAuctionModal, setRuleAuctionModal] = useState(false)
  const { isTokenReadyToSell, approveTokenToMarket } = useNFTServices()
  const { setTokenPrice, setTokenBidInfo } = useMarketServices()
  const { updateNFTInfo, setPrice } = useArtworkServices()
  const history = useHistory()

  const formRef = useRef()

  const [lucky, setLucky] = useState()
  const [isShowModalSetPrice, setShowModalsetPrice] = useState(false)

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

  const showModalSetProcePrice = () => {
    setShowModalsetPrice(true)
  }

  const onSellItem = (value: any) => {
    setIsPrcessing(true)
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    setTokenPrice(tokenId, value.lucky)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id, NFTType:'buy'  }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              alert('Something when wrong, please try again later.')
              setIsPrcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        alert('Something when wrong, please try again later.')
        setIsPrcessing(false)
      })
    setShowModalsetPrice(false)
  }

  const onAllowSellItem = () => {
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
  const onSubmitRuleAuction = (value: any) => {
    setIsPrcessing(true)
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    setTokenBidInfo(tokenId, value.price, value.stepPrice)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id,NFTType:'auction' }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              alert('Something when wrong, please try again later.')
              setIsPrcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
        alert('Something when wrong, please try again later.')
        setIsPrcessing(false)
      })
    setRuleAuctionModal(false)
  }
  const renderGroupAction = (status: any) => {
    if (status === 'approved') {
      return (
        <div className="group-button">
          <ButtonBuy height="40px">Transfer</ButtonBuy>
          {isProcessing ? (
            <ButtonBuy height="40px">Processing...</ButtonBuy>
          ) : isNFTCanSell ? (
            <>
              <ButtonBuy height="40px" onClick={showModalSetProcePrice}>
                Sell
              </ButtonBuy>
              <ButtonBuy height="40px" onClick={() => setRuleAuctionModal(true)}>
                Auction
              </ButtonBuy>
            </>
          ) : (
            <ButtonBuy height="40px" onClick={onAllowSellItem}>
              {'Allow to Sell'}
            </ButtonBuy>
          )}
          {/* <ButtonBuy height="40px">Swap</ButtonBuy>
              <ButtonBuy height="40px">Public swap</ButtonBuy> */}
          <button className="btn-qrCode">
            <img src={QRCode} />
          </button>
        </div>
      )
    } else if (status === 'pending') {
      return (
        <div className="group-button">
          <ButtonBuy height="40px">Processing...</ButtonBuy>
          <button className="btn-qrCode">
            <img src={QRCode} />
          </button>
        </div>
      )
    } else if (status === 'reject') {
      return null
    }
  }
  const handleMenuClick = () =>{

  }
  // menu dropdown choose allow to sell
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" >
        Allow to sell
      </Menu.Item>
      <Menu.Item key="2" >
      Allow to swap
      </Menu.Item>
    </Menu>
  );
    console.log(data);

  const onCancel = ()=>{

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
            <video width="100%" controls>
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
              <div className="group-btn-action">
                {/* two case is drop and cancel */}
              {
              isProcessing ?
              true?<Dropdown className="dropdown-action" overlay={menu}>
                <Button>
                  Allow to sell <DownOutlined />
                </Button>
              </Dropdown>:<div className="cancel-action" onClick={onCancel}> Cancel</div>
              :
              // render status of card
              <StatusBar type='processing' label="processing"/>
              }
              </div>
            </div>
            {data?.TXHash && (
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
                  ID: {' '}
                </div>
                <a href="#" target="_blank" className="number">{data?.TXHash?.slice(1, 20)}...</a>
              </div>
            )}
            <div style={{ color: '#AFBAC5', fontWeight: 600,    textTransform: 'capitalize' }}>
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
                label="Step Price"
                rules={[{ required: true, message: 'This Field is required' }]}
              >
                <Input
                  style={{ borderRadius: '16px', overflow: 'hidden' }}
                  placeholder="Enter step price of NFT"
                />
              </Form.Item>
              <p>* Note:Step price is</p>
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
