import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useIfoContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useWeb3React } from '@web3-react/core'
import { useHookIFOs } from '../views/Launchpad/Store'

import { useBlockNumber } from '../state/application/hooks'

export interface PublicIfoState {
  status: IfoStatus
  blocksRemaining: number
  secondsUntilStart: number
  progress: number
  secondsUntilEnd: number
  raisingAmount: BigNumber
  offeringAmount: BigNumber
  totalAmount: BigNumber
  maxDepositAmount: BigNumber
  depositedAmount: BigNumber
  claimAmount: BigNumber
  hasHarvest: boolean,
  getAddressListLength: number
  startBlockNum: number
  endBlockNum: number
  description?: string

}

const getStatus = (currentBlock: number, startBlock: number, endBlock: number): IfoStatus => {
  if (currentBlock < startBlock || currentBlock === 0) {
    return 'coming_soon'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock > endBlock) {
    return 'finished'
  }

  return 'coming_soon'
}

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo) => {
  const [stateIFO, actionsIFO] = useHookIFOs()
  const { address, releaseBlockNumber } = ifo
  const [state, setState] = useState<PublicIfoState>({
    status: 'coming_soon',
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    offeringAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    maxDepositAmount: new BigNumber(0),
    depositedAmount: new BigNumber(0),
    claimAmount: new BigNumber(0),
    hasHarvest: false,
    getAddressListLength: 0,
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { account } = useWeb3React()

  const currentBlock = useBlockNumber()
  const contract = useIfoContract(address)

  useEffect(() => {
    const fetchProgress = async () => {
      if (!account || address === '0x0000000000000000000000000000000000000000') return
      
      const [
        startBlock,
        endBlock,
        raisingAmount,
        offeringAmount,
        maxDepositAmount,
        claimAmount,
        depositedAmount,
        totalAmount,
        getAddressListLength,
        hasHarvest,
      ] = (await makeBatchRequest([
        contract.methods.startBlock().call,
        contract.methods.endBlock().call,
        contract.methods.raisingAmount().call,
        contract.methods.offeringAmount().call,
        contract.methods.maxTokenForCommunityUser().call,
        contract.methods.getOfferingAmount(account).call,
        contract.methods.userInfo(account).call,
        contract.methods.totalAmount().call,
        contract.methods.getAddressListLength().call,
        contract.methods.hasHarvest(account).call,
      ])) as [string, string, string, string, string, string, string, string, string, boolean]

      console.log("hasHarvest", hasHarvest)
      const startBlockNum = parseInt(startBlock, 10)
      const endBlockNum = parseInt(endBlock, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const totalBlocks = endBlockNum - startBlockNum
      const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100
      actionsIFO.updateStatusLaunchPad(ifo && ifo.id, status)

      setState({
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        raisingAmount: new BigNumber(raisingAmount),
        offeringAmount: new BigNumber(offeringAmount),
        totalAmount: new BigNumber(totalAmount),
        maxDepositAmount: new BigNumber(maxDepositAmount),
        depositedAmount: new BigNumber(depositedAmount[0]),
        claimAmount: new BigNumber(claimAmount),
        hasHarvest,
        getAddressListLength: parseInt(getAddressListLength),
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
      })
    }

    fetchProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, currentBlock, contract, releaseBlockNumber, setState, account])

  return state
}

export default useGetPublicIfoData
