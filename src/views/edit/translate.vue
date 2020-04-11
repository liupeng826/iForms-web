<template>
  <!-- 编辑问卷 -->
  <div class="translate">
    <el-alert class="mb-20" type="error">{{ $t('editForm.alertMsg') }}</el-alert>
    <el-row>
      <el-col :span="16">
        <el-form ref="form" :model="form" label-position="top" label-width="100px" size="mini">
          <el-form-item :label="$t('createForm.formTitle')" prop="title" :rules="{ required: true, message: $t('createForm.formTitleRequired'), trigger: 'change' }">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item :label="$t('createForm.formIntroduction')">
            <el-input v-model="form.description" type="textarea" rows="5" resize="none" />
          </el-form-item>
          <question-list />
          <br>
          <el-divider><i class="el-icon-more" /></el-divider>
          <div style="text-align:center">
            <el-button type="primary" round :disabled="invalid" @click="saveTranslation()">{{ $t('translateForm.saveTranslation') }}</el-button>
            <el-button type="primary" round :disabled="invalid || isDefaultLanguage || wasNotSaved" @click="deleteTranslation()">{{ $t('translateForm.deleteTranslation') }}</el-button>
          </div>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-tabs tab-position="right" style="max-height: 500px;">
          <el-tab-pane v-for="l in languages" :key="l.id">
            <div slot="label" @click="onTabClick(l.code, l.description)">
              <i v-if="l.isActive" class="el-icon-star-on" />
              <i v-else class="el-icon-star-off" />
              {{ l.description }}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { QuestionnaireModule } from '@/store/modules/questionnaire'
import { UserModule } from '@/store/modules/user'

import dayjs from 'dayjs'
import { Form as ElForm } from 'element-ui'
import { questionType } from '@/config/enum/questionType'

import QuestionList from '@/components/Question/Translation/QuestionList.vue'

@Component({
  components: {
    QuestionList
  }
})
export default class NavBar extends Vue {
  private questionType = questionType
  private loading: boolean = false

  get form () {
    return QuestionnaireModule.form
  }

  get invalid () {
    const noTitle = QuestionnaireModule.form.title === ''
    return noTitle
  }

  get isDefaultLanguage () {
    return QuestionnaireModule.form.language === 'en-us'
  }

  get wasNotSaved () {
    return QuestionnaireModule.form.id === undefined
  }

  get languages () {
    const codes = QuestionnaireModule.currentLanguageCodes
    return QuestionnaireModule.languages.map(item => {
      return {
        ...item,
        isActive: codes.indexOf(item.code) > -1 ? 1 : (item.code === 'en-us' ? 1 : 0)
      }
    })
  }

  saveTranslation () {
    QuestionnaireModule.resetQuestionSequences()
    const form = this.$refs.form as ElForm
    form.validate(async (valid) => {
      if (valid) {
        let res
        if (QuestionnaireModule.form.id) {
          res = await QuestionnaireModule.updateForm()
        } else {
          res = await QuestionnaireModule.createForm()
        }
        if (res.success) {
          this.$message.success(this.$t('translateForm.saveTranslationSuccessfully').toString())
          await this.$router.push('/list')
        } else {
          this.$message.error(res.msg)
        }
      }
    })
  }

  deleteTranslation () {
    QuestionnaireModule.removeForm()
    const form = this.$refs.form as ElForm
    form.validate(async (valid) => {
      if (valid && QuestionnaireModule.form.id) {
        const res = await QuestionnaireModule.updateForm()
        if (res.success) {
          this.$message.success(this.$t('translateForm.deleteTranslationSuccessfully').toString())
          await this.$router.push('/list')
        } else {
          this.$message.error(res.msg)
        }
      }
    })
  }

  async loadForm (code: string, description?: string) {
    this.loading = true
    const res = await QuestionnaireModule.loadForm(this.$route.params.id)
    this.loading = false
    if (res.success) {
      const datas: Questionnaire.IForm[] = res.data
      const forms: Questionnaire.IForm[] = datas // .filter(item => item.isActive === 1)
      if (forms.length > 0) {
        const target = forms.filter(item => {
          return item.language === code
        })[0]
        const src = forms.filter(item => {
          return item.language === 'en-us'
        })[0]
        if (target) {
          QuestionnaireModule.reset(target)
        } else {
          src.id = undefined
          src.language = code
          src.languageDescription = description || ''
          src.sections[0].questions.forEach(question => {
            question.language = code
            if (question.questionOptions) {
              question.questionOptions.forEach(option => {
                option.language = code
              })
            }
          })
          QuestionnaireModule.reset(src)
        }
        const codes = forms.map(item => item.language)
        QuestionnaireModule.updateCurrentLanguageCodes(codes)
      } else {
        this.$message.error('no data!')
      }
    } else {
      this.$message.error(res.msg)
    }
  }

  onTabClick (code: string, description: string) {
    this.loadForm(code, description)
  }

  mounted () {
    QuestionnaireModule.loadLanguages()
    this.loadForm('en-us')
  }
}
</script>

<style lang="scss" scoped>
  .translate {
    user-select: none;
  }
</style>
