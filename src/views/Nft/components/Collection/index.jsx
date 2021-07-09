import React, { useState, useEffect, useCallback } from 'react'
import { Select, Button } from 'antd'
import { CollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import useIO from 'hooks/useIo'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import _ from 'lodash'

const OptionData = [
  { label: 'All items', value: '' },
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' },
  { label: 'Gif', value: 'gif' },
  { label: 'Audio', value: 'audio' },
]

const OptionSort = [
  {
    label: 'Newest',
    value: 'asc',
  },
  {
    label: 'Oldest',
    value: 'desc',
  },
  {
    label: 'Price Low',
    value: 'low', // TODO: need handle more 
  },
  {
    label: 'Price Hight',
    value: 'hight', // TODO: need handle more 
  }
]

// export const option: React.ReactElement<OptionProps> = Select.Option

const { Option } = Select

function Collection(props) {
  const { price } = props

  const [select, setSelect] = useState('')
  const [selectSort, setSelectSort] = useState('asc')
  const [NFTs, setNFTs] = useState({ data: [], total: 0 })
  const { getNFT } = useArtworkServices()
  const [page, setPage] = useState(1)

  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null,
  })

  useEffect(() => {
    const params = _.pickBy(
      {
        status: 'readyToSell',
        NFTType: ['buy', 'auction', 'swap-store'],
        type: select === 'all' ? '' : select,
        page,
        limit: 8,
        sort: selectSort,
        sortBy: 'createdAt',
        ...price,
      },
      _.identity,
    )
    getNFT(params).then(({ status, data }) => {
      if (status == 200) {
        if (page === 1) {
          setNFTs({ data: data?.data, total: data.total })
        } else
          setNFTs({ data: NFTs?.data?.concat(data.data), total: data.total })
      }
    })
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
    <CollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Collection</div>
        <div className="more-action">
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={onChangeSelectType}
            defaultValue={select}
          >
            {OptionData.map((item, index) => (
              <Option key={index} value={item.value} label={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
          <Select
            style={{ minWidth: 100, borderRadius: 30 }}
            onChange={setSelectSort}
            defaultValue={selectSort}
          >
            {OptionSort.map((item, index) => (
              <Option key={index} value={item.value} label={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="content-collect">
        {NFTs?.data?.map((item) => (
          <Cart key={item.id} width="320px" height="480px" data={item} isLazy />
        ))}
      </div>
      {NFTs?.data?.length < NFTs?.total && (
        <div className="footer-section">
          <div className="wrapper-button">
            <Button shape="round" onClick={() => nextPage(page + 1)}>
              Load more
            </Button>
          </div>
        </div>
      )}
    </CollectionStyled>
  )
}

export default Collection
