import { Module, VuexModule, Mutation, Action, MutationAction, getModule } from 'vuex-module-decorators'
import { client } from '@/constants/default.ts'
import { UserModule } from '@/store/modules/user'
import store from '@/store'
import * as FormAction from '@/api/form'
import { questionType } from '@/config/enum/questionType'

const SECTION: Questionnaire.ISection = {
  sequence: 0,
  title: '',
  description: '',
  questions: [],
  isActive: 1
}

const user = UserModule.userData.user
const { username: userName, dept: { id: deptId }, dept: { marketId }} = user

@Module({ dynamic: true, store, name: 'questionnaire' })
class Questionnaire extends VuexModule {
  public languages: Questionnaire.ILanguage[] = []
  public currentLanguageCodes: string[] = []

  public form: Questionnaire.IForm = {
    marketId: marketId,
    level: '',
    deptId: deptId,
    client: client,
    language: 'en-us',
    languageDescription: '',
    title: '',
    description: '',
    deadline: 2145888000000,
    includeSection: 0,
    sections: [SECTION],
    isActive: 0,
    publishStatus: 0,
    sendEmail: 0,
    createdBy: userName,
    modifiedBy: userName
  }

  @Mutation
  public resetQuestionSequences () {
    this.form.sections[0].questions.forEach((item, index, arr) => {
      item.sequence = index
      item.questionOptions.forEach((item, index, arr) => {
        item.sequence = index
      })
    })
  }

  @Mutation
  public removeForm () {
    this.form.isActive = 0
    return FormAction.update(this.form)
  }

  @Mutation
  public recoveryForm () {
    this.form.isActive = 1
    return FormAction.update(this.form)
  }

  @Mutation
  public reset (form?: Questionnaire.IForm) {
    SECTION.questions = []
    if (typeof form === 'undefined') {
      this.form = {
        marketId: marketId,
        level: '',
        deptId: deptId,
        client: client,
        language: 'en-us',
        languageDescription: '',
        title: '',
        description: '',
        deadline: 2145888000000,
        includeSection: 0,
        sections: [SECTION],
        isActive: 0,
        publishStatus: 0,
        sendEmail: 0,
        createdBy: userName, // when user edit, double check the value will be change or not
        modifiedBy: userName
      }
    } else {
      this.form = { ...form, client }
    }
  }

  @Mutation
  public createQuestion (type: Questionnaire.QuestionType) {
    const q: Questionnaire.IQuestion = {
      questionTypeId: 1,
      sequence: 0,
      language: 'en-us',
      title: '',
      subtitle: '',
      mandatory: 0,
      questionOptions: [],
      createdBy: userName,
      modifiedBy: userName,
      isActive: 1
    }
    const section = this.form.sections[0]
    if (section.id) {
      q.sectionId = section.id
    }
    if (section) {
      const questions = section.questions
      if (typeof questions === 'undefined') {
        section.questions = []
      }
      switch (type) {
        case questionType.SINGLE_CHOICE:
          q.questionTypeId = 1
          q.questionOptions.push({
            sequence: 0,
            language: 'en-us',
            description: '',
            isActive: 1
          })
          break
        case questionType.MULTIPLE_CHOICE:
          q.questionTypeId = 2
          q.questionOptions.push({
            sequence: 0,
            language: 'en-us',
            description: '',
            isActive: 1
          })
          break
        case questionType.TEXT_QUESTION:
          q.questionTypeId = 3
          break
        case questionType.RATING:
          q.questionTypeId = 4
          q.questionOptions.push({
            sequence: 0,
            language: 'en-us',
            totalValue: 5,
            isActive: 1
          })
          break
        case questionType.DATE_QUESTION:
          q.questionTypeId = 5
          break
        case questionType.NET_PROMOTER_SCORE:
          q.questionTypeId = 6
          q.questionOptions.push({
            sequence: 0,
            language: 'en-us',
            netPromoterFrom: '',
            netPromoterTo: '',
            totalValue: 10,
            isActive: 1
          })
          break
      }
      section.questions.push(q)
    }
  }

  @Mutation
  public removeQuestion (index: number) {
    const section = this.form.sections[0]
    if (section) {
      const questions = section.questions
      if (questions) {
        questions[index].isActive = 0
      }
    }
  }

  @Mutation
  public updateQuestion (question: Questionnaire.IQuestion) {
    const section = this.form.sections[0]
    if (section) {
      const questions = section.questions
      if (questions) {
        questions.splice(question.sequence, 1, question)
      }
    }
  }

  @Action
  public async loadForm (superFormId: string) {
    return FormAction.detail({ superFormId: superFormId, includeInActiveForm: true })
  }

  @Action
  public async createForm () {
    return FormAction.create(this.form)
  }

  @Action
  public async updateForm () {
    return FormAction.update(this.form)
  }

  @Action
  public async publishForm () {
    this.form.isActive = 1
    return FormAction.update(this.form)
  }

  @Mutation
  public updateLanguages (languages: Questionnaire.ILanguage[]) {
    this.languages = languages
  }

  @Mutation
  public updateCurrentLanguageCodes (codes: string[]) {
    this.currentLanguageCodes = codes
  }

  @Action
  public async loadLanguages () {
    const res = await FormAction.loadLanguages()
    if (res.success) {
      this.context.commit('updateLanguages', res.data)
    } else {
      this.context.commit('updateLanguages', [{
        id: 1,
        code: 'en-us',
        description: 'United States - English',
        isActive: 1
      }])
    }
  }
}

export const QuestionnaireModule = getModule(Questionnaire)
