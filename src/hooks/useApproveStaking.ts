import {useCallback} from 'react'

import useJus from './useJus'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getJusContract,
  getXJusStakingContract
} from '../Jus/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const jus = useJus()
  const lpContract = getJusContract(jus)
  const contract = getXJusStakingContract(jus)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
