import React from 'react'
import { FilterBarStyled } from './styled'
import { Radio } from 'antd'
import Filter from '../Filter'
import { OptionMethods, OptionTypeNft } from '../../constants'
import { isMobile } from 'react-device-detect'

function FilterBar(props) {
  const {
    searchParams,
    setFilterMethod,
    filterMethod,
    setFilterType,
    filterType,
    handleInputOnchange,
    setPage,
    setTypeSort,
    selectDatePrice, 
    setSelectDatePrice
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
      <Filter
        handleInputOnchange={handleInputOnchange}
        setPage={setPage}
        searchParams={searchParams}
        setSelectSort={setTypeSort}
        selectDatePrice={selectDatePrice} 
        setSelectDatePrice={setSelectDatePrice}
      />
    </FilterBarStyled>
  )
}

export default FilterBar
