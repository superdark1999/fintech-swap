import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import BannerBar from '../../../components/BannerBar/index'
import { useHookNTF } from '../../../Store'

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
      NFTType: ['buy', 'auction', 'swap-store'],
    }).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [])

  const [onShowSidebar, setShowSidebar] = useState(false)
  const [stateBanner, actions] = useHookNTF()
  useEffect(() => {
    actions.getBanner('swap')
  }, [])

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Swap Store</div>
      </div>
      <div className="banner-nft">
        <BannerBar banners={stateBanner.banner} />
      </div>
      <FilterBar searchParams={searchParams} />
      <div className="content-collect">
        {NFTs.map((item) => {
          return (
            item?.NFTType === 'swap-store' && (
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
