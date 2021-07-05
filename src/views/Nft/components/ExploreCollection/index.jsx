import React, { useState, useEffect, useCallback, useMemo} from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import TrendingBar from '../TrendingBar/index'
import _ from 'lodash'
import {useHistory } from 'react-router-dom'
import Nfts from 'wallet/state/config/constants/nfts'
import useIO from 'hooks/useIo'


// export const option: React.ReactElement<OptionProps> = Select.Option
function ExploreCollection() {

  const history = useHistory()
  let paramsSearch = useMemo(() => new URLSearchParams(
    window.document.location.search.substring(1),
    ), [])

  const [NFTs, setNFTs] = useState({data: [], total: 0})
  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))
  const { getNFT } = useArtworkServices()
  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')
  const [page, setPage] = useState(1)

  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
  }

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  });

  const getArrNFT = useCallback(_.debounce((params) => 
  getNFT(params).then(({ status, data }) => {
    if (status == 200) {
      setNFTs({data: data?.data, total: data.total})
    }
  }), 1000), [])


  useEffect(() => {
    searchParams ? history.push(`/explore?search=${searchParams}`) : history.push(`/explore`)
    console.log('searchParams: ', searchParams)
    const params = _.pickBy({
      status: 'readyToSell',
      NFTType: filterMethod,
      type: filterType,
      title: searchParams?.toLowerCase(),
      page,
      limit: 8,
    }, _.identity)
    getArrNFT(params)
  }, [filterMethod, filterType, searchParams, page])


  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  useEffect(() => {
    if (NFTs?.data?.length) {
      let img = Array.from(document.getElementsByClassName("lazy"));
      setElements(img);
    }
  }, [NFTs, setElements]);

  const nextPage = useCallback(
    (page) => {
      setPage(page)
    },
    [],
  )

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Explore</div>
      </div>
      <div className="trending-nft">
        <TrendingBar />
      </div>
      <FilterBar 
        setFilterMethod={setFilterMethod} 
        filterMethod={filterMethod}
        filterType={filterType}
        setFilterType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        searchParams={searchParams} 

      />
      <h1 style={{ fontWeight: 'bold' }}>8 results for "lucky swap studio"</h1>
      <div className="content-collect">
        {NFTs?.data?.map((item) => {
          return (
            item?.NFTType !== 'swap-store' && (
              <Cart width="320px" height="480px" data={item} isLazy/>
            )
          )
        })}
      </div>
      {Nfts?.data?.length < Nfts.total && <div className="footer-section">
        <div className="wrapper-button" onClick={() => nextPage(page+1)}>
          <Button shape="round">Load more</Button>
        </div>
      </div>}
    </ExploreCollectionStyled>
  )
}

export default ExploreCollection
