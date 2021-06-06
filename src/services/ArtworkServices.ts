import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService(){

    const {GET,POST, PATCH, PUT} = useAxiosServices('https://api.luckyswap.center')

    const createNFT = useCallback((body)=>{
        return POST('/artwork',body,false, false)
    },[])

    const updateHashInfoNFT = useCallback(({id, txHash})=>{
        return PUT(`/artwork/${id}/hash`,{TXHash:txHash},false, false)
    },[])

    const getNFT = useCallback((query)=>{
        return GET('/artwork',query,false, false)
    },[])

    const getDetailNFT = (query:any)=>{
        const id = query?.id
        return GET(`/artwork/${id}`,{},false, false)
    }

    const updateNFTInfo = (data:any)=>{
        const id = data?.id;
        delete data.id
        return PATCH(`/artwork/${id}`,data,false, false)
    }

    return {createNFT,getNFT,updateHashInfoNFT,getDetailNFT,updateNFTInfo}
}