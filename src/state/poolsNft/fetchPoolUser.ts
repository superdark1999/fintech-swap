import nftAbi from 'config/abi/nft.json'
import stakingNftAbi from 'config/abi/StakingNft.json'
import addresses from 'config/constants/contracts'
import multicall from 'utils/multicall'

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
