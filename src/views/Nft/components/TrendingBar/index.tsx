import React from 'react'
import {TrendingBarStyled} from './styled'
import {isMobile} from 'react-device-detect'
const TrendingBar: React.FC = () => {
    return (
        <TrendingBarStyled>
            {!isMobile && <div className="title-bar">Trending now</div>}
            <div className="filter-bar">
                <div className="filter-bar-item">#luckyswap</div>
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
