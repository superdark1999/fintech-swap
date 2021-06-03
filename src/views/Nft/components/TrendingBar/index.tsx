import React from 'react'
import {TrendingBarStyled} from './styled'
import NFTServices from '../../../../services/NFTServices'
const TrendingBar: React.FC = () => {
    return (
        <TrendingBarStyled>
            <div className="title-bar">Trending now</div>
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
