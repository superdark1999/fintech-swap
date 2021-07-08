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
        {
          !isMobile? (
            <Carousel className="banner-body" autoplay>
              {banners.length !== 0 && banners.map((src, i: number) => (
                  <img key={i} src={`https://dashboard.luckyswap.exchange/${src.link}`} alt="banner" />
              ))
              }
            </Carousel>
          )
          :
          <StackedCard listItem={banners}/>
        }
        </BannerBarStyled>
    )
}

const BannerBarStyled = styled.div`
    border-radius: 24px;
    height: ${isMobile ? '110px' : '380px'};
    .banner-body{
        height: ${isMobile ? '110px' : '380px'};
        width:100%;
        img{ 
         height: ${isMobile ? '110px' : '380px'};
        }
    }
`
export default BannerBar
