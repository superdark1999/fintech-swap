import { ChainId, Currency } from '@luckyswap/v2-sdk'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '@luckyswap/uikit'
import { ArrowUpCircle } from 'react-feather'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useActiveWeb3React } from 'hooks'
import { SCAN_SITES } from '../../../constants'
import { AutoColumn } from '../Column'
import { getBscScanLink } from '../../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash, currencyToAdd }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  const { library } = useActiveWeb3React()

  const { addToken, success } = useAddTokenToMetamask(currencyToAdd)

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
              View on {SCAN_SITES[chainId]}
            </LinkExternal>
          )}

          {currencyToAdd && library?.provider?.isMetaMask && (
            <button type="button" onClick={addToken}>
              {!success ? <> Add {currencyToAdd.symbol} to Metamask </> : <> Added {currencyToAdd.symbol} </>}
            </button>
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
