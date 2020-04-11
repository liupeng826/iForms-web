<template>
  <div>
    <el-form-item :label="$t('question.title')" :prop="'sections[0].questions[' + order +'].title'" :rules="{required: true, message: $t('question.titleIsRequired'), trigger: 'change'}">
      <el-input v-model="question.title" :placeholder="$t('question.placeholderForQuestionTitle')" />
    </el-form-item>
    <el-form-item :label="$t('question.introduction')">
      <el-input v-model="question.subtitle" :placeholder="$t('question.placeholderForQuestionIntroduction')" />
    </el-form-item>
    <el-form-item :label="$t('question.options')">
      <div v-for="(option, opIndex) in question.questionOptions" :key="opIndex" class="option-item">
        <el-row :gutter="10" v-if="option.isActive === 1">
          <el-col :span="1">
            <div style="text-align:center">{{ letters[opIndex] }}</div>
          </el-col>
          <el-col :span="19">
            <el-form-item label-width="45px" :prop="'sections[0].questions[' + order +'].questionOptions[' + opIndex + '].description'" :rules="{ required: true, message: $t('question.optionDescriptionIsRequired'), trigger: 'change' }">
              <el-input v-model="option.description" :placeholder="$t('question.placeholderForOptions')" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="success" icon="el-icon-plus" size="mini" circle :disabled="disabledAdd" @click="addOption(opIndex)" />
            <el-button type="warning" icon="el-icon-delete" size="mini" circle v-if="availableDel" @click="option.isActive = 0" />
          </el-col>
        </el-row>
      </div>
    </el-form-item>
    <div class="option-addtion">
      <span>{{ $t('question.mandatory') }}</span>&nbsp;&nbsp;
      <el-switch v-model="question.mandatory" :active-value="1" :inactive-value="0" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { QuestionnaireModule } from '@/store/modules/questionnaire'

@Component
export default class extends Vue {
  @Prop({ required: true }) private order!: number

  get question () {
    const questions = QuestionnaireModule.form.sections[0].questions
    if (questions) {
      return questions[this.order]
    }
  }

  set question (q: Questionnaire.IQuestion) {
    QuestionnaireModule.updateQuestion(q)
  }

  get availableDel () {
    let nums = this.question.questionOptions.filter(item => item.isActive === 1).length
    return nums > 1
  }

  get letters () {
    let nums = this.question.questionOptions.map(item => item.isActive)
    let len = nums.length
    let letters: string[] = []
    for (let i = 0; i < len; i++) {
      let sum = 0
      for (let j = 0; j < i; j++) {
        sum += nums[j]
      }
      letters.push(String.fromCharCode(65 + sum))
    }
    return letters
  }

  get disabledAdd () {
    return this.question.questionOptions.filter(item => item.isActive === 1).some(item => {
      return item.description === ''
    })
  }

  private addOption (opIndex: number, superOptionId: string) {
    let option: Questionnaire.IQuestionOption = {
      sequence: 0,
      language: 'en-us',
      description: '',
      isActive: 1
    }
    if(this.question.id){
      option.questionId = this.question.id
    }
    this.question.questionOptions.splice(opIndex + 1, 0, option)
    this.resetSequence()
  }

  private resetSequence () {
    this.question.questionOptions.forEach((item, index, arr) => {
      item.sequence = index
    })
  } 
}
</script>

<style lang="scss" scoped>
  .option-addtion {
    padding: 9px 10px;
    margin: 10px -20px -20px -20px;
    border-top: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: right;
  }
</style>
