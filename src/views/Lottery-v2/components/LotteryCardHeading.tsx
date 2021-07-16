import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@luckyswap/uikit'

interface HeadingProps {
  valueToDisplay?: string
  children?: string
  Icon?: React.ComponentType
}

const IconWrapper = styled.div`
  margin-right: 16px;

  svg {
    width: 48px;
    height: 48px;
  }
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, Icon, ...props }) => {
  return (
    <Flex {...props}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <Flex className="box-lucky" flexDirection="column">
        <Text fontSize="16px" color="textSubtle">
          {children}
        </Text>
        <Heading size="lg">{valueToDisplay}</Heading>
      </Flex>
    </Flex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  Icon: () => <div />,
  children: '',
}

export default LotteryCardHeading
