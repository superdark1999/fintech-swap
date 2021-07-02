import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import TrendingBar from '../TrendingBar/index'
import _ from 'lodash'
import {useHistory } from 'react-router-dom'


// export const option: React.ReactElement<OptionProps> = Select.Option
function ExploreCollection() {

  const history = useHistory()

  const [NFTs, setNFTs] = useState([])
  const [searchParams, setSearchParams] = useState('')

  const { getNFT } = useArtworkServices()
  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')

  const debounce = useCallback(_.debounce((nextValue) => getArrNFT(nextValue), 1000), [])
  
  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
    debounce(value)
  }

  const getArrNFT = (keySearch) => {
    history.push(`/explore?search=${keySearch}`)
    const params = _.pickBy({
      status: 'readyToSell',
      NFTType: filterMethod,
      type: filterType,
      title: keySearch.toLowerCase()
    }, _.identity)

    getNFT(params).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }

  useEffect(() => {
    let paramsSearch = new URLSearchParams(
      window.document.location.search.substring(1),
    )
    const title = paramsSearch.get('search') // is the string "Jonathan"
    setSearchParams(title)
    const params = _.pickBy({
      status: 'readyToSell',
      NFTType: filterMethod,
      type: filterType,
      title,
    }, _.identity)

    getNFT(params).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [filterMethod, filterType])

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Explore</div>
      </div>
      <div className="trending-nft">
        <TrendingBar 
          setFilterMethod={setFilterMethod} 
          filterMethod={filterMethod}
          filterType={filterType}
          setFilterType={setFilterType}
          handleInputOnchange={handleInputOnchange}
          searchParams={searchParams} 
        />
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
