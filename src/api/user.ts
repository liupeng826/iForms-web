import request from '@/utils/request'
import { IApiUserInfo, IApiClassItem } from '@/api/types'

/**
 * 查找用户
 * @param data
 */
export const getId = (data: {
  n_id: string,
  name: string,
  identity: string
}) => {
  return request.post<IApiUserInfo>('/user/getId', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 添加用户
 * @param data
 */
export const addUser = (data: {
  userId: string,
  userName: string,
  sex: string,
  email: string,
  phone: string
}) => {
  return request.post<any>('/api/v1/user/addUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 添加用户
 * @param data
 */
export const updateUser = (data: {
  userId: string,
  userName: string,
  sex: string,
  email: string,
  phone: string
}) => {
  return request.post<any>('/api/v1/user/updateUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 获取部门信息
 */
export const getClass = () => {
  return request.get<IApiClassItem[]>('/api/v1/user/getClass')
}

/**
 * 用户列表
 * @param data
 */
export const list = (criteria: {
  blurry: string
}, page: {
  page: number,
  size: number
}) => {
  return request.get<any>('/api/v1/users', criteria, page)
}

/**
 * 删除用户
 * @param data
 */
export const del = (data: {
  u_id: string
}) => {
  return request.post<any>('/api/v1/user/del', data)
}

/**
 * 清空用户
 */
export const clear = () => {
  return request.post<any>('/api/v1/user/clear')
}
