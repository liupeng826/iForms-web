<template>
  <div>
    <el-form-item :label="$t('question.title')" :prop="'sections[0].questions[' + order +'].title'" :rules="{required: true, message: $t('question.titleIsRequired'), trigger: 'change'}">
      <el-input v-model="question.title" :placeholder="$t('question.placeHolderForQuestionTitle')" />
    </el-form-item>
    <el-form-item :label="$t('question.introduction')">
      <el-input v-model="question.subtitle" :placeholder="$t('question.placeHolderForQuestionIntroduction')" />
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
}
</script>

<style lang="scss" scoped>

</style>
