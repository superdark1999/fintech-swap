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
import ProgressBar from 'components-v2/ProgressBar'
import {isMobile} from 'react-device-detect'


// export const option: React.ReactElement<OptionProps> = Select.Option
function ExploreCollection() {

  const history = useHistory()
  let paramsSearch = useMemo(() => new URLSearchParams(
    window.document.location.search.substring(1),
    ), []) 
  const [NFTs, setNFTs] = useState({data: [], total: 0})
  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))
  //onst [selectDP, setSelectDP] = useState('asc')
  const [sort, setSort] = useState('desc')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(0)
  //const [tags, setTags] = useState([])
  const { getNFT } = useArtworkServices()
  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')
  
  const handleInputOnchange = (e) => {
    const { value } = e.target;
    setSearchParams(value);
    setPage(1)
  }

  const getArrNFT = useCallback(
    _.debounce(
      (params) => 
        getNFT(params).then(({ status, data }) => {
          if (status == 200) {
            setLoading(100)
            if (page === 1) {
              setNFTs({data: data?.data, total: data.total})
            } else {
              setNFTs({data: NFTs.data.concat(data?.data), total: data.total})
              !isMobile && handleScroll()
            }
          }
  }), 1000), [page])

  function handleScroll() {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }
  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null
  });


  useEffect(() => {
    const params = _.pickBy({
      status: 'readyToSell',
      NFTType: 'swap-store',
      type: filterType,
      title: searchParams?.toLowerCase(),
      page,
      limit: 8,
      sort: sort,
      sortBy: 'createdAt',
      //tags,
    }, _.identity)
    setLoading(Math.random() * (80 - 40 + 1) + 40)
    getArrNFT(params)
  }, [filterMethod, filterType, searchParams, page, sort])

  const [stateBanner, actions] = useHookNTF()
  useEffect(() => {
    actions.getListBannerSwap()
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
    if (NFTs.data.length) {
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
        <div className="title-artists">Swap Store</div>
      </div>
      <div className="banner-nft">
        <BannerBar banners={stateBanner.listBannerSwap} />
      </div>
      <FilterBar 
        setFilterMethod={setFilterMethod} 
        filterMethod={filterMethod}
        filterType={filterType}
        setFilterType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        searchParams={searchParams} 
        setPage={setPage}
        setSort={setSort}
        sort={sort}
        selectDP={sort} 
        setSelectDP={setSort}
      />
      <div className="content-collect">
        {NFTs.data.map((item) => {
          return (
              <Cart key={item.id} width="320px" height="480px" data={item} isLazy/>
            )
        })}
      </div>
      {NFTs?.data?.length < NFTs.total && <div className="footer-section">
        <div className="wrapper-button" onClick={() => nextPage(page+1)}>
          <Button shape="round">Load more</Button>
        </div>
      </div>}
      <ProgressBar loading={loading} setLoading={setLoading} />
    </ExploreCollectionStyled>
  )
}

export default ExploreCollection
