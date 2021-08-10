import { Contract } from '@ethersproject/contracts'
import { ROUTER_ADDRESSES, WNATIVE } from '@luckyswap/v2-sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import SMART_CHEF_ABI from 'config/abi/smartChef.json'
import addresss from 'config/constants/contracts'
import { useActiveWeb3React } from 'hooks'
import useWeb3 from 'hooks/useWeb3'
import useWeb3Provider from 'hooks/useWeb3Provider'
import { useMemo } from 'react'
import {getLotteryV2Address}
 from 'utils/addressHelpers'
import FARMS_ABI from '../config/abi/masterchef.json'
import lotteryV2 from '../config/abi/lotteryV2.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import ROUTER_ABI from '../constants/abis/router.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import {
  getBep20Contract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getCakeContract,
  getClaimRefundContract,
  getEasterNftContract,
  getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getLotteryV2Contract,
  getMasterchefContract,
  getNFTContract,
  getPancakeRabbitContract,
  getPointCenterIfoContract,
  getProfileContract,
  getSouschefContract,
  getStakingNFTContract,
  getTradingCompetitionContract,
} from '../utils/contractHelpers'


/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  const { chainId } = useActiveWeb3React()

  return useMemo(() => getLotteryTicketContract(web3, chainId), [web3, chainId])
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case 56:
      case 97:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useRouterContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(ROUTER_ADDRESSES[chainId], ROUTER_ABI, withSignerIfPossible)
}

export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useEtherLotteryV2Contract = () => {
  const provider = useWeb3Provider()
  return useMemo(() => getLotteryV2Contract(provider.getSigner()), [provider])
}

export const useNFTContract = (address: string) => {
  const provider = useWeb3Provider()
  return useMemo(() => getNFTContract(address, provider.getSigner()), [address, provider])
}

export function useStakingNFTContract(): Contract | null {
  const provider = useWeb3Provider()
  return useMemo(() => getStakingNFTContract(provider.getSigner()), [provider])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useMasterchef = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3, chainId), [web3, chainId])
}

export const useCake = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getCakeContract(web3, chainId), [web3, chainId])
}

export const useBunnyFactory = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getBunnyFactoryContract(web3, chainId), [web3, chainId])
}

export const usePancakeRabbits = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getPancakeRabbitContract(web3, chainId), [web3, chainId])
}

export const useProfile = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3, chainId), [web3, chainId])
}

export const useLottery = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3, chainId), [web3, chainId])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3, chainId), [web3, chainId])
}

export const useBunnySpecialContract = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getBunnySpecialContract(web3, chainId), [web3, chainId])
}

export const useClaimRefundContract = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3, chainId), [web3, chainId])
}

export const useTradingCompetitionContract = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getTradingCompetitionContract(web3, chainId), [web3, chainId])
}

export const useEasterNftContract = () => {
  const { chainId } = useActiveWeb3React()
  const web3 = useWeb3()
  return useMemo(() => getEasterNftContract(web3, chainId), [web3, chainId])
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}
export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WNATIVE[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}
export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useFarmsContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(addresss.masterChef[chainId], FARMS_ABI, true)
}

export function useStakingContract(address: any | null): Contract | null {

  return useContract(address, SMART_CHEF_ABI, true)
}

export function useLotteryV2contract(): Contract | null {
  return useContract(getLotteryV2Address(), lotteryV2, true)
}