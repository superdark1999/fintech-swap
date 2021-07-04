import React, { useState, useEffect, useCallback, useMemo} from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import _ from 'lodash'
import {useHistory } from 'react-router-dom'
import BannerBar from '../../../components/BannerBar/index'
import { useHookNTF } from '../../../Store'
import useIO from 'hooks/useIo'


// export const option: React.ReactElement<OptionProps> = Select.Option
function ExploreCollection() {

  const history = useHistory()
  let paramsSearch = useMemo(() => new URLSearchParams(
    window.document.location.search.substring(1),
    ), []) 
  const [NFTs, setNFTs] = useState([])
  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))

  const { getNFT } = useArtworkServices()
  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')
  
  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
  }

  const getArrNFT = useCallback(_.debounce((params) => 
  getNFT(params).then(({ status, data }) => {
    if (status == 200) {
      setNFTs(data?.data || [])
    }
  }), 1000), [])

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  });


  useEffect(() => {
    // searchParams ? history.push(`/swap-store?search=${searchParams}`) : history.push(`/explore`)
    const params = _.pickBy({
      status: 'readyToSell',
      NFTType: 'swap-store',
      type: filterType,
      title: searchParams?.toLowerCase()
    }, _.identity)
    getArrNFT(params)
  }, [filterMethod, filterType, searchParams])

  const [stateBanner, actions] = useHookNTF()
  useEffect(() => {
    actions.getBanner('swap')
  }, [])

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
    if (NFTs.length) {
      let img = Array.from(document.getElementsByClassName("lazy"));
      setElements(img);
    }
  }, [NFTs, setElements]);

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Swap Store</div>
      </div>
      <div className="banner-nft">
        <BannerBar banners={stateBanner.banner} />
      </div>
      <FilterBar 
        setFilterMethod={setFilterMethod} 
        filterMethod={filterMethod}
        filterType={filterType}
        setFilterType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        searchParams={searchParams} 
      />
      <div className="content-collect">
        {NFTs.map((item) => {
          return (
            item?.NFTType === 'swap-store' && (
              <Cart width="320px" height="480px" data={item} isLazy/>
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
