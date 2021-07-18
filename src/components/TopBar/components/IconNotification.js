import React from 'react'
import styled from 'styled-components'
import NotifyIcon from 'assets/images/notify.svg'


export default () => {
  return (
    <MainStyled>
      <div className="notification">
        <img src={NotifyIcon} alt="" style={{ marginRight: '10px' }} />
        <span className="number-notify">5</span>     
      </div>
    </MainStyled>
  )
}


const MainStyled = styled.div `
  position: relative;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
  .number-notify {
    color: #fff;
    background: #fc636b;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    font-size: 13px;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -3px;
    right: -3px;
  }
`