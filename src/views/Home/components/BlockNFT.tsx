import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Row, Col } from 'antd'



const BlockNFT = () => {
  return (
    <WrapNFT>
        <Row gutter={[24, 24]}>
            <Col span={24} sm={24} md={16}>
              <div className="left">
                <div className="box">
                  <div className="box__item">
                    <div className="box__item-title">Your LUCKY balance</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">Pending harvest</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">LUCKY price</div>
                    <div className="box__item-number">
                      <img src="images/icon-dollar.svg" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">LUCKY Market Cap</div>
                    <div className="box__item-number">
                    <img src="images/icon-dollar.svg" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">LUCKY in circulation</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">Total supply</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">TLV</div>
                    <div className="box__item-number">
                      <img src="images/icon-dollar.svg" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">Volume(24hr)</div>
                    <div className="box__item-number">
                      <img src="images/icon-dollar.svg" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} sm={24} md={8}>
              <div className="right">
                <div className="box">
                  <div className="box__item">
                    <div className="box__item-title">Minted NFT</div>
                    <div className="box__item-number">
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">NFT Transactions</div>
                    <div className="box__item-number">
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">NFT Trading Vol</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="box__item">
                    <div className="box__item-title">LUCKY locked by NFT</div>
                    <div className="box__item-number">
                      <img src="images/logo-icon.png" alt=""/>
                      <div className="number">
                        <span>0.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
        </Row>
    </WrapNFT>
  )
}


const WrapNFT = styled.div`
  .left,.right {
    background: linear-gradient(45deg,rgb(35 35 35) 30%,rgb(45 45 45) 100%);
    box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
    border-radius: 20px;
    padding: 20px 20px 0;
  }

  .right {
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      background: url('../images/bg-nft.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 177px;
      position: absolute;
      left: 0;
      top: -9px;
      opacity: 0.7;
      transform: rotate(45deg);
    }

    .box {
      &__item {
        width: 50%;
      }
    }
  }

  .box {
      padding-left: 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      @media(min-width: 991px) {
        padding-left: 20px;
      }

      &__item {
        width: 50%;
        margin-bottom: 20px;
        border-bottom: 1px solid #676666;
        padding-bottom: 10px;

        @media(min-width: 991px) {
          width: 25%;
          border-bottom: none;
          padding-bottom: 0;
        }

        > div {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          text-align: center;

          @media(max-width: 991px) {
            width: 100%;
            justify-content: center;
          }
        }
      }

      &__item-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        color: rgb(240, 185, 11);
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      &__item-number {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-family: "Baloo Da";
        font-size: 22px;
        font-weight: 600;
        color: #000;

        svg,img {
          width: 22px;
        }

        .number {
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 5px;
        }
      }
    }
`

export default BlockNFT
