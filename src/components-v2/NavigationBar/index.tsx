import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { SwapOutlined, HomeOutlined, ArrowsAltOutlined } from '@ant-design/icons'

const listMenu = [
  { label: 'Home', value: 'home', url: '/', icon: <HomeOutlined /> },
  { label: 'Swap store', value: 'home', url: '/swap-store', icon: <SwapOutlined /> },
  { label: 'Explore', value: 'home', url: '/explore', icon: <ArrowsAltOutlined />},
  // { label: 'INO', value: 'home', url: '/ino' }
]

export default  () => {

  if (!isMobile) return null

  let url = window.location.pathname

  if (url.includes("detail")) url = ''
  const [activeMenu, setActiveMenu]  = useState(url)

  return (
    <NavigationStyled>
      {
        listMenu.map((menu) => {
          return (
            <Link onClick={() => setActiveMenu(menu.url)} className={activeMenu === menu.url ? "menu active" : "menu"} key={menu.value} to={menu.url}> 
              <div className="icon">{menu.icon}</div>
              <div className="label">{menu.label} </div>
            </Link>
          )
        })
      }
      
    </NavigationStyled>
  )
}

const NavigationStyled = styled.div`
  width: 100vw;
  /* height: 50px; */
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 2;
  border-top: 2px solid #f4f4f4;
  padding: 5px 0px;
  > .menu {
    color: #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .label {
      font-size: 10px;
    }
    .icon {
      font-size: 22px;
    }
    &.active {
      color: #1890ff;
    }
  }
`