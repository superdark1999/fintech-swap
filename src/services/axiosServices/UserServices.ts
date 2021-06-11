import { useCallback } from 'react'
import useAxiosServices from './AxiosServices'

export default function useArtworkService(){

    const {GET,POST, PATCH, PUT} = useAxiosServices('https://api.luckyswap.center')

    const login = (body:any)=>{
        return POST('/user/login',body,false, false)
    }

    const updateProfile = (body:any)=>{
        return POST('/user/updateProfile',body, false, false)
    } 


    return {login,updateProfile}
}