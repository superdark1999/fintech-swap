import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import useTokenBalance, { BnbBalance } from 'hooks/useTokenBalance'
import { XLUCKY_TESTNET } from 'config'
import bep20Abi from 'config/abi/erc20.json'
import { useERC20, useContract } from 'hooks/useContract'
import CardValue from './CardValue'

const BlockNFT = () => {
  const { account } = useWeb3React()
  const [balanceToken, setBalanceToken] = useState(0)
  const balance = BnbBalance() //
  const useContractTemp = useContract(XLUCKY_TESTNET, bep20Abi)
  useEffect(() => {
    if (useContractTemp) {
      useContractTemp.balanceOf(account).then((data) => {
        setBalanceToken(data / 1e18)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return (
    <WrapNFT>
      <Row gutter={[24, 24]}>
        <Col span={24} sm={24} md={16}>
          <div className="left">
            <div className="box">
              <div className="box__item">
                <div className="box__item-title">Your LUCKY balance</div>
                <div className="box__item-number">
                  <img src="images/logo-icon.png" alt="" />
                  <div className="number">
                    <CardValue color="" value={balanceToken} decimals={3} fontSize="22px" />

                    {/* <span>{(balance.toNumber() / 1e18).toFixed(3)}</span> */}
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">Pending harvest</div>
                <div className="box__item-number">
                  <img src="images/logo-icon.png" alt="" />
                  <div className="number">
                    <span>
                      <CardValue color="" value={0} decimals={3} fontSize="22px" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">LUCKY price</div>
                <div className="box__item-number">
                  <img src="images/icon-dollar.svg" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">LUCKY Market Cap</div>
                <div className="box__item-number">
                  <img src="images/icon-dollar.svg" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">LUCKY in circulation</div>
                <div className="box__item-number">
                  <img src="images/logo-icon.png" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">Total supply</div>
                <div className="box__item-number">
                  <img src="images/logo-icon.png" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">TVL</div>
                <div className="box__item-number">
                  <img src="images/icon-dollar.svg" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">Volume(24hr)</div>
                <div className="box__item-number">
                  <img src="images/icon-dollar.svg" alt="" />
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
                  <img src="images/logo-icon.png" alt="" />
                  <div className="number">
                    <span>0.000</span>
                  </div>
                </div>
              </div>

              <div className="box__item">
                <div className="box__item-title">LUCKY locked by NFT</div>
                <div className="box__item-number">
                  <img src="images/logo-icon.png" alt="" />
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
  .left,
  .right {
    background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
    box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
    border-radius: 20px;
    padding: 20px 20px 0;
    border: 0.0625rem solid rgba(255, 255, 255, 0.2);
  }

  .right {
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

    @media (min-width: 991px) {
      padding-left: 20px;
    }

    &__item {
      width: 50%;
      margin-bottom: 20px;
      border-bottom: 1px solid #676666;
      padding-bottom: 10px;

      @media (min-width: 991px) {
        width: 25%;
        border-bottom: none;
        padding-bottom: 0;
      }

      > div {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        text-align: center;

        @media (max-width: 991px) {
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
      font-family: 'Baloo Da';
      font-size: 22px;
      font-weight: 600;
      color: #000;

      svg,
      img {
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
