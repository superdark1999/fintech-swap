import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Table, Modal, Input, Form, Image } from 'antd'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import Checkmark from 'assets/images/checkmark.svg'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import { ButtonStyle, ButtonBuyStyle } from 'components-v2/cart/styled'
import {
  SwapOutlined,
  CloseOutlined,
  StarFilled,
  CheckOutlined,
} from '@ant-design/icons'
import {
  DetailStyled,
  ReviewStyled,
  ScrollReview,
  FooterStyled,
  ImageStyled,
  DetailTabpane,
  HeaderStyled,
  TableStyled,
  VideoStyled,
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
import Hammer from 'assets/images/hammer.svg'
import { Link } from 'react-router-dom'
import { getPrice, getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import notification from 'components-v2/Alert'
import { useHistory } from 'react-router-dom'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'
import TableHistory from './TableHistory'
import formatNumber from 'utils/formatNumber'

const { TabPane } = Tabs
const DetaiArtWork = ({ id }: any) => {
  const { getDetailNFT, buyItem } = useArtworkServices()
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const { account, chainId } = useActiveWeb3React()
  const [NFTDetail, setNFTDetail] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [isSelled, setIsSelled] = useState(false)
  const [price, setPrice] = useState(0)
  const [userState, userActions] = useUserStore()
  const marketServicesMethod = useMarketServices()
  const luckyServiceMethod = useLuckyServices()
  const [isProcessing, setIsProccessing] = useState(false)
  const [isShowModalSetPrice, setIsShowModalSetPrice] = useState(false)
  const { checkApproveLevelAmount } = useLuckyServices()
  const history = useHistory()
  useEffect(() => {
    getDetailNFT({ id }).then(({ status, data }) => {
      if (status == 200) {
        if (data?.data?.tokenId && marketServicesMethod) {
          marketServicesMethod
            ?.getTokenPrice(data?.data?.tokenId)
            .then((data: any) => {
              const price = getPrice(data?._hex)
              if (price != -1) {
                setLoading(false)
                setPrice(price)
              }
            })
            .catch((err) => {
              notification('error', {
                message: 'Error',
                description: err.message,
              })
            })
        }
        setNFTDetail(data?.data)
        setLoading(false)
      }
    })
  }, [])

  const onApproveBuyOnMarket = () => {
    userActions?.updateUserInfo({ isProcessingCanBuy: true })
    if (luckyServiceMethod) {
      luckyServiceMethod
        ?.approveLevelAmount(MARKET_ADDRESS)
        .then()
        .catch(() => {
          userActions?.updateUserInfo({ isProcessingCanBuy: false })
        })
    }
  }

  const onBuyItem = () => {
    if (!marketServicesMethod) {
      return
    }
    if (!account) {
      return notification('error', {
        message: 'Error',
        description: 'Unblock your wallet to buy this item',
      })
    }
    if (account === NFTDetail.ownerWalletAddress) {
      return notification('error', {
        message: 'Error',
        description: `You can't buy your item`,
      })
    }
    setIsProccessing(true)
    const tokenId = NFTDetail?.tokenId
    marketServicesMethod
      ?.buyToken(tokenId, price)
      .then((dt) => {
        if (dt?.hash) {
          buyItem({
            id: id,
            walletAddress: account,
          })
            .then(({ status }) => {
              setIsSelled(true)
              notification(
                'open',
                {
                  message: 'Success',
                  description: `We will proccessing this action, you can check this item now on your pending profile`,
                  titleBtn: 'View collection',
                },
                () => {
                  history.push('/my-profile/mycollection/pending')
                },
              )
              setIsProccessing(false)
            })
            .catch((err) => {
              notification('error', {
                message: 'Error',
                description: `Something went wrong please try again`,
              })
              setIsProccessing(false)
            })
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err.message })
        setIsProccessing(false)
      })
  }

  const renderButton = () => {
    if (isSelled) return null
    if (isProcessing || userState?.isProcessingCanBuy) {
      return <ButtonProccesing />
    }
    if (!account) {
      return <ButtonBuy onClick={onBuyItem}>Buy</ButtonBuy>
    }
    if (userState?.isCanBuy) {
      return <ButtonBuy onClick={onBuyItem}>Buy</ButtonBuy>
    }
    if (!userState?.isCanBuy) {
      return <ButtonBuy onClick={onApproveBuyOnMarket}>Allow to buy</ButtonBuy>
    }
  }
  useEffect(() => {
    //  fetch(
    //     'https://testnet.bscscan.com/token/generic-tokentxns2?m=normal&contractAddress=0xa75556c5b07e88119d7979761d00b8a55a1bc315&a=165&sid=5dbc6e01798504aa14f0a7ee04d60c0a&p=1',
    //     {
    //       mode: 'no-cors',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   ).then((res)=>{
    //       console.log('res.>',res)
    //   })
    fetch(
      'https://testnet.bscscan.com/token/generic-tokentxns2?m=normal&contractAddress=0xa75556c5b07e88119d7979761d00b8a55a1bc315&a=165&sid=5dbc6e01798504aa14f0a7ee04d60c0a&p=1',
    )
      .then(function (response) {
        console.log('response,222', response)
        return response.text()
      })
      .then(function (string) {
        console.log('string,', string)
      })
  }, [])
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
              <Link to="/">
                <CloseOutlined className="icon" />
              </Link>
            </div>
            <div className="date-time">02h 31m 04s left 🔥 </div>
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
            <img
              className="avatar"
              src={NFTDetail?.contentUrl}
              alt=""
              loading="lazy"
            />
          </ImageStyled>
        )}
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
          <p className="title">{NFTDetail?.title}</p>

          <Row align="middle" justify="space-between">
            <div className="token">
              {formatNumber(price)} LUCKY
              <img src={Token} alt="" />
            </div>
            {renderButton()}
          </Row>

          <p className="description">{NFTDetail?.description || ''}</p>
          <Link
            to={`/user-profile/${NFTDetail?.createdBy?.walletAddress}/onstore/readyToSell`}
          >
            <p className="organize">
              <img style={{ borderRadius: '100px' }} width="40px" src={NFTDetail?.createdBy ? NFTDetail?.createdBy?.avatarImage : Luckyswap} />
              <span className="name">{NFTDetail?.createdBy?.name}</span>
              <img src={Checkmark} />
            </p>
          </Link>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail" key="1">
              <DetailTabpane>
                <div className="group-info">
                  <div className="info">
                    <div className="title">NFT Contract ID:</div>
                    <a
                      className="value"
                      href={embedTokenIdLinkBSCScan(
                        NFTDetail.tokenId,
                        NFTDetail?.contractAddress,
                        chainId,
                      )}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.contractAddress, 6)}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Token ID:</div>
                    <a
                      className="value"
                      href={embedTokenIdLinkBSCScan(
                        NFTDetail.tokenId,
                        NFTDetail?.contractAddress,
                        chainId,
                      )}
                      target="_blank"
                    >
                      {NFTDetail && NFTDetail.tokenId}
                    </a>
                  </div>
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Creator's Adress:</div>
                    <a
                      className="value"
                      href={`/user-profile/${NFTDetail?.createdBy?.walletAddress}/onstore/readyToSell`}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.createdBy?.walletAddress, 6)}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Owner Adress:</div>
                    <a
                      className="value"
                      href={`/user-profile/${NFTDetail?.ownerWalletAddress}/onstore/readyToSell`}
                      target="_blank"
                    >
                      {getCompactString(NFTDetail?.ownerWalletAddress, 6)}
                    </a>
                  </div>
                </div>
              </DetailTabpane>
            </TabPane>

            <TabPane tab="History" key="2">
              <TableHistory tokenId={NFTDetail.tokenId} />
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

                <FooterStyled>
                  <input placeholder="Write a comment" />
                  <ButtonTrade>Send</ButtonTrade>
                </FooterStyled>
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
              {/* {renderFooter()} */}
            </Col>
          </Row>
          <Modal
            title="Set price"
            visible={isShowModalSetPrice}
            onCancel={() => setIsShowModalSetPrice(false)}
            footer={null}
            width={400}
          >
            <Form onFinish={() => { }}>
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
                  <button type="submit">Confirm</button>
                </div>
              </Form.Item>
            </Form>
          </Modal>
        </DetailStyled>
      </Col>
    </Row >
  )
}

export default DetaiArtWork
