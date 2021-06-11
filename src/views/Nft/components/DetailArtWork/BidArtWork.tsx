import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Table, Modal, Input, Form } from 'antd'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import Checkmark from 'assets/images/checkmark.svg'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import { ButtonStyle, ButtonBuyStyle } from 'components-v2/cart/styled'
import { SwapOutlined } from '@ant-design/icons'
import {
  DetailStyled,
  ReviewStyled,
  ScrollReview,
  FooterStyled,
  ImageStyled,
  DetailTabpane,
} from './styled'
import { dataHistory, columnHistory } from './Mock'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices, {
  MARKET_ADDRESS,
} from 'services/web3Services/MarketServices'
import useLuckyServices from 'services/web3Services/LuckyServices'
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { useParams } from 'react-router-dom'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import {getPrice} from 'utils' 
import _ from 'lodash'
import { InputNumber } from 'antd'
const { TabPane } = Tabs


const DetaiArtWork = ({ id }: any) => {
  const { getDetailNFT, buyItem } = useArtworkServices()
  const { account } = useActiveWeb3React()
  const [NFTDetail, setNFTDetail] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [isSelled, setIsSelled] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [userState, userActions] = useUserStore()
  const {
    getTokenPrice,
    buyToken,
    bidToken,
    getBidsByTokenId,
    updateBidPrice,
  } = useMarketServices()
  const { approveLevelAmount } = useLuckyServices()
  const [isProcessing, setIsProccessing] = useState(false)
  const [isShowModalSetPrice, setIsShowModalSetPrice] = useState(false)
  const [isReadyBid, setIsReadyBid] = useState(false)
  const [nextStepOffer, setStepNextOffer] = useState<number>(1)
  useEffect(() => {
    if (account) {
      getDetailNFT({ id }).then(({ status, data }) => {
        if (status == 200) {
          if (data?.data?.tokenId) {
            if (account) {
              getBidsByTokenId(data?.data?.tokenId).then((data) => {
                const bidsData =
                  data?.map((item: any) => {
                    return {
                      key: item?.[1] || '',
                      address: item?.[0] || '',
                    }
                  }) || []
                setIsReadyBid(
                  !!bidsData.find((it: any) => it.address == account),
                )
              })
            }
            getTokenPrice(data?.data?.tokenId)
              .then((data) => {
                const price = getPrice(data?._hex)
                console.log(data)
                if (price != -1) {
                  setLoading(false)
                  setPrice(price)
                }
              })
              .catch((err) => {})
          }
          setNFTDetail(data?.data)
          setLoading(false)
        }
      })
    }
  }, [])
  const onApproveBuyOnMarket = () => {
    setIsProccessing(true)
    approveLevelAmount(MARKET_ADDRESS)
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        setIsProccessing(false)
      })
  }
  const onBidItem = (e: any) => {
    if (!account) {
      return alert('Unblock your wallet to buy this item')
    }
    if (account === NFTDetail.ownerWalletAddress) {
      return alert(`You can't buy your item`)
    }
    setIsProccessing(true)
    if (isReadyBid) {
      const { lucky } = e
      updateBidPrice(NFTDetail?.tokenId, lucky)
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          alert(err?.message || '')
        })
    } else {
      const { lucky } = e
      bidToken(NFTDetail?.tokenId, lucky)
        .then((data) => {})
        .catch((err) => {
          alert(err?.message || '')
        })
    }
    setIsShowModalSetPrice(false)
  }

  const onBuyItem = () => {
    return buyItem({
      id: id,
      walletAddress: account,
    })
      .then(({ status }) => {
        if (status == 200) {
          setIsSelled(true)
          setIsProccessing(false)
        }
      })
      .catch(() => {
        setIsProccessing(false)
      })
    if (!account) {
      return alert('Unblock your wallet to buy this item')
    }
    if (account === NFTDetail.ownerWalletAddress) {
      return alert(`You can't buy your item`)
    }
    setIsProccessing(true)
    const tokenId = NFTDetail?.tokenId
    buyToken(tokenId)
      .then((dt) => {
        if (dt?.hash) {
          buyItem({
            id: id,
            walletAddress: account,
          })
            .then(({ status }) => {
              if (status == 200) {
                setIsSelled(true)
                setIsProccessing(false)
              }
            })
            .catch(() => {
              setIsProccessing(false)
            })
        }
      })
      .catch(() => {
        setIsProccessing(false)
      })
  }
  const onPlaceBid = (value: any) => {
    console.log('value: ', value)
  }
  const renderFooter = () => {
    if (isSelled) return null
    if (isProcessing) {
      return (
        <FooterStyled>
          <ButtonBuyStyle onClick={onBuyItem}>Processing...</ButtonBuyStyle>
        </FooterStyled>
      )
    }
    if (!account) {
      return (
        <FooterStyled>
          <ButtonStyle>
            <SwapOutlined /> Auction
          </ButtonStyle>
          <ButtonBuyStyle onClick={onBuyItem}>Buy</ButtonBuyStyle>
        </FooterStyled>
      )
    }
    if (userState?.isCanBuy) {
      return (
        <FooterStyled>
          <ButtonStyle onClick={() => setIsShowModalSetPrice(true)}>
            <SwapOutlined /> Auction
          </ButtonStyle>
          <ButtonBuyStyle onClick={onBuyItem}>Buy</ButtonBuyStyle>
        </FooterStyled>
      )
    }
    if (!userState?.isCanBuy) {
      return (
        <ButtonBuyStyle onClick={onApproveBuyOnMarket}>
          Allow to buy
        </ButtonBuyStyle>
      )
    }
  }

  return (
    <Row>
      <Col
        className="gutter-row"
        style={{ width: '100%' }}
        xl={{ span: 16 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <ImageStyled bgImage={NFTDetail?.contentUrl}>
          <div className="bg-image"></div>
          <img src={NFTDetail?.contentUrl} />
        </ImageStyled>
      </Col>
      <Col
        className="gutter-row"
        // style={{position: 'relative'}}
        xl={{ span: 8 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <DetailStyled>
          <div className="header-detail">
            <div className="date-time">02h 31m 04s left 🔥 </div>
            <div className="social-icon">
              <img src={Facebook} alt="" />
              <img src={Telegram} alt="" />
              <img src={Copy} alt="" />
            </div>
          </div>

          <p className="title">{NFTDetail?.title}</p>

          <div className="token">
            {price} LUCKY
            <img src={Token} alt="" />
          </div>
          <div className="token">
            Current Bid:{price} LUCKY
            <img src={Token} alt="" />
          </div>
          <div className="next-auction">Place bid:</div>
          <div className="price-next-auction">
            <span className="label-price">
              {price * nextStepOffer} <img src={Token} alt="" /> LUCKY
            </span>
            <span style={{ fontWeight: 'bold', margin: '0 10px' }}> X </span>
            <InputNumber
              min={1}
              defaultValue={nextStepOffer}
              onChange={(e: any) => setStepNextOffer(e)}
            />
          </div>

          <div className="rating">
            <Rate disabled defaultValue={2} />
            (15 reviews)
          </div>

          <p className="description">{NFTDetail?.description || ''}</p>

          <p className="organize">
            <img src={Luckyswap} />
            <span className="name">LuckySwapStudio</span>
            <img src={Checkmark} />
          </p>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail" key="1">
              <DetailTabpane>
                <div className="group-info">
                  <div className="info">
                    <div className="title">NFT Contract ID:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.contractAddress}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Token ID:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.tokenId}
                    </a>
                  </div>
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Creator's Adress:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.createdBy}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Owner Adress:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.ownerWalletAddress}
                    </a>
                  </div>
                </div>
              </DetailTabpane>
            </TabPane>

            <TabPane tab="History" key="2">
              <Table
                columns={columnHistory}
                dataSource={dataHistory}
                size="middle"
                scroll={{ x: 'calc(300px + 50%)', y: 240 }}
              />
            </TabPane>
            <TabPane tab="Bidding" key="3">
              <BiddingTable NFTInfo={NFTDetail} />
            </TabPane>
            <TabPane tab="Reviews" key="4">
              <ScrollReview className="list-review">
                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>
              </ScrollReview>
            </TabPane>
          </Tabs>

          <Row
            gutter={24}
            style={{
              position: 'fixed',
              width: '100%',
              bottom: 0,
              left: 0,
              justifyContent: 'flex-end',
              marginLeft: 0,
              marginRight: 0,
              zIndex: 2,
            }}
          >
            <Col
              xl={{ span: 8 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              style={{
                position: 'unset',
                width: '100%',
                bottom: 0,
                padding: 0,
              }}
            >
              {renderFooter()}
              <Modal
                title="Set price"
                visible={isShowModalSetPrice}
                onCancel={() => setIsShowModalSetPrice(false)}
                footer={null}
                width={400}
              >
                <Form onFinish={onPlaceBid}>
                  <Form.Item name="pricePlaceBid">
                    <label>
                      * You will place bid for this NFT is :{' '}
                      <b>{price * nextStepOffer} LUCKY</b>{' '}
                      <img src={Token} alt="" />
                    </label>
                  </Form.Item>
                  <Form.Item>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <ButtonTrade type="submit">Confirm</ButtonTrade>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>
            </Col>
          </Row>
        </DetailStyled>
      </Col>
    </Row>
  )
}

const BiddingTable = ({ NFTInfo }: any) => {
  const { getBidsByTokenId } = useMarketServices()
  const [bids, setBids] = useState([])
  const { account } = useActiveWeb3React()
  useEffect(() => {
    if (NFTInfo?.tokenId) {
      getBidsByTokenId(NFTInfo?.tokenId).then((data) => {
        const bidsData = data.map((item: any) => {
          return {
            key: item?.[1] || '',
            address: item?.[0] || 'aaaa',
            price: Number(item?.[1]?._hex) / Number(1e18),
          }
        })
        setBids(bidsData)
      })
    }
  }, [])
  const columnBidding =
    NFTInfo?.ownerWalletAddress === account
      ? [
          {
            title: 'Address',
            dataIndex: 'address',
            width: 100,
            render: (address: String) => (
              <a className="value" href="/" target="_blank">
                {address}
              </a>
            ),
          },
          {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
            render: (price: Number) => (
              <div className="token">
                {price} LUCKY
                <img src={Token} alt="" />
              </div>
            ),
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, record: any) => (
              <ButtonTrade
                onClick={(check) => {
                  console.log(record)
                }}
              >
                Confirm
              </ButtonTrade>
            ),
            width: 100,
          },
        ]
      : [
          {
            title: 'Address',
            dataIndex: 'address',
            width: 150,
            render: (address: String) => (
              <a className="value" href="/" target="_blank">
                {address}
              </a>
            ),
          },
          {
            title: 'Price',
            dataIndex: 'price',
            width: 150,
            render: (price: Number) => (
              <div className="token">
                {price} LUCKY
                <img src={Token} alt="" />
              </div>
            ),
          },
        ]
  return (
    <Table
      columns={columnBidding}
      dataSource={bids}
      size="middle"
      scroll={{ x: 300, y: 300 }}
    />
  )
}

export default DetaiArtWork
