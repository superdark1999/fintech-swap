import { Row, Col } from 'antd'
import React from 'react'
import { TableStyled, Container } from './styled'
import { data, column } from './mock'
import SwapArtWork from './Swap'


export default () => {

  return (
    <Container>
      <Row gutter={24} className="trade-option" justify="center">
          <Col xl={{ span: 24}} md={{ span:  22}} xs={{span: 22}}>
            <SwapArtWork />
            <Row gutter={20} className="trade-option" justify="center">
              <Col xl={{ span: 24}} md={{ span:  22}} xs={{span: 22}}  xxl={{ span: 24}}>
                <TableStyled
                  columns={column} 
                  dataSource={data} 
                  size="middle"
                  scroll={{ x: 300 }}
                />            
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
  )
}


