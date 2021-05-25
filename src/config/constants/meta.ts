import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Luckyswap',
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
