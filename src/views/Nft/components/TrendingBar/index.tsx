import React from 'react'
import { TrendingBarStyled } from './styled'
import { isMobile } from 'react-device-detect'

const TrendingBar = (props: { setTags?: (value: any) => void, tags?: any }) => {

  const OPTIONS = [
    'Art',
    'Music',
    'Games',
    'DeFi',
    'Meme',
    'Sports',
    'Abstract',
    'Space',
    'Lucky',
  ]

  const onSelectTags = (item: any) => {
    let tags = [...props?.tags]
    if (props?.tags?.includes(item)) {
      tags = props?.tags?.filter((tag:string) => tag !== item)
    } else {
      tags.push(item)
    }
    props?.setTags(tags)
  }

  return (
    <TrendingBarStyled>
      {!isMobile && <div className="title-bar">Trending</div>}
      <div className="filter-bar">
        {OPTIONS.map((item, i) => (
          <div key={i} className={props?.tags?.includes(item) ? "filter-bar-item active" :"filter-bar-item"} onClick={() => onSelectTags(item)}>
            #{item}
          </div>
        ))}
      </div>
      {OPTIONS.length > 12 && <div className="filter-bar-more">More</div>}
    </TrendingBarStyled>
  )
}

export default TrendingBar
