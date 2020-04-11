
// 结果统计
// export interface IApiAnswerStatisticResult {
//   form: Form.IForm[],
//   answers: Form.IAnswer[]
// }

/* IApiAnswerStatisticResult */
export interface IApiAnswerStatisticResult {
  code: string;
  message: string;
  data: Form.IOptionCount[];
  // answers: Form.IAnswer[];
  // optionCounts: Form.IOptionCount[];
}

export interface IApiMarket {
  id: string,
  name: string,
  isActive: number
}

/* */
export interface IApiSubmittingStatisticResult {
  code: string;
  message: string;
  data: Form.IMonthlyCount[];
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
