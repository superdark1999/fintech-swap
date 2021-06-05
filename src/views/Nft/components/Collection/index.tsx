import React from 'react'
import { Select, Button } from 'antd';
import { CollectionStyled } from './styled'
import Cart from 'components-v2/CardItem'
const OptionData = ['Hangzhou', 'Ningbo', 'All items']
const OptionSort = ['Hangzhou', 'Ningbo', 'Sort by']

// export const option: React.ReactElement<OptionProps> = Select.Option

const { Option } = Select;
const data = [
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/cfe06a402ff54798b0285eceffdc6a2a.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/2b061704f09e4bd485ebd66cf8b5f4fa.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/689d6bf2d7cd4866b5e521fd6fdf851b.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/a0c90da902454397994995a3fcf50b8d.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/cfe06a402ff54798b0285eceffdc6a2a.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/2b061704f09e4bd485ebd66cf8b5f4fa.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/689d6bf2d7cd4866b5e521fd6fdf851b.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/a0c90da902454397994995a3fcf50b8d.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif",


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
                      <Cart width="320px" height="480px" url={item}/>
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
