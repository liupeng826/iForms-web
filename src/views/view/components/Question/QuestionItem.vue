<template>
  <component :is="componentName" :question="question" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SingleChoice from './SingleChoice.vue'
import MultiChoice from './MultiChoice.vue'
import TextQuestion from './TextQuestion.vue'
import SymbolScore from './SymbolScore.vue'
import NetPromoterScore from './NetPromoterScore.vue'
import DateQuestion from './DateQuestion.vue'
import { questionType1 } from '@/config/enum/questionType'

@Component({
  components: {
    SingleChoice,
    MultiChoice,
    TextQuestion,
    SymbolScore,
    NetPromoterScore,
    DateQuestion
  }
})
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  // @Prop({ required: false }) answer!: Questionnaire.IAnswer

  get componentName () {
    return ['', 'SingleChoice', 'MultiChoice', 'TextQuestion', 'SymbolScore', 'DateQuestion', 'NetPromoterScore'][this.question.questionTypeId || 0]
  }
}
</script>

<style lang="scss" scoped>
</style>
