import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap'
import iconAnalytics from '../../../assets/img/icon-analytics.png'
import iconInfo from '../../../assets/img/info.png'

import { isMobile } from 'react-device-detect'
import { Button, Modal, ModalBody } from 'reactstrap'
import Web3Status from '../../../wallet/Web3Status'
const Nav1: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  let [showAbout, setAbout] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const [isActive] = useState('false')

  const handleToggle = () => setIsOpen(!isActive)
  const toggleHover = () => {
    setAbout(!showAbout)
  }

  const [modal, setModal] = useState(false)

  const toggleModal = () => setModal(!modal)
  
  return (
    <div>
      {isMobile ? (
        <i
          style={{ color: 'white' }}
          className="fa fa-bars"
          onClick={() => {
            toggle()
          }}
        ></i>
      ) : (
        ''
      )}
       {!isMobile  && <Web3Status />}
        {!isMobile && <Web3Status />}
      <div className="btn-hides" onClick={handleToggle}></div>
    </div>
  )
}

const BoxModal = styled.div`
  .test {
    background-color: white !important;
    width: 300px !important;
  }
  .custom-bg {
    background: linear-gradient(90deg, rgb(15 236 229) 0%, rgb(9 143 221) 100%)
      rgb(222 206 232 / 87%);
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-weight: 500;

    &:focus {
      box-shadow: unset;
    }

    img {
      margin-right: 0;

      @media (min-width: 767px) {
        margin-right: 4px;
      }
    }

    @media (max-width: 767px) {
      font-size: 0;
    }
  }
`
export default Nav1
