import { ChainId } from '@luckyswap/v2-sdk'
import axios from 'axios'
import nftAbi from 'config/abi/nft.json'
import stakingNftAbi from 'config/abi/StakingNft.json'
import addresses from 'config/constants/contracts'
import { getAddress } from 'ethers/lib/utils'
import multicall from 'utils/multicall'
import Web3 from 'web3'
import { AdditionalInfoNFT, BaseNFT, NFT } from '../../config/constants/types'
import { RPC_URLS } from '../../constants/index'
import { multicallv2 } from '../../utils/multicall'

const abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export const fetchUserPendingRewards = async (pools, chainId) => {
  const calls = pools.map((p) => ({
    address: addresses.stakingNft[chainId],
    name: 'pendingReward',
    params: [p.nftContract, p.tokenId],
  }))

  let pendingRewards = await multicall(stakingNftAbi, calls)

  pendingRewards = pendingRewards.flat()

  return pendingRewards
}

export const fetchURIPool = async (pools, chainId) => {
  const calls = pools.map((p) => ({
    address: addresses.nft[chainId],
    name: 'tokenURI',
    params: [p.tokenId],
  }))

  let images = await multicall(nftAbi, calls)

  images = images.flat()

  return images
}

export const fetchNftUser = async (account): Promise<BaseNFT[]> => {
  if (account) {
    return fetch(
      `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999999&sort=asc`,
    )
      .then((response) => response.json())
      .then((data) =>
        data.result.map((item) => ({
          ...item,
          tokenID: parseInt(item.tokenID),
          contractAddress: getAddress(item.contractAddress),
        })),
      )
      .catch((error) => {
        return new Promise((resolve) => resolve([]))
      })
  }
  return new Promise((resolve) => resolve([]))
}

export const getImplementationFromProxy = async (contractAddress: string, chainId: ChainId) => {
  const web3 = new Web3(RPC_URLS[chainId][0])
  return (web3 as any).eth.getStorageAt(
    contractAddress,
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
  )
}

const NFT_SITES = {
  LUCKY_MARKETPLACE: 'LUCKY_MARKETPLACE',
  AIRNFTS: 'AIRNFTS',
  BRNFT: 'BRNFT',
}

const WHITELIST_URLS = {
  [getAddress('0x969a82989d9e410ed0ae36c12479552421c93eb2')]: NFT_SITES.LUCKY_MARKETPLACE,
  [getAddress('0xF5db804101d8600c26598A1Ba465166c33CdAA4b')]: NFT_SITES.AIRNFTS,
  [getAddress('0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec')]: NFT_SITES.BRNFT,
}

const getInfoFromLucky = async (uri): Promise<AdditionalInfoNFT> => {
  return { image: uri }
}

const getInfoFromAirNFT = async (uri): Promise<AdditionalInfoNFT> => {
  try {
    const { data } = await axios.get(uri)
    const { urlCompressed, name, description } = (data as any)?.nft
    return {
      image: urlCompressed,
      name,
      description,
    }
  } catch (error) {
    console.log('get info airnft error : ', error)
    return null
  }
}

const getInfoFromBRNFT = async (uri): Promise<AdditionalInfoNFT> => {
  try {
    const { data } = await axios.get(uri)
    const { name, description, image } = data

    return { name, description, image }
  } catch (error) {
    console.log('get image brnft error : ', error)
    return null
  }
}

const getInfoFromBakery = async (uri): Promise<AdditionalInfoNFT> => {
  try {
    const { data } = await axios.get(uri)
    const { name, description, image } = data

    return { name, description, image }
  } catch (error) {
    console.log('get image bakery error : ', error)
    return null
  }
}

export const getInfoFromURI = async (tokensInfo: BaseNFT[]): Promise<AdditionalInfoNFT[]> => {
  const result = await Promise.all(
    tokensInfo.map(async (token) => {
      switch (WHITELIST_URLS[token.contractAddress]) {
        case NFT_SITES.LUCKY_MARKETPLACE:
          return getInfoFromLucky(token.uri)
        case NFT_SITES.AIRNFTS:
          return getInfoFromAirNFT(token.uri)
        case NFT_SITES.BRNFT:
          return getInfoFromBRNFT(token.uri)
        default:
          return getInfoFromBakery(token.uri)
      }
    }),
  )

  return result
}

export const getTokensURI = async (tokens: BaseNFT[]) => {
  try {
    const calls = tokens.map((t) => ({
      address: t.contractAddress,
      name: 'tokenURI',
      params: [t.tokenID],
    }))

    let uris = await multicallv2(abi, calls, { requireSuccess: false })

    uris = uris.flat()

    return uris
  } catch (error) {
    return []
  }
}

export const getAdditionalInfoNFTs = async (tokens: BaseNFT[]): Promise<AdditionalInfoNFT[]> => {
  const uris = await getTokensURI(tokens)

  const tokensInfo = uris.map((uri, index) => ({
    uri,
    contractAddress: tokens[index].contractAddress,
  }))

  const info = await getInfoFromURI(tokensInfo)

  return info
}

export const excludeExistedTokens = (userTokens: BaseNFT[], existedTokens: BaseNFT[]): Array<any> => {
  const result: BaseNFT[] = []
  for (let i = 0; i < userTokens.length; i++) {
    const token = userTokens[i]
    let existed = false
    for (let j = 0; j < existedTokens.length; j++) {
      if (
        getAddress(existedTokens[j].contractAddress) === token.contractAddress &&
        (existedTokens[j].tokenID as any) === token.tokenID
      ) {
        existed = true
        break
      }
    }

    if (!existed) {
      result.push(token)
    }
  }

  return result
}

export const getKey = (token) => {
  return `${token.tokenID}-${token.contractAddress}`
}

export const excludeSoldTokens = (userTokens: BaseNFT[], account: string): Array<any> => {
  const map = new Map()
  const result: BaseNFT[] = []

  for (let i = (userTokens as any).length - 1; i >= 0; i--) {
    const key = getKey(userTokens[i])

    if (!map.get(key) && getAddress(userTokens[i].to) === account) {
      result.push(userTokens[i])
    }
    map.set(key, 1)
  }

  return result
}

export const addAdditionalInfoNFTs = async (userTokens: BaseNFT[]): Promise<NFT[]> => {
  const AdditionalInfoNFTs = await getAdditionalInfoNFTs(userTokens)

  for (let i = 0; i < (userTokens as any).length; i++) {
    Object.assign(userTokens[i], AdditionalInfoNFTs[i])
  }

  return userTokens
}
