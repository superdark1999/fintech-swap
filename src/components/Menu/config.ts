import { MenuEntry, menuStatus } from '@luckyswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
    calloutClass: 'style-color',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    calloutClass: 'style-color',
    items: [
      {
        label: 'Exchange',
        href: '/swap',
        calloutClass: 'style-color',
      },
      {
        label: 'Liquidity',
        href: '/pool',
        calloutClass: 'style-color',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
    calloutClass: 'style-color',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
    calloutClass: 'style-color',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    calloutClass: 'style-color',
    items: [
      {
        label: 'Overview',
        href: '#',
        calloutClass: 'style-color',
      },
      {
        label: 'Tokens',
        href: '#',
        calloutClass: 'style-color',
      },
      {
        label: 'Pairs',
        href: '#',
        calloutClass: 'style-color',
      },
      {
        label: 'Accounts',
        href: '#',
        calloutClass: 'style-color',
      },
    ],
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '#',
    calloutClass: 'style-color',
  },
]

export default config
