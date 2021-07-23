import { useEffect, useState } from 'react'
import { getLotteryStatus } from 'utils/lotteryUtils'
import { useContract } from 'hooks/useContract'
import { getLotteryAddress } from 'utils/addressHelpers'
import lotteryAbi from 'config/abi/lottery.json'

/**
 * Returns whether or not the current lottery has drawn numbers
 *
 * @return {Boolean}
 */
const useGetLotteryHasDrawn = () => {
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
  }, [lotteryContract])

  return lotteryHasDrawn
}

export default useGetLotteryHasDrawn
