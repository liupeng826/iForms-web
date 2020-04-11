<template>
  <div class="question-item">
    <el-card shadow="hover">
      <div class="header clearfix">
        <span><i class="el-icon-question"></i> {{ $t('question.caption[' + questionTypeId + ']') }}</span>
        <el-link type="danger" icon="el-icon-delete" style="float: right; padding: 1px 0 5px 0" @click="delQuestion(order)">{{ $t('question.delete') }}</el-link>
      </div>
      <component :is="componentName" :order="order" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { QuestionnaireModule } from '@/store/modules/questionnaire'
import SingleChoice from './SingleChoice.vue'
import MultiChoice from './MultiChoice.vue'
import TextQuestion from './TextQuestion.vue'
import SymbolScore from './SymbolScore.vue'
import NetPromoterScore from './NetPromoterScore.vue'
import DateQuestion from './DateQuestion.vue'

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
  @Prop() order!: number
  @Prop() questionTypeId!: number

  get componentName () {
    return ['', 'SingleChoice', 'MultiChoice', 'TextQuestion', 'SymbolScore', 'DateQuestion', 'NetPromoterScore'][this.questionTypeId]
  }

  delQuestion (index: number) {
    QuestionnaireModule.removeQuestion(index)
  }
}
</script>

<style lang="scss" scoped>
  .question-item {
    margin-bottom: 20px;
    .header {
      padding: 9px 10px;
      margin: -20px -20px 10px -20px;
      border-bottom: 1px solid #EBEEF5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>
