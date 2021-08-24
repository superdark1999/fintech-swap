import { CurrencyAmount, JSBI } from '@luckyswap/v2-sdk'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { TranslatableText, SerializedBigNumber } from 'state/types'

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  _id: string
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  tokenSymbol: string
  releaseBlockNumber: number
  campaignId?: string
  banner?: string
  logo?: string
  typePool?: string
  sympol?: string
}

export interface Ticket {
  ticketId: number
  ticketNumber: number
  status: boolean
}

export enum LotteryStatus {
  PENDING = 'pending',
  OPEN = 'open',
  CLOSE = 'close',
  CLAIMABLE = 'claimable',
}

export interface LotteryTicket {
  id: string
  number: string
  status: boolean
  rewardBracket?: number
  roundId?: string
  cakeReward?: SerializedBigNumber
}

export interface LotteryTicketClaimData {
  ticketsWithUnclaimedRewards: LotteryTicket[]
  allWinningTickets: LotteryTicket[]
  cakeTotal: BigNumber
  roundId: string
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}
export interface Pool {
  _id: string
  name: string
  logo: string
  depositTokenSymbol: string
  rewardTokenSymbol: string
  depositTokenAddress: string
  rewardTokenAddress: string
  stakingAddress: string
  isPremium: boolean
  chainId: number
  inactive: boolean
}

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
}

export interface BaseNFT {
  tokenID: number
  contractAddress: string
  urlToken?: string
  to?: string
  uri?: string
}

export interface AdditionalInfoNFT {
  image?: string
  name?: string
  description?: string
}

export interface NFT extends BaseNFT, AdditionalInfoNFT {}

export interface StakingNFT extends NFT {
  rewardPerBlock?: ethers.BigNumber | JSBI
  owner?: string
  depositAmount?: ethers.BigNumber | JSBI | CurrencyAmount
  createdAt?: Date
  pendingReward?: string | JSBI | CurrencyAmount
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type Nft = {
  name: string
  description: string
  images: NftImages
  sortOrder: number
  bunnyId: number
  video?: NftVideo
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}

export type PageMeta = {
  title: string
  description: string
  image: string
}
