import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'
import random from 'lodash/random'

const pools: PoolConfig[] = [
  {
    name: 'LUCKY',
    sousId: 1,
    stakingToken: tokens.lucky,
    earningToken: tokens.lucky,
    contractAddress: {
      97: '0x275e63981Fcc56cfe5C5e66c96971ba88523B78E',
      56: '0x5063e8B7588c102f0C6d5Dd7E85e55B0f4FF4c0E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0124',
    sortOrder: 1,
    isFinished: false,
    logo: '/images/lucky.png',
    srcImg: 'https://bscscan.com/token/images/luckyswap_32.png',
    project: '',
    apy: random(300.1, 400.2),
  },
  {
    name: 'CAKE',
    sousId: 2,
    stakingToken: tokens.lucky,
    earningToken: tokens.bake,
    contractAddress: {
      97: '0x0c4151c66D84996264874Ec494CcBa453e0315d9',
      56: '0xA2Fe0EECdF1a943470aBc2EE61D23d08Eacb6a3B',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000137',
    sortOrder: 1,
    isFinished: false,
    logo: '/images/cake.svg',
    project: 'https://pancakeswap.finance/',
    srcImg: 'https://bscscan.com/token/images/pancake_32.png?=v1',
    apy: random(150.1, 200.2),
  },
  {
    name: 'BAKE',
    sousId: 3,
    stakingToken: tokens.lucky,
    earningToken: tokens.bake,
    contractAddress: {
      97: '0x65d997B33d5245cAF0Ac45495196CaDaf2233C7F',
      56: '0x11300951703C88f3B32dDb7a3538f172E4fddCBC',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0025',
    sortOrder: 1,
    isFinished: false,
    logo: '/images/bake.svg',
    project: 'https://www.bakeryswap.org/',
    srcImg: 'https://bscscan.com/token/images/bakeryswap_32.png',
    apy: random(200.1, 250.2),
  },
  {
    name: 'DODO',
    sousId: 4,
    stakingToken: tokens.lucky,
    earningToken: tokens.dodo,
    contractAddress: {
      97: '0x7C9140C095F9FCd78599f05e6d0d7Be1ac72a09c',
      56: '0xE98690A49955296b3D8e3316015fE69A25Cf5349',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000708',
    sortOrder: 1,
    isFinished: false,
    logo: '/images/dodo.svg',
    project: 'https://dodoex.io',
    srcImg: 'https://bscscan.com/token/images/dodobird_32.png',
    apy:random(220.10,250.20)
  },
  {
    name: 'CHS',
    sousId: 5,
    stakingToken: tokens.lucky,
    earningToken: tokens.chs,
    contractAddress: {
      97: '0x4709Adbc44dcCF2Ee0B5253701A32E5E27583E98',
      56: '0x0dbEb5290e492f1CB2bFc3804e053f111C506c08',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00708',
    sortOrder: 1,
    isFinished: false,
    logo: '/images/cheese.png',
    project: 'https://cheeseswap.app/',
    srcImg: 'https://bscscan.com/token/images/cheeseswap_32.png?=v1',
    apy:random(250.10,300.20)
  },
  //, {
  //   name: 'xLUCKY',
  //   sousId: 6,
  //   stakingToken: tokens.lucky,
  //   earningToken: tokens.lucky,
  //   contractAddress: {
  //     97: '0xd8D99395B7594e74024B01479C63CB3E534c1509',
  //     56: '0xd8D99395B7594e74024B01479C63CB3E534c1509',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '100',
  //   sortOrder: 1,
  //   isFinished: false,
  //   logo: '/images/lucky.png',
  //   project: '',
  //   srcImg: 'https://bscscan.com/token/images/luckyswap_32.png',
]

export default pools
