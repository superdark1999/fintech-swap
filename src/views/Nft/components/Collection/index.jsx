import React, { useState, useEffect, useCallback } from 'react'
import { Select, Button } from 'antd'
import { CollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import useIO from 'hooks/useIo'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'
import FilterBar from '../SearchSort'
import ProgressBar from 'components-v2/ProgressBar'

const { Option } = Select

function Collection(props) {
  const { price } = props

  const [select, setSelect] = useState('all')
  const [selectDP, setSelectDP] = useState('desc')
  const [selectSort, setSelectSort] = useState('desc')
  const [NFTs, setNFTs] = useState({ data: [], total: 0 })
  const { getNFT } = useArtworkServices()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(0)

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null,
  })

  function handleScroll() {
    var elmnt = document.getElementById('load-more')
    elmnt && elmnt.scrollIntoView()
  }

  useEffect(() => {
    const params = _.pickBy(
      {
        status: 'readyToSell',
        NFTType: ['buy', 'auction', 'swap-store'],
        type: select === 'all' ? '' : select,
        page,
        limit: 8,
        sort: selectSort,
        sortBy:
          selectDP === 'asc' || selectDP === 'desc' ? 'createdAt' : 'price',
        ...price,
      },
      _.identity,
    )

    getNFT(params).then(({ status, data }) => {
      if (status == 200) {
        setLoading(100)
        if (page === 1) {
          setNFTs({ data: data?.data, total: data.total })
        } else {
          setNFTs({ data: NFTs?.data?.concat(data.data), total: data.total })
          !isMobile && handleScroll()
        }
      }
    })
    setLoading(Math.random() * (80 - 40 + 1) + 40)
  }, [page, selectSort, select, price])

  const onChangeSelectType = (val) => {
    setPage(1)
    setSelect(val)
  }

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

  const nextPage = useCallback((page) => {
    setPage(page)
  }, [])

  return (
    <CollectionStyled id="collection-scroll-view">
      <div className="header-artists">
        <div className="title-artists">Collection</div>
        <FilterBar
        setPage={setPage}
        selectType={select}
        setSelectType={setSelect}
        setSelectSort={setSelectSort}
        selectDP={selectDP} 
        setSelectDP={setSelectDP}
        />

      </div>
      
      <div className="content-collect">
        {NFTs?.data?.map((item) => (
          <Cart key={item.id} width="320px" height="480px" data={item} isLazy />
        ))}
      </div>
      {NFTs?.data?.length < NFTs?.total && (
        <div id="load-more" className="footer-section">
          <div className="wrapper-button">
            <Button shape="round" onClick={() => nextPage(page + 1)}>
              Load more
            </Button>
          </div>
        </div>
      )}
      <ProgressBar loading={loading} setLoading={setLoading} />

    </CollectionStyled>
  )
}

export default Collection
