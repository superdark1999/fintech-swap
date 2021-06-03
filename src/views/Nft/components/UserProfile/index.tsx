import React from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs} from 'antd';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from '../utilComponent/cart/styled'
import  Copy from 'assets/images/copy.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import QRCode from 'assets/images/qr-code.svg'

import { HeartOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;


const UserProfile: React.FC = () => {
  return (
    <UserProfileStyled>
      <Row className="section header-profile">
          <Col className="header-profile-col" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
             <img className="avatar" src="https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915"/>
          </Col>
      </Row>
      <Row className="section content-profile">
          <Col className="content" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
            <div className="info-detail">
              <div>
                <div className="name">
                  <span>gerbilpetroleum</span>
                  <img src={Checkmark} />
                </div>
                <div className="rank">
                  <img src={Crown} /> {" "}
                  GOLD ARTIST
                </div>
              </div> 
              <div className="button-right">
                <ButtonStyle  className="btn-donate">
                  <HeartOutlined />
                  Donate
                </ButtonStyle>
                <img src={Copy} alt=""/>
              </div> 
            </div>
            <p className="description">
                gerbilpetroleum is an award winning illustrator with over 25 years experience in the industry. His eclectic art style is influenced by comic books, fantasy art, cartoons, film and all things pop culture.
            </p>  
          <Tabs defaultActiveKey="1" >
            <TabPane tab="On sale" key="1"> 
              <Row align="middle" justify="space-between">     
                <GroupButton>
                  <RadioButton width="auto" borderRadius="10px" value="All">All </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Pending">Pending</RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Approved">Approved</RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Cancelled">Cancelled</RadioButton>
                </GroupButton>
                <SearchInput maxWidth="300px" placeholder="Search items"/>
              </Row> 
              <ListCart className="list-artwork">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </ListCart> 
              <Loadmore/>     
            </TabPane>
            <TabPane tab="Collection" key="2">
              <Row align="middle" justify="space-between">
                <GroupButton>
                  <RadioButton width="auto" borderRadius="10px" value="All">All  </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Pending">Game </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Approved">Art </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Cancelled">Music </RadioButton>
                </GroupButton> 
                <SearchInput maxWidth="300px" placeholder="Search items"/>
              </Row>
              <ListCart className="list-artwork">
                <CardPedding />
                <CardPedding />
                <CardPedding />
                <CardPedding />
                <CardPedding />
              </ListCart> 
              <Loadmore/> 
            </TabPane>
            <TabPane tab="Settings"></TabPane>
          </Tabs>

          </Col>
      </Row>

    </UserProfileStyled>
  )
}
export default UserProfile


const Card: React.FC = () => {
  return (
    <CartStyled>
      <Row gutter={24}>
        <Col xl={{ span: 8}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 8}}>
          <img className="avatar" src="https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915"/>
        </Col>
        <Col className="description" xl={{ span: 16 }} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 16}}>
            <div className="header-card">
              <div className="status">
                Pending
              </div>
              <div className="cancel">
                Cancel
              </div>
            </div>
              
            <div className="name">
              CRYPTOCARD 001 - THE ETHEREUM GOLD
            </div>
            <div className="number">
              69 LUCKY {' '}
              <img src={Token} alt=""/>
            </div> 
            <div style={{display: "flex"}}>
              <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID:</div>
              <div className="number">0x2433bE070fAeE3F9608154 </div>
            </div> 
            
            <div className="content">
            A few years ago, the crypto world was for chosen one. And now cryptocurrency is everywhere! 
            </div>  

            <div className="organize">
              <img src={Luckyswap} /> 
                <span className="name">LuckySwapStudio</span>
              <img src={Checkmark} />
            </div>               
        </Col>
      </Row>                
    </CartStyled>
  )
}


const CardPedding: React.FC = () => {
  return (
    <CartStyled>
      <Row gutter={24}>
        <Col xl={{ span: 8}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 8}}>
          <img className="avatar" src="https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915"/>
        </Col>
        <Col className="description space-vehicle" xl={{ span: 16 }} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 16}}>
            <div>
              <div className="name">
                    CRYPTOCARD 001 - THE ETHEREUM GOLD
              </div>
              <div style={{display: "flex"}}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>ID:</div>
                <div className="number">0x2433bE070fAeE3F9608154 </div>
              </div> 
            </div>
            <div>
              <div className="group-button">
                <ButtonTrade height="45px">Send</ButtonTrade>
                <ButtonBuy height="45px">Buy</ButtonBuy>
                <ButtonBuy borderRadius="100px" width="40px" height="45px"><img src={QRCode} /></ButtonBuy>
              </div>   
            </div> 
               
        </Col>
      </Row>                
    </CartStyled>
  )
}