import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import TrendingBar from '../TrendingBar/index'
// export const option: React.ReactElement<OptionProps> = Select.Option
function ExploreCollection() {
  const [NFTs, setNFTs] = useState([])
  const [searchParams, setSearchParams] = useState('')
  const { getNFT } = useArtworkServices()
  useEffect(() => {
    let params = new URLSearchParams(
      window.document.location.search.substring(1),
    )
    let name = params.get('search') // is the string "Jonathan"
    setSearchParams(name)
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [])

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Explore</div>
      </div>
      <div className="trending-nft">
        <TrendingBar />
      </div>
      <FilterBar searchParams={searchParams} />
      <h1 style={{ fontWeight: 'bold' }}>8 results for "lucky swap studio"</h1>
      <div className="content-collect">
        {NFTs.map((item) => {
          return (
            item?.NFTType !== 'swap-store' && (
              <Cart width="320px" height="480px" data={item} />
            )
          )
        })}
      </div>
      <div className="footer-section">
        <div className="wrapper-button">
          <Button shape="round">Load more</Button>
        </div>
      </div>
    </ExploreCollectionStyled>
  )
}

export default ExploreCollection
