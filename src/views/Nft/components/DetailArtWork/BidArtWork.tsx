import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Table, Modal, Input, Form, Image } from 'antd'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import CountVisit from './CountVisit'
import {
  SwapOutlined,
  CloseOutlined,
  StarFilled,
  CheckOutlined,
  PlusCircleFilled,
  MinusCircleFilled,
} from '@ant-design/icons'
import {
  DetailStyled,
  ImageStyled,
  OwenedBy,
  HeaderStyled,
  VideoStyled,
} from './styled'
import { isMobile } from 'react-device-detect'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useLuckyServices from 'services/web3Services/LuckyServices'
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import { getPrice } from 'utils'
import { BINANCE_CONFIG } from 'configs'
import formatNumber from 'utils/formatNumber'
import _ from 'lodash'
import Hammer from 'assets/images/hammer.svg'
import { Link } from 'react-router-dom'
import notification from 'components-v2/Alert'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import TableHistory from './TableHistory'
import Countdown from 'react-countdown'
import moment from 'moment'
import { useHookDetail } from './Store'
import BiddingTable from './BiddingTable'
import NFTInformation from './NFTInformation'
import Reviews from './Reviews'

const { TabPane } = Tabs

const DetaiArtWork = ({ id }: any) => {
  const { MARKET_ADDRESS } = BINANCE_CONFIG
  const { getDetailNFT, buyItem } = useArtworkServices()
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const { account, chainId } = useActiveWeb3React()
  const [NFTDetail, setNFTDetail] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [isSelled, setIsSelled] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [bidsData, setBidsData] = useState([])
  const [stateDetail, actionsDetail] = useHookDetail()
  const [userState, userActions] = useUserStore()
  const marketServicesMethod = useMarketServices()
  const [step, setStep] = useState(0)
  const luckyServicesMethod = useLuckyServices()
  const [isProcessing, setIsProccessing] = useState(false)
  const [isShowModalSetPrice, setIsShowModalSetPrice] = useState(false)
  const [isReadyBid, setIsReadyBid] = useState(false)
  const [nextStepOffer, setStepNextOffer] = useState<number>(1)
  const [dayExp, setDayExp] = useState({ startTime: 0, endTime: 0 })

  useEffect(() => {
    getDetailNFT({ id }).then(({ status, data }) => {
      if (status == 200) {
        if (data?.data?.tokenId && marketServicesMethod) {
          //get highest bid price
          const getBidInfoToken = async () => {
            try {
              const bidsArr = await marketServicesMethod?.getBidsByTokenId?.(
                data?.data?.tokenId,
              )

              const stepPriceUnit = await marketServicesMethod?.getStepPrice?.(
                data?.data?.tokenId,
              )
              const timeInfo =
                await marketServicesMethod?.getBidTimeByTokenId?.(
                  data?.data?.tokenId,
                )
              const startTime = moment.unix(Number(timeInfo?.[1]))?.valueOf()
              const endTime = moment.unix(Number(timeInfo?.[2]))?.valueOf()

              setDayExp({
                startTime: startTime > moment()?.valueOf() ? startTime : 0,
                endTime: endTime > moment()?.valueOf() ? endTime : 0,
              })
              setStep(getPrice(stepPriceUnit._hex))
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
              const unitPrice = await marketServicesMethod?.getTokenBidPrice?.(
                data?.data?.tokenId,
              )
              const price = getPrice(unitPrice?._hex)
              setBidsData(bidsData.filter((it: any) => it.price > price))
              if (price > maxPrice) {
                setPrice(price)
              } else {
                setPrice(maxPrice)
              }
              if (account)
                setIsReadyBid(
                  !!bidsData.find((it: any) => it.address == account),
                )
            } catch (err) {}
          }
          getBidInfoToken()
        }
        setNFTDetail(data?.data)
      }
    })
  }, [])
  const onApproveBuyOnMarket = () => {
    userActions?.updateUserInfo({ isProcessingCanBuy: true })
    luckyServicesMethod
      ?.approveLevelAmount?.(MARKET_ADDRESS)
      .then()
      .catch(() => {
        notification('error', {
          message: 'Error',
          description: `Something went wrong please try again`,
        })
        userActions?.updateUserInfo({ isProcessingCanBuy: false })
      })
  }

  const refreshingBids = async () => {
    const bidsArr = await marketServicesMethod?.getBidsByTokenId(
      NFTDetail?.tokenId,
    )
    const bidsData =
      bidsArr?.map((item: any) => {
        return {
          key: item?.[1] || '',
          address: item?.[0] || '',
          price: Number(item?.[1]?._hex) / Number(1e18),
        }
      }) || []
    const maxPrice = _.maxBy(bidsData, (item: any) => item?.price)?.price || 0
    return { bidsData, maxPrice }
  }

  const refreshingAfterCancelBid = () => {
    refreshingBids().then(({ bidsData, maxPrice }) => {
      notification('success', {
        message: 'Success',
        description: 'You cancel bid this NFT',
      })
      if (maxPrice) {
        setPrice(maxPrice)
      }
      setIsProccessing(false)
      setBidsData(bidsData)
      setIsReadyBid(true)
    })
  }

  const onSetProccessing = (value: boolean) => {
    setIsProccessing(value)
  }

  const onBidItem = (e: any) => {
    if (!account) {
      return alert('Unblock your wallet to buy this item')
    }
    if (!marketServicesMethod) return
    const bidPrice = price + step * nextStepOffer
    setIsProccessing(true)
    notification('warn', {
      message: 'Your action is on processing',
      description: '',
    })
    if (isReadyBid) {
      marketServicesMethod
        ?.updateBidPrice(NFTDetail?.tokenId, bidPrice)
        .then(
          _.debounce(() => {
            refreshingBids().then(({ bidsData, maxPrice }) => {
              notification('success', {
                message: 'Success',
                description: 'You bid NFT successful',
              })
              if (maxPrice) {
                setPrice(maxPrice)
              }
              setIsProccessing(false)
              setBidsData(bidsData)
            })
          }, 30000),
        )
        .catch((err) => {
          setIsProccessing(false)
          notification('error', { message: 'Error', description: err.message })
        })
    } else {
      marketServicesMethod
        ?.bidToken(NFTDetail?.tokenId, bidPrice)
        .then(
          _.debounce(() => {
            refreshingBids().then(({ bidsData, maxPrice }) => {
              notification('success', {
                message: 'Success',
                description: 'You bid NFT successful',
              })
              if (maxPrice) {
                setPrice(maxPrice)
              }
              setIsProccessing(false)
              setBidsData(bidsData)
              setIsReadyBid(true)
            })
          }, 30000),
        )
        .catch((err) => {
          setIsProccessing(false)
          notification('error', { message: 'Error', description: err.message })
        })
    }

    setIsShowModalSetPrice(false)
  }

  const renderButton = () => {
    if (isSelled || account === NFTDetail.ownerWalletAddress) return null
    if (isProcessing || userState?.isProcessingCanBuy) {
      return <ButtonProccesing />
    }
    if (!account) {
      return (
        <ButtonTrade
          onClick={() =>
            notification('error', {
              message: 'Error',
              description: `Unblock your wallet to bid this item`,
            })
          }
        >
          <SwapOutlined /> Play Bid
        </ButtonTrade>
      )
    }
    if (
      userState?.isCanBuy &&
      dayExp?.startTime == 0 &&
      dayExp?.endTime != 0 &&
      moment().valueOf() < dayExp?.endTime
    ) {
      return (
        <ButtonTrade onClick={() => setIsShowModalSetPrice(true)}>
          <SwapOutlined /> Play Bid
        </ButtonTrade>
      )
    }
    if (!userState?.isCanBuy) {
      return <ButtonBuy onClick={onApproveBuyOnMarket}>Allow to buy</ButtonBuy>
    }
  }
  const renderTime = () => {
    if (dayExp?.startTime != 0 && moment().valueOf() < dayExp?.startTime) {
      return (
        <>
          {'Coming in '}
          <Countdown
            onComplete={() =>
              setDayExp({ startTime: 0, endTime: dayExp?.endTime })
            }
            date={dayExp?.startTime}
          />{' '}
          🔥
        </>
      )
    } else if (
      dayExp?.startTime == 0 &&
      dayExp?.endTime != 0 &&
      moment().valueOf() < dayExp?.endTime
    ) {
      return (
        <>
          <Countdown
            onComplete={() => setDayExp({ startTime: 0, endTime: 0 })}
            date={dayExp?.endTime}
          />{' '}
          🔥{' '}
        </>
      )
    } else if (dayExp?.endTime == 0 && dayExp?.startTime == 0) {
      return <>Bid time is over</>
    }
  }

  const priviousPage = () => {
    window.history.back()
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
        <HeaderStyled className="header-detail">
          <Row align="middle">
            <div className="social-icon">
              {/* <Link to="/"> */}
              <CloseOutlined className="icon" onClick={priviousPage} />
              {/* </Link> */}
            </div>
            <div className="date-time">{renderTime()}</div>
            <div className="rating">
              4.8 <StarFilled style={{ color: '#fadb14' }} />{' '}
              <span
                style={{ fontWeight: 'normal', fontSize: 12, color: '#AFBAC5' }}
              >
                (15)
              </span>{' '}
              <img src={Hammer} alt="" />
            </div>
          </Row>

          {!isMobile && (
            <div className="social-icon">
              <div className="icon">
                <img src={Facebook} alt="" />
              </div>
              <div className="icon">
                <img src={Telegram} alt="" />
              </div>
              <div
                className="icon"
                onClick={() =>
                  handleCopy(
                    `${window.location.origin}/artwork/detail/${NFTDetail?.NFTType}/${NFTDetail?._id}`,
                  )
                }
              >
                {isCopied ? (
                  <span>
                    <CheckOutlined />
                  </span>
                ) : (
                  <img src={Copy} alt="copy-artwork" />
                )}
              </div>
            </div>
          )}
        </HeaderStyled>
        {NFTDetail?.type === 'video' ? (
          <VideoStyled>
            <div className="bg-image"></div>
            <video autoPlay muted controls>
              <source src={NFTDetail?.contentUrl} type="video/mp4" />
            </video>
          </VideoStyled>
        ) : (
          <ImageStyled bgImage={NFTDetail?.contentUrl}>
            <div className="bg-image"></div>
            {/* <img src={NFTDetail?.contentUrl} /> */}
            <Image
              className="avatar"
              src={NFTDetail?.contentUrl}
              preview={{
                src: NFTDetail?.contentUrl,
              }}
              alt=""
              loading="lazy"
            />
          </ImageStyled>
        )}
        {/* {
            isMobile &&
            <div className={isMobile ? "social-icon mobile" : "social-icon"}>
              <div className="icon"><img src={Facebook} alt="" /></div>
              <div className="icon"><img src={Telegram} alt="" /></div>
              <div className="icon" onClick={() => handleCopy(`${window.location.origin}/artwork/detail/${NFTDetail?.NFTType}/${NFTDetail?._id}`)}>
                {isCopied ? <span><CheckOutlined /></span> : <img src={Copy} alt="copy-artwork" />}
              </div>
            </div>
          } */}
      </Col>

      <Col
        className="gutter-row"
        // style={{position: 'relative'}}
        xl={{ span: 8 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
        style={{ width: '100%' }}
      >
        <DetailStyled>
          {/* <p className="title">{NFTDetail?.title}</p>
          <div className="token">
            Current Bid:{price} LUCKY
            <img src={Token} alt="" />
          </div>
          <div className="next-auction">Place bid:</div>
          <Row align="middle" justify="space-between">
            <div className="price-next-auction">
              <span className="label-price">
                {price + step * nextStepOffer} <img src={Token} alt="" /> LUCKY
              </span>
              <span style={{ fontWeight: 'bold', margin: '0 10px' }}> X </span>
              <InputNumber
                min={1}
                defaultValue={nextStepOffer}
                onChange={(e: any) => setStepNextOffer(e)}
              />
            </div>
            
          </Row> */}
          <p className="title">{NFTDetail?.title}</p>
          <Row>
            <Col
              xl={{ span: 14 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              className="bid-info"
            >
              <div className="group-item-bid">
                <div className="label">Current bid</div>
                <div className="value">{formatNumber(price)}</div>
              </div>
              <div className="group-item-bid">
                <div className="label">Jump step</div>
                <div className="value">{formatNumber(step)}</div>
              </div>
              <div className="group-item-bid">
                <div className="label">Your step</div>
                <div className="value">
                  <MinusCircleFilled
                    style={
                      nextStepOffer <= 1
                        ? { pointerEvents: 'none', opacity: 0.6 }
                        : {}
                    }
                    onClick={() => setStepNextOffer(nextStepOffer - 1)}
                  />
                  <span style={{ padding: '0 5px' }}>{nextStepOffer}</span>
                  <PlusCircleFilled
                    onClick={() => setStepNextOffer(nextStepOffer + 1)}
                  />
                </div>
              </div>
              <div className="group-item-bid">
                <div className="label">Your bid</div>
                <div className="value your-bid">
                  {formatNumber(price + step * nextStepOffer)}{' '}
                  <img width="20px" src={Token} />
                </div>
              </div>
            </Col>
            <Col
              xl={{ span: 10 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-end',
              }}
            >
              {renderButton()}
            </Col>
          </Row>

          <p className="description">{NFTDetail?.description || ''}</p>
          <OwenedBy>
            <Link
              to={`/user-profile/${NFTDetail?.createdBy?.walletAddress}/onstore/readyToSell`}
            >
              <p className="organize">
                <img
                  style={{ width: '40px', borderRadius: '100px' }}
                  src={NFTDetail?.createdBy?.avatarImage}
                />
                <span className="name">{NFTDetail?.createdBy?.name}</span>
                {/* <img src={Checkmark} /> */}
              </p>
            </Link>
            <CountVisit id={id} />
          </OwenedBy>
          {/* <Link
            to={`/user-profile/${NFTDetail?.createdBy?.walletAddress}/onstore/readyToSell`}
          >
            <p className="organize">
              <img style={{ borderRadius: '100px' }} width="40px" src={NFTDetail?.createdBy ? NFTDetail?.createdBy?.avatarImage : Luckyswap} />
              <span className="name">{NFTDetail?.createdBy?.name}</span>
              <img src={Checkmark} />
            </p>
          </Link> */}

          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail" key="1">
              <NFTInformation NFTDetail={NFTDetail} />
            </TabPane>

            <TabPane tab="History" key="2">
              <TableHistory tokenId={NFTDetail.tokenId} />
            </TabPane>
            <TabPane tab="Bidding" key="3">
              <BiddingTable
                NFTInfo={NFTDetail}
                bids={bidsData}
                refreshingAfterCancelBid={refreshingAfterCancelBid}
                onSetProccessing={onSetProccessing}
              />
            </TabPane>
            <TabPane tab="Reviews" key="4">
              <Reviews />
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
              {/* {renderFooter()} */}
              <Modal
                title="Set price"
                visible={isShowModalSetPrice}
                onCancel={() => setIsShowModalSetPrice(false)}
                footer={null}
                width={400}
              >
                <Form onFinish={onBidItem}>
                  <Form.Item name="pricePlaceBid">
                    <label>
                      * You will place bid for this NFT is :{' '}
                      <b>{price + step * nextStepOffer} LUCKY</b>{' '}
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

export default DetaiArtWork
