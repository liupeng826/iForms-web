<template>
  <div class="text-input">
    <el-input type="textarea" :autosize="{minRows: 2, maxRows: 10}" disabled resize="none" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: false }) answer!: Questionnaire.IAnswer
}
</script>

<style lang="scss" scoped>
  .text-input {
    padding: 1rem 1rem 0 1.25rem;
  }
</style>
