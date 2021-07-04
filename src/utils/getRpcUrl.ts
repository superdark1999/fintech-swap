import random from 'lodash/random'
import { RPC_URLS } from '../constants'

// Array of available nodes to connect to

const getNodeUrl = (chainId) => {
  const randomIndex = random(0, RPC_URLS[chainId].length - 1)
  return RPC_URLS[chainId][randomIndex]
}

export default getNodeUrl
