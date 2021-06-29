import React, { useState, useEffect, useRef } from 'react'

import MarketOffer from './MarketOffer'
import OnSale from './OnSale'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { ProcessBar } from './components'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import ModalSelectSwap from 'components-v2/ModalSelectSwap'
import useNFTServices from 'services/web3Services/NFTServices'
import { useActiveWeb3React } from 'wallet/hooks'
import {get} from 'lodash'
import { Container } from './styled'
import Confirm from './Confirm'
import useMarketService from 'services/web3Services/MarketServices'
import {getPrice} from 'utils'
import _ from 'lodash'

//handle modal :
// 2 loại, mở của mình (value === 'my-item') và mở chọn sp mình swap (value === 'item-swap')

//  bước 1: chọn NFT người bán
// bước 2: chọn NFT người mua
//      - 2 cách swap: chỉ token, nft + token
//     (selectMetodSwap === 1) => token
//     (selectMetodSwap === 2) => nft + token
// bước 3 xác nhận: 2 loại tương ứng 2 loại swap

export default  () => {
  const match = useRouteMatch()
  const [step, setStep] = useState<number>(get(match, 'params.step', 1))
  const [selectMetodSwap, setSelectMethod] = useState<number | null>()

  const history = useHistory()
  const [NFTs, setNFTs] = useState([]);
  const [status, setStatus] = useState<string>('processing')

  const [userNFTs, setUserNFTs] = useState([])
  const [offerData, setOfferData] = useState([])
  const { getNFT, getDetailNFT, setPrice, buyItem, cancelSellNFT } = useArtworkServices()
  const {id} = useParams()


  const nextStep = (step: number) => {
    setStep(step)
    history.push(`/swap/${id}/step=${step}`)
  }
  const { account, chainId } = useActiveWeb3React()

  const [visible, setVisible] = useState<any>({ isOpen: false, value: "my-item" });
  const [myItems, setMyItems] = useState<any>([]);
  const [itemSwap, setItemSwap] = useState<any>([]);
  const NFTServicesMethod = useNFTServices()

  const marketServiceMethod  = useMarketService()

  useEffect(() => {
    if(id){
      getDetailNFT({ id }).then(({ status, data }) => {
        setItemSwap([data?.data])
      })
    }
    getNFT({
      status: 'readyToSell',
      NFTType: ['swap-store']
    }).then(({ status, data }: any) => {
      if (status === 200) {
        setNFTs(data?.data || [])
      }
    })
    if(account){
      getNFT({
        status:'approved',
        ownerWalletAddress:account
      }).then(({status, data}:any)=>{
        if (status === 200) {
          const userNFTsRaw = data?.data||[]
          const NFTsListSellPromise = userNFTsRaw.map((item:any)=>{
            return  NFTServicesMethod?.isTokenReadyToSell(item?.tokenId)
          })
          Promise.all(NFTsListSellPromise).then(data=>{
            const  userNFTs = data?.map?.((it,i)=>{ return it?userNFTsRaw[i]:null})?.filter?.(i=>i)||[]
            setUserNFTs(userNFTs)
          })
        }
      })
    }
  }, [account,id])
  

  useEffect(()=>{
    if(marketServiceMethod&&itemSwap?.[0]?.tokenId&&myItems?.[0]?.tokenId){
      const {marketContract} =  marketServiceMethod
      marketContract.on('OfferNFTs',(author, oldValue, newValue, event)=>{
        if(author==account&& myItems?.[0]?.tokenId ==Number(oldValue) && itemSwap?.[0]?.tokenId == Number(newValue)){
          setPrice({ id: myItems?.[0]?._id, NFTType: 'swap-personal'}).then(({data,status})=>{
            setStatus('success')
          })
        }
      })
      marketContract.on('SwapNFTs',(tokenIdA, tokenIdB, accountB, event)=>{
        if(itemSwap?.[0]?.ownerWalletAddress==accountB&& myItems?.[0]?.tokenId ==Number(tokenIdB) && itemSwap?.[0]?.tokenId == Number(tokenIdA)){
          buyItem({ id: [myItems?.[0]?._id,itemSwap?.[0]?._id]}).then(({data,status})=>{
            setStatus('success')
          })
        }
      })
      marketContract.on('CancelOfferNFT',(author, tokenId)=>{
        if(author===account&&Number(tokenId)==itemSwap?.[0]?.tokenId){
          cancelSellNFT({ id: myItems?.[0]?._id }).then(({ status }) => {
            setStatus('canceled')
          })
        }
      })
    }
  },[marketServiceMethod,account,itemSwap?.[0]?.tokenId,myItems?.[0]?.tokenId])


  const getSwapOffers = (itemSwap:any, account:string)=>{
    const tokenId = itemSwap?.[0]?.tokenId;
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
            if(_.find(offerData,item=>item.ownerWalletAddress===account)){
              setMyItems([_.find(offerData,item=>item.ownerWalletAddress===account)])
              history.push(`/swap/${id}/step=3`)
              setStep(3)
              setStatus('success')
            }
            setOfferData(offerData)
            }
          })
        }
      })
  }
  }

  useEffect(()=>{
    getSwapOffers(itemSwap,account)
    if(account&&itemSwap?.[0]?.ownerWalletAddress==account){
      history.push(`/swap/${id}/step=2`)
      setStep(2)
    }
  },[itemSwap?.[0]?.tokenId,account])

  const getItemSelected = (data?: any) => {
    if (visible.value === 'my-item') {
      setMyItems(data)
    } else {
      setItemSwap(data)
      history.push(`/swap/${data?.[0]._id}/step=${step}`)
    }
  }

  // useEffect(() => {
  //call get NFT Swap
  // }, [])

  const renderStep = (step: number) => {
    switch (step) {
      case 1: {
        return (
          <OnSale 
            nextStep={nextStep} 
            setVisible={setVisible} 
            itemSwap={itemSwap?.[0]} 
            getItemSelected={getItemSelected}
          />
        )
      }
      case 2: {
        return (
        <MarketOffer 
          nextStep={nextStep}
          setVisible={setVisible} 
          itemSwap={itemSwap} 
          myItems={myItems}
          setMyItems={setMyItems}
          selectMetodSwap={selectMetodSwap} 
          setSelectMethod={setSelectMethod}
          offerData={offerData}
        />
        )
      }
      case 3: {
        return <Confirm itemSwap={itemSwap} myItems={myItems} status={status} setStatus={setStatus}/>
      }
    }
  }

  return (
    <Container>
        <ProcessBar step={step}/>

       { renderStep(+step) }
       <ModalSelectSwap
        visible={visible}
        title={visible.value === 'my-item'?'YOUR COLLECTION':'SWAP MINI STORE'}
        setVisible={setVisible}
        data={visible.value === 'my-item' ? userNFTs : NFTs} // chỗ này viết lại nha, là hiện nft swap thôi (call api => itemSwapp)
        getItemSelected={getItemSelected}
        // multiSelect={visible.value === 'my-item'} chọn nhiều
        selectedItem={visible.value === 'my-item' ? myItems : itemSwap}
      />
    </Container>
  )
}


