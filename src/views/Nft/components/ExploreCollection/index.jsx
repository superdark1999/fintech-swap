import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'

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
      <FilterBar searchParams={searchParams} />
      <div className="content-collect">
        {NFTs.map((item) => (
          <Cart width="320px" height="480px" data={item} />
        ))}
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