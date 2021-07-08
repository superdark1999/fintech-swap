import React, {useState} from 'react'
import { TrendingBarStyled } from './styled'
import { isMobile } from 'react-device-detect'

const TrendingBar = (props: { setTags?: (value: any) => void, tags?: any }) => {
  const [arrTag, setArrTag] = useState(props.tags || [])

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
    let tags = [...arrTag]
    if (arrTag.includes(item)) {
      tags = arrTag.filter((tag:string) => tag !== item)
    } else {
      tags.push(item)
    }
    props?.setTags(tags)
    setArrTag(tags)
  }

  return (
    <TrendingBarStyled>
      {!isMobile && <div className="title-bar">Trending</div>}
      <div className="filter-bar">
        {OPTIONS.map((item, i) => (
          <div key={i} className={arrTag.includes(item) ? "filter-bar-item active" :"filter-bar-item"} onClick={() => onSelectTags(item)}>
            #{item}
          </div>
        ))}
      </div>
      {OPTIONS.length > 12 && <div className="filter-bar-more">More</div>}
    </TrendingBarStyled>
  )
}

export default TrendingBar
