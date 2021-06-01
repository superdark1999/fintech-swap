import axios,{Method} from 'axios';
import { useCallback } from 'react';

const qs = require('qs');
axios.interceptors.request.use(async (config) => {
    if (config && config.headers) {
        config.headers['Accept-Language'] = 'en-EN';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default function AxiosServices(baseUrl:string=''){
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    };

    function fetch(url:string, method:Method, data:object, isQuery:boolean, showLoading:boolean, showError:boolean){
        let route = `${baseUrl}${url}`;
        if (isQuery && data) {
            const query = qs.stringify(data);
            route = `${route}?${query}`;
            data = undefined;
        }

        let options = {
            method,
            url: route,
            headers: headers,
            timeout: 30 * 1000
        };

        if (showLoading) {
            //Show loading full screen
        }
        if (showError) {
            //Show error
        }
        return axios(options);
    }
    const GET = useCallback((route, query, showLoading = false, showError = false)=>{
        return fetch(route, 'GET', query, true, showLoading, showError);
    },[])

    const POST = useCallback((route, body, showLoading = false, showError = false)=>{
        return fetch(route, 'POST', body, false, showLoading, showError);
    },[])

    const PUT = useCallback((route, body, showLoading = false, showError = false)=>{
        return fetch(route, 'PUT', body, false, showLoading, showError);
    },[])

    const DELETE = useCallback((route, query, showLoading = false, showError = false)=>{
        return fetch(route, 'DELETE', query, true, showLoading, showError);
    },[])

    return {GET, POST, PUT, DELETE}
}