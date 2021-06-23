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
      <h2>Hcats</h2>
    </TitleDetail>
    <BoxIfoDetail>
      <img src="../images/hyfi-detail.png" alt=""/>

      <BoxContent>
        <div className="two-column">
          <div className="two-column-left">
            <h3>Hcats</h3>
            
            <BoxSocial>
              <a href="/">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                    <path style={{fill: '#03A9F4'}} d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
              c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
              c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
              c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
              c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
              c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
              C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
              C480.224,136.96,497.728,118.496,512,97.248z" /></svg>
              </a>
              <a href="/">
                <svg id="Bold" enableBackground="new 0 0 24 24" height={512} viewBox="0 0 24 24" width={512} xmlns="http://www.w3.org/2000/svg"><path d="m22.085 4.733 1.915-1.832v-.401h-6.634l-4.728 11.768-5.379-11.768h-6.956v.401l2.237 2.693c.218.199.332.49.303.783v10.583c.069.381-.055.773-.323 1.05l-2.52 3.054v.396h7.145v-.401l-2.52-3.049c-.273-.278-.402-.663-.347-1.05v-9.154l6.272 13.659h.729l5.393-13.659v10.881c0 .287 0 .346-.188.534l-1.94 1.877v.402h9.412v-.401l-1.87-1.831c-.164-.124-.249-.332-.214-.534v-13.467c-.035-.203.049-.411.213-.534z" /></svg>
              </a>
              <a href="/">
                <svg enableBackground="new 0 0 24 24" height={512} viewBox="0 0 24 24" width={512} xmlns="http://www.w3.org/2000/svg"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" fill="#039be5" /></svg>
              </a>
            </BoxSocial>
          </div>

          <div className="two-column-right">
            <Dflex>
              <div>IDO Amount:</div>
              <div className="font-bold">0,000 HCATS</div>
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
              <div className="balance">Balance: 0 BNB</div>
              <input className="input-max" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" />
              <button className="max-btn" type="submit">Max</button>
              <div className="line"></div>
              <div className="box-bnb">
                <p>BNB</p>
                <input type="text" />
              </div>
            </div>
          </div>

          <Button type="submit" className="finished" color="primary" disabled>Coming soon</Button>
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

  @media (max-width: 768px) {
    width: auto;
    margin: 15px;
  }

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

    @media (max-width: 768px) {
      flex-direction: column;
    }

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
    background: #f5c6064d;
    color: rgb(255, 253, 250);
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: 1;
    width: 240px;
    height: 48px;
    margin: 32px auto 0px;
    cursor: not-allowed;
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

const BoxSocial = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;

  a {
    border: 1px dashed #2b2c3a;
    width: 40px;
    height: 40px;
    border-radius: 50% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;

    &:hover {
      background: #d9f5ff;
      transition: 0.5s;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export default IfoTitle