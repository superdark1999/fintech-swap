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
    selectDatePrice,
    setSelectDatePrice,
    setTypeSortDate,
    style,
  } = props

  
  const onChangeSelectDatePrice = (val) => {
    if (val == 'desc' || val == 'hight') setSelectSort('desc')
    else setSelectSort('asc')
    //(setPage && setPage(1))
    if(setPage) setPage(1)
    setSelectDatePrice(val)
  }
  const onChangeSelectType = (val) => {
    //(setPage && setPage(1))
    if(setPage) setPage(1)
    setSelectType(val)
  }
  return (
    <FilterBarStyled style={( style !== 'f-direction' ? style :'')}>
      <div className="right-action" 
      style={{flexDirection: (style.direction == 'f-direction' ? 'unset' : '')}}>
        <Search
          style={
            handleInputOnchange ? { display: 'unset' } : { display: 'none' }
          }
          className="search-input"
          placeholder="Search name, collections,..."
          loading={false}
          value={searchParams}
          onChange={handleInputOnchange}
          enterButton
        />
        <div style={{ display: 'flex' }}>
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={onChangeSelectType}
            defaultValue={selectType}
            style={selectType ? { display: 'unset' } : { display: 'none' }}
          >
            {OptionData.map((item, index) => (
              <Option key={index} value={item.value} label={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 120, borderRadius: 30 }}
            onChange={onChangeSelectDatePrice}
            defaultValue={selectDatePrice}
          >
            {setTypeSortDate
              ? OptionSort.slice(0, 2).map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))
              : OptionSort.map((item) => (
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
