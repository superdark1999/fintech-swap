import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'antd'

const BannerContainer = styled.div`
  height: 418px;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
`
function BannerHome() {
  return (
    <Carousel autoplay infinite draggable>
      <img src="/images/banner-home.jpg" alt="banner-home" />
      <img src="/images/coinbann.jpg" alt="coming-soon" />
      <img src="/images/banner-home-3.jpg" alt="banner-home-3" />
    </Carousel>
  )
}

export default BannerHome
