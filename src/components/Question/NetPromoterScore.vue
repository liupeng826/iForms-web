<template>
  <div>
    <el-form-item :label="$t('question.title')" :prop="'sections[0].questions[' + order +'].title'" :rules="{required: true, message: $t('question.titleIsRequired'), trigger: 'change'}">
      <el-input v-model="question.title" :placeholder="$t('question.placeholderForQuestionTitle')" />
    </el-form-item>
    <el-form-item :label="$t('question.introduction')">
      <el-input v-model="question.subtitle" :placeholder="$t('question.placeholderForQuestionIntroduction')" />
    </el-form-item>
    <el-form-item :label="$t('question.leftText')">
      <el-input v-model="question.questionOptions[0].netPromoterFrom" :placeholder="$t('question.placeholderForLeftText')" />
    </el-form-item>
    <el-form-item :label="$t('question.rightText')">
      <el-input v-model="question.questionOptions[0].netPromoterTo" :placeholder="$t('question.placeholderForRightText')" />
    </el-form-item>
    <div class="promoter-score">
      <ul>
        <li :style="{'background-color': '#aaa'}">
          <div>0</div>
        </li>
        <li v-for="score in +(question.questionOptions[0].totalValue)" :key="score" :style="{'background-color': '#aaa'}">
          <div>{{ score }}</div>
        </li>
      </ul>
      <div class="footer">
        <div>{{ question.questionOptions[0].netPromoterFrom }}</div>
        <div>{{ question.questionOptions[0].netPromoterTo }}</div>
      </div>
    </div>
    <div class="option-addition">
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
  .option-addition {
    padding: 9px 10px;
    margin: 10px -20px -20px -20px;
    border-top: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: right;
  }

  .promoter-score {
    padding: 1rem 0 0 1.25rem;
    > ul {
      list-style-type: none;
      display: flex;
      margin: 0;
      padding: 0;
      height: 2rem;
      color: #fff;
      > li {
        list-style-type: none;
        flex: 1;
        margin: 0;
        padding: 0;
        background-color: #aaa;
        text-align: center;
        > div {
          border-right: solid 1px #fff;
          line-height: 2rem;
          font-size: 0.875rem;
        }
        &:first-child {
          border-top-left-radius: .3rem;
          border-bottom-left-radius: .3rem;
        }
        &:last-child {
          border-top-right-radius: .3rem;
          border-bottom-right-radius: .3rem;
        }
      }
    }
    .footer {
      display: flex;
      > div {
        flex: 1;
        font-size: 0.75rem;
        &:last-child {
          text-align: right;
        }
      }
    }
  }
</style>
