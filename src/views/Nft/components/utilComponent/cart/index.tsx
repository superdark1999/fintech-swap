import React from 'react'
import { StyledCart, ButtonBuyStyle, ButtonStyle } from './styled'
import Copy from 'assets/images/copy.svg'
import Checkmark from 'assets/images/checkmark.svg'
import Token from 'assets/images/token.svg'
import Hammer from 'assets/images/hammer.svg'
import {Link} from 'react-router-dom'

import { Rate } from 'antd';
import { SwapOutlined } from '@ant-design/icons'



export default function index(props: any) {
  return (
    <StyledCart>
      <div className="card-art-work">               
        <div className="header-card-art-work">
          <div className="date-time">02h 31m 04s left 🔥 </div>
          <img src={Copy} alt=""/>
        </div>
        
        <Link to="/artwork/detail" className="create-nav"><img className="avatar"  src={props.url}/></Link>
        <div className="title">
          LuckySwapStudio {' '}
          <img src={Checkmark} alt=""/>
        </div>
        <div className="number">
          69 LUCKY {' '}
          <img src={Token} alt=""/>
        </div> 
        <div className="rating">
          <Rate disabled defaultValue={2} />
          (15 reviews)
        </div>
        <div className="action-button">
          <ButtonStyle>
            <SwapOutlined />
            {' '} Trade
          </ButtonStyle>
          <ButtonBuyStyle>Buy</ButtonBuyStyle>
        </div>
        <div className="or-text">OR</div>
        <div className="action-button justify-center">
          <ButtonStyle style={{ width: '100%' }}>
            <img src={Hammer} /> 
              Enter auction 
          </ButtonStyle>
        </div>
      </div>
    </StyledCart>
  )
}
