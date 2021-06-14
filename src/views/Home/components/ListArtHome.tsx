import React from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Select } from 'antd'

const ListArtHomeContainer = styled.div`
  margin-top: 30px;
  color: white;
  border-radius: 6px;
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

const artHomeData = [
{
  title:'Master Of Magic',
  subtitle:'Wizard card for Master Of Magic.',
  imageSrc:'https://cdnb.artstation.com/p/assets/images/images/037/876/569/large/iwo-widulinski-iwo-widulinski-mom-rjakjpg.jpg?1621538176',
  cost:'0,00'
},
{
  title:'Castlevania Season 4',
  subtitle:'Some shots for Castlevania Season 4',
  imageSrc:'https://cdna.artstation.com/p/assets/images/images/037/869/922/large/jose-vega-csv4-bg-dracscastle-ext-d-dawn-color-v01.jpg?1621526197',
  cost:'0,00'
},
{
  title:'Optic Adventure',
  subtitle:'I had this dream last week... ',
  imageSrc:'https://cdna.artstation.com/p/assets/images/images/037/867/130/large/ismail-inceoglu-optic-adventure.jpg?1621521374',
  cost:'0,00'
},
{
  title:'Tribute to Miura-Sensei',
  subtitle:'We will miss you...',
  imageSrc:'https://cdna.artstation.com/p/assets/images/images/037/872/892/large/anato-finnstark-anato-finnstark-berserk.jpg?1621531306',
  cost:'0,00'
}]
function ListArtHome() {
  return (
    <ListArtHomeContainer>
      <div className="header">
        <div className="sub-label">Don&apos;t miss them</div>
        <div className="label">Hottest Artworks in 2 weeks</div>
      </div>
      <Row gutter={[8, 8]}>
        {artHomeData.map(item=>{return(
          <Col span={12} md={6}>
            <ArtItem data={item} />
          </Col>
        )})}
      </Row>
    </ListArtHomeContainer>
  )
}

const ArtItemStyled = styled.div`
  background: #444444;
  color: white;
  font-size: 14px;
  font-family: Source Sans Pro;
  border-radius: 20px;
  overflow: hidden;
  min-height: 306px;

  .thumb-container {
    position: relative;
    padding-top: 56.47%;
    width: 100%;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;

    &:hover {
      img{
        -webkit-transform: scale3d(1, 1, 1);
                transform: scale3d(1, 1, 1);
      }
    }

    img{
      -webkit-transition: all 0.5s linear;
              transition: all 0.5s linear;
      -webkit-transform: scale3d(1.2, 1.2, 1);
              transform: scale3d(1.2, 1.2, 1);
    }

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
      /* background: #212628; */
      border-radius: 4px;

      margin-right: 5px;
      vertical-align: middle;
    }

    .coin-value {
      font-size: 13px;
    }

    .ant-btn-primary {
      font-weight: 600;
    }
  }
`

const ArtItem = ({data}) => {
  const {
    title,
    subtitle,
    imageSrc,
    cost
  } = data;
  return (
    <ArtItemStyled className="art-item">
      <div className="thumb-container">
        <img src={imageSrc} alt={`art-${title}`} className="thumb" />
      </div>
      <div className="content">
        <p className="label">{title}</p>
        <div className="description">{subtitle}</div>
      </div>
      <div className="footer">
        <div>
          <img src="/images/logo-icon.png" alt="lucky-coin" className="lucky-coin" />
          <span className="coin-value">+ {cost}</span>
        </div>
        <Button type="primary" href="#">Buy</Button>
      </div>
    </ArtItemStyled>
  )
}

export default ListArtHome
