import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService(){

    const {GET,POST, PATCH} = useAxiosServices('https://api.luckyswap.center')

    const createNFT = useCallback((body)=>{
        return POST('/artwork',body,false, false)
    },[])

    const updateHashInfoNFT = useCallback(({NFTid, txHash})=>{
        return PATCH(`/artwork/${NFTid}`,{TXHash:txHash},false, false)
    },[])

    const getNFT = useCallback(()=>{
        return GET('/artwork',{},false, false)
    },[])
    return {createNFT,getNFT,updateHashInfoNFT}
}