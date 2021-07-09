import { ChainId } from '@luckyswap/v2-sdk'
import random from 'lodash/random'
import { RPC_URLS } from '../constants'

// Array of available nodes to connect to

const getNodeUrl = (chainId?: ChainId) => {
  try {
    const randomIndex = random(0, RPC_URLS[chainId].length - 1)
    const nodeUrl = RPC_URLS[chainId][randomIndex]
    return nodeUrl
  } catch (error) {
    console.log('node url error : ', error)
    return null
  }
}

export default getNodeUrl
