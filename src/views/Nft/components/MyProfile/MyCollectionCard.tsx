import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Menu, Dropdown } from 'antd'
import {
  DownOutlined,
  SyncOutlined,
  CheckOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import StatusBar from 'components-v2/StatusBar'
import { ButtonTrade, ButtonBuy, ButtonCancel } from 'components-v2/Button'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import QRCodeIcon from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices, {
  MARKET_ADDRESS,
} from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { Link, useHistory } from 'react-router-dom'
import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import { Alert } from 'antd'
import notification from 'components-v2/Alert'
import { getCompactString } from 'utils'
import { RegexNumber100000 } from '../../constants'
import { useActiveWeb3React } from 'wallet/hooks'
import ModalSetPriceAuction from './ModalSetPriceAuction'
import ModalSetPriceSell from './ModalSetPriceSell'
import QRCodeComp from 'components-v2/QRcode/index'
import { createFromIconfontCN } from '@ant-design/icons'
import moment from 'moment'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

export default function MyCollectionCard({ data, option }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(true)
  const [isProcessing, setIsPrcessing] = useState(false)
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
      const { isTokenReadyToSell } = NFTServicesMethod
      isTokenReadyToSell(data?.tokenId)
        .then((data) => {
          setIsNFTCanSell(data)
        })
        .catch((err) => console.log(err))
    }
  }, [data?.tokenId, NFTServicesMethod])

  useEffect(() => {
    if (
      data?.ownerWalletAddress === account &&
      NFTServicesMethod &&
      !isNFTCanSell
    ) {
      const { nftContract } = NFTServicesMethod
      const filter = nftContract.filters.Approval(data?.ownerWalletAddress)
      nftContract.on(filter, (userAddress, marketAddress, tokenId) => {
        if (Number(tokenId) == data?.tokenId && userAddress == account && marketAddress == MARKET_ADDRESS) {
          setIsNFTCanSell(true)
          setApprovingMarket(false)
          setIsPrcessing(false)
        }
      })
    }
  }, [data?.tokenId, NFTServicesMethod, account])

  const onSellItem = (value: any) => {
    setIsPrcessing(true)
    const tokenId = data?.tokenId
    setIsPrcessing(true)
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
    NFTServicesMethod?.approveTokenToMarket(tokenId)
      .then()
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setApprovingMarket(false)
      })
  }
  const onSubmitRuleAuction = (value: any) => {

    const tokenId = data?.tokenId
    const startTime = value?.dateTime?.startTime||moment().unix();
    const endTime = value?.dateTime?.endTime||moment().add(1, 'days')?.unix();
    setIsPrcessing(true)
    marketServicesMethod?.setTokenBidInfo(tokenId, value.price, value.stepPrice, startTime,endTime)
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
  const onSubmitSwapItem = () => {
    const tokenId = data?.tokenId
    setIsPrcessing(true)
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
                setIsPrcessing(false)
              }
            },
          )
        }
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsPrcessing(false)
      })
    setRuleAuctionModal(false)
  }

  const onCancelItemOnMarket = () => {
    if (marketServicesMethod) {
      if (data?.NFTType === 'buy') {
        setIsPrcessing(true)
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
                setIsPrcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsPrcessing(false)
          })
      } else if (data?.NFTType === 'auction') {
        setIsPrcessing(true)
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
                setIsPrcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsPrcessing(false)
          })
      } else if (data?.NFTType === 'swap-store') {
        setIsPrcessing(true)
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
                setIsPrcessing(false)
              }
            })
          })
          .catch((err) => {
            notification('error', {
              message: 'Error',
              description: err.message,
            })
            setIsPrcessing(false)
          })
      }
    }
  }
  const renderQRCode = () => {
    return (
      <button className="btn-qrCode" onClick={() => setShowQR(true)}>
        <ShareAltOutlined style={{ fontSize: '24px' }} />
      </button>
    )
  }
  const renderGroupAction = (status: any) => {
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
    } else if (status === 'readyToSell' && data?.NFTType !== 'swap-personal') {
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
            Public NFT
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
        return 'On store - Aution'
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
    } else if (dt.key === 'aution') {
      setRuleAuctionModal(true)
    }
  }
  // menu dropdown choose allow to sell
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sell">Sell</Menu.Item>
      <Menu.Item key="aution">Aution</Menu.Item>
    </Menu>
  )
  //render status from API
  return (
    <CartStyled>
      <Row gutter={24} align={'middle'}>
        <Col
          xl={{ span: 7 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 7 }}
        >
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}>
            {data.type === 'video' ? (
              <video width="100%" style={{ maxHeight: '200px', borderRadius: '8px' }} controls muted>
                <source src={data?.contentUrl} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <img className="avatar" src={data?.contentUrl} />
            )}
          </Link>
        </Col>
        <Col
          className="description space-vehicle"
          xl={{ span: 17 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 17 }}
          style={{ height: '200px' }}
        >
          <div>
            <div className="header-card">
              <div>
                {data?.status == 'readyToSell' && (
                  <div className="nfttype-status">
                    {getStatusByNFTType(data?.NFTType)}
                  </div>
                )}
                <div className="name">{data?.title}</div>
              </div>
              {renderActionItem()}
            </div>
            {data?.TXHash && (
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID: </div>
                <a href="#" target="_blank" className="number">
                  {getCompactString(data?.TXHash, 10)}
                </a>
              </div>
            )}
            <div
              style={{
                color: '#AFBAC5',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              Type: {data?.type}
            </div>
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
