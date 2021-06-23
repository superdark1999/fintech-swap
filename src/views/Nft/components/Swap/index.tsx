import React, { useState, useEffect } from 'react'

import MarketOffer from './MarketOffer'
import OnSale from './OnSale'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { ProcessBar } from './components'
import useArtworkServices from 'services/axiosServices/ArtworkServices'

import { Container } from './styled'

export default  () => {
  const [step, setStep] = useState<Number>(1)
  const history = useHistory()

  const [NFTs, setNFTs] = useState([]);
  const { getNFT } = useArtworkServices()

  const nextStep = (step: number) => {
    setStep(step)
    history.push(`/swap/${step}`)
  }

  useEffect(() => {
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data }: any) => {
      if (status === 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [])

  const renderStep = (step: number) => {
    switch (step) {
      case 1: {
        return <OnSale nextStep={nextStep}/>
      }
      case 2: {
        return <MarketOffer nextStep={nextStep}/>
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


