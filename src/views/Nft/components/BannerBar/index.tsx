import React from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
import banner1 from '../../../../assets/images/banner-NFT-1.jpg'
import banner2 from '../../../../assets/images/banner-NFT-2.jpg'
function BannerBar() {
    return (
        <BannerBarStyled>
            <Carousel className="banner-body" autoplay>
            <img src={banner1} alt="banner-1"/>
                <img src={banner2} alt="banner-2"/>
            </Carousel>
        </BannerBarStyled>
    )
}

const BannerBarStyled = styled.div`
    border-radius: 24px;
    height: 240px;
    .banner-body{
        height: 240px;
        width:100%;
        img{ 
            height:240px;
        }
    }
`
export default BannerBar
