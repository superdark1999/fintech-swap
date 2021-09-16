import { ChainId } from '@luckyswap/v2-sdk'
import store from 'state'
import { GAS_PRICE_GWEI } from '../constants/index'
import { getChainId } from './web3React'

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (): string => {
  const chainId = getChainId()
  return chainId === ChainId.MAINNET ? GAS_PRICE_GWEI.default : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
