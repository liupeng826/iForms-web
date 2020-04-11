<template>
  <div>
    <el-form-item :label="$t('question.title')" :prop="'sections[0].questions[' + order +'].title'" :rules="{required: true, message: $t('question.titleIsRequired'), trigger: 'change'}">
      <el-input v-model="question.title" :placeholder="$t('question.placeHolderForQuestionTitle')" />
    </el-form-item>
    <el-form-item :label="$t('question.introduction')">
      <el-input v-model="question.subtitle" :placeholder="$t('question.placeHolderForQuestionIntroduction')" />
    </el-form-item>
    <el-form-item :label="$t('question.options')">
      <div v-for="(option, opIndex) in question.questionOptions" :key="opIndex" class="option-item">
        <el-row :gutter="10" v-if="option.isActive === 1">
          <el-col :span="1">
            <div style="text-align:center">{{ letters[opIndex] }}</div>
          </el-col>
          <el-col :span="19">
            <el-form-item label-width="45px" label-position="right" label="" :prop="'sections[0].questions[' + order +'].questionOptions[' + opIndex + '].description'" :rules="{ required: true, message: $t('question.optionDescriptionIsRequired'), trigger: 'change' }">
              <el-input v-model="option.description" :placeholder="$t('question.placeHolderForOptions')"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form-item>
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
    return this.question.questionOptions.some( item => {
      return item.description === ''
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
