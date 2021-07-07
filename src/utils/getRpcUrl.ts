import { ChainId } from '@luckyswap/v2-sdk'
import random from 'lodash/random'
import { RPC_URLS } from '../constants'

// Array of available nodes to connect to

const getNodeUrl = (chainId) => {
  if (RPC_URLS[chainId].length === 0) {
    return RPC_URLS[ChainId.MAINNET][0]
  }
  const randomIndex = random(0, RPC_URLS[chainId].length - 1)
  const nodeUrl = RPC_URLS[chainId][randomIndex]
  return nodeUrl
}

export default getNodeUrl
