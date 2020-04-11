import { Config } from '@/settings'

const timeStamp = new Date().getTime()

// 默认问卷数据
export const defaultFormData = {
  title: '',
  intro: '',
  deadline: 0,
  status: 0,
  options: '',
  topic: []
}

// 默认用户数据
export const defaultUserData = {
  id: 0,
  username: '',
  nickName: '',
  sex: 0,
  role: 0,
  email: '',
  phone: '',
  job: '',
  enabled: true,
  createDate: timeStamp,
  client: {
    id: 0,
    name: '',
    token: '',
    isActive: ''
  },
  dept: {
    id: '',
    name: '',
    market: {
      id: '',
      name: '',
      isActive: 0
    },
    marketId: '',
    contactNo: '',
    email: '',
    address: '',
    isActive: 0,
    createdBy: '',
    createdDate: timeStamp,
    modifiedBy: '',
    modifiedDate: timeStamp
  }
}

export const defaultDeptData = {
  id: '',
  deptId: '',
  name: '',
  email: '',
  contactNo: '',
  address: '',
  isActive: ''
}

export const client = {
  name: Config.token_description,
  token: Config.token
}

