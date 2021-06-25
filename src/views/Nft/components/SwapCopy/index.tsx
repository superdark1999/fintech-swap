import React, { useState, useEffect } from 'react'

import MarketOffer from './MarketOffer'
import OnSale from './OnSale'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { ProcessBar } from './components'
import useArtworkServices from 'services/axiosServices/ArtworkServices'

import { Container } from './styled'
import {NFTDetailType}  from './Interface'
export default  () => {
  const [step, setStep] = useState<Number>(1)
  const history = useHistory()
  const param:any = useParams()

  const [NFT, setNFT] = useState<NFTDetailType|null>(null);
  const { getNFT,getDetailNFT } = useArtworkServices()

  const nextStep = (step: number) => {
    setStep(step)
    history.push(`/swap/${NFT._id}/${step}`)
  }

  useEffect(() => {
    getDetailNFT({
      id:param?._id
    }).then(({ status, data }: any) => {
      if (status === 200) {
        setNFT(data?.data || [])
      }
    })
  }, [])

  const renderStep = (step: number) => {
    switch (step) {
      case 1: {
        return <OnSale nextStep={nextStep} NFTDetail={NFT}/>
      }
      case 2: {
        return <MarketOffer nextStep={nextStep} NFTDetail={NFT}/>
      }
    }
  }

  return (
    <Container>
        <ProcessBar step={step}/>

       { renderStep(+step) }

    </Container>
  )
}


