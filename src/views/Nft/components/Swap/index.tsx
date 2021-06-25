import React, { useState, useEffect, useRef } from 'react'

import MarketOffer from './MarketOffer'
import OnSale from './OnSale'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { ProcessBar } from './components'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import ModalSelectSwap from 'components-v2/ModalSelectSwap'
import {get} from 'lodash'
import { Container } from './styled'
import Confirm from './Confirm'

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
  const { getNFT, getDetailNFT } = useArtworkServices()
  const {id} = useParams()

  const nextStep = (step: number) => {
    setStep(step)
    history.push(`/swap/${id}/step=${step}`)
  }

  const [visible, setVisible] = useState<any>({ isOpen: false, value: "my-item" });
  const [myItems, setMyItems] = useState<any>([]);
  const [itemSwap, setItemSwap] = useState<any>([]);

  useEffect(() => {
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data }: any) => {
      if (status === 200) {
        setNFTs(data?.data || [])
      }
    })
    getDetailNFT({ id }).then(({ status, data }) => {
      setItemSwap([data?.data])
    })
  }, [])



  const getItemSelected = (data?: any) => {
    if (visible.value === 'my-item') {
      setMyItems(data)
    } else {
      setItemSwap(data)
      history.push(`/swap/step=${step}/${data?.[0].ownerWalletAddress}`)
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
          selectMetodSwap={selectMetodSwap} 
          setSelectMethod={setSelectMethod}
        />
        )
      }
      case 3: {
        return <Confirm itemSwap={itemSwap} myItems={myItems}/>
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
        data={visible.value === 'my-item' ? NFTs : NFTs} // chỗ này viết lại nha, là hiện nft swap thôi (call api => itemSwapp)
        getItemSelected={getItemSelected}
        // multiSelect={visible.value === 'my-item'} chọn nhiều
        selectedItem={visible.value === 'my-item' ? myItems : itemSwap}
      />
    </Container>
  )
}


