import nftAbi from 'config/abi/nft.json'
import stakingNftAbi from 'config/abi/StakingNft.json'
import addresses from 'config/constants/contracts'
import multicall from 'utils/multicall'
import { ChainId } from '@luckyswap/v2-sdk'
import Web3 from 'web3'
import axios from 'axios'
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

export const fetchImagePool = async (pools, chainId) => {
  const calls = pools.map((p) => ({
    address: addresses.nft[chainId],
    name: 'tokenURI',
    params: [p.tokenId],
  }))

  let images = await multicall(nftAbi, calls)

  images = images.flat()

  return images
}

export const fetchNftUser = async (account) => {
  if (account) {
    return fetch(
      `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999999&sort=asc`,
    )
      .then((response) => response.json())
      .then((data) => data.result)
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

// const WHITELIST_URLS = {
//   ''
// }

// export const getImageFromURI = async(contractAddress, uri) => {
//   try {
//     switch(contractAddress)
//   }
//   catch(error) {
//     console.log('get image error : ', error);
//     return null;
//   }
// }

const NFT_SITES = {
  LUCKY_MARKETPLACE: 'LUCKY_MARKETPLACE',
  AIRNFTS: 'AIRNFTS',
  BRNFT: 'BRNFT',
}

const WHITELIST_URLS = {
  '0x969a82989d9e410ed0ae36c12479552421c93eb2': NFT_SITES.LUCKY_MARKETPLACE,
  '0xF5db804101d8600c26598A1Ba465166c33CdAA4b': NFT_SITES.AIRNFTS,
  '0x1dDB2C0897daF18632662E71fdD2dbDC0eB3a9Ec': NFT_SITES.BRNFT,
}

const getImageFromLucky = async (uri) => {
  return uri
}

const getImageFromAirNFT = async (uri) => {
  try {
    const { data } = await axios.get(uri)
    return (data as any)?.nft?.urlThumbnail
  } catch (error) {
    console.log('get image airnft error : ', error)
    return null
  }
}

const getImageFromBRNFT = async (uri) => {
  try {
    const { data } = await axios.get(uri)

    return (data as any)?.image
  } catch (error) {
    console.log('get image brnft error : ', error)
    return null
  }
}

const getImageFromBakery = async (uri) => {
  try {
    const { data } = await axios.get(uri)

    return (data as any)?.image
  } catch (error) {
    console.log('get image bakery error : ', error)
    return null
  }
}

export const getImagesFromURI = async (tokensInfo) => {
  const result = await Promise.all(
    tokensInfo.map(async (token) => {
      switch (WHITELIST_URLS[token.contractAddress]) {
        case NFT_SITES.LUCKY_MARKETPLACE:
          return getImageFromLucky(token.uri)
        case NFT_SITES.AIRNFTS:
          return getImageFromAirNFT(token.uri)
        case NFT_SITES.BRNFT:
          return getImageFromBRNFT(token.uri)
        default:
          return getImageFromBakery(token.uri)
      }
    }),
  )

  return result
}

export const getTokensURI = async (tokens) => {
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
    console.log('error : ', error)
    return []
  }
}

export const getImageFromTokens = async (tokens) => {
  const uris = await getTokensURI(tokens)

  const tokensInfo = uris.map((uri, index) => ({
    uri,
    contractAddress: tokens[index].contractAddress,
  }))

  const images = await getImagesFromURI(tokensInfo)

  return images
}
