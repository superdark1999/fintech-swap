import React from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
function BannerBar() {
    return (
        <BannerBarStyled>
            <Carousel className="banner-body" autoplay>
                <div>AAAA</div>
                <div>bbbb</div>
            </Carousel>
        </BannerBarStyled>
    )
}

const BannerBarStyled = styled.div`
    padding:20px;
    background-color:red;
    height: 100%;
    width:100%;
    border-radius: 24px;
    .banner-body{
        height: 100%;
        width:100%;
    }
`
export default BannerBar
