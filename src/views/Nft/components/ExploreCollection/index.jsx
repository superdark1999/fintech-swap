import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from 'antd'
import { ExploreCollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import FilterBar from './filterBar'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import TrendingBar from '../TrendingBar/index'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import useIO from 'hooks/useIo'
import { isMobile } from 'react-device-detect'
import ProgressBar from 'components-v2/ProgressBar'

function ExploreCollection() {
  const history = useHistory()
  let paramsSearch = useMemo(
    () => new URLSearchParams(window.document.location.search.substring(1)),
    [],
  )

  const [NFTs, setNFTs] = useState({ data: [], total: 0 })
  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))
  const { getNFT } = useArtworkServices()

  const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('')
  const [selectDatePrice, setSelectDatePrice] = useState('desc')
  const [sort, setTypeSort] = useState('desc')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(0)
  const [tags, setTags] = useState([])

  const handleInputOnchange = (e) => {
    const { value } = e.target
    setSearchParams(value)
    setPage(1)
  }

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null,
  })

  const getArrNFT = useCallback(
    _.debounce(
      (params) =>
        getNFT(params).then(({ status, data }) => {
          if (status == 200) {
            setLoading(100)
            if (page === 1) {
              setNFTs({ data: data?.data, total: data.total })
            } else {
              setNFTs({ data: NFTs.data.concat(data?.data), total: data.total })
              !isMobile && handleScroll()
            }
          }
        }),
      NFTs.length === 0 ? 0 : 1000,
    ),
    [page],
  )

  function handleScroll() {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    searchParams
      ? history.push(`/explore?search=${searchParams}`)
      : history.push(`/explore`)
    const params = _.pickBy(
      {
        status: 'readyToSell',
        NFTType: filterMethod ? filterMethod : ['auction', 'swap-store', 'buy'],
        type: filterType,
        title: '' || searchParams?.toLowerCase(),
        page,
        limit: 8,
        sort: sort,
        sortBy:
          selectDatePrice === 'asc' || selectDatePrice === 'desc' ? 'createdAt' : 'price',
        tags,
      },
      _.identity,
    )
    setLoading(Math.random() * (80 - 40 + 1) + 40)
    getArrNFT(params)
  }, [filterMethod, filterType, searchParams, page, sort, tags])

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove('lazy')
        observer.unobserve(lazyImage)
      }
    })
  }, [entries, observer])

  useEffect(() => {
    if (NFTs?.data?.length) {
      let img = Array.from(document.getElementsByClassName('lazy'))
      setElements(img)
    }
  }, [NFTs, setElements])

  return (
    <ExploreCollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Explore</div>
      </div>
      <div className="trending-nft">
        <TrendingBar setTags={setTags} tags={tags} />
      </div>
      <FilterBar
        setFilterMethod={setFilterMethod}
        filterMethod={filterMethod}
        filterType={filterType}
        setFilterType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        searchParams={searchParams}
        setPage={setPage}
        setTypeSort={setTypeSort}
        sort={sort}
        selectDatePrice={selectDatePrice}
        setSelectDatePrice={setSelectDatePrice}
      />
      <h1 style={{ fontWeight: 'bold' }}>
        {NFTs?.total} results for "lucky swap studio"
      </h1>
      <div className="content-collect">
        {NFTs?.data?.map((item) => {
          return (
            <Cart
              key={item.id}
              data={item}
              isLazy
              width="100%"
            />
          )
        })}
      </div>
      {NFTs?.data?.length < NFTs?.total && (
        <div className="footer-section">
          <div className="wrapper-button" onClick={() => setPage(page + 1)}>
            <Button shape="round">Load more</Button>
          </div>
        </div>
      )}

      <ProgressBar loading={loading} setLoading={setLoading} />
    </ExploreCollectionStyled>
  )
}

export default ExploreCollection
