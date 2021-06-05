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
    <>
      <Item>
        <ItemHead>
          <section>
            <span>Coming soon</span>
          </section>
        </ItemHead>

        <ItemContent>
          <BoxHead>
            <h2>HCATS</h2>
            <p>1 BNB = ? HCATS</p>
          </BoxHead>

          <Total>
            <span>Total Raise:</span>
            <h2>0 BNB</h2>
          </Total>

          <BoxProgress>
            <TitleProgress>Progress</TitleProgress>
            <BoxProgressBar>
              <ProgressBar></ProgressBar>
            </BoxProgressBar>
            <ProgressFooter>
              <ProgressPercentage>100%</ProgressPercentage>
              <FeaturedCardMinimum>(Min.0%)</FeaturedCardMinimum>
              <FeaturedCardAmount>0/100</FeaturedCardAmount>
            </ProgressFooter>
          </BoxProgress>

          <FeaturedCardFooter>
            <CardColumn>
              <p>Participants</p>
              <h3>0</h3>
            </CardColumn>

            <CardColumn>
              <p>Max<span>BNB</span></p>
              <h3>0.0</h3>
            </CardColumn>

            <CardColumn>
              <p>Access</p>
              <h3>Private</h3>
            </CardColumn>
          </FeaturedCardFooter>

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
          <div>
            <h2>Stay tuned !</h2>
            <p>Something exciting is coming your way!</p>
          </div>
        </div>
      </Item>
    </>
  )
}



const BoxProgress = styled.div`
  margin-bottom: 16px;
`

const TitleProgress = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 4px;
`

const ProgressFooter = styled.p`
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  display: grid;
  grid-template-columns: 30px auto auto;
`

const ProgressPercentage = styled.div`
  color: #f90943;
`

const FeaturedCardMinimum = styled.div``

const FeaturedCardAmount = styled.div`
  margin-left: auto;
`

const BoxProgressBar = styled.div`
  display: flex;
  overflow: hidden;
  height: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
`

const ProgressBar = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  background-color: #4ea7a5;
  transition: width .6s ease;
`

const FeaturedCardFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 16px;
  margin-bottom: 16px;
`

const CardColumn = styled.div`
  p {
    font-size: 12px;
    line-height: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #212121;
  }

  h3 {
    font-size: 22px;
    line-height: 28px;
    font-weight: 600;
    margin-bottom: 0;
    color: #0c8fb6;
  }
`

const Item = styled.div`
  box-sizing: border-box;
  margin: 0px 0px 20px;
  min-width: 0px;
  padding: 0px;
  width: 100%;
  border-radius: 26px;
  background: rgb(234 234 234);
  overflow: hidden;
  box-shadow: rgb(171 133 115 / 16%) 0px 2px 10px;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;

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
      margin: 0px;
      width: 100%;
      display: flex;
      align-items: center;
      height: 100%;
      text-align: center;

      div {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      h2 {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
`

const BoxHead = styled.div`
  margin-bottom: 16px;

  h2 {
    font-size: 28px;
    line-height: 34px;
    font-weight: 600;
    margin-bottom: 0;
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

const Total = styled.div`
  span {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 4px;
    display: block;
  }

  h2 {
    font-size: 28px;
    line-height: 34px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 16px;
    color: #0c8fb6;
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
`

const BoxLink = styled.div`
  display: flex;
  justify-content: center;
  
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

