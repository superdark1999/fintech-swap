import React from 'react'
import { Row, Col } from 'antd'
import { OnSaleStyled } from './styled'
import { ButtonBuy } from 'components-v2/Button'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import { CheckOutlined } from '@ant-design/icons'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import { CardDefault, CardSwap } from '../components'

interface Props {
  nextStep: (step: number) => void,
  getItemSelected: (value: any) => void,
  itemSwap: any,
  setVisible?: (value: boolean) => void
}

export default function (props: Props) {
  const [isCopied, handleCopy] = useCopyToClipboard(3000);



  const handleNextStep = () => {
    if (props.itemSwap) {
      props.nextStep(2)
    }
  }

  return (
    <OnSaleStyled background={props?.itemSwap?.contentUrl}>
        <div className="background"/>

        {
          props.itemSwap ?
          <CardSwap 
            style={{
              minWidth: 380,
              height: 530,
              margin: 10,
              zIndex: 1,
            }} 
            data={props.itemSwap} 
            setVisible={props.setVisible }
            value='item-swap'
          />
          :
          <CardDefault 
            setVisible={props.setVisible} 
            value='item-swap'
            style={{
              minWidth: 380,
              height: 530,
              margin: 10,
              zIndex: 1,
            }} 
          />
        }
               
        { props.itemSwap ?
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
                <ButtonBuy width="300px" onClick={handleNextStep}>Offer now</ButtonBuy>
                <div className="social-icon">
                <div className="icon"><img src={Facebook} alt="" /></div>
                <div className="icon"><img src={Telegram} alt="" /></div>
                <div className="icon" onClick={() => handleCopy(`${window.location.origin}/swap`)}>
                  {isCopied ? <span><CheckOutlined /></span> : <img src={Copy} alt="copy-artwork" />}
                </div>
              </div>
              </Row>
            </div>
          :
            <div className="wrapper-info">
              <div className="title">Swap NFTs for Better Prices!</div>
              <div className="description">
                <p>
                  The history of NFTs has shown that a very small percentage of NFTs stay relevant over time, with most NFTs losing their value after a few months. NFTs quickly become illiquid and therefore holder can't sell.
                </p>
                <p>
                  Using NFTSwaps, any one can deposit their NFT to the NFTSwaps required pool and obtain BEP20 token derivatives that can be exchanged directly on PancakeSwap and BakerySwap from the NFTSwaps UI. 
                </p>
              </div>

              <Row justify="space-between" align="middle">
                <div className="social-icon">
                <div className="icon"><img src={Facebook} alt="" /></div>
                <div className="icon"><img src={Telegram} alt="" /></div>
              </div>
              </Row>
            </div>
          }
    </OnSaleStyled>
  )
}
