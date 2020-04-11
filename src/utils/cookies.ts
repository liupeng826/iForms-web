import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)

// User
// const tokenKey = 'vue_typescript_admin_access_token'
// export const getToken = () => Cookies.get(tokenKey)
// export const setToken = (token: string) => Cookies.set(tokenKey, token)
// export const removeToken = () => Cookies.remove(tokenKey)

// Market info. "marketId + '|' + marketName": 20|China
const marketInfoKey = 'MARKET_INFO'
export const getMarketInfo = () => Cookies.get(marketInfoKey)
export const setMarketInfo = (marketInfo: string) => Cookies.set(marketInfoKey, marketInfo)
