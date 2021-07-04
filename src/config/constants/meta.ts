import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Lucky Swap | A fully decentralized protocol for automated liquidity provision on both Ethereum/Binance',
  description:
    'The most popular AMM on BSC by user count!',
  image: 'https://Luckyswap.finance/images/easter-battle.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/competition': {
    title: 'Luckyswap Easter Battle',
    description: 'Register now for the Luckyswap Easter battle!',
    image: 'https://Luckyswap.finance/images/easter-battle.png',
  },
}
