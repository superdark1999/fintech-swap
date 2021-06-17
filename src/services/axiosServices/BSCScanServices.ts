import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'
import { useActiveWeb3React } from 'wallet/hooks'

const API_KEY = "9BW1366J85PCMTKSUX9BBKSCG4JQJ9HWUZ"
export default function useArtworkService(){
    const { chainId} = useActiveWeb3React()
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

    const getBNBBalance = (address: string)=>{
        const query = {
            module:'account',
            action:'balance',
            address:address,
            tag:'latest',
            apikey:'9BW1366J85PCMTKSUX9BBKSCG4JQJ9HWUZ'
        }
        return GET(`/api`,query, false, false)
    } 

    return {getTransactionInfo, getBNBBalance}
}