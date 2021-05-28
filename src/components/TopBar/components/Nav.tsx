import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {Col, Row} from 'antd'

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
    <div >
       {!isMobile  && <Web3Status />}
      <div className="btn-hides" onClick={handleToggle}></div>
    </div>
  )
}

export default Nav1
