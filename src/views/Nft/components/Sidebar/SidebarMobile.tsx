import React, { useCallback } from 'react'
import { SidebarStyled, DrawerStyled } from './styled'
import NotifyIcon from 'assets/images/notify.svg'
import Rocket from 'assets/images/Rocket.svg'
import MoneyIcon from 'assets/images/money.svg'

import { Button, Select, Input, Checkbox, Slider } from 'antd'
import { TagFilled, SearchOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import formatNumber from 'utils/formatNumber'
const plainOptions = ['Apple', 'Pear', 'Orange'];

const { Option } = Select
const options = ["LUCKY TOKEN (LUCKY)"]

interface SideBarProps {
  setMobileMenu?: (value: boolean) => void,
  mobileMenu?: boolean
  onChangePrice?: (value: any) => void,
  price?: any
}

const SidebarMobile = (props: SideBarProps) => {
  const { mobileMenu, setMobileMenu } = props
  console.log('mobileMenudasda: ', mobileMenu)
  const [select, setSelect] = React.useState<string | null>('LUCKY TOKEN (LUCKY)');
  const [checkedList, setCheckedList] = React.useState<[string] | null>(['']);

  const onChange = (list: any) => {
    setCheckedList(list);
  };

  const [price, setPrice] = React.useState<any>({ minPrice: 0, maxPrice: 100000 })


  const handeChangeSlider = (value: any) => {   
    setPrice({ ...price, minPrice: +value[0], maxPrice: +value[1]})
  }

  const onApply = () => {
    props.onChangePrice(price)
    var elmnt = document.getElementById('collection-scroll-view')
    elmnt.scrollIntoView()
    props.setMobileMenu(false)
  }

  return (
    <DrawerStyled
      placement="left"
      closable
      onClose={() => setMobileMenu(false)}
      visible={mobileMenu}
      width="85%"
    >
        <SidebarStyled>
          <Link className="button on-sale" to="/my-profile/onstore/readyToSell">
            <img src={NotifyIcon} alt="" style={{ marginRight: '10px' }} />
            On sale
            <span className="number-notify">5</span>
          </Link>
          <a className="button buy-lucky" target="_blank" href="https://luckyswap.finance/#/">
            <img src={Rocket} alt="" style={{ marginRight: '10px'}} />
            <span>Buy LUCKY</span>
          </a>

          <div className="group-menu">
            <div className="button menu">
              <div className="group-title">
                <img src={MoneyIcon} alt="" />
                Price
              </div>
              {/* { checkRenderSubMenu('price') ? <CaretUpOutlined/> : <CaretDownOutlined /> } */}
            </div>
            <div className={true ? 'show-sub-menu list-sub-menu' : 'list-sub-menu'}>
              <Slider
                range
                step={100}
                max={100000}
                min={0}
                defaultValue={[0, 100000]}
                onChange={handeChangeSlider}
                tipFormatter={value => formatNumber(value)}
                style={{margin: '30px 30px'}}
              />
            <div className="button sub-menu">

                <Button shape="round" style={{ fontWeight: 'bold' }} onClick={onApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div className="group-menu">
            <div className="button menu">
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
