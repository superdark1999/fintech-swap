import { useEffect, useState } from 'react'
import { setSpaceHunterCollection } from 'state/collection'
import { useActiveWeb3React } from './index'
import { useFarmNFTContract } from './useContract'
import { BoostedNFT } from '../config/constants/types'
import { useMySpaceHunterCollection } from '../state/hooks'
import { findNFT, foundNFT } from '../utils/array'
import { useAppDispatch } from '../state/index'
import { useSpaceHunterCollection } from './useCollection'

export const useNFTsBoosted = (pid: number) => {
  const { account } = useActiveWeb3React()
  const farmContract = useFarmNFTContract()
  const mySpaceHunterCollection = useSpaceHunterCollection()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchNftsUseToBoost = async () => {
      let nfts: BoostedNFT[] = await farmContract.getUserNftsBoosted(pid, account)

      nfts = nfts.map((item) => {
        const formattedTokenId = parseInt((item as any).tokenId.toString())
        return {
          ...item,
          tokenID: formattedTokenId,
        }
      })

      dispatch(
        setSpaceHunterCollection(
          mySpaceHunterCollection.map((item) => {
            if (foundNFT(nfts, item.contractAddress, item.tokenID)) {
              return {
                ...item,
                isUsingToBoost: true,
              }
            }
            return { ...item, isUsingToBoost: false }
          }),
        ),
      )
    }

    fetchNftsUseToBoost()
  }, [farmContract, account, pid, mySpaceHunterCollection, dispatch])
}

export const useTotalBonus = (pid: number) => {
  const farmContract = useFarmNFTContract()
  const { account } = useActiveWeb3React()

  const [totalBonus, setTotalBonus] = useState(0)
  useEffect(() => {
    farmContract.totalBoostedPercent(pid, account).then((response) => {
      setTotalBonus(response.toString())
    })
  }, [farmContract, pid, account])
  return [totalBonus, setTotalBonus]
}
