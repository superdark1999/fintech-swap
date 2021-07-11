import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  // {
  //   sousId: 0,
  //   stakingToken: tokens.cake,
  //   earningToken: tokens.cake,
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  {
    sousId: 99,
    stakingToken: tokens.bdex,
    earningToken: tokens.bake,
    contractAddress: {
      97: '0xa5bd720d5115Dc14E9a04C8349F316252A69F987',
      56: '0x40918EF8efFF4aA061656013a81E0e5A8A702eA7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.005',
  },
  {
    sousId: 100,
    stakingToken: tokens.bdextest,
    earningToken: tokens.cake2,
    contractAddress: {
      97: '0x911A05e65399E2De2bDde2eB77c0f0748ff3E42E',
      56: '0x40918EF8efFF4aA061656013a81E0e5A8A702eA7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '0.005',
  },
]

export default pools
