import { Currency } from '@luckyswap/v2-sdk'
import useHttpLocations from 'hooks/useHttpLocations'
import React, { useMemo } from 'react'
import { WrappedTokenInfo } from 'state/lists/hooks'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../../hooks/index'
import Logo from '../Logo'
import CoinLogo from '../pancake/CoinLogo'

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`

const StyledBnbLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const { chainId } = useActiveWeb3React()

  const getNativeLogo = () => {
    switch (chainId) {
      case 56:
      case 97:
        return '/images/coinslist/BNB.png'
      case 137:
      case 80001:
        return '/images/coinslist/POLYGON.svg'
      default:
        return '/images/coinslist/BNB.png'
    }
  }

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return []

    if (currency?.isToken) {
      if (currency instanceof WrappedTokenInfo) {
        return [
          ...uriLocations,
          `/images/coinslist/${currency?.symbol ?? 'token'}.png`,
          getTokenLogoURL(currency.address),
        ]
      }

      return [`/images/coinslist/${currency?.symbol ?? 'token'}.png`, getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency?.isNative) {
    return <StyledBnbLogo src={getNativeLogo()} size={size} style={style} />
  }

  return (currency as any)?.symbol ? (
    <CoinLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  ) : (
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  )
}
