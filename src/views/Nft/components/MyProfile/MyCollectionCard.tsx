import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import {
  Row,
  Col,
  Tabs,
  Modal,
  Input,
  Form,
  Button,
  Radio,
  Menu,
  Dropdown,
  InputNumber,
} from 'antd'
import { DownOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import StatusBar from 'components-v2/StatusBar'
import { ButtonTrade, ButtonBuy, ButtonCancel } from 'components-v2/Button'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices, { MARKET_ADDRESS } from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useHistory } from 'react-router-dom'
import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import { Alert } from 'antd'
import notification from 'components-v2/Alert'
import { getCompactString } from 'utils'
import { RegexNumber100000 } from '../../constants'
import { useActiveWeb3React } from 'wallet/hooks'
import ModalSetPriceAuction from './ModalSetPriceAuction'
export default function MyCollectionCard({ data, option }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(true)
  const [isProcessing, setIsPrcessing] = useState(false)
  const [ruleAuctionModal, setRuleAuctionModal] = useState(false)
  const [approvingMarket, setApprovingMarket] = useState(false)
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
    if (data?.ownerWalletAddress === account && NFTServicesMethod && !isNFTCanSell) {
      const { nftContract } = NFTServicesMethod
      const filter = nftContract.filters.Approval(data?.ownerWalletAddress);
      nftContract.on(filter, (userAddress, marketAddress, tokenId) => {
        console.log(userAddress, tokenId)
        if (Number(tokenId) == data?.tokenId && userAddress == account) {
          setIsNFTCanSell(true)
          setApprovingMarket(false)
          setIsPrcessing(false)
        }
      })
    }
  }, [isNFTCanSell, data?.tokenId, NFTServicesMethod, account])

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
    console.log('value: ', value);
    const tokenId = data?.tokenId
    // setIsPrcessing(true)
    // marketServicesMethod
    //   ?.setTokenBidInfo(tokenId, value.price, value.stepPrice)
    //   .then((dt) => {
    //     if (dt?.hash) {
    //       setPrice({ id: data?._id, NFTType: 'auction' }).then(({ status }) => {
    //         if (status == 200) {
    //           history.push('/my-profile/mycollection/checkingToSell')
    //         } else {
    //           notification('error', {
    //             message: 'Error',
    //             description: 'Something when wrong, please try again later.',
    //           })
    //           setIsPrcessing(false)
    //         }
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     notification('error', { message: 'Error', description: err?.message })
    //     setIsPrcessing(false)
    //   })
    // setRuleAuctionModal(false)
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
        marketServicesMethod?.cancelSellToken(data?.tokenId).then((dt) => {
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
        }).catch(err => {
          notification('error', {
            message: 'Error',
            description: err.message,
          })
          setIsPrcessing(false)
        })
      } else if (data?.NFTType === 'auction') {
        setIsPrcessing(true)
        marketServicesMethod?.revokeBidToken(data?.tokenId).then((dt) => {
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
        }).catch(err => {
          notification('error', {
            message: 'Error',
            description: err.message,
          })
          setIsPrcessing(false)
        })
      } else if (data?.NFTType === 'swap-store') {
        setIsPrcessing(true)
        marketServicesMethod?.cancelListNFT(data?.tokenId).then((dt) => {
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
        }).catch(err => {
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
            <ButtonBuy height="40px">Transfer</ButtonBuy>
          )}
          {isNFTCanSell && !isProcessing && (
            <>
              <Dropdown className="dropdown-action" overlay={menu}>
                <ButtonBuy>
                  Sell <DownOutlined style={{ marginLeft: 10 }} />
                </ButtonBuy>
              </Dropdown>
              <ButtonBuy className="btn-swap" onClick={onSubmitSwapItem}>
                Swap
              </ButtonBuy>
            </>
          )}
          {approvingMarket && !isNFTCanSell && (
            <>
              <ButtonBuy className="disabled">
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
    if (isProcessing || approvingMarket || data?.status == 'pending' || data?.status == 'checkingReadyToSell' || data?.status == 'checkingBuying' || data?.status == 'checkingCancelling') {
      const getLabel = (status: string) => {
        switch (status) {
          case 'pending':
            return 'Processing';
          case 'checkingReadyToSell':
            if (data?.NFTType == 'buy') {
              return 'On checking to buy Token'
            } else if (data?.NFTType) {
              return 'On checking to auction Token'
            }
            return 'Processing';
          case 'checkingBuying':
            return 'On checking to buy';
          case 'checkingCancelling':
            return 'On cancelling'
          default:
            return 'Processing';
        }
      }
      return (
        <div className="group-btn-action">
          <StatusBar type="processing" label={getLabel(data?.status)} />
        </div>
      )
    } else if (!isNFTCanSell && !approvingMarket && data?.status == 'approved') {
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
        return 'On store | Sell';
      case 'auction':
        return 'On store | Aution';
      case 'swap-store':
        return 'On swap store';
      case 'swap-personal':
        return 'On offering';
      default:
        return 'On store';
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
      <Row gutter={24} align={"middle"}>
        <Col
          xl={{ span: 7 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 7 }}
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
          xl={{ span: 17 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 17 }}
        >
          <div>
            <div className="header-card">
              <div>
                {data?.status == 'readyToSell' && <div className="nfttype-status">{getStatusByNFTType(data?.NFTType)}</div>}
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

      <Modal
        title="Set price sell"
        visible={isShowModalSetPrice}
        onCancel={() => setShowModalsetPrice(false)}
        footer={null}
        width={400}
      >
        <Form ref={formRef} onFinish={onSellItem}>
          <Form.Item
            name="lucky"
            label="Price sell"
            rules={[
              { required: true, message: 'This Field is required' },
              {
                pattern: RegexNumber100000,
                message: 'The price must be less than 100,000',
              },
            ]}
            validateTrigger="onBlur"
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                width: '100%',
              }}
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
      <ModalSetPriceAuction
        ruleAuctionModal={ruleAuctionModal}
        setRuleAuctionModal={setRuleAuctionModal}
        formRef={formRef}
        onSubmitRuleAuction={onSubmitRuleAuction}
      />
    </CartStyled>
  )
}
