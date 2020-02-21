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
  data.password = encrypt(data.password)
  return request.post<IToken>('/auth/login', data)
}

export function changePwd (data: {
  oldPass: string
  newPass: string
}) {
  data.oldPass = encrypt(data.oldPass)
  data.newPass = encrypt(data.newPass)
  return request.post<any>('/api/users/updatePass', data)
}
