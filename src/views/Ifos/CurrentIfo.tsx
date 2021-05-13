import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@beswap/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid #f88520;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Titletop = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  color: #F88521;
`

const SubTitle = styled.h3`
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  font-size: 20px;
  color: #ef994d;
`

const TextC = styled.p`
  font-size: 16px;
  color: #ef994d;
  margin-bottom: 16px;
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Titletop>How to take part</Titletop>
          <SubTitle>Before Sale</SubTitle>
          <List className="list">
            <li>{TranslateString(596, 'Buy BESWAP and BNB tokens')}</li>
            <li>{TranslateString(598, 'Get BESWAP-BNB LP tokens by adding BESWAP and BNB liquidity')}</li>
          </List>
          <Flex mb="16px">
            <LinkExternal href="https://exchange.finance/#/swap" mr="16px" className="style-color">
              Buy BESWAP
            </LinkExternal>
            <LinkExternal href="https://exchange.finance/#/add/BNB/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" className="style-color">
              Get LP tokens
            </LinkExternal>
          </Flex>
          <SubTitle>During Sale</SubTitle>
          <List className="list">
            <li>{TranslateString(602, 'While the sale is live, commit your BESWAP-LP tokens to buy the IFO tokens')}</li>
          </List>
          <SubTitle>After Sale</SubTitle>
          <List className="list">
            <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
            <li>{TranslateString(608, 'Done!')}</li>
          </List>
          <Text as="div" pt="16px" className="custome-line">
            <Button
              as="a"
              variant="secondary"
              href="https://docs.pancakeswap.finance/core-products/ifo-initial-farm-offering"
            >
              {TranslateString(610, 'Read more')}
            </Button>
          </Text>
        </div>
        <div>
          <Image src="/images/ifo-bunny.svg" alt="ifo bunny" width={436} height={406} responsive />
          <div>
            <Titletop>Want to launch your own IFO?</Titletop>
            <TextC>
              Launch your project with PancakeSwap, Binance Smart Chain’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.
            </TextC>
            <div className="custom-btn">
              <Button
                as="a"
                href="#"
                external
              >
                {TranslateString(516, 'Apply to launch')}
              </Button>
            </div>
          </div>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
