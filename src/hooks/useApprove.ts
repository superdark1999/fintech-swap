import { useCallback } from 'react'

import useJus from './useJus'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getYieldContract } from '../Jus/utils'
import { useActiveWeb3React } from '../wallet/hooks'

const useApprove = (lpContract: Contract) => {
  const { account } = useActiveWeb3React()
  const jus = useJus()
  const masterChefContract = getYieldContract(jus)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      console.log('êrererer',e)
      return false
    }
  }, [account, lpContract])

  return { onApprove: handleApprove }
}

export default useApprove
