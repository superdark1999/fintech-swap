import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd'
import { CollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
const OptionData = ['All items', 'Image', 'Gif', 'Video']
const OptionSort = ['new', 'old']

// export const option: React.ReactElement<OptionProps> = Select.Option

const { Option } = Select

function Collection() {
  const [select, setSelect] = useState('All items')
  const [selectSort, setSelectSort] = useState('new')
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()
  useEffect(() => {
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [])

  return (
    <CollectionStyled>
      <div className="header-artists">
        <div className="title-artists">Collection</div>
        <div className="more-action">
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={setSelect}
            defaultValue={select}
          >
            {OptionData.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={setSelectSort}
            defaultValue={selectSort}
          >
            {OptionSort.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="content-collect">
        {NFTs.map((item) => (
          <Cart width="320px" height="480px" data={item} />
        ))}
      </div>
      <div className="footer-section">
        <div className="wrapper-button">
          <Button shape="round">
            <a href="/explore">Load more</a>
          </Button>
        </div>
      </div>
    </CollectionStyled>
  )
}

export default Collection
