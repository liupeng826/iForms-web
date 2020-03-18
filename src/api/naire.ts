import request from '@/utils/request'
import qs from 'qs'
import { IApiNaireSourceData, IApiAnswerStatisticResult, IApiNaireItem } from './types'
import { Config } from '@/settings'

/**
 * 问卷列表
 */
export const list = () => {
  const data = {
    client: {
      name: Config.token_description,
      token: Config.token
    },
    supperId: ''
  }
  return request.post<IApiNaireItem[]>('/api/v1/form/getFormsByLevel', data)
}

/**
 * 创建问卷
 * @param data
 */
export const create = (data: {
  naire: Questionnaire.INaire,
  status: string
}) => {
  return request.post<any>('/api/v1/naire/save', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 问卷统计
 * @param data
 */
export const statis = (data: {
    client: {
       id: number,
       name: string,
       token: string,
       isActive: number
    },
    dealerId: string,
    formId: number,
    from: number,
    marketId: string,
    month: number,
    to: number
}) => {
  return request.post<IApiAnswerStatisticResult>('/api/v1/form/AnswerOptionsStatistics', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 问卷统计
 * @param data
 */
export const statis2 = (data: {
  client: {
     id: number,
     name: string,
     token: string,
     isActive: number
  },
  dealerId: string,
  formId: number,
  from: number,
  marketId: string,
  month: number,
  to: number
}) => {
  return request.post<IApiAnswerStatisticResult>('/api/v1/form/AnswerStatistics', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 样本数据
 * @param data
 */

export const sourceData = (data: {
  n_id: string
  current: number,
    page_size: number
}) => {
  return request.get<IApiNaireSourceData>('/api/v1/naire/sourcedata', data)
}

/**
 * 交叉分析
 * @param data
 */

export const crossanalysis = (data: {
  n_id: string
  x_id: number | string,
  y_id: number | string
}) => {
  return request.post<any>('/naire/crossanalysis', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 交叉分析
 * @param data
 */
export const questions = (data: {
  id: string
}) => {
  return request.post<any>('/naire/questions', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 问卷详情
 * @param data
 */
export const detail = (params:{superFormId: string}) => {
  return request.get<any>('api/v1/form', params)
}

/**
 * 提交问卷
 * @param data
 */
export const submit = (data: {
  nId: string,
  result: any,
  userId: string
}) => {
  return request.post<any>('/naire/submit', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 发布/停止发布
 * @param data
 */
export const changeStatus = (data: {
  id: string
}) => {
  return request.get<any>('/naire/changeStatus', data)
}

/**
 * 回收情况
 * @param data
 */
export const submitStatistic = (data: {
  id: string,
  current: number,
  page_size: number,
  status: number,
  u_class:string
}) => {
  return request.get<any>('/naire/submitStatis', data)
}

/**
 * 修改截止时间
 * @param data
 */
export const changeTime = (data: {
  id: string
  deadline: number
}) => {
  return request.post<any>('/naire/changeTime', data)
}

/**
 * 删除问卷
 * @param data
 */
export const del = (data: {
  id: string
}) => {
  return request.get<any>('/naire/del', data)
}
