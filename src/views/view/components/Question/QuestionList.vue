<template>
  <div>
    <div
      v-if="questionList && questionList.length === 0"
      class="no-question"
    >
      一点东西都没有，赶快点击上方按钮添加题目吧！
    </div>
    <div
      v-for="(question, index) in questionList"
      :key="index"
      :class="['question-item', questionTypeId]"
    >
      <div class="question-order">
        <div class="title">
          Q{{ index + 1 }}：
          {{ question.title }}
          <span v-if="question.mandatory" style="color: #f00;">*</span>
        </div>
        <p v-if="question.subtitle !== ''" class="question-desc">说明：{{ question.subtitle }}</p>
      </div>
      <div class="question-content">
        <question-item
          :type="question.questionTypeId"
          :question="question"
          :index="index"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionItem from './QuestionItem.vue'

@Component({
  components: {
    QuestionItem
  }
})
export default class extends Vue {
  @Prop() questionList!: Questionnaire.IQuestion[]
  @Prop({ default: 'normal' }) type?: string
}
</script>

<style lang="scss" scoped>
  .no-question {
    margin: 30px 0;
    font-size: 14px;
  }

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
        font-size: 16px;
        font-weight: bold;
      }
      .desc {
        font-size: 12px;
      }
    }

    .question-content {
    }
  }
</style>
