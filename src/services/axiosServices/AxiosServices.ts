import axios, { Method } from 'axios'
import { useCallback } from 'react'
import _ from 'lodash'
import useConfigStore  from 'store/configStore'
const qs = require('qs')


export default function AxiosServices(baseUrl: string = '') {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    //'Access-Control-Allow-Origin': '*',
  }
  const [configState,configAction] = useConfigStore()

  function fetch(
    url: string,
    method: Method,
    data: object,
    isQuery: boolean,
    showLoading: boolean,
    showError: boolean,
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
      timeout: 30 * 1000,
      credentials: 'same-origin',
      origin: '*',
    }

    if (data) {
      if (data instanceof FormData) {
        Object.assign(options, {
          data: data,
          headers: { ...headers, 'Content-Type': 'multipart/form-data' },
        })
      } else {
        Object.assign(options, { data: JSON.stringify(data) })
      }
    }

    if (showLoading) {
      configAction.updateConfig({showLoading: true})
    }
    if (showError) {
      //Show error
    }
    return axios(options)
  }
  const GET = useCallback(
    (route, query, showLoading = false, showError = false) => {
      return fetch(route, 'GET', query, true, showLoading, showError)
    },
    [],
  )

  const POST = useCallback(
    (route, body, showLoading = false, showError = false) => {
      return fetch(route, 'POST', body, false, showLoading, showError)
    },
    [],
  )

  const PUT = useCallback(
    (route, body, showLoading = false, showError = false) => {
      return fetch(route, 'PUT', body, false, showLoading, showError)
    },
    [],
  )

  const PATCH = useCallback(
    (route, body, showLoading = false, showError = false) => {
      return fetch(route, 'PATCH', body, false, showLoading, showError)
    },
    [],
  )

  const DELETE = useCallback(
    (route, query, showLoading = false, showError = false) => {
      return fetch(route, 'DELETE', query, true, showLoading, showError)
    },
    [],
  )

  return { GET, POST, PUT, DELETE, PATCH }
}

export const JSONToFormData = (jsonData: any): FormData => {
  const form_data = new FormData()

  for (var key in jsonData) {
    form_data.append(key, jsonData[key])
  }
  return form_data
}
