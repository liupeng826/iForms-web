<template>
  <!-- 编辑问卷 -->
  <div class="edit">
    <el-alert class="mb-20" type="error">{{ $t('editForm.alertMsg') }}</el-alert>
    <el-row>
      <el-col :span="16" style="border-right: solid 1px #ccc; padding-right: 1rem; margin-right: 1rem;">
        <el-form ref="form" :model="form" label-position="top" label-width="100px" size="mini">
          <el-form-item :label="$t('createForm.formTitle')" prop="title" :rules="{ required: true, message: $t('createForm.formTitleRequired'), trigger: 'blur' }">
            <el-input v-model="form.title" autofocus="true" />
          </el-form-item>
          <el-form-item :label="$t('createForm.formIntroduction')">
            <el-input v-model="form.description" type="textarea" resize="none" rows="4" />
          </el-form-item>
          <question-list />
          <br>
          <el-divider><i class="el-icon-more" /></el-divider>
          <div style="text-align:center">
            <el-button-group>
              <el-button plain round @click="addQuestion(questionType.SINGLE_CHOICE)">{{ $t('createForm.qtSingleChoice') }}</el-button>
              <el-button plain @click="addQuestion(questionType.MULTIPLE_CHOICE)">{{ $t('createForm.qtMultiChoice') }}</el-button>
              <el-button plain @click="addQuestion(questionType.TEXT_QUESTION)">{{ $t('createForm.qtTextQuestion') }}</el-button>
              <el-button plain @click="addQuestion(questionType.RATING)">{{ $t('createForm.qtRating') }}</el-button>
              <el-button plain @click="addQuestion(questionType.DATE_QUESTION)">{{ $t('createForm.qtDateQuestion') }}</el-button>
              <el-button plain round @click="addQuestion(questionType.NET_PROMOTER_SCORE)">{{ $t('createForm.qtNetPromoterScore') }}</el-button>
            </el-button-group>
          </div>
        </el-form>
      </el-col>
      <el-col :span="7">
        <el-form :model="form" label-position="top" label-width="100px" size="mini">
          <!-- <el-form-item :label="$t('createForm.formDeadline')">
            <el-date-picker v-model="form.deadline" type="datetime" value-format="timestamp" :picker-options="datePickerOptions" :placeholder="$t('createForm.placeholderForDeadline')" />
          </el-form-item> -->
          <el-form-item :label="$t('createForm.otherConfig')">
            <el-row>
              <el-col :span="12">
                <el-switch v-model="form.level" active-value="market" :active-text="$t('createForm.marketLevel')" inactive-value="" />
              </el-col>
              <el-col :span="12">
                <el-switch v-model="form.sendEmail" :active-value="1" :active-text="$t('createForm.emailResponse')" :inactive-value="0" />
              </el-col>
            </el-row>
          </el-form-item>
          <br>
          <el-divider><i class="el-icon-s-tools" /></el-divider>
          <div style="text-align:center">
            <el-button-group>
              <el-button type="primary" round :disabled="invalid" @click="saveForm()">{{ $t('createForm.saveForm') }}</el-button>
              <el-button type="success" round :disabled="invalid" @click="publishForm()">{{ $t('createForm.publishForm') }}</el-button>
            </el-button-group>
          </div>
        </el-form>
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

import QuestionList from '@/components/Question/QuestionList.vue'

@Component({
  components: {
    QuestionList
  }
})
export default class NavBar extends Vue {
  private questionType = questionType
  private loading: boolean = false

  private datePickerOptions = {
    disabledDate (time: Date) {
      const timestamp = time.getTime()
      const min = dayjs().add(-1, 'day').valueOf()
      const max = 2145888000000
      return (timestamp < min) || (timestamp > max)
    }
  }

  get form () {
    return QuestionnaireModule.form
  }

  get invalid () {
    const noQuestions = QuestionnaireModule.form.sections[0].questions.filter(item => item.isActive === 1).length === 0
    const noTitle = QuestionnaireModule.form.title.trim() === ''
    return noTitle || noQuestions
  }

  addQuestion (type: Questionnaire.QuestionType) {
    QuestionnaireModule.createQuestion(type)
  }

  saveForm () {
    QuestionnaireModule.resetQuestionSequences()
    const form = this.$refs.form as ElForm
    form.validate(async (valid) => {
      if (valid) {
        const res = await QuestionnaireModule.updateForm()
        if (res.success) {
          this.$message.success(this.$t('createForm.saveFormSuccessfully').toString())
          await this.$router.push('/list')
          QuestionnaireModule.reset()
        } else {
          this.$message.error(res.msg)
        }
      }
    })
  }

  publishForm () {
    QuestionnaireModule.resetQuestionSequences()
    const form = this.$refs.form as ElForm
    form.validate(async (valid) => {
      if (valid) {
        const res = await QuestionnaireModule.publishForm()
        if (res.success) {
          this.$message.success(this.$t('createForm.publishFormSuccessfully').toString())
          await this.$router.push('/list')
          QuestionnaireModule.reset()
        } else {
          this.$message.error(res.msg)
        }
      }
    })
  }

  async loadForm () {
    this.loading = true
    // debugger
    const res = await QuestionnaireModule.loadForm(this.$route.params.id)
    this.loading = false
    if (res.success) {
      const forms: Questionnaire.IForm[] = res.data
      if (forms.length > 0) {
        const common = forms.filter(item => {
          return item.language === 'en-us'
        })[0]
        QuestionnaireModule.reset(common)
      } else {
        QuestionnaireModule.reset()
        this.$message.error('nothing!')
      }
    } else {
      this.$message.error(res.msg)
    }
  }

  mounted () {
    this.loadForm()
  }

  beforeDestroy () {
    QuestionnaireModule.reset()
  }
}
</script>

<style lang="scss" scoped>
  .edit {
    user-select: none;
  }
</style>
