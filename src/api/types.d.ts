export interface IApiNaireSourceData {
  total: number,
  result: {
    naire: Questionnaire.INaire,
    question: IApiQuestionItem[],
    user_result: any[]
  }
}

// 结果统计，附加内容和文本题目答案
type AnswerItem = {
  userNumber: string
  userName: string
  content: string
}

export interface IApiQuestionItem {
  q_id: number,
  q_content: string,
  type: string,
  answerList: AnswerItem[]
}

// 问卷格式
export interface IApiNaireItem {
  id: string,
  supperId: string,
  createdDate: string,
  deadline: string,
  title: string,
  isActive: boolean,
  publishStatus: string,
  description: string,
  n_options: string,
  n_id: string
}

// 结果通统计
export interface IApiNaireStatisticResult {
  naire: Questionnaire.INaire,
  questions: IApiQuestionItem[]
}

// 结果统计
export interface IApiAnswerStatisticResult {
  form: Questionnaire.IForm[],
  answer: Questionnaire.IAnswer[]
}

// 用户信息
export interface IApiUserInfo {
  u_id: string,
  name: string,
  isFinished: boolean
}

// 部门列表
export interface IApiClassItem {
  u_class: string
}
