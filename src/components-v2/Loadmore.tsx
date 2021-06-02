
import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const Loadmore = () => {
  return (
    <Footer> 
      <div className="wrapper-button">
        <Button shape="round">
          Load more
        </Button>
      </div>           
    </Footer>
  )
}

export default Loadmore

const Footer = styled.div`
  width: 100%;
  background: #AFBAC5;
  margin: 30px 0px;
  height: 1px;
  position: relative;
  .wrapper-button {
    width: 120px;
    height:34px;
    background: #ffffff;
    position: absolute;
    left: 50%;
    top: -16px;
    display: flex;
    justify-content: center;
  }
`





