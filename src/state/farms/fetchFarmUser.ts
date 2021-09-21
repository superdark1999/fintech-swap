import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import { multicallv2 } from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { getChainId } from '../../utils/web3React'
import { FarmConfig } from '../../config/constants/types'

export const fetchFarmUserAllowances = async (account: string, farms: FarmConfig[]) => {
  const calls = farms.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, farm.contractAddress] }
  })

  const rawLpAllowances = await multicallv2(erc20ABI, calls, { requireSuccess: false })
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farms: FarmConfig[]) => {
  const calls = farms.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicallv2(erc20ABI, calls, { requireSuccess: false })
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farms: FarmConfig[]) => {
  const calls = farms.map((farm) => {
    return {
      address: farm.contractAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicallv2(masterchefABI, calls, { requireSuccess: false })
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farms: FarmConfig[]) => {
  const calls = farms.map((farm) => {
    return {
      address: farm.contractAddress,
      name: 'pendingLucky',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicallv2(masterchefABI, calls, { requireSuccess: false })
  const parsedEarnings = rawEarnings.map((earnings) => {
    return earnings ? new BigNumber(earnings).toJSON() : '0'
  })

  return parsedEarnings
}
