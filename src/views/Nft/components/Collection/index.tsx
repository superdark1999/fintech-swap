import React from 'react'
import { Select, Button } from 'antd';
import { CollectionStyled } from './styled'
import Cart from '../utilComponent/cart'
const OptionData = ['Hangzhou', 'Ningbo', 'All items']
const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']

// export const option: React.ReactElement<OptionProps> = Select.Option

const { Option } = Select;

function Collection() {
  const [select, setSelect] = React.useState<string | null>('All items');
  const [selectSort, setSelectSort] = React.useState<string | null>('Sort by');

    return (
        <CollectionStyled>
            <div className="header-artists">
              <div className="title-artists">Collection 🌏</div>
              <div className="more-action">
                <Select style={{ width: 120, borderRadius: 30 }} onChange={setSelect} defaultValue={select}>
                {OptionData.map((item) => (
                    <Option  key={item} value={item}>{item}</Option>
                ))}
                </Select>
                <Select style={{ width: 120, borderRadius: 30 }} onChange={setSelectSort} defaultValue={selectSort}>
                {OptionSort.map((item) => (
                    <Option  key={item} value={item}>{item}</Option>
                ))}
                </Select>
              </div>
            </div>
            <div className="content-collect">
                {
                  [1,2,3,4,5,6,7,8,9,10].map(item => (
                      <Cart />
                  ))
                }
            </div>
            <div className="footer-section"> 
              <div className="wrapper-button">
                <Button shape="round">
                  Load more
                </Button>
              </div>           
              
            </div>
        </CollectionStyled>
    )
}

export default Collection
