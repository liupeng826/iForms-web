<template>
  <div class="star-list">
    <el-rate :value="+answer.answerValue" :max="+question.questionOptions[0].totalValue" disabled disabled-void-color="#444" :colors="colors" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: true }) answer!: Questionnaire.IAnswer

  private colors: string[] = ['#f80', '#f80', '#f80']
}
</script>

<style lang="scss" scoped>
  .star-list {
    padding: 1rem 0 0 1.25rem;
  }
</style>
