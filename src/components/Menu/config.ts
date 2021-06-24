import { MenuEntry, menuStatus } from '@luckyswap/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
    calloutClass: 'style-color',
  },
  {
    label: 'Exchange',
    icon: 'TradeIcon',
    calloutClass: 'style-color',
    items: [
      {
        label: 'Swap',
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

  // {
  //   label: 'Analytics',
  //   icon: 'InfoIcon',
  //   calloutClass: 'style-color',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: '#',
  //       calloutClass: 'style-color',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: '#',
  //       calloutClass: 'style-color',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: '#',
  //       calloutClass: 'style-color',
  //     },
  //     {
  //       label: 'Accounts',
  //       href: '#',
  //       calloutClass: 'style-color',
  //     },
  //   ],
  // },
  {
    label: 'Launchpad',
    icon: 'IfoIcon',
    href: '/ifo',
    calloutClass: 'style-color',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: '#',
    calloutClass: 'style-color icon-hot',
  },
  {
    label: 'Gamefi',
    icon: 'TicketIcon',
    href: '#',
    calloutClass: 'style-color ',
    items: [
      {
        label: 'Lottery',
        href: '/lottery',
        calloutClass: 'style-color',
      }
    ],
  },
  {
    label: 'Channel',
    icon: 'MoreIcon',
    calloutClass: 'style-color',
    items: [
      {
        label: 'Twitter',
        href: 'https://twitter.com/LuckySwap_DeFi',
        calloutClass: 'style-color',
      },
      {
        label: 'Medium',
        href: 'https://luckyswap.medium.com',
        calloutClass: 'style-color',
      },
      {
        label: 'Telegram',
        href: 'https://t.me/luckyswap_official_ENG',
        calloutClass: 'style-color',
      },
    ],
  },
]

export default config
