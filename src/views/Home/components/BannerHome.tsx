import React from 'react'
import styled from 'styled-components'

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
    <BannerContainer>
      <img src="/images/banner-home.png" alt="banner-home" />
    </BannerContainer>
  )
}

export default BannerHome
