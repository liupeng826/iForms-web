import request from '@/utils/request'
import { IApiAnswerStatisticResult } from './types'
import { Config } from '@/settings'
import * as Constants from '@/constants/default'

/**
 * 问卷列表
 */
export const list = () => {
  const data = {
    client: Constants.client,
    supperId: '',
    includeInActiveForm: true
  }
  return request.post<Questionnaire.IForm[]>('/api/v1/form/getFormsByLevel', data)
}

/**
 * 创建问卷
 * @param data
 */
export const create = (form: Questionnaire.IForm) => {
  return request.post<any>('/api/v1/form', form, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 更新问卷
 * @param data
 */
export const update = (form: Questionnaire.IForm) => {
  return request.put<any>('/api/v1/form', form, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 发布问卷
 * @param data
 */
export const publish = (data: {
  superFormId?: string | number
}) => {
  return request.put<any>('/api/v1/form/formStatus/' + data.superFormId, {}, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * View Form
 * @param data
 */
export const view = (data : { superFormId: string, includeInActiveForm: boolean}) => {
  return request.get<any>('/api/v1/form', data, {
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
    superFormId: string,
    from?: number,
    marketId: string,
    month: string,
    to?: number
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
  formId: string,
  from?: number,
  marketId: string,
  month: string,
  to?: number
}) => {
  return request.post<IApiAnswerStatisticResult>('/api/v1/form/AnswerStatistics', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * Get all active markets
 * @param data
 */
export const markets = () => {
  return request.get<any>('/api/v1/market/allActive', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * Get all active dealers by marketId
 * @param data
 */
export const dealers = (data: {
  marketId: string,
  isActive: number
}) => {
  return request.get<any>('/api/v1/dept', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * Get all forms by marketId & dealerId
 * @param data
 */
export const forms = (marketId: string, dealerId: string) => {
  var data = {
    client: Constants.client,
    marketId: marketId,
    deptId: dealerId,
    answerId: '',
    superFormId: ''
  }
  return request.post<any>('/api/v1/form/getFormsByLevel', data, {
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
  return request.get<IApiFormSourceData>('/api/v1/form/sourcedata', data)
}

/**
 * 问卷详情
 * @param data
 */
export const detail = (params:{superFormId: string, includeInActiveForm: boolean}) => {
  return request.get<any>('api/v1/form', params)
}

/**
 * 回答详情
 * @param data
 */
export const viewAnswer = ( params:{ answerId: string }) => {
  return request.get<any>('/api/v1/form/answersWithForm', params)
}

/**
 * 获取语言列表
 * @param data
 */
export const loadLanguages = () => {
  return request.get<any>('/api/v1/form/language')
}
