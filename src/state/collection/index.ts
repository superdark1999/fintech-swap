/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getFarmConfig } from 'config/constants/farms'
import { setFarmUserData } from 'state/farms'
import {
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
  fetchFarmUserEarnings,
} from 'state/farms/fetchFarmUser'

import { multicallv2 } from 'utils/multicall'
import farmNftABI from 'config/abi/newFarm.json'

import { ethers } from 'ethers'
import { NFT, BoostedNFT, FarmConfig } from '../../config/constants/types'
import { FarmType } from '../../constants/index'
import { findNFTIndex } from '../../utils/array'

const initialState: {
  data: BoostedNFT[]
} = { data: [] }

export const spaceHunterCollectionSlice = createSlice({
  name: 'SpaceHunter Collection',
  initialState,
  reducers: {
    setSpaceHunterCollection: (state, action) => {
      const collection = action.payload
      state.data = [...collection]
    },
    stakeNFTsFarm: (state, action) => {
      const nftsStaked = action.payload
      nftsStaked.forEach((nft) => {
        const index = findNFTIndex(state.data, nft.contractAddress, nft.tokenID)
        state.data[index].isUsingToBoost = true
      })
    },
    unstakeNFTsFarm: (state, action) => {
      const nftsUnstaked = action.payload
      nftsUnstaked.forEach((nft) => {
        const index = findNFTIndex(state.data, nft.contractAddress, nft.tokenID)
        state.data[index].isUsingToBoost = false
      })
    },
  },
})

// Actions
export const { setSpaceHunterCollection } = spaceHunterCollectionSlice.actions

export default spaceHunterCollectionSlice.reducer
