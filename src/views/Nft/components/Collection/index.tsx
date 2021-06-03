import React from 'react'
import { Select, Button } from 'antd';
import { CollectionStyled } from './styled'
import Cart from '../utilComponent/cart'
const OptionData = ['Hangzhou', 'Ningbo', 'All items']
const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']

// export const option: React.ReactElement<OptionProps> = Select.Option

const { Option } = Select;
const data = [
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",
  "https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379",
  "https://cdnb.artstation.com/p/assets/images/images/037/989/679/large/joshua-brian-smith-lycan-rider-final.jpg?1621876402",
  "https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915",
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",
  "https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379",
  "https://cdnb.artstation.com/p/assets/images/images/037/989/679/large/joshua-brian-smith-lycan-rider-final.jpg?1621876402",
  "https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915",
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",


]

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
                  data.map((item) => (
                      <Cart url={item}/>
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
