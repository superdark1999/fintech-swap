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
import { CloseOutlined, StarFilled, CheckOutlined } from '@ant-design/icons'
import {
  DetailStyled,
  ReviewStyled,
  ScrollReview,
  ImageStyled,
  DetailTabpane,
  HeaderStyled,
  VideoStyled,
} from './styled'
import { dataHistory, columnHistory } from './Mock'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import { useActiveWeb3React } from 'wallet/hooks'
import { ButtonBuy } from 'components-v2/Button'
import Hammer from 'assets/images/hammer.svg'
import { Link } from 'react-router-dom'
import { getCompactString, embedTokenIdLinkBSCScan } from 'utils'
import { useHistory } from 'react-router-dom'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import _ from 'lodash'
import TableHistory from './TableHistory'

const { TabPane } = Tabs
const DetaiArtWork = ({ id }: any) => {
  const { getDetailNFT, buyItem } = useArtworkServices()
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const { account, chainId } = useActiveWeb3React()
  const [NFTDetail, setNFTDetail] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    getDetailNFT({ id }).then(({ status, data }) => {
      if (status == 200) {
        setNFTDetail(data?.data)
        setLoading(false)
      }
    })
  }, [])

  const onSwapItem = () => {
    history.push(`/swap/${id}/step=1`)
  }

  const renderButton = () => {
    return (
      <ButtonBuy onClick={onSwapItem} className="btn-swap">
        Swap now
      </ButtonBuy>
    )
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
              <TableHistory />
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
              {/* {renderFooter()} */}
            </Col>
          </Row>
        </DetailStyled>
      </Col>
    </Row>
  )
}

export default DetaiArtWork
