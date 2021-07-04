import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  LinkExternal,
  Link,
  Box,
  CardFooter,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
import { PublicIfoState } from 'hooks/useGetPublicIfoData'
import { Ifo } from 'config/constants/types'

export interface IfoCardDetailsProps {
  ifo: Ifo
  publicIfoData: PublicIfoState
}

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ ifo, publicIfoData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const { description, cakeToBurn, projectSiteUrl, launchDate, launchTime, saleAmount, raiseAmount } = ifo
  const { raisingAmount, totalAmount } = publicIfoData
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <CardFooter>
      <div className="custom-cl">
        <Button
          variant="text"
          onClick={handleToggle}
          width="100%"
          endIcon={
            isOpen ? <ChevronUpIcon color="primary" width="24px" /> : <ChevronDownIcon color="primary" width="24px" />
          }
        >
          {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')}
        </Button>
      </div>
      {isOpen && (
        <>
          <Text as="p" color="#2b2c3a" my="24px">
            {description}
          </Text>
          <Box mb="24px">
            <Item>
              <Display color="#2b2c3a">{TranslateString(582, 'Launch Time')}</Display>
              <Text color="#2b2c3a">
                {launchDate},
                <Link
                  href="https://www.timeanddate.com/worldclock/singapore/singapore"
                  target="blank"
                  rel="noopener noreferrer"
                  ml="4px"
                  style={{ display: 'inline' }}
                  color="#2b2c3a"
                >
                  {launchTime}
                </Link>
              </Text>
            </Item>
            <Item>
              <Display color="#2b2c3a">{TranslateString(584, 'For Sale')}</Display>
              <Text color="#2b2c3a">{saleAmount}</Text>
            </Item>
            <Item>
              <Display color="#2b2c3a">{TranslateString(999, 'To raise (USD)')}</Display>
              <Text color="#2b2c3a">{raiseAmount}</Text>
            </Item>
            <Item>
              <Display color="#2b2c3a">{TranslateString(586, 'CAKE to burn (USD)')}</Display>
              <Text color="#2b2c3a">{cakeToBurn}</Text>
            </Item>
            <Item>
              <Display color="#2b2c3a">{TranslateString(999, 'Total raised (% of target)')}</Display>
              <Text color="#2b2c3a">{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
            </Item>
          </Box>
          <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
            {TranslateString(412, 'View project site')}
          </LinkExternal>
        </>
      )}
    </CardFooter>
  )
}

export default IfoCardDetails
