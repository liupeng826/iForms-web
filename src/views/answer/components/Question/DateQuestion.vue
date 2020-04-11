<template>
  <div class="date-input">
    <el-date-picker :value="answer.answerDescription" type="datetime" readonly></el-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: true }) answer!: Questionnaire.IAnswer
}
</script>

<style lang="scss" scoped>
  .date-input {
    width: 100%;
    padding: 1rem 0 0 1.25rem;
  }
</style>
