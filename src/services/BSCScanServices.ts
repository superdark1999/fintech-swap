import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

const API_KEY = "9BW1366J85PCMTKSUX9BBKSCG4JQJ9HWUZ"
export default function useArtworkService(){

    const {GET} = useAxiosServices('https://api-testnet.bscscan.com')

    const getTransactionInfo = useCallback((txhash)=>{
        const body = {
            module:'transaction',
            action: 'gettxreceiptstatus',
            txhash,
            apikey:API_KEY
        }
        return GET('/api',body,false, false)
    },[])

    return {getTransactionInfo}
}