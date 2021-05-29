import React from 'react'
import { Row, Col, Rate } from 'antd';
import styled from 'styled-components' 
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import Checkmark from 'assets/images/checkmark.svg'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import {ButtonStyle, ButtonBuyStyle} from '../utilComponent/cart/styled'
import { SwapOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;



const ImageStyled = styled.div`
  position: relative;
  height: calc(100vh - 80px); 
  width: 100%;
  overflow: hidden;
  .bg-image {
    /* The image used */
    background-image: url("https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379");
    
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(70px);
    
    /* Full height */
    height: 100%; 
    
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
  >img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 60%;
    border-radius: 16px;
  }
`
const DetailStyled = styled.div`
  padding: 42px 32px;
  height: calc(100vh - 200px);
  /* overflow: auto; */
  .header-detail {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .date-time {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #FC636B;
      border: 2px solid #FC636B;
      border-radius: 30px;
      padding-left: 10px;
      padding-right: 10px;
      width: max-content;
      height: 24px;
    }
  .social-icon  {
    img {
      width: 23px;
      height: 23px;
      padding: 1px;
      border-radius: 50%;
      border: 1px solid #000000;
      margin: 5px;
    }
  }
  }
  
  
  .title {
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
  }
  .description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-top: 16px;
  }
  .token{
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: linear-gradient(270deg,#19A3DD -16.5%,#BADEB7 117.25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    font-weight: 600;
    >img {
      margin-top: -3px;
      margin-left: 5px;
    }
  }
  .organize {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    >.name {
      margin: 0px 6px;
    }
  }
  
`

const ReviewStyled = styled.div`
  border-bottom: 1px solid #E7EBEF;
  padding: 16px 0px;
  .review-item {
    display: flex;
    justify-content: space-between;   
  }
  .comment {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    margin: 6px 0px;
  }
  .time {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #AFBAC5;
    margin: 6px 0px;
  }
`
const ScrollReview = styled.div`
  max-height: calc(100vh - 500px); 
  overflow: auto; 
  padding-bottom: 120px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FooterStyled = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 120px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px -4px 16px -4px rgba(35, 35, 35, 0.06);
  background-color: #ffffff;
  border-top: 2px solid #E7EBEF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 32px;
  >div {
    width: 48%;
  }
`

const  DetaiArtWork = () => {

  return (
    <Row>
      <Col className="gutter-row" style={{width: '100%'}}
        xl={{ span: 16 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
        >
        <ImageStyled>
          <div className="bg-image"></div>
          <img src="https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379" />
        </ImageStyled>     
      </Col>
      <Col 
        className="gutter-row" 
        // style={{position: 'relative'}}
        xl={{ span: 8 }}
        md={{ span: 24 }}
        sm={{ span: 24}}
        >
        <DetailStyled>
          <div className="header-detail">
            <div className="date-time">02h 31m 04s left 🔥 </div>
              <div className="social-icon">
                <img src={Facebook} alt=""/>
                <img src={Telegram} alt=""/>
                <img src={Copy} alt=""/>
              </div> 
          </div>

          <p className="title">
            CRYPTOCARD 001 - THE ETHEREUM GOLD
          </p>

          <div className="token">
            102 LUCKY 
            <img src={Token} alt=""/>
          </div>

          <div className="rating">
            <Rate disabled defaultValue={2} />
            (15 reviews)
          </div>
          
          <p className="description">
            A few years ago, the crypto world was for chosen one. And now cryptocurrency is everywhere! 
          </p>

          <p className="organize">
            <img src={Luckyswap} /> 
              <span className="name">LuckySwapStudio</span>
            <img src={Checkmark} />
          </p> 

          <Tabs defaultActiveKey="1" >
            <TabPane tab="Reviews" key="1">
              <ScrollReview className="list-review">
                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{marginRight: 5}}/> 
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{marginRight: 5}}/> 
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{marginRight: 5}}/> 
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{marginRight: 5}}/> 
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>
              </ScrollReview>
             
            </TabPane>
            <TabPane tab="History" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
          <Row gutter={24}
            style={{
              position: 'fixed', 
              width: '100%', 
              bottom: 0, 
              left:0, 
              justifyContent: 'flex-end',
              marginLeft:0,
              marginRight: 0,
              zIndex: 2
            }}
          >
            <Col
              xl={{ span: 8 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              style={{position: 'unset', width: '100%', bottom: 0, padding: 0}}
            >
              <FooterStyled>
                <ButtonStyle>
                  <SwapOutlined />
                  {' '} Trade
                </ButtonStyle>
                <ButtonBuyStyle>Buy</ButtonBuyStyle>
              </FooterStyled>
            </Col>       
          </Row>
          
        </DetailStyled>
        
      </Col>
    </Row>
  )
}

export default DetaiArtWork
