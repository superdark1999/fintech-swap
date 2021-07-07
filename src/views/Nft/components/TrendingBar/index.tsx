import React from 'react'
import { TrendingBarStyled } from './styled'
import { isMobile } from 'react-device-detect'
const TrendingBar: React.FC = () => {
    const OPTIONS = ['Art', 'Music', 'Games', 'DeFi', 'Meme', 'Sports', 'Abstract', 'Space', 'Lucky'];
    return (
        <TrendingBarStyled>
            {!isMobile && <div className="title-bar">Trending now</div>}
            <div className="filter-bar">
                {OPTIONS.map((item, i) => (
                    <div key={i} className="filter-bar-item">#{item}</div>
                ))}
            </div>
            {OPTIONS.length > 12 && <div className="filter-bar-more">More</div>}
        </TrendingBarStyled>
    )
}

export default TrendingBar
