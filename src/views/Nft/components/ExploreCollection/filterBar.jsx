import React from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'
import { OptionSort, OptionMethods, OptionTypeNft } from '../../constants'
import { isMobile } from 'react-device-detect'
const { Option } = Select
const { Search } = Input

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
    setSort,
    selectDP, 
    setSelectDP
  } = props

  // const onChangeSort = (value) => {
  //   setSort(value)
  //   setPage(1)
  // }
  const onChangeSelectDatePrice = (val) => {
    
    if(val == 'asc' || val == 'low') setSort('asc')
    else setSort('desc')
    setPage(1)
    setSelectDP(val)
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
            className={isMobile ? 'filter-group-mobile' : 'filter-group'}
            onChange={onChangeType}
            value={filterType}
            defaultChecked
          >
            {
              OptionTypeNft.map((item, i) => {
                return (
                  <Radio key={i} checked={filterMethod === item.value} value={item.value}>
                    {item.label}
                  </Radio>
                )
              })
            }
          </Radio.Group>
        </div>
        <div className="list-filter" style={{ marginBottom: '24px' }}>
          <span className="filter-label">Method</span>
          <Radio.Group
            className={isMobile ? 'filter-group-mobile' : 'filter-group'}
            onChange={onChangeMethod}
            value={filterMethod}
            defaultChecked
          >
           {
            OptionMethods.map((item, i) => {
              return (
                <Radio key={i} checked={filterMethod === item.value} value={item.value}>
                  {item.label}
                </Radio>
              )
            })
           }
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
            onChange={onChangeSelectDatePrice}
            defaultValue={selectDP}
          >
            {OptionSort.map((item) => (
              <Option key={item.value} value={item.value} >
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
