import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import { Row, Col, Tabs } from 'antd'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import usrMarketServices from 'services/web3Services/MarketServices'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import _ from 'lodash'
import { getPrice } from 'utils'
import formatNumber from 'utils/formatNumber'
import useMarketServices from 'services/web3Services/MarketServices'
import notification from 'components-v2/Alert'
import { isMobile } from 'react-device-detect'
import { Link, useHistory } from 'react-router-dom'
import StatusBar from 'components-v2/StatusBar'
import { ButtonCancel, ButtonBuy } from 'components-v2/Button'
import InfoCard from '../InfoCard'
import QRCodeComp from 'components-v2/QRcode/index'
import { ShareAltOutlined } from '@ant-design/icons'
// import moment from 'moment'
import { useActiveWeb3React } from 'wallet/hooks'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import OfferTable from '../Swap/components/OfferTable'


export default function OnSaleCard({ data }: any) {
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const { cancelSellNFT } = useArtworkServices()
  const [isProcessing, setIsProcessing] = useState(false)
  const history = useHistory()
  const marketService = usrMarketServices()
  const marketServicesMethod = useMarketServices()
  const [showQR, setShowQR] = useState(false)
  //console.log(data)
  const { account, chainId } = useActiveWeb3React()
  const [offerData, setOfferData] = useState([])
  const { getNFT } = useArtworkServices()
  const [state, setState] = useState<any>(true);
  const [myItems, setMyItems] = useState<any>([]);
  const [status, setStatus] = useState<string>('processing')
  

  //console.log(data)

  useEffect(()=>{
    console.log('a')
    if(marketServicesMethod && data?.tokenId && myItems?.tokenId){
      const {marketContract} =  marketServicesMethod
      console.log('b')
      marketContract.on('SwapNFTs',(tokenIdA, tokenIdB, accountB, event)=>{
        console.log(tokenIdA,tokenIdB,accountB)
        if(data?.ownerWalletAddress==accountB 
          && data?.tokenId ==Number(tokenIdB) 
          && myItems?.tokenId == Number(tokenIdA)){
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

  const onGoToApprovedArtWork = () => {
    history.push('/my-profile/mycollection/approved')
  }

  const onOfferItem = (itemSwap:any, myItems:any) => {
    const { confirmSwapNFT } = marketServicesMethod
    setIsProcessing(true)
    confirmSwapNFT(itemSwap?.tokenId, myItems?.tokenId, myItems?.ownerWalletAddress).then((data) => {
      if(status == 'success') {
        notification(
          'open',
          {
            message:
              'Swap NFT success,you can check NFT on approved collection',
            description: '',
            titleBtn: 'View detail',
          },
          onGoToApprovedArtWork,
        )
      }
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
    const getPriceToken = async () => {
      if (data?.tokenId && marketService) {
        if (data?.NFTType == 'buy') {
          const unitPrice = await marketService?.getTokenPrice?.(data?.tokenId)
          const price = getPrice(Number(unitPrice?._hex))
          setPrice(price)
        } else if (data?.NFTType == 'auction') {
          const bidsArr = await marketService?.getBidsByTokenId?.(data?.tokenId)
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
          const unitPrice = await marketService?.getTokenBidPrice(data?.tokenId)
          const price = getPrice(unitPrice?._hex)
          if (price > maxPrice) {
            setPrice(price)
          } else {
            setPrice(maxPrice)
          }
        }
      }
    }
    setLoading(false)
    getPriceToken()
  }, [data?.tokenId])

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
            console.log('err',err)
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
      }
    }
  }

  const getStatusByNFTType = (status: string) => {
    switch (status) {
      case 'buy':
        return 'On store | Sell'
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

  const renderQRCode = () => {
    return (
      <div
        className="group-button qrCode-wrapper"
        style={{ justifyContent: 'flex-end' }}
      >
        <button className="btn-qrCode" onClick={() => setShowQR(true)}>
          <ShareAltOutlined style={{ fontSize: '24px' }} />
        </button>
      </div>
    )
  }

  const renderGroupAction = () => {
    return (
      <div className="group-button" style={{marginTop: '10px'}}>
        <button className="info-swap" style={{minWidth:'100px'}} onClick={()=> onChangeState(state)}>v</button>
        {renderQRCode()}
      </div>
    )
  }

  if (loading) {
    return null
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
          {/* brbedit */}
          <Link to={`/artwork/detail/${data?.NFTType || 'buy'}/${data?._id}`}>
            {data?.type === 'video' ? (
              <video
                muted
                controls
                autoPlay={isMobile ? false : true}
                loop
                className="avatar"
              >
                <source src={`${data?.contentUrl}#t=0.1`} type="video/mp4" />
              </video>
            ) : (
              <img
                className="avatar"
                src={data?.contentUrl}
                alt=""
                loading="lazy"
              />
            )}
          </Link>
        </Col>
        <Col
          className="description"
          xl={{ span: 18 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 18 }}
        >
          <div className="header-card" style={{ marginTop: 0 }}>
            <div className="nfttype-status">
              {getStatusByNFTType(data?.NFTType)}
            </div>
            {isProcessing ? (
              <StatusBar type="processing" label={'On Cancelling'} />
            ) : (
              <ButtonCancel height="40px" onClick={onCancelItemOnMarket}>
                Cancel
              </ButtonCancel>
            )}
          </div>
          <div className="name">{data?.title}</div>
          {/* <div className="name-data">
            <div className="name">{data?.title}</div>
            <div className="date">sadsa</div>

          </div> */}

          {(data?.NFTType == 'buy' || data?.NFTType === 'auction') && (
            <div className="number" style={{ marginBottom: 10 }}>
              {formatNumber(price)} LUCKY <img src={Token} alt="" />
            </div>
          )}

          <InfoCard value={data}/>
          {renderGroupAction()}

          {/* <div style={{ display: 'flex' }}>
            <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID:</div>
            <div className="number">{getCompactString(data?.TXHash, 6)}</div>
          </div>

          {data?.description && (
            <div className="content">{data?.description}</div>
          )}*/}

          {/* <div className="organize">
            <span style={{ fontSize: '12px', fontWeight: 500 }}>Creator</span>
            <a className="name" href={`/user-profile/${data?.createdBy?.walletAddress}/onstore/readyToSell`} target="_blank">{data?.createdBy?.name ? data?.createdBy?.name : data?.createdBy?.walletAddress}</a>
            
            
          </div>  */}
        </Col>
        <div style={ {display:(data?.NFTType == 'swap-store' && data?.status == 'readyToSell' ? 'unset' : 'none'), width:'100%'} }>
          {/* <button className="info-swap" onClick={()=> onChangeState(state)} style={{minWidth:'200px'}}>v</button> */}
          <OfferTable state={state} offerData={offerData} isRenderAction={true} renderButon={renderButon}/>
        </div>
      </Row>
      <QRCodeComp
        isShow={showQR}
        setShowQR={setShowQR}
        url={`${window.location.origin}/artwork/detail/${
          data?.NFTType || 'buy'
        }/${data?._id}`}
      />
    </CartStyled>
  )
}
