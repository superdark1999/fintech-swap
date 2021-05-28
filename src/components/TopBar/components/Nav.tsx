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
    <StyledNav color="light" light expand="md">
      {/* <NavbarToggler
        style={{ backgroundColor: "red" }}
        aria-expanded={isOpen}
        onClick={() => {
          toggle()
        }}
      /> */}
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

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {!isMobile ? <Web3Status /> : ''}
        </Nav>
        <div className="btn-hides" onClick={handleToggle}></div>
      </Collapse>
    </StyledNav>
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

const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 15px;

  h2 {
    font-size: 24px;
    margin-bottom: 32px;
    color: white;
  }
`

const BoxCrypto = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    position: relative;
    color: #565a69;
  }
`

const Boxbtn = styled.div`
  border-radius: 32px;
  display: inline-flex;
  height: 25px;
  box-shadow: 1px 2px 0px 0px rgb(0 0 0 / 19%), 0 6px 6px rgb(101 101 101 / 23%);
  a {
    color: #07355e;
    align-items: center;
    border: 0px;
    border-radius: 32px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    outline: 0px;
    background-color: transparent;
    transition: background-color 0.2s ease 0s;
    height: auto;

    &:hover {
      text-decoration: none;
    }

    &.active {
      background: #1c2d4a !important;
      width: 65px;

      &:hover {
        background-color: rgb(47 155 232);
      }
    }
  }

  @media (max-width: 767px) {
  }
`

const StyledLinkA = styled.a`
  color: ${(props) => props.theme.color.navy};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  transition: 1s;
  position: relative;
  cursor: pointer;
  font-family: 'Encode Sans', sans-serif;

  &.no-line {
    &:hover {
      &:after {
        width: 0 !important;
        background: transparent !important;
      }
    }

    i {
      visibility: visible;
    }
  }

  &:hover {
    color: ${(props) => props.theme.color.brown[100]};
    transition: 1s;

    ul {
      display: block;
      transform: scaleY(1);
    }
  }

  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }

  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }

  ul {
    background-color: #fff;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.5s ease;
    padding: 15px;
    box-shadow: -2px 2px 5px 0px rgba(0, 0, 0, 0.19),
      0px 1px 2px 0px rgba(0, 0, 0, 0.23);
    border-radius: 16px;

    li {
      list-style: none;
      line-height: 20px;
      height: 30px;
      padding: 5px 0;

      &:hover,
      &:focus,
      &:active {
        background-color: rgb(239, 244, 245);
        margin-left: -15px;
        margin-right: -15px;
        padding: 5px 15px;
      }

      a {
        padding-left: 0 !important;
        transition: 1s;
        background-color: transparent !important;

        @media (max-width: 768px) {
          padding-left: 10px !important;
        }

        &:hover {
          &:after {
            width: 0 !important;
            background: transparent !important;
          }
        }

        img {
          margin-right: 5px;
          margin-top: -5px;
        }
      }
    }
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.navy};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.color.brown[100]};
  }

  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }

  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledNav = styled(Navbar)`
  position: absolute;
  top: 32px;
  left: 7px;
  z-index:1050;
  @media (min-width: 768px) {
    z-index:1066;
    width: 18px;
    top: 0;
    left: 60%;
    transform: translateX(-50%);
  }

  &.navbar {
    // position: fixed;
  }

  &.bg-light {
    background-color: transparent !important;
  }

  .navbar-collapse {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: 10;
    background-color: rgba(4, 4, 4, 0.5);
    opacity: 0;
    transition: opacity 0.2s;

    @media (min-width: 768px) {
      background-color: transparent;
      opacity: 1;
    }

    &.show {
      opacity: 1;

      .navbar-nav {
        width: 238px;
      }

      .btn-hides {
        width: calc(100% - 238px);
        background: red;
        float: right;
        height: 100%;
        background: transparent;
      }
    }
  }

  .navbar-nav {
    flex: 0 0 280px;
    width: 0;
    transition: width 0.5s;
    position: absolute;
    top: -30px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background: ${(props) => props.theme.color.white};
    flex: 0 0 100%;
    padding: 85px 15px 30px;

    @media (min-width: 768px) {
      width: auto;
      top: 22px;
      right: -282px;
      left: auto;
      background-color: transparent;
      background: transparent;
      transform: unset;
      overflow-y: unset;
      padding: 0;
    }

    @media (min-width: 991px) {
      top: 20px;
      right: -354px;
    }

    a {
      padding-right: 10px;
      padding-left: 10px;
      font-weight: 600;
      color: #7e96b8;
      text-decoration: none;
      background-color: #f8f9fa;
      border-bottom: 1px solid #ced4da;
      margin-left: -15px;
      margin-right: -15px;
      padding: 10px 23px;
      white-space: nowrap;

      &:last-child {
        border: none;
      }

      @media (min-width: 768px) {
        border: none;
        padding-right: 5px;
        padding-left: 5px;
        margin: 0;
        background-color: transparent;
        font-size: 12px;
      }

      @media (min-width: 991px) {
        padding-right: 16px;
        padding-left: 16px;
        font-size: 16px;
      }

      @media (min-width: 1025px) {
        padding-right: 8px;
        padding-left: 8px;
        font-size: 16px;
      }

      &:after {
        @media (min-width: 768px) {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: ${(props) => props.theme.color.navy};
          transition: width 0.3s;
        }
      }

      &:hover {
        font-weight: 600;
        text-decoration: none;

        &:after {
          width: 100%;
          background: ${(props) => props.theme.color.darkGreen};
        }
      }

      &.active {
        color: #19a3dd;
        font-weight: 600;

        &:after {
          background: ${(props) => props.theme.color.darkGreen};
        }
      }
    }
  }

  .navbar-toggler {
    border-color: transparent;
    outline: none;
    position: fixed;
    z-index: 11;

    @media (max-width: 768px) {
      padding: 9px;
    }

    &[aria-expanded='true'] {
      .navbar-toggler-icon {
        background-color: transparent;

        &:before,
        &:after {
          top: auto;
          bottom: 0;
        }

        &:before {
          transform: rotate(-45deg);
        }

        &:after {
          transform: rotate(45deg);
        }
      }
    }
  }

  .navbar-toggler-icon {
    background-image: none;
    width: 18px;
    height: 1.6px;
    position: absolute;
    top: 8px;
    left: 0;
    background: red;

    @media (min-width: 768px) {
      width: 23px;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      display: inline-block;
      width: 18px;
      height: 1.6px;
      transition: transform 400ms ease-in-out;
      background: ${(props) => props.theme.color.green[500]};

      @media (min-width: 768px) {
        width: 23px;
      }
    }

    &:before {
      top: -6px;

      @media (min-width: 768px) {
        top: -8px;
      }
    }

    &:after {
      bottom: -6px;

      @media (min-width: 768px) {
        bottom: -8px;
      }
    }
  }
`
export default Nav1
