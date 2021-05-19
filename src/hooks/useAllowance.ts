import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useJus from './useJus'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getYieldContract } from '../Jus/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const jus = useJus()
  const yieldContract = getYieldContract(jus)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      yieldContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, yieldContract, lpContract])

  useEffect(() => {
    if (account && yieldContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, yieldContract, lpContract])

  return allowance
}

export default useAllowance
