import { useEffect, useState } from 'react'
import { getLotteryStatus } from 'utils/lotteryUtils'
import { useContract } from 'hooks/useContract'
import { getLotteryAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'
import useRefresh from 'hooks/useRefresh'


/**
 * Returns whether or not the current lottery has drawn numbers
 *
 * @return {Boolean}
 */
const useGetLotteryHasDrawn = () => {
  const { fastRefresh } = useRefresh()

  const [lotteryHasDrawn, setLotteryHasDrawn] = useState(true)
  const lotteryContract = useContract(getLotteryAddress(), lotteryAbi)

  useEffect(() => {
    if (lotteryContract) {
      const fetchLotteryStatus = async () => {
        const state = await getLotteryStatus(lotteryContract)
        setLotteryHasDrawn(state)
      }

      fetchLotteryStatus()
    }
  }, [lotteryContract, fastRefresh])

  return lotteryHasDrawn
}

export default useGetLotteryHasDrawn
