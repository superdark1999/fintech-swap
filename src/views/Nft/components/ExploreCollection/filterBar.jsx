import React, { useState } from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'

const OptionData = ['Hangzhou', 'Ningbo', 'All items']
const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']
const { Option } = Select
const { Search } = Input

function FilterBar(props) {
  const { searchParams, setFilterMethod, filterMethod, setFilterType, filterType, handleInputOnchange} = props

  const [select, setSelect] = useState('All items')

  const [selectSort, setSelectSort] = useState('Sort by')

  const onChangeMethod = (e) => {
    let value = e.target.value;
    if (e.target.value === 'all') value = ['buy', 'auction', 'swap-store']
    setFilterMethod(value)
  }
  const onChangeType = (e) => {
    let value = e.target.value;
    if (e.target.value === 'all') value = ''
    setFilterType(value)
  }
  return (
    <FilterBarStyled>
      <div className="left-action">
        <div className="list-filter" style={{ marginBottom: '24px' }}>
          <span className="filter-label">Type</span>
          <Radio.Group
            className="filter-group"
            onChange={onChangeType}
            value={filterType}
            defaultChecked
          >
            <Radio checked={filterType === ''} value=''>All</Radio>
            <Radio checked={filterType === 'image'} value="image">Picture</Radio>
            <Radio checked={filterType === 'gif'} value="gif">GIF</Radio>
            <Radio checked={filterType === 'video'} value="video">Video</Radio>
            <Radio checked={filterType === 'audio'} value="audio">Audio</Radio>
          </Radio.Group>
        </div>
        <div className="list-filter" style={{ marginBottom: '24px' }}>
          <span className="filter-label">Method</span>
          <Radio.Group
            className="filter-group"
            onChange={onChangeMethod}
            value={filterMethod}
            defaultChecked
          >
            <Radio checked={filterMethod === ''} value=''>All</Radio>
            <Radio checked={filterMethod === 'auction'} value="auction">Auction</Radio>
            <Radio checked={filterMethod === 'swap-store'} value="swap-store">Swap</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="right-action">
        <Search
          className="search-input"
          placeholder="Search name, collections,..."
          loading={false}
          value={searchParams}
          onChange={handleInputOnchange}
          enterButton
        />
        <div>
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
    </FilterBarStyled>
  )
}

export default FilterBar
