import React, {useState, useCallback} from 'react'
import {SidebarStyled} from './styled'
import NotifyIcon from 'assets/images/notify.svg'
import Collection from 'assets/images/collection.svg'
import MoneyIcon from 'assets/images/money.svg'

import { Button, Select, Input, Checkbox } from 'antd'
import { PlusCircleOutlined, CaretUpOutlined, TagFilled, SearchOutlined, MenuUnfoldOutlined, CaretDownOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
const plainOptions = ['Apple', 'Pear', 'Orange'];
interface SidebarProps {
    setShowSidebar:any;
    onShowSidebar:any;
}

const { Option } = Select
const options = ["United States Dollar (USD)"]

const Sidebar: React.FC<SidebarProps> = ({setShowSidebar,onShowSidebar}) => {
  const [select, setSelect] = React.useState<string | null>('United States Dollar (USD)');
  const [configMenu, setConfigMenu] = React.useState<any| null>(['collection']);
  const [ checkedList, setCheckedList] = React.useState<[string] | null>(['']);


  const onTogleMenu = (value : string) => {
    if (!configMenu.find(( menu : string) => value ===  menu))  setConfigMenu(configMenu.concat(value))
    else setConfigMenu(configMenu.filter((item: string)=> item !== value))
  };

  const onChange = (list : any) => {
    setCheckedList(list);
  };
  const checkRenderSubMenu = useCallback(
    (subMenu : string) => {
      if (configMenu.find(( menu : string) => subMenu ===  menu)) return true
      return false
    },
    [configMenu],
  ) 

  if (!onShowSidebar) {
    return (
      <SidebarStyled>
        <div className="collapse-menu button-collapse" onClick={()=>setShowSidebar(!onShowSidebar)}> 
          <MenuUnfoldOutlined />
        </div>
        {/* <div className="collapse-menu">
          <img src={NotifyIcon} alt=""/>
          <img src={Collection} alt=""/>
          <img src={MoneyIcon} alt=""/>
          <TagFilled />
        </div> */}
      </SidebarStyled>
    )
  }

  return (
  <SidebarStyled>
    <div className="button button-collapse" onClick={()=>setShowSidebar(!onShowSidebar)}> 
      {' < '} 
      <div className="title">Collapse</div>
    </div>
    <Link className="button on-sale" to="/my-profile/onsale/readyToSell">
      <img src={NotifyIcon} alt=""/>
      On sale
    </Link>

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
          <img src={MoneyIcon} alt=""/>
          Price
        </div>
        { checkRenderSubMenu('price') ? <CaretUpOutlined/> : <CaretDownOutlined /> }
      </div>
      <div className={checkRenderSubMenu('price') ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
        <Select onChange={setSelect} defaultValue={select}>
          {options.map((item) => (
              <Option  key={item} value={item}>{item}</Option>
          ))}
        </Select>
        <div className="button group-input">
          <Input placeholder="min"/>
            to
          <Input placeholder="max"/>
        </div>
        <div className="button sub-menu">
          
          <Button shape="round">
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
          { checkRenderSubMenu('tag') ? <CaretUpOutlined/> : <CaretDownOutlined /> }
        </div>
        <div className={checkRenderSubMenu('tag') ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
          <div className="input-search">
            <SearchOutlined className="icon-search"/>
            <input placeholder="Search tag" />
          </div>
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={e => onChange(e)} />
        </div>
      </div>
  </SidebarStyled>
  )
}

export default Sidebar
