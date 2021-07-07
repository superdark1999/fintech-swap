import React, { useState, useCallback } from 'react'
import { SidebarStyled } from './styled'
import NotifyIcon from 'assets/images/notify.svg'
import Collection from 'assets/images/collection.svg'
import Astronaut from 'assets/images/astronaut.svg'
import Rocket from 'assets/images/Rocket.svg'
import MoneyIcon from 'assets/images/money.svg'
import token from 'assets/images/token.svg'
import { Button, Select, Input, Checkbox } from 'antd'
import { PlusCircleOutlined, CaretUpOutlined, TagFilled, SearchOutlined, MenuUnfoldOutlined, CaretDownOutlined, LeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
const plainOptions = ['Apple', 'Pear', 'Orange'];
interface SidebarProps {
  setShowSidebar: any;
  onShowSidebar: any;
  price: any,
  onChangePrice: any,
}

const { Option } = Select
const options = ["LUCKY TOKEN (LUCKY)"]

const Sidebar: React.FC<SidebarProps> = ({ setShowSidebar, onShowSidebar, onChangePrice }) => {
  const [select, setSelect] = React.useState<string | null>('LUCKY TOKEN (LUCKY)');
  const [configMenu, setConfigMenu] = React.useState<any | null>(['collection', 'price', 'tag']);
  const [checkedList, setCheckedList] = React.useState<[string] | null>(['']);

  const [price, setPrice] = useState<any>({})


  const onTogleMenu = (value: string) => {
    if (!configMenu.find((menu: string) => value === menu)) setConfigMenu(configMenu.concat(value))
    else setConfigMenu(configMenu.filter((item: string) => item !== value))
  };

  const onChange = (list: any) => {
    setCheckedList(list);
  };
  const checkRenderSubMenu = useCallback(
    (subMenu: string) => {
      if (configMenu.find((menu: string) => subMenu === menu)) return true
      return false
    },
    [configMenu],
  )

  const handeChangePriceInput = (e: any) => {
    const value = +e.target.value;
    const name = e.target.name;
    setPrice({ ...price, [name]: value })
  }

  const onApply = () => {
    onChangePrice(price)
  }

  if (!onShowSidebar) {
    return (
      <SidebarStyled>
        <div className="collapse-menu button-collapse" onClick={() => setShowSidebar(!onShowSidebar)}>
          <MenuUnfoldOutlined />
        </div>
        <div className="collapse-menu" onClick={() => setShowSidebar(!onShowSidebar)}>
          <img src={NotifyIcon} alt="" />
          <span className="number-notify">5</span>
          <img src={token} alt="" />
          <img src={MoneyIcon} alt="" />
          <TagFilled />
        </div>
      </SidebarStyled>
    )
  }

  return (
    <SidebarStyled>
      <div className="button button-collapse" onClick={() => setShowSidebar(!onShowSidebar)}>
        <LeftOutlined />
        <div className="title">Collapse</div>
      </div>
      <Link className="button on-sale" to="/my-profile/onstore/readyToSell">
        <img src={NotifyIcon} alt="" style={{ marginRight: '10px' }} />
        On sale
        <span className="number-notify">5</span>
      </Link>
      <a className="button buy-lucky" target="_blank" href="https://luckyswap.finance/#/">
        <img src={Rocket} alt="" style={{ marginRight: '10px' }} />
        <span>Buy LUCKY</span>
      </a>
      {/* <div className="group-menu">
      <div className="button menu" onClick={() => onTogleMenu('collection')}>
        <div className="group-title">
          <img src={Collection} alt=""/>
          My collection
        </div>
        { checkRenderSubMenu('collection') ? <CaretUpOutlined/> : <CaretDownOutlined /> }
      </div>
      <div className={checkRenderSubMenu('collection') ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
        <div className="button sub-menu bordered">
          Game 🎮
        </div>
        <div className="button sub-menu bordered">
          Art 🖼
        </div>
        <div className="button sub-menu ">
          Music 🎧
        </div>
        <div className="button sub-menu ">
          <Button shape="round">
            <PlusCircleOutlined /> Create collection
          </Button>
        </div>
      </div>
    </div> */}

      <div className="group-menu">
        <div className="button menu" onClick={() => onTogleMenu('price')}>
          <div className="group-title">
            <img src={MoneyIcon} alt="" />
            Price
          </div>
          {/* { checkRenderSubMenu('price') ? <CaretUpOutlined/> : <CaretDownOutlined /> } */}
        </div>
        <div className={true ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
          <Select onChange={setSelect} defaultValue={select}>
            {options.map((item) => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
          <div className="button group-input">
            <Input type='number' min={0} placeholder="min" name="minPrice" value={price.minPrice} onChange={handeChangePriceInput} />
            to
            <Input type='number' min={0} placeholder="max" name="maxPrice" value={price.maxPrice} onChange={handeChangePriceInput} />
          </div>
          {(price?.minPrice > price?.maxPrice) && <span style={{ color: 'red', width: '300px', padding: '0 24px' }}>Your minimum item price must be greater than the minimum</span>}
          <div className="button sub-menu">

            <Button disabled={!price.maxPrice || !price.minPrice || price?.minPrice > price?.maxPrice} shape="round" style={{ fontWeight: 'bold' }} onClick={onApply}>
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div className="group-menu">
        <div className="button menu" onClick={() => onTogleMenu('tag')}>
          <div className="group-title">
            <TagFilled />
            Tag
          </div>
          {/* { checkRenderSubMenu('tag') ? <CaretUpOutlined/> : <CaretDownOutlined /> } */}
        </div>
        <div className={true ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
          <div className="input-search">
            <SearchOutlined className="icon-search" />
            <input placeholder="Search tag" />
          </div>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={e => onChange(e)} />
        </div>
      </div>
    </SidebarStyled>
  )
}

export default Sidebar
