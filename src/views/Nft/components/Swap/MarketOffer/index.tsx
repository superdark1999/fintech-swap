import React, { useState, useRef, useEffect } from 'react'
import { OfferStyled, TableStyled, WrapperListCard, ListCard, Container } from './styled'
import TextGradient from 'components-v2/ID'
import { Select, Row, Image } from 'antd'
import Swap from 'assets/images/swap.svg'
import Token from 'assets/images/token.svg'
import Plus from 'assets/images/plus.svg'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { data, column } from './mock'
import { isMobile } from 'react-device-detect'
import { ButtonBuy } from 'components-v2/Button'
import useMarketService from 'services/web3Services/MarketServices'
import { CardSwap, CardSelect, CardOffer, CardDefault } from '../components/index'
import _, { isEmpty } from 'lodash'
import { useActiveWeb3React } from 'wallet/hooks'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import { getCompactString, getPrice, binanceAddress } from 'utils'
import formatNumber from 'utils/formatNumber'
import useLuckyServices from 'services/web3Services/LuckyServices'
import useUserStore from 'store/userStore'
import notification from 'components-v2/Alert'


interface Props {
  nextStep: (step: number) => void,
  myItems: any,
  itemSwap: any
  setVisible: (value: boolean) => void
  setSelectMethod: (value: number) => void
  setMyItems: (data: any) => void
  selectMetodSwap: number,
  offerData: any
}

const OptionData = [
  {
    label: 'Lucky',
    value: 'Lucky',
  }
]
const { Option } = Select;
const METHOD_SWAP = {
  NFT_ONLY: 1,
  NFT_TOKEN: 2,
}

export default function (props: Props) {
  const {
    myItems, setVisible, itemSwap, selectMetodSwap, setSelectMethod, nextStep, setMyItems, offerData
  } = props
  const [select, setSelect] = useState<string | null>('Lucky');
  const [offerPrice, setOfferPrice] = useState<number>(0)
  const [isProccessing, setIsProcessing] = useState<boolean>(false)
  const [userState, userActions] = useUserStore()

  const marketServiceMethod = useMarketService()

  const { account } = useActiveWeb3React()

  const divRef = useRef(null)

  const luckyServicesMethod = useLuckyServices()

  const scrollLeft = () => {
    divRef.current.scrollLeft += 260
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260
  }
  const renderListCard = () => {
    if (myItems.length > 3) {
      return (
        <>
          <WrapperListCard>
            <ListCard ref={divRef} numOfItem={myItems.length}>
              {
                myItems.map((card: any) => {
                  return (
                    <CardSwap data={card} setVisible={setVisible} value='my-item' isRenderEdit={itemSwap?.[0]?.ownerWalletAddress != account} />
                  )
                })
              }
            </ListCard>
            <RightCircleOutlined
              className="scroll-left"
              onClick={scrollLeft}
              style={{ fontSize: 24 }}
            />
            <LeftCircleOutlined
              className="scroll-right"
              onClick={scrollRight}
              style={{ fontSize: 24 }}
            />
          </WrapperListCard>
        </>
      )
    } else if (myItems.length === 2 || myItems.length === 3) {
      return (
        <ListCard ref={divRef} numOfItem={myItems.length}>
          {
            myItems.map((card: any) => {
              return (
                <CardSwap data={card} setVisible={setVisible} value='my-item' isRenderEdit={itemSwap?.[0]?.ownerWalletAddress != account} />
              )
            })
          }
        </ListCard>
      )
    } else if (myItems.length === 1) return <CardSwap data={myItems[0]} setVisible={setVisible} value='my-item' isRenderEdit={itemSwap?.[0]?.ownerWalletAddress != account} />
    else return <CardDefault setVisible={setVisible} value='my-item' />
  }


  const renderMethodSwap = (method: Number) => {
    if (method === METHOD_SWAP.NFT_ONLY) {
      return (
        <>
          {renderListCard()}
          <img src={Plus} style={{ margin: 'auto 20px' }} />
          <CardOffer type={METHOD_SWAP.NFT_ONLY} onChangeSwapMethod={setSelectMethod}  />
        </>
      )
    }
    if (method === METHOD_SWAP.NFT_TOKEN) {
      return (
        <>
          {renderListCard()}
          <img src={Plus} style={{ margin: 'auto 20px' }} />
          <CardOffer type={METHOD_SWAP.NFT_TOKEN} onChangePrice={(price: number) => { setOfferPrice(price) }} onChangeSwapMethod={setSelectMethod} />
        </>
      )
    }
    return (   
      <>
        <CardSelect setSelectMethod={setSelectMethod} isShowOption={itemSwap?.[0]?.ownerWalletAddress === account} />
      </>

    )
  }

  const onOfferItem = () => {
    if (marketServiceMethod && itemSwap?.[0]?.ownerWalletAddress !== account) {
      if (myItems?.[0]?.tokenId && itemSwap?.[0]?.tokenId) {
        setIsProcessing(true)
        const { offerSwapNFT } = marketServiceMethod
        offerSwapNFT(myItems?.[0]?.tokenId, itemSwap?.[0]?.tokenId, offerPrice).then((data) => {
          nextStep && nextStep(3)
        }).catch((err) => {
          setIsProcessing(false)
          notification('error', {
            message: 'Error',
            description: err.message,
          })
        })
      }
    }
  if (marketServiceMethod && itemSwap?.[0]?.ownerWalletAddress === account) {
      if (myItems?.[0]?.tokenId && itemSwap?.[0]?.tokenId) {
        setIsProcessing(true)
        const { confirmSwapNFT } = marketServiceMethod
        confirmSwapNFT(itemSwap?.[0]?.tokenId, myItems?.[0]?.tokenId?.toString(), myItems?.[0]?.ownerWalletAddress).then((data) => {
          nextStep && nextStep(3)
        }).catch((err) => {
          setIsProcessing(false)
          notification('error', {
            message: 'Error',
            description: err.message,
          })
        })
      }
    }
  }

  const onApproveBuyOnMarket = () => {
    userActions?.updateUserInfo({ isProcessingCanBuy: true })
    luckyServicesMethod?.approveLevelAmount?.(binanceAddress.MARKET)
      .then()
      .catch(() => {
        notification('error', {
          message: 'Error',
          description: `Something went wrong please try again`,
        })
        userActions?.updateUserInfo({ isProcessingCanBuy: false })
      })
  }

  const chooseOffer = (data: any) => {
    if (data?.price > 0) {
      setSelectMethod(2)
    } else {
      setSelectMethod(1)
    }

    setMyItems([data])
  }

  const renderButon = ()=>{
    if(!account){
     return( <ButtonBuy width="300px" onClick={()=>{
        notification('error', {
          message: 'Error',
          description: `Unblock your wallet to offer`,
        })
      }} >
        Offer now
      </ButtonBuy>)
    }else if(userState?.isProcessingCanBuy||isProccessing){
      return( <ButtonProccesing/>)
    }else if(userState?.isCanBuy){
      return(
        <ButtonBuy width="300px" 
          onClick={onOfferItem} 
          className={myItems?.[0]?.tokenId && itemSwap?.[0]?.tokenId?'':'disabled'} 
          >{itemSwap?.[0]?.ownerWalletAddress !== account?"Offer now":"Confirm"}
        </ButtonBuy>
      )
    }
    return (
      <ButtonBuy onClick={onApproveBuyOnMarket}>
        Allow to offer
      </ButtonBuy>
    )
  }

  return (
    <>
      <OfferStyled >
        {/* <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
          {OptionData.map((item, i) => (
            <Option key={i} value={item.value}>{item.label} <img src={Token} /></Option>
          ))}
        </Select> */}
        <div style={{ width: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: "center" }} >
          {renderMethodSwap(selectMetodSwap)}

          <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)' } : null} />

          {itemSwap?.[0] ? <CardSwap data={itemSwap?.[0]} /> : <CardDefault setVisible={setVisible} value='item-swap' />}
        </div>
        <Row justify="center" style={{ marginTop: 40, alignItems: 'center' }}>
          <span className="btn-back" onClick={() => { nextStep(1) }}>Back</span>
          {renderButon()}
        </Row>
      </OfferStyled>
      <OfferTable offerData={offerData} isRenderAction={itemSwap?.[0]?.ownerWalletAddress === account} chooseOffer={chooseOffer} />
      {/* <ModalSelectSwap
        visible={visible}
        setVisible={setVisible}
        data={visible.value === 'my-item' ? NFTs : []}
        getItemSelected={getItemSelected}
        multiSelect={visible.value === 'my-item'}
        selectedItem={visible.value === 'my-item' ? myItems : itemSwap}
      /> */}
    </>

  )
}

