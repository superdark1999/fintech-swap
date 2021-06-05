import { Row, Col, Input, Select } from 'antd'
import React from 'react'
import { TradeArtWorkStyled, CardStyled } from './styled'
import CheckMark from 'assets/images/checkmark.svg'
import TextGradient from 'components-v2/ID'
import Token from 'assets/images/token.svg'
import Plus from 'assets/images/plus.svg'

import Swap from 'assets/images/swap.svg'
import { ButtonTrade } from 'components-v2/Button'
const OptionData = [
  {
   label: 'Lucky',
   value: 'Lucky',
  }
]
const { Option } = Select;


const Card: React.FC = () => {
  return (
    <CardStyled center>
      <div className="avatar">
        <img src="https://cdnb.artstation.com/p/assets/images/images/038/322/775/large/pengcheng-yang-souskehb2.jpg?1622761089"/>
      </div>
      <div className="name">Fren's Head 46</div>
      <div className="organize">
        LuckySwapStudio
        {' '}
        <img src={CheckMark}/>
      </div>
      <TextGradient>0x2433bE070fAeE3F960...0x2433bE070fAeE3F960...</TextGradient>
    </CardStyled>
  )
}

const Trade: React.FC = () => {
  return (
    <Row justify="space-around">
      <img src={Plus} style={{paddingLeft: 40}}/>
      <CardStyled >
        <div className="name">Your offer</div>
        <Input className="input" placeholder='Enter price' bordered/>
        <Row>
          <TextGradient width="auto">100K LUCKY</TextGradient>
          {' '}<img src={Token} />
        </Row>
      </CardStyled>
      <img src={Swap}/>
    </Row>
    
    
  )
}

const TradeArtWork: React.FC = () => {
  const [select, setSelect] = React.useState<string | null>('Lucky');
  return (
   
      <Row gutter={24} className="trade-option" justify="center">
        <Col xl={{ span: 20}} md={{ span:  22}} xs={{span: 24}}>
          <TradeArtWorkStyled>
            <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
              {OptionData.map((item, i) => (
                  <Option  key={i} value={item.value}>{item.label} <img src={Token}/></Option>
              ))}
            </Select>
            <Row align="middle">
              <Col xl={{ span: 6}} md={{ span:  24}} xs={{span: 24}}>
                <Card>
                    a
                </Card>
              </Col>
              <Col xl={{ span: 12}} md={{ span:  24}} xs={{span: 24}}>
                <Trade/>
              </Col>
              <Col xl={{ span: 6}} md={{ span:  24}} xs={{span: 24}}>
                <Card>
                    a
                </Card>
              </Col>
            </Row>
            <Row className="footer">
              <Col xl={{ span: 16}} md={{ span:  24}} xs={{span: 24}}>
                <Input.TextArea style={{borderRadius: '16px', resize: 'none'}} placeholder="Note for author" maxLength={1000}/>  
              </Col>     
              <Col xl={{ span: 5}} md={{ span:  8}} xs={{span: 24}}>
                <ButtonTrade width="100%">
                  Offer now
                </ButtonTrade>
              </Col>
            </Row>
          </TradeArtWorkStyled>

        </Col>
      </Row>
  )
}

export default TradeArtWork

