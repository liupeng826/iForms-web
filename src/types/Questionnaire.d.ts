declare namespace Questionnaire {

    export type QuestionType = '单选' | '多选' | '文本' | '评分' | '净推荐值' | '日期'
    export type QuestionTypeId = 1 | 2 | 3 | 4 | 5 | 6

    /* Form */
    export interface IForm {
        id?: number,
        superFormId?: string,
        marketId: string, // user
        level: string, // "market" | "" --checkbox
        type?: string, //
        deptId: string, // user
        client?: IClient, // constants.client
        language: string, // "zh-CN"
        languageDescription: string, // ""
        title: string,
        description: string,
        deadline?: number,
        includeSection: number, // 1 true - 0 false
        sections: ISection[],
        isActive: number, // 1 true - 0 false
        publishStatus: number, // 1 true - 0 false
        sendEmail: number, // 1 true - 0 false -- checkbox
        createdBy: string,
        createdDate?: number,
        modifiedBy: string,
        modifiedDate?: number,
        answers?: IAnswer[]
    }

    /* Client */
    export interface IClient {
        id?: number,
        name: string,
        token: string,
        isActive?: number
    }

    /* Section */
    export interface ISection {
        id?: number,
        superSectionId?: string,
        formId?: number,
        sequence: number, // 0
        title: string, // ''
        description: string, // ''
        questions: IQuestion[],
        isActive: number // 默认传1 逻辑删除标志位
    }

    /* Question */
    export interface IQuestion {
        id?: number,
        superQuestionId?: string, // 翻译
        sectionId?: number,
        questionTypeId: number,
        sequence: number,
        language: string,
        title: string,
        subtitle: string,
        mandatory: number, // 1 true - 0 false
        questionOptions: IQuestionOption[],
        createdBy: string,
        createdDate?: number,
        modifiedBy: string,
        modifiedDate?: number,
        isActive: number // 1 true - 0 false
    }

    /* QuestionOption */
    export interface IQuestionOption {
        id?: number,
        superOptionId?: string,
        questionId?: number,
        sequence: number,
        language: string,
        description?: string,
        netPromoterFrom?: string,
        netPromoterTo?: string,
        totalValue?: number | string, // 10
        isActive: number // 1 true - 0 false
    }

    /* Answer */
    export interface IAnswer {
        id?: number,
        answerId?: string,
        formId: number,
        superFormId: string,
        questionId: number,
        superQuestionId: string,
        superOptionId: string,
        language: string,
        answerValue: string,
        answerOptionId: number | number[],
        answerDescription: string,
        reference: string,
        totalValue: string,
        customerId: number,
        customer: ICustomer,
        createdBy: string,
        createdDate?: number,
        modifiedBy: string,
        modifiedDate?: number
    }

    /* Customer */
    export interface ICustomer {
        id: number,
        name: string,
        email?: string,
        contactNo?: string
    }

    /* Language */
    export interface ILanguage {
        id: number,
        code: string,
        description: string,
        isActive: number
    }
}
