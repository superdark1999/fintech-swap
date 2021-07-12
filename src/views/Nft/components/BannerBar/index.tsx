import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import StackedCard from 'components-v2/StackedCard'

export interface Banner {
    name: string,
    link: string,
    type: string,
}

export interface BannerProps {
    banners: Banner[]

}
const BannerBar: React.FC<BannerProps> = ({ banners }) => {
    return (
      <BannerBarStyled>
        <StackedCard listItem={banners}/>
      </BannerBarStyled>
    )
}

const BannerBarStyled = styled.div`
@media only screen and (max-width: 600) {
    border-radius: 24px;
    height:  110px;
    .banner-body{
      height:  110px;
      width: 100%;
      img{ 
        height: 110px;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    border-radius: 24px;
    height:  380px;
    .banner-body{
      height:  380px;
      width: 100%;
      img{ 
        height: 380px;
      }
    } 
  }

  @media only screen and (min-width: 1100px) {
    border-radius: 24px;
    height:  300px;
    .banner-body{
      height:  300px;
      width: 100%;
      img{ 
        height: 300px
      }
    }
  }
  @media only screen and (min-width: 1320px) {
    border-radius: 24px;
    height:  380px;
    .banner-body{
      height:  380px;
      width: 100%;
      img{ 
        height: 380px
      }
    }
  }
`
export default BannerBar
