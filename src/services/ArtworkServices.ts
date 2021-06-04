import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService(){

    const {GET,POST, PATCH, PUT} = useAxiosServices('https://api.luckyswap.center')

    const createNFT = useCallback((body)=>{
        return POST('/artwork',body,false, false)
    },[])

    const updateHashInfoNFT = useCallback(({NFTid, txHash})=>{
        return PUT(`/artwork/${NFTid}/hash`,{TXHash:txHash},false, false)
    },[])

    const getNFT = useCallback((query)=>{
        return GET('/artwork',query,false, false)
    },[])

    return {createNFT,getNFT,updateHashInfoNFT}
}