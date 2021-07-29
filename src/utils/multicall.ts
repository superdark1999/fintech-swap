import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3NoAccount } from 'utils/web3'
import MultiCallAbi from 'config/abi/Multicall.json'
import { getMulticallAddress } from 'utils/addressHelpers'
import { getMulticallContract } from 'utils/contractHelpers'
import { MultiCallResponse } from './types'
import { getChainId } from './web3React'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}
const multicall = async (abi: any[], calls: Call[]) => {
  const chainId = await getChainId()
  const web3 = getWeb3NoAccount(chainId)
  const multi = new web3.eth.Contract(MultiCallAbi as unknown as AbiItem, getMulticallAddress())
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res
}

export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options
  const multi = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall
