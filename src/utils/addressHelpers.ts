import { ChainId } from '@luckyswap/v2-sdk'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'
import { getChainId } from './web3React';

// TODO : Improve
export const getAddress = (address: Address, chainId?: ChainId): string => {
  const tempChainId = getChainId();
  // const mainNetChainId = 56
  const envChainId = process.env.REACT_APP_CHAIN_ID
  return address[tempChainId] ?? address[envChainId]
}

export const getCakeAddress = (chainId?: ChainId) => {
  return getAddress(tokens.cake.address, chainId)
}
export const getMasterChefAddress = (chainId: ChainId) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMulticallAddress = (chainId?: ChainId) => {
  return getAddress(addresses.mulltiCall, chainId)
}
export const getWbnbAddress = (chainId?: ChainId) => {
  return getAddress(tokens.wbnb.address, chainId)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getLotteryAddress = (chainId?: ChainId) => {
  return getAddress(addresses.lottery, chainId)
}
export const getLotteryTicketAddress = (chainId?: ChainId) => {
  return getAddress(addresses.lotteryNFT, chainId)
}
export const getPancakeProfileAddress = (chainId?: ChainId) => {
  return getAddress(addresses.pancakeProfile, chainId)
}
export const getPancakeRabbitsAddress = (chainId?: ChainId) => {
  return getAddress(addresses.pancakeRabbits, chainId)
}
export const getBunnyFactoryAddress = (chainId?: ChainId) => {
  return getAddress(addresses.bunnyFactory, chainId)
}
export const getClaimRefundAddress = (chainId?: ChainId) => {
  return getAddress(addresses.claimRefund, chainId)
}
export const getPointCenterIfoAddress = (chainId?: ChainId) => {
  return getAddress(addresses.pointCenterIfo, chainId)
}
export const getBunnySpecialAddress = (chainId?: ChainId) => {
  return getAddress(addresses.bunnySpecial, chainId)
}
export const getTradingCompetitionAddress = (chainId?: ChainId) => {
  return getAddress(addresses.tradingCompetition, chainId)
}
export const getEasterNftAddress = (chainId?: ChainId) => {
  return getAddress(addresses.easterNft, chainId)
}
