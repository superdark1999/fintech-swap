import React from 'react'
import { Row, Col, Rate, Table } from 'antd';
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import Checkmark from 'assets/images/checkmark.svg'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import {ButtonStyle, ButtonBuyStyle} from 'components-v2/cart/styled'
import { SwapOutlined } from '@ant-design/icons';
import { DetailStyled, ReviewStyled, ScrollReview, FooterStyled, ImageStyled, DetailTabpane} from './styled'
import { dataHistory, columnHistory, dataBidding, columnBidding } from './Mock'

const { TabPane } = Tabs;
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
          <img src="https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif" />
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
            <TabPane tab="Detail" key="1">
              <DetailTabpane >
                <div className="group-info">
                  <div className="info">
                    <div className="title">NFT Contract ID:</div>
                    <div className="value">0xBA16...9069</div>
                  </div>
                  <div className="info">
                    <div className="title">Token ID:</div>
                    <div className="value">15748</div>
                  </div>                 
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Creator's Adress:</div>
                    <div className="value">0xBA16...9069</div>
                  </div>
                  <div className="info">
                    <div className="title">Owner Adress:</div>
                    <div className="value">0xBA16...9069</div>
                  </div>                 
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Scan Link:</div>
                    <div className="value">https://abc.com</div>
                  </div>              
                </div>
              </DetailTabpane>
            </TabPane>
            
            <TabPane tab="History" key="2">
              <Table 
                columns={columnHistory} 
                dataSource={dataHistory} 
                size="middle"
                scroll={{ x: 'calc(300px + 50%)', y: 240 }}/>
            </TabPane>
            <TabPane tab="Bidding" key="3">
              <Table 
                columns={columnBidding} 
                dataSource={dataBidding} 
                size="middle"
                scroll={{ x: 300, y: 300 }}/>
            </TabPane>
            <TabPane tab="Reviews" key="4">
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
