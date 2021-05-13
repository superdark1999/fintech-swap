import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BeSwap',
  description:
    'The most popular AMM on BSC by user count!',
  image: 'https://BeSwap.finance/images/easter-battle.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/competition': {
    title: 'BeSwap Easter Battle',
    description: 'Register now for the BeSwap Easter battle!',
    image: 'https://BeSwap.finance/images/easter-battle.png',
  },
}
