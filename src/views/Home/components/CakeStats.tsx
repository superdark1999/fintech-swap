import React from 'react'
import { Card, CardBody, Heading, Text } from '@beswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Title = styled.h3`
  font-size: 36px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #2b2c3a;
`

const BgIMG = styled.div`
  img {
    opacity: 0.5;
  }
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledCakeStats>
      <CardBody>
        {/* <Heading size="xl" mb="24px">
          {TranslateString(534, 'Cake Stats')}
        </Heading> */}
        <Title>Candy Stats</Title>
        <Row>
          <Text fontSize="14px" color="#2b2c3a">{TranslateString(536, 'Total BESWAP Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" color="#2b2c3a" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="#2b2c3a">{TranslateString(538, 'Total BESWAP  Burned')}</Text>
          <CardValue fontSize="14px" color="#2b2c3a" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px" color="#2b2c3a">{TranslateString(540, 'New BESWAP/block')}</Text>
          <CardValue fontSize="14px" color="#2b2c3a" decimals={0} value={22} />
        </Row>

        <BgIMG>
          <img src="/images/bg.png" alt=""/>
        </BgIMG>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
