import { Token, TokenAmount } from '@luckyswap/v2-sdk'
import { useMemo } from 'react'
import spaceHunterNFTAbi from 'config/abi/SpaceHunterNFT.json'
import farmNftAbi from 'config/abi/newFarm.json'
import { Interface } from '@ethersproject/abi'
import { useNFTContract, useTokenContract } from '../hooks/useContract'
import { useSingleCallResult, useMultipleContractSingleData } from '../state/multicall/hooks'
import { useActiveWeb3React } from '../hooks/index'
import { multicallv2 } from '../utils/multicall'
import { ApprovalState } from '../config/index'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(
    () => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined),
    [token, allowance],
  )
}

export function useNFTApproval(tokenID: number, contractAddress: string) {
  const NFTContract = useNFTContract(contractAddress)

  const inputs = useMemo(() => [tokenID], [tokenID])
  const { result } = useSingleCallResult(NFTContract, 'getApproved', inputs)

  return useMemo(
    () => (tokenID && contractAddress && result ? result[0] : undefined),
    [tokenID, result, contractAddress],
  )
}

export function useApproveForAll(contractAddress: string, operator: string) {
  const NFTContract = useNFTContract(contractAddress)
  const { account } = useActiveWeb3React()

  const inputs = useMemo(() => [account, operator], [account, operator])
  const { result } = useSingleCallResult(NFTContract, 'isApprovedForAll', inputs)

  return useMemo(
    () => (operator && account && contractAddress && result ? result[0] : undefined),
    [result, contractAddress, operator, account],
  )
}

export async function isApproveForAllNFTs(contractAddresses: string[], operator: string, account: string) {
  const calls = contractAddresses.map((contractAddress) => ({
    address: contractAddress,
    name: 'isApprovedForAll',
    params: [account, operator],
  }))
  console.log('calls : ', calls)

  const results = await multicallv2(spaceHunterNFTAbi, calls, { requireSuccess: false })
  console.log('results : ', results)

  return results.every((result) => result)
}

export function approveForAllNFTs(contractAddresses: string[], operator: string, account: string) {
  const calls = contractAddresses.map((contractAddress) => ({
    address: contractAddress,
    name: 'setApprovalForAll',
    params: [account, operator],
  }))

  console.log('calls : ', calls)

  const results = multicallv2(spaceHunterNFTAbi, calls, { requireSuccess: false })
  console.log('results : ', results)

  return results
}

const SPACEHUNTER_INTERFACE = new Interface(spaceHunterNFTAbi)

export function useApproveForAllNFTs(contractAddresses: string[], operator: string) {
  const { account } = useActiveWeb3React()

  const results = useMultipleContractSingleData(contractAddresses, SPACEHUNTER_INTERFACE, 'isApprovedForAll', [
    account,
    operator,
  ])

  console.log(contractAddresses)
  console.log('results : ', results)

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: isApproved, loading } = result

      if (loading) return ApprovalState.PENDING
      return isApproved[0]
    })
  }, [results])
}

export default useTokenAllowance
