<template>
  <div>
    <div v-for="(question, index) in questionList" :key="index" class="question-item">
      <div class="question-order">
        <div class="title"><i class="el-icon-question" /> {{ index + 1 }} {{ question.title }}
          <span v-if="question.mandatory" style="color: #f00; font-weight: bold">*</span>
        </div>
        <p v-if="question.subtitle !== ''" class="question-desc">{{ $t('questionList.description') }} {{ question.subtitle }}</p>
      </div>
      <div class="question-content">
        <question-item :question="question" :answer="getAnswer(question.id, question.questionTypeId)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionItem from './QuestionItem.vue'
import { questionType1 } from '@/config/enum/questionType'

interface LooseObject {
    [key: string]: any
}

@Component({
  components: {
    QuestionItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) questionList!: Questionnaire.IQuestion[]
  @Prop({ required: true }) answerList!: Questionnaire.IAnswer[]

  getAnswer (questionId: number, questionTypeId: number) {
    const answers = this.answerList.filter(item => item.questionId === questionId)
    if (questionTypeId === questionType1.MULTIPLE_CHOICE) {
      const answer = answers[0]
      if (answers.length === 1) {
        if (typeof answer.answerOptionId !== 'object') {
          answer.answerOptionId = [answer.answerOptionId]
        }
        return answer
      } else {
        answer.answerOptionId = answers.map(item => {
          const id = item.answerOptionId
          if (typeof id === 'number') {
            return id
          } else {
            return 0
          }
        })
      }
    } else {
      return answers[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  .question-item {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;

    &:hover {
      background: rgba(238, 238, 238, 0.47);
    }

    .question-order {
      width: 100%;
      .title {
        font-size: 1rem;
        font-weight: bolder;
      }
      .question-desc {
        font-size: 12px;
        text-indent: 1.25rem;
      }
    }
  }
</style>
