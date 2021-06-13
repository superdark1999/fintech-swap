import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService() {
  const { GET, POST, PATCH, PUT } = useAxiosServices(
    'https://api.luckyswap.center',
  )

  const createNFT = useCallback((body) => {
    return POST('/artwork', body, false, false)
  }, [])

  const updateHashInfoNFT = useCallback(({ NFTid, txHash }) => {
    console.log()
    return PUT(`/artwork/${NFTid}/hash`, { TXHash: txHash }, false, false)
  }, [])

  const getNFT = useCallback((query) => {
    return GET('/artwork', query, false, false)
  }, [])

  const getDetailNFT = (query: any) => {
    const id = query?.id
    return GET(`/artwork/${id}`, {}, false, false)
  }

  const updateNFTInfo = (data: any) => {
    const id = data?.id
    delete data.id
    return PATCH(`/artwork/${id}`, data, false, false)
  }

  const setPrice = (body: any) => {
    return POST(`/artwork/set-price`, body, false, false)
  }

  const buyItem = (body: any) => {
    return POST('/artwork/buy', body, false, false)
  }

  return {
    createNFT,
    getNFT,
    updateHashInfoNFT,
    getDetailNFT,
    updateNFTInfo,
    setPrice,
    buyItem,
  }
}
