<template>
  <div class="star-list">
    <el-rate :max="+question.questionOptions[0].totalValue" disabled :value="defaultValue" :colors="colors" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: false }) answer!: Questionnaire.IAnswer

  private defaultValue: Number = 5
  private colors: string[] = ['#f80', '#f80', '#f80']
}
</script>

<style lang="scss" scoped>
  .star-list {
    padding: 1rem 0 0 1.25rem;
  }
</style>
