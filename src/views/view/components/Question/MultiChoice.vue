<template>
  <div>
    <el-checkbox-group value="0" class="checkbox-list">
      <el-checkbox
        v-for="(option, opIndex) in question.questionOptions"
        :key="opIndex"
        :label="option.id"
        class="option-item"
      >{{ option.description }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) question!: Questionnaire.IQuestion;
  private questionOptionGroups = this.question!.questionOptions
}
</script>

<style lang="scss" scoped>
.checkbox-list {
  width: 100%;
  padding-left: 1.25rem;
  .option-item {
    display: block;
    margin: 1rem 0 0 0;
  }
}
</style>
