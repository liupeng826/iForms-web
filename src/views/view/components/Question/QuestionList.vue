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
        <question-item :question="question" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionItem from './QuestionItem.vue'
import { questionType1 } from '@/config/enum/questionType'

@Component({
  components: {
    QuestionItem
  }
})
export default class extends Vue {
  @Prop({ required: true }) questionList!: Questionnaire.IQuestion[]
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
