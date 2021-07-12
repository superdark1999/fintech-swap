import axios, { Method } from 'axios'
import { useCallback } from 'react'
import _ from 'lodash'
import useConfigStore from 'store/configStore'
const qs = require('qs')

export default function AxiosServices(baseUrl: string = '') {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    //'Access-Control-Allow-Origin': '*',
  }
  const [configState, configAction] = useConfigStore()

  function fetch(
    url: string,
    method: Method,
    data: object,
    isQuery: boolean,
    showLoading: boolean,
    showError: boolean,
    onUploadProcess:any,
  ) {
    let route = `${baseUrl}${url}`
    if (isQuery && !_.isEmpty(data)) {
      const query = qs.stringify(data)
      route = `${route}?${query}`
      data = undefined
    }

    let options = {
      method,
      url: route,
      headers: headers,
      timeout: 60 * 1000,
      credentials: 'same-origin',
      origin: '*',
      onUploadProgress:()=>{}
    }

    if (data) {
      if (data instanceof FormData) {
        options.onUploadProgress = onUploadProcess
        options.timeout = 10 * 60 * 1000;
        Object.assign(options, {
          data: data,
          headers: { ...headers,
             'Content-Type': 'multipart/form-data' 
          },
        })
      } else {
        Object.assign(options, { data: JSON.stringify(data) })
      }
    }

    if (showLoading) {
      configAction.updateConfig({ showLoading: true })
    }
    if (showError) {
      //Show error
    }
    return axios(options)
  }
  const GET = useCallback(
    (route, query, showLoading = false, showError = false) => {
      return fetch(route, 'GET', query, true, showLoading, showError,()=>{})
    },
    [],
  )

  const POST = useCallback(
    (route, body, showLoading = false, showError = false,onUploadProcess = ()=>{}) => {
      return fetch(route, 'POST', body, false, showLoading, showError, onUploadProcess)
    },
    [],
  )

  const PUT = useCallback(
    (route, body, showLoading = false, showError = false) => {
      return fetch(route, 'PUT', body, false, showLoading, showError,()=>{})
    },
    [],
  )

  const PATCH = useCallback(
    (route, body, showLoading = false, showError = false) => {
      return fetch(route, 'PATCH', body, false, showLoading, showError,()=>{})
    },
    [],
  )

  const DELETE = useCallback(
    (route, query, showLoading = false, showError = false) => {
      return fetch(route, 'DELETE', query, true, showLoading, showError,()=>{})
    },
    [],
  )

  return { GET, POST, PUT, DELETE, PATCH }
}

function buildFormData(formData: FormData, data: any, parentKey?: any) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key,
      )
    })
  } else {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }
}

export const JSONToFormData = (jsonData: any): FormData => {
  const form_data = new FormData()
  buildFormData(form_data, jsonData)

  return form_data
}
