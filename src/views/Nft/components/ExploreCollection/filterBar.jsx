import React, { useState } from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'

const { Option } = Select
const { Search } = Input

const OptionSort = [
  {
    label: 'New',
    value: 'asc'
  },
  {
    label: 'Old',
    value: 'desc'
  }]

function FilterBar(props) {
  const {
    searchParams,
    setFilterMethod,
    filterMethod,
    setFilterType,
    filterType,
    handleInputOnchange,
    setPage,
    sort,
    setSort
  } = props

  const onChangeSort = (value) => {
    setSort(value)
    setPage(1)
  }

  const onChangeMethod = (e) => {
    let value = e.target.value
    setFilterMethod(value)
    setPage(1)
  }
  const onChangeType = (e) => {
    let value = e.target.value
    setFilterType(value)
    setPage(1)
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
            <Radio checked={filterType === ''} value=''>
              All
            </Radio>
            <Radio checked={filterType === 'image'} value="image">
              Picture
            </Radio>
            <Radio checked={filterType === 'gif'} value="gif">
              GIF
            </Radio>
            <Radio checked={filterType === 'video'} value="video">
              Video
            </Radio>
            <Radio checked={filterType === 'audio'} value="audio">
              Audio
            </Radio>
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
            <Radio checked={filterMethod === ''} value=''>
              All
            </Radio>
            <Radio checked={filterMethod === 'auction'} value="auction">
              Auction
            </Radio>
            <Radio checked={filterMethod === 'swap-store'} value="swap-store">
              Swap
            </Radio>
            <Radio checked={filterMethod === 'buy'} value="buy">
              Buy
            </Radio>
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
          <label>Sort: </label>
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={onChangeSort}
            defaultValue={sort}
          >
            {OptionSort.map((item) => (
              <Option key={item} value={item.value} >
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </FilterBarStyled>
  )
}

export default FilterBar
