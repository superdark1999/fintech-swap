import React, { useState, useRef, useEffect } from 'react'
import { OfferStyled, TableStyled, WrapperListCard, ListCard, Container} from './styled'
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
import { CardSwap, CardSelect, CardOffer, CardDefault} from '../components/index'
import _, {isEmpty} from 'lodash'
import { useActiveWeb3React } from 'wallet/hooks'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import ButtonProccesing from 'components-v2/Button/btnProcessing'
import {getPrice} from 'utils'

interface Props {
  nextStep: (step: number) => void,
  myItems: any,
  itemSwap: any
  setVisible: (value: boolean) => void
  setSelectMethod: (value: number) => void
  setMyItems: (data:any) => void
  selectMetodSwap: number
}

const OptionData = [
  {
    label: 'Lucky',
    value: 'Lucky',
  }
]
const { Option } = Select;
const METHOD_SWAP= {
  NFT_ONLY: 1,
  NFT_TOKEN: 2,
}

export default function (props: Props) {
  const {
    myItems, setVisible, itemSwap, selectMetodSwap, setSelectMethod,nextStep, setMyItems
  } = props
  const [select, setSelect] = useState<string | null>('Lucky');
  const [offerPrice, setOfferPrice] = useState<number>(0)
  const { setPrice, getNFT } = useArtworkServices()
  const [isProccessing, setIsProcessing] = useState<boolean>(false)
  const [canGoNextStep,setCanGoNextStep] = useState<boolean>(false)
  const [offerData, setOfferData] = useState([])

  const marketServiceMethod  = useMarketService()

  const {account} = useActiveWeb3React()

  const divRef = useRef(null)

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
                  <CardSwap data={card} setVisible={setVisible} value='my-item'/>
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
                <CardSwap data={card} setVisible={setVisible} value='my-item'/>
              )
            })
          }
        </ListCard>
      )
    } else if (myItems.length === 1) return <CardSwap data={myItems[0]} setVisible={setVisible} value='my-item'/>
    else return <CardDefault setVisible={setVisible} value='my-item'/>
  }

  const getSwapOffers = (tokenId:string)=>{
    if(marketServiceMethod&&tokenId){
      const {getSwapOffers} =  marketServiceMethod
      getSwapOffers(tokenId).then((data:any)=>{
        const rawNFTs = data?.map((item:any)=>{
          return {
            ownerWalletAddress: item[0],
            tokenId: Number(item[1]),
            price: getPrice(Number(item[2]))
          }
        })
        if(!_.isEmpty(rawNFTs)){
          getNFT({
            tokenId: rawNFTs.map((it:any)=>it.tokenId)
          }).then(({status,data})=>{
            if(status==200){
             const offerData = data?.data?.map((item:any)=>{
                const rawNFTByTokenId = rawNFTs.find((it:any)=>item?.tokenId==it?.tokenId)||{}
                return {
                  ...rawNFTByTokenId,
                  ...item
                }
              })
            setOfferData(offerData)
            }
          })
        }
      })
  }
  }
  useEffect(()=>{
    getSwapOffers(itemSwap?.[0]?.tokenId)
  },[itemSwap?.[0]?.tokenId])

  useEffect(()=>{
    if(marketServiceMethod&&itemSwap?.[0]?.tokenId&&myItems?.[0]?.tokenId){
      const {marketContract} =  marketServiceMethod
      marketContract.on('OfferNFTs',(author, oldValue, newValue, event)=>{
        if(author==account&& myItems?.[0]?.tokenId ==Number(oldValue) && itemSwap?.[0]?.tokenId == Number(newValue) &&offerPrice == getPrice( Number(event)))
        setPrice({ id: myItems?.[0]?._id, NFTType: 'swap-personal'}).then(({data,status})=>{
          setCanGoNextStep(true)
          getSwapOffers(itemSwap?.[0]?.tokenId)
        })
      })
    }
  },[marketServiceMethod,itemSwap?.[0]?.tokenId,myItems?.[0]?.tokenId])


  const renderMethodSwap = (method: Number) => {
    if (method === METHOD_SWAP.NFT_ONLY) {
      return (
        <>
          {renderListCard()}
          <img src={Plus} style={{ margin: 'auto 20px' }} />
         <CardOffer type={METHOD_SWAP.NFT_ONLY} />
        </>
      )
    }
    if (method === METHOD_SWAP.NFT_TOKEN) {
      return (
        <>
         {renderListCard()}
         <img src={Plus} style={{ margin: 'auto 20px' }} />
         <CardOffer type={METHOD_SWAP.NFT_TOKEN} onChangePrice={(price:number)=>{setOfferPrice(price)}} />
        </>
      )
    }
    return (
      <>
        <CardSelect setSelectMethod={setSelectMethod}/>
      </>

    )
  }

  const onOfferItem = ()=>{
    if(marketServiceMethod && itemSwap?.[0]?.ownerWalletAddress !== account){
      if(myItems?.[0]?.tokenId && itemSwap?.[0]?.tokenId){
        setIsProcessing(true)
        const { offerSwapNFT} = marketServiceMethod
        offerSwapNFT(myItems?.[0]?.tokenId,itemSwap?.[0]?.tokenId,offerPrice).then((data)=>{
          nextStep&&nextStep(3)
        }).catch((err)=>{
          setIsProcessing(false)
          console.log(err)
        })
      }
    }
    if(marketServiceMethod && itemSwap?.[0]?.ownerWalletAddress !== account ){

    }
  }

  const chooseOffer = (data:any)=>{
    setMyItems([data])
  }

  return (
    <>
      <OfferStyled >
        <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
          {OptionData.map((item, i) => (
            <Option key={i} value={item.value}>{item.label} <img src={Token} /></Option>
          ))}    
        </Select>
        <div style={{width: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: "center"}} >
            {renderMethodSwap(selectMetodSwap)}
            
            <img src={Swap} style={isMobile ? { transform: 'rotate(90deg)'} : null} />

            {itemSwap?.[0] ? <CardSwap data={itemSwap?.[0]} /> : <CardDefault setVisible={setVisible} value='item-swap' />}
        </div>
        <Row justify="center" style={{marginTop: 40}}>
          {isProccessing?<ButtonProccesing/>:<ButtonBuy width="300px" onClick={onOfferItem}>Offer now</ButtonBuy>}
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

const OfferTable = ({offerData, isRenderAction, chooseOffer}:any) =>{
  const column = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
    },
    {
      title: 'Price',
      render: (record:any) => {

       return (
        <div>
          {record?.price>0&&(<Row>
            <TextGradient width="auto" fontSize="14px">{record?.price} </TextGradient>
            {' '}<img src={Token} />
          </Row>)}
          <Image style={{width: 80, height: 80, borderRadius: '8px' }}  src={record?.contentUrl} />
          <div style={{fontWeight: 600}}>Txn Hash</div>
        </div>
       )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
    {
      title: 'Action',
      dataIndex: 'note',
    render: (record:any) => <> {isRenderAction?<ButtonBuy onClick={()=>{chooseOffer(record)}}>Choose</ButtonBuy>:null }</>
    },
  ];
  return (
    <TableStyled
        columns={column} 
        dataSource={offerData} 
        size="middle"
        scroll={{ x: 300 }}
        style={{width: '1100px', margin: 'auto'}}
    />   
  )
}




