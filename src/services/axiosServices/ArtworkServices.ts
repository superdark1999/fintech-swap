import { useCallback } from 'react'
import useAxiosServices, { JSONToFormData } from './AxiosServices'

export default function useArtworkService() {
  const { GET, POST, PATCH, PUT } = useAxiosServices(
    'https://api.luckyswap.center',
  )
  const createNFT = useCallback((body) => {
    const onUploadProcess = body.onUploadProcess
    delete body.onUploadProcess
    return POST('/artwork', JSONToFormData(body), false, false,onUploadProcess)
  }, [])

  const updateHashInfoNFT = useCallback(({ NFTid, txHash }) => {
    return PUT(`/artwork/${NFTid}/hash`, { TXHash: txHash }, false, false)
  }, [])

  const getNFT = useCallback((query, showLoading:boolean|undefined=false) => {
    return GET('/artwork', query, showLoading, false)
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

  const cancelSellNFT = (data: any)=>{
    const id = data?.id
    return POST(`/artwork/${id}/cancel-sell`, {}, false, false)
  }

  return {
    createNFT,
    getNFT,
    updateHashInfoNFT,
    getDetailNFT,
    updateNFTInfo,
    setPrice,
    buyItem,
    cancelSellNFT
  }
}
