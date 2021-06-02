import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService(){

    const {GET,POST} = useAxiosServices('https://api.luckyswap.center')

    const createNFT = useCallback((body)=>{
        return POST('/artwork',body,false, false)
    },[])

    const getNFT = useCallback(()=>{
        return POST('/artwork',{},false, false)
    },[])
    return {createNFT,getNFT}
}