import React from 'react'
import { HotArtWorksStyled } from './styled'
import Copy from '../../../../assets/images/copy.svg'
import Checkmark from '../../../../assets/images/checkmark.svg'
import Token from '../../../../assets/images/token.svg'
import Hammer from '../../../../assets/images/hammer.svg'

import { Rate } from 'antd';
import styled from 'styled-components'
import { SwapOutlined } from '@ant-design/icons'

const ButtonStyle = styled.div`
  background: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const ButtonBuyStyle = styled.div`
  background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  ::before {
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:50px; 
    padding: 2px; 
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
  }
`;

function HotArtWorks() {
    return (
        <HotArtWorksStyled>
            <div className="header-artists">
                <div className="title-artists">HOT ARTWORK 🔥</div>
                <div className="more-artists">View more</div>
            </div>
            <div className="content-artwork" > 
            {
              [1,2,3,4,5,6].map( item => (
                <div className="card-art-work">               
                  <div className="header-card-art-work">
                    <div className="date-time">02h 31m 04s left 🔥 </div>
                    <img src={Copy} />
                  </div>
                  <img className="avatar" src="https://www.35express.org/wp-content/uploads/2021/05/su-nghiep-cua-doanh-nhan-hang-canada-35express.jpg" />
                  <div className="name">Unibranch</div>
                  <div className="title">
                    LuckySwapStudio {' '}
                    <img src={Checkmark} />
                  </div>
                  <div className="number">
                    69 LUCKY {' '}
                    <img src={Token}/>
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
              ))
            }
              
            </div>
        </HotArtWorksStyled>
    )
}

export default HotArtWorks


