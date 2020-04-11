<template>
  <div class="date-input">
    <el-date-picker v-model="value1" type="datetime" :placeholder="$t('common.placeholderForDate')" readonly />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion
  @Prop({ required: false }) answer!: Questionnaire.IAnswer

  private value1 = ''
}
</script>

<style lang="scss" scoped>
  .date-input {
    width: 100%;
    padding: 1rem 0 0 1.25rem;
  }
</style>
