import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Card, CardBody, CardRibbon } from '@luckyswap/uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useGetPublicIfoData from 'hooks/useGetPublicIfoData'
import UnlockButton from 'components/UnlockButton'
import IfoCardHeader from './IfoCardHeader'
import IfoCardDetails from './IfoCardDetails'
import IfoCardActions from './IfoCardActions'
import IfoCardProgress from './IfoCardProgress'
import IfoCardTime from './IfoCardTime'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.svg')`};
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`
const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const { id, name, subTitle } = ifo
  const publicIfoData = useGetPublicIfoData(ifo)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const Ribbon = getRibbonComponent(publicIfoData.status, TranslateString)

  return (
    // <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={publicIfoData.status === 'live'}>
    //   <IfoCardDetails ifo={ifo} publicIfoData={publicIfoData} />
    // </StyledIfoCard>
    <BoxIfoCard>
      <Item>
        <ItemHead>
          <section>
            <span>Coming soon</span>
          </section>
        </ItemHead>

        <ItemContent>
          <h4>HCATS</h4>
          <p>Support animals conservation, helping pet and cat organizations Solutions on Binance Smart Chain</p>

          <Dflex>
            <div>IDO Amount:</div>
            <div>0,000 HCATS</div>
          </Dflex>

          <Dflex className="flex-bot">
            <div>Time:</div>
            <div>Coming soon</div>
          </Dflex>

          <BoxLink>
            <Link to="/IfoDetail">Participate</Link>
          </BoxLink>
        </ItemContent>
      </Item>

      <Item className="item-coming">
        <div className="item-coming-title">
          Upcoming Project !
        </div>

        <div className="item-coming-content">
          <h4>Stay tuned !</h4>
          <p>Something exciting is coming your way!</p>
        </div>
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
  background: rgb(234 234 234);
  overflow: hidden;
  box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;

  &:hover {
    box-shadow: 1px 2px 20px #fff0c1;
    transition: 0.5s;
  }

  @media (min-width: 768px) {
    width: 100%;
  }

  &:not(:nth-child(3n)) {
    margin-right: 0;

    @media (min-width: 768px) {
      margin-right: 17px;
    }
  }

  &.item-coming {
    .item-coming-title {
      min-height: 106px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 24px;
      background: #8a8989;
      color: #fff;
    }

    .item-coming-content {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 67px 24px 0px;

      h4 {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
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
  width: 100%;
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
    font-weight: 600;
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
  font-size: 24px;
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

