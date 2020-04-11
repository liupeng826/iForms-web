<template>
  <div>
    <div v-if="isEmpty" class="no-question">
      {{ $t('questionList.noQuestion') }}
    </div>
    <div v-for="(q, index) in questions" :key="index">
      <question-item v-if="q.isActive===1" :question-type-id="q.questionTypeId" :order="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionItem from './QuestionItem.vue'
import { QuestionnaireModule } from '@/store/modules/questionnaire'
import i18n from '@/lang'

@Component({
  components: {
    QuestionItem
  }
})
export default class extends Vue {
  get questions () {
    return QuestionnaireModule.form.sections[0].questions
  }

  get isEmpty () {
    return this.questions.length === 0
  }
}
</script>

<style lang="scss" scoped>
  .no-question {
    margin: 30px 0;
    font-size: 14px;
    text-align: center;
  }
</style>
