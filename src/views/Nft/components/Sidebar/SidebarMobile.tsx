import React, { useCallback } from 'react'
import { SidebarStyled, DrawerStyled } from './styled'
import NotifyIcon from 'assets/images/notify.svg'
import Rocket from 'assets/images/Rocket.svg'
import MoneyIcon from 'assets/images/money.svg'

import { Button, Select, Input, Checkbox } from 'antd'
import { TagFilled, SearchOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const plainOptions = ['Apple', 'Pear', 'Orange'];

const { Option } = Select
const options = ["LUCKY TOKEN (LUCKY)"]

const SidebarMobile = (props: any) => {
  const { mobileMenu, onPresentMobileMenu } = props
  const [select, setSelect] = React.useState<string | null>('LUCKY TOKEN (LUCKY)');
  const [configMenu, setConfigMenu] = React.useState<any | null>(['collection', 'price', 'tag']);
  const [checkedList, setCheckedList] = React.useState<[string] | null>(['']);


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

  return (
    <DrawerStyled
      placement="left"
      closable={false}
      onClose={() => onPresentMobileMenu(false)}
      visible={mobileMenu}
      width="85%"
    >
        <SidebarStyled>
          <Link className="button on-sale" to="/my-profile/onsale/readyToSell">
            <img src={NotifyIcon} alt="" style={{ marginRight: '10px' }} />
            On sale
            <span className="number-notify">5</span>
          </Link>
          <a className="button buy-lucky" target="_blank" href="https://luckyswap.finance/#/">
            <img src={Rocket} alt="" style={{ marginRight: '10px'}} />
            <span>Buy LUCKY</span>
          </a>

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
                <Input placeholder="min" />
                to
                <Input placeholder="max" />
              </div>
              <div className="button sub-menu">

                <Button shape="round" style={{ fontWeight: 'bold' }}>
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
      </DrawerStyled>
    
  )
}

export default SidebarMobile
