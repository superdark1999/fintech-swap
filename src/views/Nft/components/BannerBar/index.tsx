import React, {useEffect, useState} from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
import {useHookAirdrop } from  '../../Store'
// import banner1 from '../../../../assets/images/banner-NFT-1.jpg'
// import banner2 from '../../../../assets/images/banner-NFT-2.jpg'

export interface Banner {
    name: string,
    link: string,
    type: string,
}

export interface BannerProps {
    banners: Banner[]

}
const BannerBar:React.FC<BannerProps> = ({banners}) => {

    console.log()
    return (
        <BannerBarStyled>
            <Carousel className="banner-body" autoplay>
                {banners.length !== 0 && banners.map((src) => (
                       <img src={`https://dashboard.luckyswap.exchange/${src.link}`} alt="banner" />
                  ))
                } 
            </Carousel>
        </BannerBarStyled>
    )
}

const BannerBarStyled = styled.div`
    border-radius: 24px;
    height: 380px;
    .banner-body{
        height: 380px;
        width:100%;
        img{ 
            height: 380px;
        }
    }
`
export default BannerBar
