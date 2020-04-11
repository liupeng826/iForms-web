<template>
  <div>
    <el-form-item :label="$t('question.title')" :prop="'sections[0].questions[' + order +'].title'" :rules="{required: true, message: $t('question.titleIsRequired'), trigger: 'change'}">
      <el-input v-model="question.title" :placeholder="$t('question.placeholderForQuestionTitle')" />
    </el-form-item>
    <el-form-item :label="$t('question.introduction')">
      <el-input v-model="question.subtitle" :placeholder="$t('question.placeholderForQuestionIntroduction')" />
    </el-form-item>
    <el-row>
      <el-rate :max="5" disabled :value="5" style="font-size: large" />
    </el-row>
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
