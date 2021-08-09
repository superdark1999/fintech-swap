import { getAddress } from '@ethersproject/address'
import { NFT } from 'config/constants/types'

// [{n : 1}, {n : 2}] => 2
export const getMaxBy = (arr: Array<any>, propName: string): number => {
  if (arr.length === 0) return 0
  let max: number = arr[0][propName]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][propName] > max) {
      max = arr[i][propName]
    }
  }

  return max
}

export const foundNFT = (arr: Array<NFT>, contractAddress: string, tokenID: number): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].contractAddress === getAddress(contractAddress) && arr[i].tokenID === tokenID) {
      return true
    }
  }

  return false
}
