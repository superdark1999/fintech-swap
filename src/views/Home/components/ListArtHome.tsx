import React from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Select } from 'antd'

const ListArtHomeContainer = styled.div`
  margin-top: 30px;
  color: white;

  .header {
    margin-bottom: 25px;
  }

  .label {
    font-size: 22px;
    font-weight: 600;
  }

  .sub-label {
    font-size: 11px;
    opacity: 0.4;
    margin-bottom: 9px;
  }
`

function ListArtHome() {
  return (
    <ListArtHomeContainer>
      <div className="header">
        <div className="sub-label">Don&apos;t miss them</div>
        <div className="label">Hottest Artworks in 2 weeks</div>
      </div>
      <Row gutter={[8, 8]}>
        <Col span={12} md={6}>
          <ArtItem />
        </Col>
        <Col span={12} md={6}>
          <ArtItem />
        </Col>{' '}
        <Col span={12} md={6}>
          <ArtItem />
        </Col>{' '}
        <Col span={12} md={6}>
          <ArtItem />
        </Col>
      </Row>
    </ListArtHomeContainer>
  )
}

const ArtItemStyled = styled.div`
  background: #333441;
  color: white;
  font-size: 14px;
  font-family: Source Sans Pro;
  border-radius: 6px;
  overflow: hidden;

  .thumb-container {
    position: relative;
    height: 0;
    padding-top: 56.47%;

    .thumb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: 15px;
  }
  .label {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  .description {
    opacity: 0.6;
  }

  .footer {
    padding: 15px;
    border-top: 1px solid rgba(216, 216, 216, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .lucky-coin {
      width: 18px;
      height: 18px;
      padding: 2px;
      background: #212628;
      border-radius: 4px;

      margin-right: 5px;
      vertical-align: middle;
    }

    .coin-value {
      font-size: 13px;
    }
  }
`

const ArtItem = (props) => {
  return (
    <ArtItemStyled className="art-item">
      <div className="thumb-container">
        <img src="/images/banner-home.png" alt="thumb" className="thumb" />
      </div>
      <div className="content">
        <p className="label">PUBG Mobile</p>
        <div className="description">Deal 5000 damage to enemies with grenades.</div>
      </div>
      <div className="footer">
        <div>
          <img src="/images/lucky-logo.png" alt="lucky-coin" className="lucky-coin" />
          <span className="coin-value">+100</span>
        </div>
        <Button type="primary">Connect</Button>
      </div>
    </ArtItemStyled>
  )
}

export default ListArtHome
