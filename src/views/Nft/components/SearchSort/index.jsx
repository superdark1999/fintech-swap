import React from 'react'
import { FilterBarStyled } from './styled'
import { Select, Radio, Input } from 'antd'
import { OptionSort, OptionData } from '../../constants'
const { Option } = Select
const { Search } = Input


function FilterBar(props) {
  const {
    searchParams,
    handleInputOnchange,
    setPage,
    selectType,
    setSelectType,
    setSelectSort,
    selectDP, 
    setSelectDP,
    setTypeSortDate,
  } = props

  // const onChangeSort = (value) => {
  //   setSort(value)
  //   setPage(1)
  // }
  const onChangeSelectDatePrice = (val) => {
    
    if (val == 'desc' || val == 'hight') setSelectSort('desc')
    else setSelectSort('asc')
    setPage(1)
    setSelectDP(val)
  }
  const onChangeSelectType = (val) => {
    console.log(val)
    setPage(1)
    setSelectType(val)
  }

  
  return (
    <FilterBarStyled>

      <div className="right-action">
        <Search
        style={(handleInputOnchange ? { display: 'unset' }: { display: 'none' })}
          className="search-input"
          placeholder="Search name, collections,..."
          loading={false}
          value={searchParams}
          onChange={handleInputOnchange}
          enterButton
        />
        <div style={{ display: 'flex' }}>
          <label>Sort: </label>
          {/* <div className="type"> */}
            <Select
              style={{ width: 120, borderRadius: 30 }}
              onChange={onChangeSelectType}
              defaultValue={selectType}
              style={(selectType ? { display: 'unset' }: { display: 'none' })}
            >
              {OptionData.map((item, index) => (
                <Option key={index} value={item.value} label={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          {/* </div>
          
          <div className="data-price"> */}
            <Select
              style={{ width: 120, borderRadius: 30 }}
              onChange={onChangeSelectDatePrice}
              defaultValue={selectDP}
            >
              {/* : OptionSort.slice(0,2).map((item))  */}
              {(setTypeSortDate? OptionSort.slice(0,2).map((item) => (
                <Option key={item.value} value={item.value} >
                  {item.label}
                </Option>
              )): OptionSort.map((item) => (
                <Option key={item.value} value={item.value} >
                  {item.label}
                </Option>
              )))}
            </Select>
          {/* </div> */}
          
        </div>
      </div>
    </FilterBarStyled>
  )
}

export default FilterBar
