import React from 'react'
import { Row, Col } from 'antd'
import { OnSaleStyled } from './styled'
import { ButtonBuy } from 'components-v2/Button'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import { CheckOutlined } from '@ant-design/icons'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'

interface Props {
  nextStep: (step: number) => void,
}

export default function (props: Props) {
  const [isCopied, handleCopy] = useCopyToClipboard(3000);

  return (
    <OnSaleStyled background="https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1624374232949">
        <div className="background"/>
        <div className="wrapper-image">
          <img src="https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1624374232949"/>
        </div>
        <div className="wrapper-info">
          <div className="title">CRYPTOCARD 001 - THE ETHEREUM GOLD</div>
          <div className="description">
            <p>
              A few years ago, the crypto world was for chosen one. And now cryptocurrency is everywhere A few years ago, the crypto world was for chosen one. 
            </p>
            <p>
              And now cryptocurrency is everywhere A few years ago, the crypto world was for chosen one. And now cryptocurrency is everywhere! 
            </p>
          </div>

          <p className="organize">
            <img src="/static/media/luckyswap.8109f13c.svg"/>
            <span className="name">LuckySwapStudio</span>
            <img src="/static/media/checkmark.76da7af5.svg"/>
          </p>
          <Row justify="space-between" align="middle">
            <ButtonBuy width="300px" onClick={() => props.nextStep(2)}>Offer now</ButtonBuy>
            <div className="social-icon">
            <div className="icon"><img src={Facebook} alt="" /></div>
            <div className="icon"><img src={Telegram} alt="" /></div>
            <div className="icon" onClick={() => handleCopy(`${window.location.origin}/swap`)}>
              {isCopied ? <span><CheckOutlined /></span> : <img src={Copy} alt="copy-artwork" />}
            </div>
          </div>
          </Row>
        </div>
    </OnSaleStyled>
  )
}
