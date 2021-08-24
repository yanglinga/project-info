import axios from 'axios'
import { message } from 'antd'
import { stringify } from 'qs'
import RequestStore from './store'

const fetch = axios.create({
    baseURL: window.appConfig.baseUrl,
    timeout: 1000000,
    transformRequest: [
        data => {
            return stringify(data)
        },
    ],
})

// 请求拦截
fetch.interceptors.request.use(
    config => {
        config.cancelToken = new axios.CancelToken(cancel => {
            RequestStore.add(cancel)
            if (config.url === 'feature') {
                RequestStore.featureAdd(cancel)
            }
        })
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// 响应拦截
fetch.interceptors.response.use(
    data => {
        const res = data.data
        if (
            res[0] &&
            res[0].code &&
            res[0].code >= 300 &&
            res[0].code < 400 &&
            res[0].code !== 306
        ) {
            const { pathname } = history.location
            if (!pathname.includes('login')) {
                setPrevLocation(pathname)
                setPrevUrlParams(getUrlParams())
            }
            RequestStore.cancel()
            skipPage('/login')
            return Promise.reject(res)
        }
        if (res[0] && res[0].code && res[0].code === 306) {
            message.error('本角色暂无此项操作权限!')
            RequestStore.cancel()
            return Promise.reject(res)
        }
        if (JSON.stringify(res).includes('[{failed}]')) {
            return Promise.reject(res)
        }
        return data.data
    },
    error => {
        if (!axios.isCancel(error)) {
            if (error.response) {
                if (error.response.status === 500) {
                    message.error('服务器错误，请联系管理员处理')
                }
                return Promise.reject(error.response.data)
            }

            return Promise.reject(error)
        }
        return error
    }
)

export default fetch
