import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

const InterestHomeContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  border-radius: 6px;
  .label {
    font-size: 21px;
    line-height: 24px;
    color: white;
    margin-bottom: 15px;
  }
`
const coinsInfo = [
  {
    name: 'Bitcoin',
    shortened: 'BTC',
    logoSrc:
      'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    isIncrease: true,
    changePercent: '7.46',
  },
  {
    name: 'Etherum',
    shortened: 'ETH',
    logoSrc:
      'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    isIncrease: false,
    changePercent: '1.53',
  },
  {
    name: 'Bitcoin Cash',
    shortened: 'BCH',
    logoSrc:
      'https://dynamic-assets.coinbase.com/93a4303d1b0410b79bb1feac01020e4e7bdf8e6ece68282d0af2c7d0b481c5f5c44c0cec1d7071ae8f84674dbd139e290d50a038a6a4c1bbc856ec0871b5f3e2/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    isIncrease: true,
    changePercent: '14.6',
  },
  {
    name: 'Litecoin',
    shortened: 'LTC',
    logoSrc:
      'https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png',
    isIncrease: false,
    changePercent: '2.51',
  },
  {
    name: 'Binance',
    shortened: 'BNB',
    logoSrc: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    isIncrease: true,
    changePercent: '16.14',
  },
  {
    name: 'The Graph',
    shortened: 'GRT',
    logoSrc: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6719.png',
    isIncrease: true,
    changePercent: '9.8',
  },
]

function InterestHome() {
  return (
    <InterestHomeContainer>
      <div className="label">What is interesting</div>
      <Row gutter={[8, 8]}>
        {coinsInfo.map((item, index) => {
          return (
            <Col key={index} span={24} sm={12} md={8}>
              <InterestItem data={item} />
            </Col>
          )
        })}
      </Row>
    </InterestHomeContainer>
  )
}

const InterestItemStyled = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: #232627;
  padding: 20px 35px;
  color: #acafc0;
  font-size: 14px;
  line-height: 20px;
  border-radius: 6px;

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    text-align: right;
  }

  .label {
    color: white;
    align-items: center;
    font-weight: 700;
  }

  .logo {
    border-radius: 50%;
    width: 31px;
    height: 31px;
    background: #4c56c0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }

  .percent-value {
    font-size: 16px;
    font-weight: 900;
  }
`
const InterestItem = ({ data }) => {
  const { name, shortened, logoSrc, isIncrease, changePercent } = data
  return (
    <InterestItemStyled>
      <div className="left">
        <img src={logoSrc} className="logo" alt={`logo-${name}`} />
        <div>
          <div className="label">{name}</div>
          <div className="">{shortened}</div>
        </div>
      </div>
      <div className="right">
        <div>per days</div>
        <div className="percent-value" style={{ color: isIncrease ? '#84ce95' : '#f6465d' }}>{`${
          isIncrease ? '+' : '-'
        } ${changePercent}%`}</div>
      </div>
    </InterestItemStyled>
  )
}

export default InterestHome
