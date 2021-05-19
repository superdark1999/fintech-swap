import { useCallback } from 'react'

import useJus from './useJus'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getStakingContract } from '../Jus/utils'

const useApproveErc20 = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const jus = useJus()
  const masterChefContract = getStakingContract(jus)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApproveErc20
