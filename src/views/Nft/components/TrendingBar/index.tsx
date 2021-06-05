import React from 'react'
import {TrendingBarStyled} from './styled'
import NFTServices from '../../../../services/NFTServices'
import {isMobile} from 'react-device-detect'
const TrendingBar: React.FC = () => {
    const {sellNFT,getOwnerNFT} = NFTServices()
    const sellNFTTest= ()=>{
        sellNFT(5,10)
    }
    return (
        <TrendingBarStyled>
            {!isMobile && <div className="title-bar">Trending now</div>}
            <div className="filter-bar">
                <div className="filter-bar-item"
                onClick={sellNFTTest}
                >#luckyswap</div>
                <div className="filter-bar-item">#luckyswapluckyswap</div>
                <div className="filter-bar-item">#luckyswapluckyswap</div>
                <div className="filter-bar-item">#luckyswapluckyswap</div>
                <div className="filter-bar-item">#luckyswapluckyswap</div>
                <div className="filter-bar-item">#luckyswap</div>
                <div className="filter-bar-item">#luckyswap</div>
            </div>
            <div className="filter-bar-more">More</div>
        </TrendingBarStyled>
    )
}

export default TrendingBar
