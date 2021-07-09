import { ChainId } from '@luckyswap/v2-sdk'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '@luckyswap/uikit'
import { ArrowUpCircle } from 'react-feather'
import { SCAN_NAMES } from '../../../constants'
import { AutoColumn } from '../Column'
import { getBscScanLink } from '../../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getBscScanLink(chainId, hash, 'transaction')}>
              View on {SCAN_NAMES[chainId]}
            </LinkExternal>
          )}
          <Button onClick={onDismiss} mt="20px" className="btn-supply">
            Close
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
