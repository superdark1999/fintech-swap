import React, { useState } from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'
const OptionData = ['Hangzhou', 'Ningbo', 'All items']
const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']
const { Option } = Select
const { Search } = Input
function FilterBar(props) {
  const { searchParams } = props
  const [valueMethod, setValueMethod] = useState('all')
  const [valueType, setValueType] = useState('all')
  const [select, setSelect] = useState('All items')
  const [selectSort, setSelectSort] = useState('Sort by')
  const onChangeMethod = (e) => {
    setValueMethod(e.target.value)
  }
  const onChangeType = (e) => {
    setValueType(e.target.value)
  }
  return (
    <FilterBarStyled>
      <div className="left-action">
        <div className="list-filter" style={{ marginBottom: '24px' }}>
          <span className="filter-label">Type</span>
          <Radio.Group
            className="filter-group"
            onChange={onChangeType}
            value={valueType}
            defaultChecked
          >
            <Radio value="all">All</Radio>
            <Radio value="picture">Picture</Radio>
            <Radio value="gif">GIF</Radio>
            <Radio value="video">Video</Radio>
            <Radio value="audio">Audio</Radio>
          </Radio.Group>
        </div>
        <div className="list-filter" style={{ marginBottom: '24px' }}>
          <span className="filter-label">Method</span>
          <Radio.Group
            className="filter-group"
            onChange={onChangeMethod}
            value={valueMethod}
            defaultChecked
          >
            <Radio value="all">All</Radio>
            <Radio value="auction">Auction</Radio>
            <Radio value="swap">Swap</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="right-action">
        <Search
          className="search-input"
          placeholder="Search name, collections,..."
          loading={false}
          onSearch={searchParams}
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
