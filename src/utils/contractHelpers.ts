import { ChainId } from '@luckyswap/v2-sdk'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import cakeAbi from 'config/abi/cake.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import easterNftAbi from 'config/abi/easterNft.json'
import bep20Abi from 'config/abi/erc20.json'
import ifoAbi from 'config/abi/ifo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import masterChef from 'config/abi/masterchef.json'
import nftAbi from 'config/abi/nft.json'
// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import stakingNftAbi from 'config/abi/StakingNft.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
// import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import { ethers } from 'ethers'
// Addresses
import {
  getAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getCakeAddress,
  getClaimRefundAddress,
  getEasterNftAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getPointCenterIfoAddress,
  getStakingNFTAddress,
  getTradingCompetitionAddress,
} from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { getWeb3NoAccount } from './web3'

// TODO : use ethers instead of Web3
const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? getWeb3NoAccount()
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export const getContract2 = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(chainId), web3)
}
export const getCakeContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(cakeAbi, getCakeAddress(chainId), web3)
}
export const getProfileContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(profileABI, getPancakeProfileAddress(chainId), web3)
}
export const getPancakeRabbitContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(chainId), web3)
}
export const getBunnyFactoryContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(chainId), web3)
}
export const getBunnySpecialContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(chainId), web3)
}

export const getLotteryV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract2(lotteryV2Abi, getLotteryV2Address(), signer)
}

export const getLotteryContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(lotteryAbi, getLotteryAddress(chainId), web3)
}
export const getLotteryTicketContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(chainId), web3)
}
export const getMasterchefContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(masterChef, getMasterChefAddress(chainId), web3)
}
export const getClaimRefundContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(chainId), web3)
}
export const getTradingCompetitionContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(chainId), web3)
}
export const getEasterNftContract = (web3?: Web3, chainId?: ChainId) => {
  return getContract(easterNftAbi, getEasterNftAddress(chainId), web3)
}

export const getNFTContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract2(nftAbi, address, signer)
}

export const getStakingNFTContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract2(stakingNftAbi, getStakingNFTAddress(), signer)
}
