import React, { useState, useCallback } from 'react'
import { SidebarStyled } from './styled'
import NotifyIcon from 'assets/images/notify.svg'
import Rocket from 'assets/images/Rocket.svg'
import MoneyIcon from 'assets/images/money.svg'
import token from 'assets/images/token.svg'
import { Button, Select, Input, Checkbox, Row, Col, Slider } from 'antd'
import {
  TagFilled,
  MenuUnfoldOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import formatNumber from 'utils/formatNumber'
const plainOptions = ['Art', 'Music', 'Games', 'DeFi', 'Lucky']
const plainOptions1 = ['Meme', 'Sports', 'Abstract', 'Space']
interface SidebarProps {
  setShowSidebar: any
  onShowSidebar: any
  price: any
  onChangePrice: any
}

const { Option } = Select
const options = ['LUCKY TOKEN (LUCKY)']

const Sidebar: React.FC<SidebarProps> = ({
  setShowSidebar,
  onShowSidebar,
  onChangePrice,
}) => {
  const [select, setSelect] = React.useState<string | null>(
    'LUCKY TOKEN (LUCKY)',
  )
  const [configMenu, setConfigMenu] = React.useState<any | null>([
    'collection',
    'price',
    'tag',
  ])
  const [checkedList, setCheckedList] = React.useState<[string] | null>([''])

  const [price, setPrice] = useState<any>({ minPrice: 0, maxPrice: 100000 })

  const onTogleMenu = (value: string) => {
    if (!configMenu.find((menu: string) => value === menu))
      setConfigMenu(configMenu.concat(value))
    else setConfigMenu(configMenu.filter((item: string) => item !== value))
  }

  const onChange = (list: any) => {
    setCheckedList(list)
  }
  const checkRenderSubMenu = useCallback(
    (subMenu: string) => {
      if (configMenu.find((menu: string) => subMenu === menu)) return true
      return false
    },
    [configMenu],
  )

  const handeChangeSlider = (value: any) => {   
    setPrice({ ...price, minPrice: +value[0], maxPrice: +value[1]})
  }

  const onApply = () => {
    onChangePrice(price)
    var elmnt = document.getElementById('collection-scroll-view')
    elmnt.scrollIntoView()
  }



  if (!onShowSidebar) {
    return (
      <SidebarStyled>
        <div
          className="collapse-menu button-collapse"
          onClick={() => setShowSidebar(!onShowSidebar)}
        >
          <MenuUnfoldOutlined />
        </div>
        <div
          className="collapse-menu"
          onClick={() => setShowSidebar(!onShowSidebar)}
        >
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
      <div
        className="button button-collapse"
        onClick={() => setShowSidebar(!onShowSidebar)}
      >
        <LeftOutlined />
        <div className="title">Collapse</div>
      </div>
      <Link className="button on-sale" to="/my-profile/onstore/readyToSell">
        <img src={NotifyIcon} alt="" style={{ marginRight: '10px' }} />
        On sale
        <span className="number-notify">5</span>
      </Link>
      <a
        className="button buy-lucky"
        target="_blank"
        href="https://luckyswap.finance/#/"
      >
        <img src={Rocket} alt="" style={{ marginRight: '10px' }} />
        <span>Buy LUCKY</span>
      </a>

      <div className="group-menu">
        <div className="button menu" onClick={() => onTogleMenu('price')}>
          <div className="group-title">
            <img src={MoneyIcon} alt="" />
            Price
          </div>
        </div>
        <div className={true ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
          <Select onChange={setSelect} defaultValue={select}>
            {options.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          
          <Slider
            range
            step={100}
            max={100000}
            min={0}
            defaultValue={[0, 100000]}
            onChange={handeChangeSlider}
            tipFormatter={value => formatNumber(value)}
            style={{margin: '30px 30px'}}
            tooltipVisible
          />

          <div className="button sub-menu">
            <Button
              shape="round"
              style={{ fontWeight: 'bold' }}
              onClick={onApply}
            >
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
          {/* <div className="input-search">
            <SearchOutlined className="icon-search" />
            <input placeholder="Search tag" />
          </div> */}
          <Row>
            <Col span={12}>
              <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={(e) => onChange(e)}
              />
            </Col>
            <Col span={12}>
              <Checkbox.Group
                options={plainOptions1}
                value={checkedList}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Row>
        </div>
      </div>
    </SidebarStyled>
  )
}

export default Sidebar
