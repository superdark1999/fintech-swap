import React from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'
import SearchSort from '../SearchSort'
import { OptionSort, OptionMethods, OptionTypeNft } from '../../constants'
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
            className="filter-group"
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
      <SearchSort
        handleInputOnchange={handleInputOnchange}
        setPage={setPage}
        searchParams={searchParams}
        //selectType={select}
        //setSelectType={setSelect}
        setSelectSort={setSort}
        selectDP={selectDP} 
        setSelectDP={setSelectDP}
        // setTypeSortDate={true}
      />
    </FilterBarStyled>
  )
}

export default FilterBar
