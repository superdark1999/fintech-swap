import React, { useEffect, useState, useRef } from 'react'
import { CartStyled } from './styled'
import { Row, Col, Menu, Dropdown } from 'antd'
import {
  DownOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import StatusBar from 'components-v2/StatusBar'
import { ButtonBuy, ButtonCancel } from 'components-v2/Button'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices, {
  MARKET_ADDRESS,
} from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { Link, useHistory } from 'react-router-dom'
//import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import notification from 'components-v2/Alert'
import { useActiveWeb3React } from 'wallet/hooks'
import ModalSetPriceAuction from './ModalSetPriceAuction'
import ModalSetPriceSell from './ModalSetPriceSell'
import QRCodeComp from 'components-v2/QRcode/index'
import { createFromIconfontCN } from '@ant-design/icons'
import InfoCard from '../InfoCard'
import moment from 'moment'

export default function MyCollectionCard({ data, option }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ruleAuctionModal, setRuleAuctionModal] = useState(false)
  const [approvingMarket, setApprovingMarket] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const NFTServicesMethod = useNFTServices()
  const marketServicesMethod = useMarketServices()
  const { setPrice, cancelSellNFT } = useArtworkServices()
  const history = useHistory()
  const { account, chainId } = useActiveWeb3React()
  const formRef = useRef()
  const [isShowModalSetPrice, setShowModalsetPrice] = useState(false)

  useEffect(() => {
    if (data?.tokenId && NFTServicesMethod) {
      setIsLoading(true)
      const { isTokenReadyToSell } = NFTServicesMethod
      isTokenReadyToSell(data?.tokenId)
        .then((data) => {
          setIsNFTCanSell(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
        })
    }
  }, [data?.tokenId, !!NFTServicesMethod])

  useEffect(() => {
    if (
      data?.ownerWalletAddress === account &&
      NFTServicesMethod &&
      !isNFTCanSell
    ) {
      const { nftContract } = NFTServicesMethod
      const filter = nftContract.filters.Approval(data?.ownerWalletAddress)
      nftContract.on(filter, (userAddress, marketAddress, tokenId) => {
        if (
          Number(tokenId) == data?.tokenId &&
          userAddress == account &&
          marketAddress == MARKET_ADDRESS
        ) {
          setIsNFTCanSell(true)
          setApprovingMarket(false)
          setIsProcessing(false)
        }
      })
    }
  }, [data?.tokenId, !!NFTServicesMethod, account,isNFTCanSell])

  const onSellItem = (value: any) => {
    setIsProcessing(true)
    const tokenId = data?.tokenId
    setIsProcessing(true)
    marketServicesMethod
      ?.setTokenPrice(tokenId, value.lucky)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?._id, NFTType: 'buy' }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              notification('error', {
                message: 'Error',
                description: 'Something when wrong, please try again later.',
              })
              setIsProcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsProcessing(false)
      })
    setShowModalsetPrice(false)
  }

  const onAllowSellItem = () => {
    const tokenId = data?.tokenId
    setApprovingMarket(true)
    NFTServicesMethod?.approveTokenToMarket(tokenId)
      .then()
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setApprovingMarket(false)
      })
  }
  const onSubmitRuleAuction = (value: any) => {
    const tokenId = data?.tokenId
    const startTime = value?.dateTime?.startTime || moment().unix()
    const endTime = value?.dateTime?.endTime || moment().add(1, 'days')?.unix()
    setIsProcessing(true)
    marketServicesMethod
      ?.setTokenBidInfo(
        tokenId,
        value.price,
        value.stepPrice,
        startTime,
        endTime,
      )
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?._id, NFTType: 'auction' }).then(({ status }) => {
            if (status == 200) {
              history.push('/my-profile/mycollection/checkingToSell')
            } else {
              notification('error', {
                message: 'Error',
                description: 'Something when wrong, please try again later.',
              })
              setIsProcessing(false)
            }
          })
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsProcessing(false)
      })
    setRuleAuctionModal(false)
  }
  const onSubmitSwapItem = () => {
    const tokenId = data?.tokenId
    setIsProcessing(true)
    marketServicesMethod
      ?.listNFTToSWap(tokenId)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?._id, NFTType: 'swap-store' }).then(
            ({ status }) => {
              if (status == 200) {
                history.push('/my-profile/mycollection/checkingToSell')
              } else {
                notification('error', {
                  message: 'Error',
                  description: 'Something when wrong, please try again later.',
                })
                setIsProcessing(false)
              }
            },
          )
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsProcessing(false)
      })
    setRuleAuctionModal(false)
  }

  const onCancelItemOnMarket = () => {
    if (marketServicesMethod) {
      if (data?.NFTType === 'buy') {
        setIsProcessing(true)
        marketServicesMethod
          ?.cancelSellToken(data?.tokenId)
          .then((dt) => {
            cancelSellNFT({ id: data?._id }).then(({ status }) => {
              if (status == 200) {
                history.push('/my-profile/mycollection/checkingToSell')
              } else {
                notification('error', {
                  message: 'Error',
                  description: 'Something when wrong, please try again later.',
                })
                setIsProcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsProcessing(false)
          })
      } else if (data?.NFTType === 'auction') {
        setIsProcessing(true)
        marketServicesMethod
          ?.revokeBidToken(data?.tokenId)
          .then((dt) => {
            cancelSellNFT({ id: data?._id }).then(({ status }) => {
              if (status == 200) {
                history.push('/my-profile/mycollection/checkingToSell')
              } else {
                notification('error', {
                  message: 'Error',
                  description: 'Something when wrong, please try again later.',
                })
                setIsProcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsProcessing(false)
          })
      } else if (data?.NFTType === 'swap-store') {
        setIsProcessing(true)
        marketServicesMethod
          ?.cancelListNFT(data?.tokenId)
          .then((dt) => {
            cancelSellNFT({ id: data?._id }).then(({ status }) => {
              if (status == 200) {
                history.push('/my-profile/mycollection/checkingToSell')
              } else {
                notification('error', {
                  message: 'Error',
                  description: 'Something when wrong, please try again later.',
                })
                setIsProcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsProcessing(false)
          })
      }else if(data?.NFTType === 'swap-personal'&& data?.offerFor){
        setIsProcessing(true)
        marketServicesMethod
          ?.cancelOfferSwapNFT(data?.offerFor)
          .then((dt) => {
            cancelSellNFT({ id: data?._id }).then(({ status }) => {
              if (status == 200) {
                history.push('/my-profile/mycollection/checkingToSell')
              } else {
                notification('error', {
                  message: 'Error',
                  description: 'Something when wrong, please try again later.',
                })
                setIsProcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsProcessing(false)
          })
      }
    }
  }
  const renderQRCode = () => {
    return (
      <div className="qrCode-wrapper">
        <button className="btn-qrCode" onClick={() => setShowQR(true)}>
          <ShareAltOutlined style={{ fontSize: '24px' }} />
        </button>
      </div>
    )
  }
  const renderGroupAction = (status: any) => {
    if(isProcessing&&isLoading){
      return null
    }
    if (status === 'approved') {
      return (
        <div className="group-button">
          {!isNFTCanSell && !approvingMarket && (
            <ButtonBuy height="40px" style={{ marginRight: '10px' }}>
              Transfer
            </ButtonBuy>
          )}
          {isNFTCanSell && !isProcessing && (
            <>
              <Dropdown className="dropdown-action" overlay={menu}>
                <ButtonBuy style={{ marginRight: '10px' }}>
                  Sell <DownOutlined style={{ marginLeft: 10 }} />
                </ButtonBuy>
              </Dropdown>
              <ButtonBuy
                style={{ marginRight: '10px' }}
                className="btn-swap"
                onClick={onSubmitSwapItem}
              >
                Swap
              </ButtonBuy>
            </>
          )}
          {approvingMarket && !isNFTCanSell && (
            <>
              <ButtonBuy style={{ marginRight: '10px' }} className="disabled">
                Sell <DownOutlined style={{ marginLeft: 10 }} />
              </ButtonBuy>
              <ButtonBuy className="disabled">Swap</ButtonBuy>
            </>
          )}
          {renderQRCode()}
        </div>
      )
    } else if (status === 'readyToSell') {
      return (
        <div className="group-button">
          <ButtonCancel height="40px" onClick={onCancelItemOnMarket}>
            Cancel
          </ButtonCancel>
          {renderQRCode()}
        </div>
      )
    } else if (status === 'reject') {
      return null
    }
  }

  const renderActionItem = () => {
    if(isLoading) return null
    if (
      isProcessing ||
      approvingMarket ||
      data?.status == 'pending' ||
      data?.status == 'checkingReadyToSell' ||
      data?.status == 'checkingBuying' ||
      data?.status == 'checkingCancelling'
    ) {
      const getLabel = (status: string) => {
        switch (status) {
          case 'pending':
            return 'Processing'
          case 'checkingReadyToSell':
            if (data?.NFTType == 'buy') {
              return 'On checking to sell Token'
            } else if (data?.NFTType) {
              return 'On checking to auction Token'
            }
            return 'Processing'
          case 'checkingBuying':
            return 'On checking to sell'
          case 'checkingCancelling':
            return 'On cancelling'
          default:
            return 'Processing'
        }
      }
      return (
        <div className="group-btn-action">
          <StatusBar type="processing" label={getLabel(data?.status)} />
        </div>
      )
    } else if (
      !isNFTCanSell &&
      !approvingMarket &&
      data?.status == 'approved'
    ) {
      return (
        <div className="group-btn-action">
          <ButtonBuy height="40px" onClick={onAllowSellItem}>
            Approve NFT
          </ButtonBuy>
        </div>
      )
    }
  }
  const getStatusByNFTType = (status: string) => {
    switch (status) {
      case 'buy':
        return 'On store - Sell'
      case 'auction':
        return 'On store - Auction'
      case 'swap-store':
        return 'On swap store'
      case 'swap-personal':
        return 'On offering'
      default:
        return 'On store'
    }
  }
  
  const handleMenuClick = (dt: any) => {
    if (dt.key === 'sell') {
      setShowModalsetPrice(true)
    } else if (dt.key === 'auction') {
      setRuleAuctionModal(true)
    }
  }
  // menu dropdown choose allow to sell
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sell">Sell</Menu.Item>
      <Menu.Item key="auction">Auction</Menu.Item>
    </Menu>
  )

  //render status from API
  return (
    <CartStyled>
      <Row gutter={24} align={'middle'}>
        <Col
          xl={{ span: 5 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 5 }}
        >
          {data.type === 'video' ? (
            <video
              width="100%"
              style={{ maxHeight: '200px', borderRadius: '8px' }}
              controls
              muted
            >
              <source src={data?.contentUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <img className="avatar" src={data?.contentUrl} />
          )}
        </Col>
        <Col
          className="description space-vehicle"
          xl={{ span: 18 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 18 }}
          // style={{ height: '200px' }}
        >
          <div>
            <div className="header-card">
              <div className="title-card">
                {data?.status == 'readyToSell' && (
                  <div className="nfttype-status">
                    {getStatusByNFTType(data?.NFTType)}
                  </div>
                )}
                {/* <div className="name-date">
                  <div className="name">{data?.title}</div>
                  <div className="date">{data?.createdAt}</div>
                </div> */}
                <div className="name">{data?.title}</div>
              </div>
              {renderActionItem()}
            </div>
            <InfoCard value={data} />
            
          </div>

          <div>{renderGroupAction(data?.status)}</div>
        </Col>
      </Row>
      <ModalSetPriceSell
        isShowModalSetPrice={isShowModalSetPrice}
        setShowModalsetPrice={setShowModalsetPrice}
        formRef={formRef}
        onSellItem={onSellItem}
      />
      <ModalSetPriceAuction
        ruleAuctionModal={ruleAuctionModal}
        setRuleAuctionModal={setRuleAuctionModal}
        formRef={formRef}
        onSubmitRuleAuction={onSubmitRuleAuction}
      />
      <QRCodeComp
        isShow={showQR}
        setShowQR={setShowQR}
        url={`${window.location.origin}/my-profile/mycollection/all`}
      />
    </CartStyled>
  )
}
