import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'antd'

const BannerContainer = styled.div`
  height: 280px;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
`
function BannerHome() {
  return (
    <Carousel autoplay infinite draggable>
      <img src="/images/banner-home.png" alt="banner-home" />
      <img src="/images/banner-home.png" alt="banner-home" />
      <img src="/images/banner-home.png" alt="banner-home" />
    </Carousel>
  )
}

export default BannerHome
