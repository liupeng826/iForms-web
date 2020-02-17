import request from '@/utils/request'
import qs from 'querystring'
import { encrypt } from '@/utils/rsaEncrypt'

export interface IToken {
  token: string
}

export interface ICode {
  img: string
  uuid: string
}

export const getCodeImg = () => {
  return request.get<any>('auth/code')
}

export function login (data: {
  username: string,
  password: string
}) {
  // const params = qs.stringify({
  //   ...data
  // })
  data.password = encrypt(data.password)
  return request.post<IToken>('/auth/login', data)
}

export function changePwd (data: {
  oldpwd: string
  newpwd: string
}) {
  return request.post<any>('/auth/changepwd', data)
}
