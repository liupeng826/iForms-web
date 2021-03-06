import axios, { AxiosRequestConfig } from 'axios'
import { UserModule } from '@/store/modules/user'
import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { Config } from '@/settings'
import i18n from '@/lang'
import VueI18n from 'vue-i18n'

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
    let jwtToken = getLocalStorage(Config.jwt_token_name)
    if (jwtToken) {
      config.headers.Authorization = jwtToken
    } else {
      jwtToken = getToken()
      setLocalStorage(Config.jwt_token_name, jwtToken)
    }

    if (jwtToken) {
      config.headers.Authorization = jwtToken
    }

    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (err:any) => {
    if (err && err.request) {
      switch (err.request.status) {
        case 400: err.message = i18n.t('request.statusCode_400')
          break
        case 401: err.message = i18n.t('request.statusCode_401')
          break
        case 403: err.message = i18n.t('request.statusCode_403')
          break
        case 404: err.message = i18n.t('request.statusCode_404')
          break
        case 408: err.message = i18n.t('request.statusCode_408')
          break
        case 500: err.message = i18n.t('request.statusCode_500')
          break
        case 501: err.message = i18n.t('request.statusCode_501')
          break
        case 502: err.message = i18n.t('request.statusCode_502')
          break
        case 503: err.message = i18n.t('request.statusCode_503')
          break
        case 504: err.message = i18n.t('request.statusCode_504')
          break
        case 505: err.message = i18n.t('request.statusCode_505')
          break
        default: err.message = i18n.t('request.defaultMsg') + `(${err.response.status})!`
      }
    } else {
      err.message = i18n.t('request.connectionFailure')
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
        case 400: err.message = i18n.t('request.statusCode_400')
          break
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          UserModule.logout()
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          err.message = i18n.t('request.tokenExpiredOrWrongPassword')
          break
        case 403:
          err.message = ''
          router.replace({ path: '/403' })
          break
        case 404: err.message = i18n.t('request.statusCode_404')
          break
        case 408: err.message = i18n.t('request.statusCode_408')
          break
        case 501: err.message = i18n.t('request.statusCode_501')
          break
        case 502: err.message = i18n.t('request.statusCode_502')
          break
        case 503: err.message = i18n.t('request.statusCode_503')
          break
        case 504: err.message = i18n.t('request.statusCode_504')
          break
        case 505: err.message = i18n.t('request.statusCode_505')
          break
        default: err.message = `${err.response.data.msg}!`
      }
    } else {
      // err.message = `连接出错(${err.response.status})!`
      err.message = i18n.t('request.defaultMsg') + `(${err})!`
    }
    if (err.message !== '') {
      Message.error(err.message)
    }
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
      msg: i18n.t('request.responseParseError')
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
  },
  put<T> (url: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<IAxiosResponse<T>> {
    return service.put(url, data, {
      ...options
    })
  }
}
