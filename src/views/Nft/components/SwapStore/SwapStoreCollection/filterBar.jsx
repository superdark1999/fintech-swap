import React, { useState } from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'
//import { OptionSort, OptionMethods, OptionTypeNft } from '../../../constants'

const OptionData = ['Hangzhou', 'Ningbo', 'All items']
export const OptionSort = [
  {
    label: 'Newest',
    value: 'asc',
  },
  {
    label: 'Oldest',
    value: 'desc',
  }
]
// const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']
const { Option } = Select
const { Search } = Input

function FilterBar(props) {
  const {
    searchParams,
    setFilterType,
    filterType,
    handleInputOnchange,
    setPage,
    setSort,
    sort
    // selectDP, 
    // setSelectDP
  } = props

  const [select, setSelect] = useState('All items')

  //const [selectSort, setSelectSort] = useState('Sort by')

  const onChangeType = (e) => {
    let value = e.target.value
    setFilterType(value)
    setPage(1)
  }
  const onChangeSelectDatePrice = (val) => {
    
    // if(val == 'asc' || val == 'low') setSort('asc')
    // else setSort('desc')
    setPage(1)
    setSort(val)
  }
  return (
    <FilterBarStyled>
      <div className="left-action">
        <div className="list-filter" style={{ marginBottom: '24px'}}>
          <span className="filter-label">Type</span>
          <Radio.Group
            className="filter-group"
            onChange={onChangeType}
            value={filterType}
            defaultChecked
          >
            <Radio checked={filterType === ''} value="">
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
            onChange={setSelect}
            defaultValue={select}
            style={{ display: 'none' }}
          >
            {OptionData.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={onChangeSelectDatePrice}
            defaultValue={sort}
          >
            {OptionSort.map((item) => (
              <Option key={item.value} value={item.value}>
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
