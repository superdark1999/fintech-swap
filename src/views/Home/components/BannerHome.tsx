import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'antd'

const BannerContainer = styled.div`
`
function BannerHome() {
  return (
    <BannerContainer>
      <Carousel  autoplay infinite draggable>
        <img src="/images/banner-home.jpg" alt="banner-home" />
        <img src="/images/coinbann.jpg" alt="coming-soon" />
        <img src="/images/banner-home-3.jpg" alt="banner-home-3" />
        <img src="/images/banner-home-4.jpg" alt="banner-home-4" />
      </Carousel>
    </BannerContainer>
  )
}

export default BannerHome
