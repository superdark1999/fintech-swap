import React from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
import Hammer from 'assets/images/hammer.svg'
import Hammer2 from 'assets/images/hammer2.svg'

import {Link} from 'react-router-dom'

import { Rate } from 'antd';
import { SwapOutlined, StarFilled } from '@ant-design/icons'



export default function index(props: any) {
  return (
    <StyledCart>
      <div className="header-card-art-work">
        <div className="date-time">02h 31m 04s left 🔥 </div>
        <img src={Copy} alt=""/>
      </div>
     <Link to="/artwork/detail" className="create-nav">
      <div className="card-art-work">               
        
        <div className="wrapper-image">
          <img className="avatar"  src={props.url} alt="" loading="lazy"/>
        </div>
      </div>
      
      </Link> 
      <div className="wrapper-info">
        <div className="title">
          LuckySwapStudio {' '}
          <img src={Checkmark} alt=""/>
        </div>
        <div className="number">
          <div>
              69 LUCKY {' '}
            <img src={Token} alt=""/></div>  
          <div>
            4.8 {' '}<StarFilled style={{color: '#fadb14', marginRight: 8}} />
            <img src={Hammer2} alt=""/>
          </div>      
        </div> 
      </div>      
    </StyledCart>
  )
}
