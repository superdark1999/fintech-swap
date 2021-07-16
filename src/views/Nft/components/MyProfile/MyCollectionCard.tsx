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
import useMarketServices from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { Link, useHistory, useParams } from 'react-router-dom'
//import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'
import notification from 'components-v2/Alert'
import { useActiveWeb3React } from 'wallet/hooks'
import ModalSetPriceAuction from './ModalSetPriceAuction'
import ModalSetPriceSell from './ModalSetPriceSell'
import ModalSetAddressTransfer from './ModalSetAddressTransfer'
import QRCodeComp from 'components-v2/QRcode/index'
// import { createFromIconfontCN } from '@ant-design/icons'
import InfoCard from '../InfoCard'
import moment from 'moment'
import OfferTable from '../Swap/components/OfferTable'
// import useLuckyServices from 'services/web3Services/LuckyServices'
// import useUserStore from 'store/userStore'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import {BINANCE_CONFIG} from 'configs'


import {getPrice} from 'utils'


export default function MyCollectionCard({ data, option, reloadList }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ruleAuctionModal, setRuleAuctionModal] = useState(false)
  const [approvingMarket, setApprovingMarket] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const NFTServicesMethod = useNFTServices()
  const marketServicesMethod = useMarketServices()
  const history = useHistory()
  const { account, chainId } = useActiveWeb3React()
  const formRef = useRef()
  const [isShowModalSetPrice, setShowModalsetPrice] = useState(false)
  const [isShowModalSetAddressTransfer,setShowModalSetAddressTransfer] = useState(false)
  const {MARKET_ADDRESS} = BINANCE_CONFIG

  const [offerData, setOfferData] = useState([])
  const { getNFT, setPrice, cancelSellNFT } = useArtworkServices()
  const [state, setState] = useState<any>(true);
  const [myItems, setMyItems] = useState<any>([]);
  const [status, setStatus] = useState<string>('processing')
  // const [itemSwap, setItemSwap] = useState<any>([]);
  // const [userNFTs, setUserNFTs] = useState([])
  // const [NFTs, setNFTs] = useState([]);
  // const [selectMetodSwap, setSelectMethod] = useState<number | null>()
  // const luckyServicesMethod = useLuckyServices()
  // const [userState, userActions] = useUserStore()
  
  //console.log(data)

  useEffect(()=>{
    if(marketServicesMethod && data?.tokenId && myItems?.tokenId){
      const {marketContract} =  marketServicesMethod
      
      marketContract.on('SwapNFTs',(tokenIdA, tokenIdB, accountB, event)=>{
        if(myItems?.ownerWalletAddress==accountB&& myItems?.tokenId ==Number(tokenIdB) && data?.tokenId == Number(tokenIdA)){
          setTimeout(() => {
            setStatus('success')
          }, 10000)
        }
      })
      
    }
  },[marketServicesMethod,account, data?.tokenId, myItems?.tokenId])
  
  const getSwapOffers = (itemSwap:any)=>{
    const tokenId = itemSwap?.tokenId;
    console.log(itemSwap)
    if(marketServicesMethod&&tokenId){
      const {getSwapOffers} =  marketServicesMethod
      getSwapOffers(tokenId).then((data:any)=>{
        const rawNFTs = data?.map((item:any)=>{
          return {
            ownerWalletAddress: item[0],
            tokenId: Number(item[1]),
            price: getPrice(Number(item[2])),
            isCancel:item[3]
          }
        })?.filter((i:any)=>!i?.isCancel)
        if(!_.isEmpty(rawNFTs)){
          getNFT({
            tokenId: rawNFTs.map((it:any)=>it.tokenId)
          }).then(({status,data})=>{
            if(status==200){
             const offerData = data?.data?.map((item:any)=>{
                const rawNFTByTokenId = rawNFTs.find((it:any)=>item?.tokenId==it?.tokenId)||{}
                return {
                  ...item,
                  ...rawNFTByTokenId,
                }
              })
          
            setOfferData(offerData)
            //console.log(offerData)
            }
          })
        }
      })
  }
  }

  useEffect(()=>{
    getSwapOffers(data)
  },[data?.tokenId])

  const onOfferItem = (itemSwap:any, myItems:any) => {
    const { confirmSwapNFT } = marketServicesMethod
    setIsProcessing(true)
    confirmSwapNFT(itemSwap?.tokenId, myItems?.tokenId, myItems?.ownerWalletAddress).then((data) => {
      if(status == 'success') reloadList()
    }).catch((err) => {
      setIsProcessing(false)
      notification('error', {
        message: 'Error',
        description: err.message,
      })
    })
  }

  const renderButon = (myItems: any)=>{
      //console.log(myItems)
      setMyItems(myItems)
      if(isProcessing){
        return( <ButtonProccesing/>)
      }else {
        return(
          <ButtonBuy width="135px" 
            onClick={() => onOfferItem(data, myItems)} 
            > Swap now
          </ButtonBuy>
        )}
    
    
  }

  const onChangeState = (data: any) => {
    //console.log(data)
    setState(!data)
  }

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
          setIsNFTCanSell(false)
          setIsLoading(false)
        })
    }else{
      setIsLoading(false)
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
      nftContract.on('Transfer',(from, to, tokenId)=>{
        if(Number(tokenId)==data.tokenId&&account==from){
          setIsProcessing(true)
        }
      })
    }
  }, [data?.tokenId, !!NFTServicesMethod, account,isNFTCanSell])

  const onSellItem = (value: any) => {
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
    if(isProcessing||isLoading){
      return null
    }
    if (status === 'approved') {
      return (
        <div className="group-button">
          {!isNFTCanSell && !approvingMarket && (
            <ButtonBuy height="40px" style={{ marginRight: '10px' }} onClick={()=>{setShowModalSetAddressTransfer(true)}}>
              Transfer
            </ButtonBuy>
          )}
          {isNFTCanSell && !isProcessing && (
            <>
              <Dropdown className="dropdown-action" overlay={menuSell}>
                <ButtonBuy style={{ marginRight: '10px' }}>
                  Sell <DownOutlined style={{ marginLeft: 10 }} />
                </ButtonBuy>
              </Dropdown>
              <Dropdown className="dropdown-action btn-swap" overlay={menuSwap}>
                <ButtonBuy style={{ marginRight: '10px' }}>
                  Swap <DownOutlined style={{ marginLeft: 10 }} />
                </ButtonBuy>
              </Dropdown>
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
        <div className="group-button" style={{marginTop: '10px'}}>
          <ButtonCancel height="40px" onClick={onCancelItemOnMarket}>
            Cancel
          </ButtonCancel>
          <button className="info-swap" style={{minWidth:'100px'}} onClick={()=> onChangeState(state)}>v</button>
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
  
  const handleMenuSellClick = (dt: any) => {
    if (dt.key === 'sell') {
      setShowModalsetPrice(true)
    } else if (dt.key === 'auction') {
      setRuleAuctionModal(true)
    }
  }
  // menu dropdown choose allow to sell
  const menuSell = (
    <Menu onClick={handleMenuSellClick}>
      <Menu.Item key="sell">Sell</Menu.Item>
      <Menu.Item key="auction">Auction</Menu.Item>
    </Menu>
  )

  
  const handleMenuSwapClick = (dt: any) => {
    if (dt.key === 'swap') {
      history.push('/swap/step=1')
    } else if (dt.key === 'pushlish') {
      onSubmitSwapItem()
    }
  }
  // menu dropdown choose allow to sell
  const menuSwap = (
    <Menu onClick={handleMenuSwapClick}>
      <Menu.Item key="swap">Swap</Menu.Item>
      <Menu.Item key="pushlish">Pushlish</Menu.Item>
    </Menu>
  )

  //render status from API
  const onTransferItem = (value: any)=>{
    if(NFTServicesMethod){
      const tokenId = data?.tokenId
      setIsProcessing(true)
      NFTServicesMethod.transferToken(data?.tokenId,value.address)
      .then((dt) => {
       
      })
      .catch((err) => {
        notification('error', { message: 'Error', description: err?.message })
        setIsProcessing(false)
      })
      setShowModalSetAddressTransfer(false)
    }
  }
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
        <div style={ {display:(data?.NFTType == 'swap-store' && data?.status == 'readyToSell' ? 'unset' : 'none'), width:'100%'} }>
          {/* <button className="info-swap" onClick={()=> onChangeState(state)} style={{minWidth:'200px'}}>v</button> */}
          <OfferTable state={state} offerData={offerData} isRenderAction={true} renderButon={renderButon}/>
        </div>
        
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
      <ModalSetAddressTransfer
        isShowModalSetAddressTransfer={isShowModalSetAddressTransfer}
        setShowModalSetAddressTransfer={setShowModalSetAddressTransfer}
        formRef={formRef}
        onTransferItem={onTransferItem}
      />
      
      <QRCodeComp
        isShow={showQR}
        setShowQR={setShowQR}
        url={`${window.location.origin}/my-profile/mycollection/all`}
      />
    </CartStyled>
  )
}