const OfferTable = ({ offerData, isRenderAction, chooseOffer }: any) => {
  const column = [
    {
      title: 'Buyer',
      render: (record: any) => {
        return (
          <div>
            {record?.ownerWalletAddress > 0 && (
              <TextGradient width="auto" fontSize="14px">{getCompactString(record?.ownerWalletAddress, 6)} </TextGradient>
            )}
          </div>
        )
      }
    },
    {
      title: 'Item',
      render: (record: any) => {
        return (
          <div>
            {record?.price > 0 && (<Row>
              <TextGradient width="auto" fontSize="14px">{formatNumber(record?.price)} </TextGradient>
              {' '}<img src={Token} />
            </Row>)}
           { record?.type!='video'?
           <Image style={{ width: 80, height: 80, borderRadius: '8px' }} src={record?.contentUrl} />:
            <video
            className="nft-image"
            width='80px'
            height='80px'
            style={{objectFit:'cover'}}
            playsInline
            controls
            muted
            src={`${record?.contentUrl}`}
            data-srcset={record?.contentUrl}
            data-src={`${record?.contentUrl}#t=0.1`}
            loop
          />}
          </div>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Created By',
      render: (record: any) => {
        return (
          <div>
            <TextGradient width="auto" fontSize="14px">{record?.createdBy?.name} </TextGradient>
          </div>
        )
      }
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
    {
      title: 'Action',
      render: (record: any) => {
        return (<>
          {isRenderAction ? <ButtonBuy onClick={() => { chooseOffer(record) }}>View</ButtonBuy> : null}
        </>)
      }
    },
  ];
  return (
    <TableStyled
      columns={column}
      dataSource={offerData}
      size="middle"
      scroll={{ x: 300 }}
      style={{ width: '1100px', margin: 'auto' }}
    />
  )
}




