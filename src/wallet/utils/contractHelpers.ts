import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from './web3'
import { poolsConfig } from '../state/config/constants'
import bep20Abi from '../../Jus/lib/abi/erc20.json'
import {
  getAddress
} from '../utils/addressHelpers'
import { PoolCategory } from '../state/config/constants/types'
import sousChef from '../state/config/abi/sousChef.json'
import sousChefBnb from '../state/config/abi/sousChefBnb.json'
const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}

export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}