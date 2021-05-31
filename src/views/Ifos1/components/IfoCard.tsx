import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

/**
 * Note: currently there should be only 1 active IFO at a time
 */

const IfoCard = () => {

  return (
    <BoxIfoCard>
      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item>
        <ItemHead>
          <section>
            <span>Ended</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HyFi</h4>
          <p>The Intelligent, High-frequency Yield Farming aggregator.</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>4,000,000 HYFI</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>6213225 (04.02 9:00 UTC)</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item className="item-coming">
        <ItemHead>
          Upcoming Project !
        </ItemHead>

        <ItemContent>
          <h4>Stay tuned !</h4>
          <p>Something exciting is coming your way!</p>
        </ItemContent>
      </Item>
    </BoxIfoCard>
  )
}

const BoxIfoCard = styled.div`
  box-sizing: border-box;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  align-items: center;
  flex-wrap: wrap;
  max-width: 874px;
  justify-content: flex-start;
  margin: auto;
`

const Item = styled.div`
  box-sizing: border-box;
  margin: 0px 0px 20px;
  min-width: 0px;
  padding: 0px;
  width: 100%;
  min-height: 335px;
  border-radius: 26px;
  background: rgb(255, 253, 250);
  overflow: hidden;
  box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;

  @media (min-width: 768px) {
    width: 280px;
  }

  &:not(:nth-child(3n)) {
    margin-right: 0;

    @media (min-width: 768px) {
      margin-right: 17px;
    }
  }

  &.item-coming {
    
  }
`

const ItemHead = styled.div`
  position: relative;
  width: 100%;
  height: 106px;
  background-image: url('../images/hyfi.png');
  background-size: cover;
  color: rgb(255, 255, 255);
  
  @media (min-width: 768px) {
    width: 280px;
  }

  section {
    position: absolute;
    top: 16px;
    left: 0px;
    background: rgb(165, 165, 165);
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    color: rgb(255, 253, 250);
    font-family: "Baloo Da";
    font-weight: 400;
    padding: 6px 12px;

    span {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 12px;
    }
  }
`

const Dflex = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 0px 0px;
    justify-content: space-between;

    &.flex-bot {
      padding: 4px 0px 15px;
    }

  div {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: bold;
    font-size: 15px;
    color:  rgb(37 37 53);
  }
`

const ItemContent = styled.div`
  padding: 20px 24px 8px;

  h4 {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: bold;
    font-size: 20px;
    color:  rgb(37 37 53);
    line-height: 28px;
  }

  p {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 400;
    font-size: 14px;
    padding: 8px 0px 0px;
    min-height: 69px;
    color: rgb(37 37 53);
  }
`

const BoxLink = styled.div`
  a {
    display: block;
    width: 232px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
    color: rgb(255, 253, 250);
    text-align: center;
    background: #1890ff;
    border-radius: 10px;
    text-decoration: none;

    &:hover {
      background-color: #40a9ff;
      transition: 0.5s;
      color: rgb(255, 253, 250);
    }
  }
`

export default IfoCard
