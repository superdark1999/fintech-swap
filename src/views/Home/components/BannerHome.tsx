import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'antd'

const BannerContainer = styled.div``
function BannerHome() {
  return (
    <BannerContainer>
      <Carousel autoplay infinite draggable>
        <img src="/images/banner-main.jpg" alt="banner-main"/>
        <img src="/images/banner-home.jpg" alt="banner-home"/>
        <img src="/images/banner-home-3.jpg" alt="banner-home-3"/>
      </Carousel>
    </BannerContainer>
  )
}

export default BannerHome
