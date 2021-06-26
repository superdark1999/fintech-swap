import React from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
import banner1 from '../../../../assets/images/banner-NFT-1.jpg'
import banner2 from '../../../../assets/images/banner-NFT-2.jpg'
import { isMobile } from 'react-device-detect'
function BannerBar() {
    return (
        <BannerBarStyled>
            <Carousel className="banner-body" autoplay>
                <img src={banner1} alt="banner-1" />
                <img src={banner2} alt="banner-2" />
            </Carousel>
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
