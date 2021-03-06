declare namespace Form {

  export type QuestionType = '单选' | '多选' | '文本' | '评分' | '净推荐值' | '日期'
  export type QuestionTypeId = 1 | 2 | 3 | 4 | 5 | 6

  export interface ICustomer {
    id: number,
    name: string,
    email?: string,
    contactNo?: string
  }

  /* Data */
  export interface IForm {
    superFormId: string,
    id: number,
    title: string,
    description: string,
    level: string,
    marketId: string,
    deptId: string,
    client?: string,
    sendEmail: number,
    type: string,
    isActive: number,
    publishStatus: number,
    createdBy: string,
    createdDate: number,
    modifiedBy: string,
    modifiedDate: number,
    language: string,
    languageDescription: string,
    deadline?: string,
    includeSection: number,
    sections: ISection[],
    answers: IAnswer[],
  }

  /* Sections */
  export interface ISection {
    id: number,
    formId: number,
    title?: string,
    description?: string,
    sequence?: number,
    isActive?: number,
    questions?: IQuestion[],
  }

  /* QuestionOptions */
  export interface IQuestionOption {
    id: number,
    questionId: number,
    description: string,
    sequence: number,
    totalValue: number,
    netPromoterFrom?: string,
    netPromoterTo?: string,
    language?: string,
    isActive: number,
    image: string,
  }

  /* Questions */
  export interface IQuestion {
    id: number,
    sectionId: number,
    title: string,
    subtitle: string,
    questionTypeId: number,
    isActive: number,
    createdBy?: string,
    createdDate?: string,
    modifiedBy?: string,
    modifiedDate?: string,
    language?: string,
    mandatory: number,
    sequence: number,
    questionOptions: IQuestionOption[],
    setting: IQuestionSetting,
  }

  /* Answers */
  export interface IAnswer {
    answerId: string,
    id: number,
    formId: number,
    questionId: number,
    answerDescription?: string,
    answerOptionId: number,
    answerValue?: string,
    totalValue?: string,
    reference?: string,
    createdBy?: string,
    createdDate?: string,
    modifiedBy?: string,
    modifiedDate?: string,
    customerId?: number,
    customer?: string,
    language?: string,
  }

  export interface IOptionCount {
    questionTitle: string,
    optionQuestionId: number,
    questionTypeId: number,
    optionDescription?: string,
    answerValue?: number,
    totalNumber: number,
    netPromoterFrom?: string,
    netPromoterTo?: string,
  }

  export interface IQuestionAnswer {
    questionId: number,
    questionTypeId: number,
    optionDescriptions: string[],
    totalNumber: number[],
  }

  export interface IMonthlyCount {
    superFormId: string,
    formTitle: string,
    optionQuestionId?: number,
    questionTypeId?: number,
    optionDescription?: string,
    answerValue?: string,
    totalNumber: number,
    netPromoterFrom?: null,
    netPromoterTo?: null,
    month: Date
  }

  export interface IQuestionSetting {
    last?: number
  }
}
