declare namespace Questionnaire {
  export interface INaire {
    title: string,
    intro: string,
    deadline: number | string
    status: number,
    options: any,
    topic: IQuestionItem[]
  }

  export interface IQuestionSetting {
    last?: number
  }

  export type QuestionType = '单选' | '多选' | '文本' | '符号' | '净推荐值' | '日期'

  export interface IQuestionItem {
    q_id?: string,
    description: string,
    isRequired: boolean,
    options?: IOptionItem[],
    question: string,
    setting: IQuestionSetting,
    additional?: string,
    selectContent?: string,
    selectMultipleContent?: number[],
    type: string
  }

  export interface IOptionItem {
    o_id?: string,
    content: string,
    desc: string,
    image: string,
    isAddition: boolean
  }

  export interface IAnswer {
    answerId: string,
    id: number,
    formId: number,
    questionId: number,
    answerDescription?: string,
    answerOptionId?: number,
    answerValue?: string,
    totalValue?: string,
    reference?: string,
    createdBy?: string,
    createdDate?: string,
    modifiedBy?: string,
    modifiedDate?: string,
    customerId?: string,
    customer?: ICustomer,
    language?: string
  }

  export interface ICustomer {
    id: number,
    name: string,
    email?: string,
    contactNo?: string
  }

  export interface IForm {
    superFormId: string,
    id: number,
    title: string,
    description?: string,
    level?: string,
    marketId?: number,
    deptId?: number,
    client?: null,
    sendEmail?: string,
    type?: string,
    isActive?: boolean,
    publishStatus?: boolean,
    createdBy?: string,
    createdDate?: string,
    modifiedBy?: string,
    modifiedDate?: string,
    language?: string,
    languageDescription?: string,
    deadline?: string,
    includeSection?: string,
    sections?: ISection[]
  }

  export interface ISection {
    id: number,
    formId: number,
    title?: string,
    description?: string,
    sequence?: number,
    isActive?: boolean,
    questions?: IQuestion[]
  }

  export interface IQuestion {
    id: 89,
    sectionId: 5,
    title: string,
    subtitle: string,
    questionTypeId: 2,
    isActive: boolean,
    createdBy?: string,
    createdDate?: string,
    modifiedBy?: string,
    modifiedDate?: string,
    language?: string,
    mandatory?: boolean,
    sequence?: number,
    questionOptions?: IQuestionOption[]
  }

  export interface IQuestionOption {
    id: number,
    questionId: number,
    description?: string,
    sequence?: number,
    totalValue?: 0,
    netPromoterFrom?: string,
    netPromoterTo?: string,
    language?: string,
    isActive?: boolean
  }
}
