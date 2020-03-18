<template>
  <component :is="componentName" v-bind="$attrs" v-on="$listeners" />
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
  @Prop() type!: number

  get componentName () {
    if (this.type === questionType1.SINGLE_CHOICE) { return 'SingleChoice' }
    if (this.type === questionType1.MULTIPLE_CHOICE) { return 'MultiChoice' }
    if (this.type === questionType1.TEXT_QUESTION) { return 'TextQuestion' }
    if (this.type === questionType1.RATING) { return 'SymbolScore' }
    if (this.type === questionType1.NET_PROMOTER_SCORE) { return 'NetPromoterScore' }
    if (this.type === questionType1.DATE_QUESTION) { return 'DateQuestion' }
  }
}
</script>

<style lang="scss">
</style>
