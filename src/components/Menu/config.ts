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
    href: '/launchpads',
    calloutClass: 'style-color',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: '#',
    calloutClass: 'style-color icon-new coming-soon',
  },
  {
    label: 'Play to Earn',
    icon: 'TicketIcon',
    href: '/earn',
    calloutClass: 'style-color icon-hot',
    // items: [
    //   {
    //     label: 'Lottery',
    //     href: '/lottery',
    //     calloutClass: 'style-color',
    //   },
    // ],
  },
  {
    label: 'Chart',
    icon: 'ChartIcon',
    calloutClass: 'style-color',
        items: [
      {
        label: 'PooCoin (LUCKY)',
        href: 'https://poocoin.app/tokens/0x7011e05c238f315f0227ac914731b16f757f6689',
        calloutClass: 'style-color',
      },
    ],
  },
  {
    label: 'Channel',
    icon: 'MoreIcon',
    calloutClass: 'style-color',
    items: [
      {
        label: 'Twitter',
        href: 'https://twitter.com/luckyswap_defi',
        calloutClass: 'style-color',
      },
      {
        label: 'Medium',
        href: 'https://luckyswap.medium.com',
        calloutClass: 'style-color',
      },
      {
        label: 'Telegram',
        href: 'https://t.me/luckyswap_official',
        calloutClass: 'style-color',
      },
    ],
  },
]

const configRestricted: MenuEntry[] = [
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
    href: '#',
    calloutClass: 'style-color not-allow',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '#',
    calloutClass: 'style-color not-allow',
  },

  {
    label: 'Launchpad',
    icon: 'IfoIcon',
    href: '#',
    calloutClass: 'style-color not-allow',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: '#',
    calloutClass: 'style-color not-allow',
  },
  {
    label: 'Gamefi',
    icon: 'TicketIcon',
    href: '#',
    calloutClass: 'style-color not-allowed',
    items: [
      {
        label: 'Lottery',
        href: '#',
        calloutClass: 'style-color',
      },
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

export { config, configRestricted }
