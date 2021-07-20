import React from 'react'
import { FilterBarStyled } from './styled'
import { Radio } from 'antd'
import Filter from '../../Filter'
import { isMobile } from 'react-device-detect'

function FilterBar(props) {
  const {
    searchParams,
    setFilterType,
    filterType,
    handleInputOnchange,
    setPage,
    setTypeSort,
    selectDatePrice, 
    setSelectDatePrice
  } = props

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
      <Filter
        handleInputOnchange={handleInputOnchange}
        setPage={setPage}
        searchParams={searchParams}
        setSelectSort={setTypeSort}
        selectDatePrice={selectDatePrice} 
        setSelectDatePrice={setSelectDatePrice}
        setTypeSortDate={true}
      />
    </FilterBarStyled>
  )
}

export default FilterBar
