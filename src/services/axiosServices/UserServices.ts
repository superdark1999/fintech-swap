import { useCallback } from 'react'
import useAxiosServices, { JSONToFormData } from './AxiosServices'
import {BINANCE_CONFIG}  from 'configs'

export default function useArtworkService() {
  const {LUCKY_DOMAIN_API} = BINANCE_CONFIG
  const { GET, POST, PATCH, PUT } = useAxiosServices(LUCKY_DOMAIN_API)

  const login = (body: any) => {
    return POST('/user/login', body, false, false)
  }

  const updateProfile = (body: any) => {
    return POST('/user/updateProfile', JSONToFormData(body), false, false)
  }

  const getUsers = () => {
    return GET('/user', {}, false, false)
  }

  const getUserDetail = (id: string) => {
    return GET(`/user/${id}`, {}, false, false)
  }

  return { login, updateProfile, getUsers, getUserDetail }
}
