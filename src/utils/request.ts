import axios, { AxiosRequestConfig } from 'axios'
import { UserModule } from '@/store/modules/user'
import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import { getLocalStorage } from '@/utils/storage'
import { Config } from '@/settings'

type IAxiosResponse<T> = Request.IAxiosResponse<T>

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: Config.timeout
  // withCredentials: true // send cookies when cross-domain requests
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    const jwtToken = getLocalStorage(Config.jwt_token_name)
    if (jwtToken) {
      config.headers.Authorization = jwtToken
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (err:any) => {
    if (err && err.request) {
      switch (err.request.status) {
        case 400: err.message = '请求错误(400)'
          break
        case 401: err.message = '身份认证信息已过期，请重新登录!'
          break
        case 403: err.message = '拒绝访问(403)'
          break
        case 404: err.message = '请求出错(404)'
          break
        case 408: err.message = '请求超时(408)'
          break
        case 500: err.message = '服务器错误(500)'
          break
        case 501: err.message = '服务未实现(501)'
          break
        case 502: err.message = '网络错误(502)'
          break
        case 503: err.message = '服务不可用(503)'
          break
        case 504: err.message = '网络超时(504)'
          break
        case 505: err.message = 'HTTP版本不受支持(505)'
          break
        default: err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    Message.error(err.message)
    console.log(err) // for debug
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'
          break
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          UserModule.logout()
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          Message.error('Token 失效，请重新登录。')
          break
        case 403: err.message = '拒绝访问(403)'
          break
        case 404: err.message = '请求出错(404)'
          break
        case 408: err.message = '请求超时(408)'
          break
        case 501: err.message = '服务未实现(501)'
          break
        case 502: err.message = '网络错误(502)'
          break
        case 503: err.message = '服务不可用(503)'
          break
        case 504: err.message = '网络超时(504)'
          break
        case 505: err.message = 'HTTP版本不受支持(505)'
          break
        default: err.message = `${err.response.data.msg}!`
      }
    } else {
      // err.message = `连接出错(${err.response.status})!`
      err.message = `连接出错(${err})!`
    }
    Message.error(err.message)
    return Promise.reject(err) // 返回接口返回的错误信息
  })

service.defaults.transformResponse = (response) => {
  try {
    const res = JSON.parse(response)
    // console.log(res)
    if (res.code === 0 || res.code === '0') {
      return {
        success: true,
        data: res.data || '', // login 接口返回 data: {token:"", message: ""}
        msg: res.message || ''
      }
    } else {
      return {
        success: false,
        data: res.data || '',
        msg: res.message || ''
      }
    }
  } catch (e) {
    return {
      success: false,
      msg: '接口返回格式有误，请重试。'
    }
  }
}

export default {
  // T 表示API返回的 类型声明
  get<T> (url: string, params: any = {}, options: AxiosRequestConfig = {}): Promise<IAxiosResponse<T>> {
    return service.get(url, {
      ...options,
      params
    })
  },
  post<T> (url: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<IAxiosResponse<T>> {
    return service.post(url, data, {
      ...options
    })
  }
}
