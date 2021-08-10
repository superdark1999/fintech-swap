import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@luckyswap/uikit'

interface HeadingProps {
  valueToDisplay?: any
  children?: string
  Icon?: React.ComponentType
  Ic?: boolean
}
interface Props {
  Icon?: React.ComponentType
}
const IconWrapper = styled.div<Props>`
  margin-right: 16px;

  svg {
    width: 48px;
    height: 48px;
  }
`
const BoxContent = styled.div`
  display: flex;
  img{
    width: 75px;
    margin-right: 20px
  }
`
const NumberValue = styled.div`
  width: 70px;
  height: 70px;
  font-weight: 900;
  margin-right: 10px;
  border-radius: 10px;
  color: #F3C111;
  font-size: 34px;
  background-image: url(../images/border.png);
  position: relative;
  span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, Icon, Ic, ...props }) => {
  return (
    <Flex {...props}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <Flex className="box-lucky" flexDirection="column">
        <Text fontSize="24px" mb="20px" color="textSubtle">
          {children}
        </Text>
        <BoxContent>
          {Ic && <img src="../images/icon-lottery.svg" alt="" />}
          {/* <Heading size="lg">{valueToDisplay}</Heading> */}
          {valueToDisplay?.map((item: any, key:any) => {
            return (
              <NumberValue><span>{item}</span></NumberValue>
            )
          })}
        </BoxContent>
      </Flex>
    </Flex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: [],
  children: '',
}

export default LotteryCardHeading
