import React from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap';

/**
 * Note: currently there should be only 1 active IFO at a time
 */

const IfoTitle = () => {

  return (
    <>
    <TitleDetail>
      <h2>HyFi</h2>
    </TitleDetail>
    <BoxIfoDetail>
      <img src="../images/hyfi-detail.png" alt=""/>
      <section>
        <p>Coming soon</p>
      </section>

      <BoxContent>
        <div className="two-column">
          <div className="two-column-left">
            <h3>Hcats</h3>
            <a href="https://coin.happycats.com/" target="_blank" rel="noreferrer">Website</a>
          </div>

          <div className="two-column-right">
            <Dflex>
              <div>IDO Amount:</div>
              <div className="font-bold">0,000 HYFI</div>
            </Dflex>

            <Dflex>
              <div>Supported Coin:</div>
              <div className="font-bold">BNB</div>
            </Dflex>

            <Dflex>
              <div>Price:</div>
              <div className="font-bold">0.000 BNB</div>
            </Dflex>

            <Dflex>
              <div>Start Block:</div>
              <div className="font-bold">000</div>
            </Dflex>

            <Dflex>
              <div>Time:</div>
              <div className="font-bold">Around 00.00 0:00 AM UTC</div>
            </Dflex>
          </div>
        </div>
      </BoxContent>

      <BoxForm>
        <button className="whitelist" type="submit">Whitelist Check</button>

        <div className="box-input">
          <div className="d-flex">
            <div className="box-max">
              <div className="balance">Balance: 2.486307288626942103 BNB</div>
              <input className="input-max" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" />
              <button className="max-btn" type="submit">Max</button>
              <div className="line"></div>
              <div className="box-bnb">
                <p>BNB</p>
                <input type="text" />
              </div>
            </div>
          </div>

          <Button className="finished" color="primary" disabled>Coming soon</Button>
        </div>

        <TextBot>
          Finance strictly selects the safest and most profitable mining projects for users. It automatically puts the assets deposited by users into the mining pool with the highest profit.
        </TextBot>
      </BoxForm>
    </BoxIfoDetail>
    </>
  )
}

const TitleDetail = styled.div`
  text-align: center;
  margin: 35px;

  h2 {
    color: #fff;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-size: 32px;
    font-weight: 700;
  }
`

const BoxIfoDetail = styled.div`
  box-sizing: border-box;
  min-width: 0px;
  display: flex;
  padding: 0px;
  align-items: center;
  position: relative;
  flex-direction: column;
  margin: auto;
  width: 550px;
  height: auto;
  border-radius: 50px;
  overflow: hidden;
  background: rgb(255, 253, 250);

  section {
    position: absolute;
    top: 24px;
    left: 0px;
    background: rgb(165, 165, 165);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    color: rgb(255, 253, 250);
    font-family: "Baloo Da";
    font-weight: 400;
    padding: 8px 24px;

    p {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 18px;
    }
  }
`

const BoxContent = styled.div`
  position: relative;
  padding: 15px 32px 24px;
  width: 100%;

  .two-column {
    box-sizing: border-box;
    margin: 0px 0px -23px;
    min-width: 0px;
    width: 100%;
    display: flex;
    padding: 0px 0px 22px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(43 44 58);

    &-left {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px;
      align-items: flex-start;

      h3 {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: normal;
        font-size: 26px;
        color: rgb(48 48 65);
        font-weight: 600;
      }

      a {
        margin-top: 24px;
        width: 136px;
        line-height: 40px;
        border-radius: 10px;
        text-decoration: none;
        text-align: center;
        background: rgb(0 167 225);
        color: #fff;
        font-weight: 00;

        &:hover {
          opacity: 0.7;
          transition: 1s;
        }
      }
    }

    &-right {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      display: flex;
      padding: 0px;
      flex-direction: column;
      align-items: center;
    }
  }
`

const Dflex = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 6px 0px;
  align-items: center;
  justify-content: space-between;

  div {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    color: rgb(48 48 65);

    &.font-bold {
      font-weight: 600;
    }
  }
`

const BoxForm = styled.div`
  position: relative;
  padding: 15px 32px 24px;
  width: 100%;

  button.whitelist {
    position: absolute;
    padding: 0px;
    top: 18px;
    width: 126px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: "Yuanti SC";
    font-weight: bold;
    font-size: 14px;
    background: rgb(255, 253, 250);
    border: 1px solid rgb(48 48 65);
    color: rgb(48 48 65);
  }

  .box-input {
    margin: 48px 0px 0px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgb(43 44 58)
  }

  .d-flex {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .box-max {
    display: flex;
    align-items: center;
    border: 1px solid rgb(43 44 58);
    border-radius: 10px;
    color: rgb(48 48 65);
    padding: 9px 16px;
    height: 48px;
    position: relative;
    width: 100%;

    .balance {
      position: absolute;
      top: -32px;
      right: 0px;
      color: rgb(48 48 65);
      font-size: 14px;
      font-weight: 700;
    }

    .input-max {
      color: rgb(48 48 65);
      width: 0px;
      position: relative;
      font-weight: 500;
      outline: none;
      border: none;
      flex: 1 1 auto;
      background: none;
      font-size: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px;
      appearance: textfield;
    }

    button.max-btn {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      color: rgb(48 48 65);
      font-weight: 700;
      font-size: 16px;
      padding: 0px;
    }

    .line {
      margin-left: 16px;
      margin-right: 16px;
      border-left: 1px solid rgb(238, 217, 204);
      height: 24px;
    }

    .box-bnb {
      position: relative;
      margin: 0px;
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 30px;
      user-select: none;
      padding: 0px;
      border-radius: 0px;

      p {
        color: rgb(48 48 65);
        font-size: 14px;
        font-weight: 700;
        width: 100%;
      }

      input {
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  button.finished {
    padding: 0px;
    font-weight: 500;
    text-align: center;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    background-color: rgb(135 210 236);
    color: rgb(255, 253, 250);
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
    width: 240px;
    height: 48px;
    margin: 32px auto 0px;
  }
`

const TextBot = styled.div`
  box-sizing: border-box;
  margin: 24px 0px 0px;
  min-width: 0px;
  font-weight: 400;
  font-size: 14px;
  color: rgb(48 48 65);
  line-height: 136%;
  letter-spacing: 0.01em;
`

export default IfoTitle
