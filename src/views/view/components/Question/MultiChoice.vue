<template>
  <div>
    <el-checkbox-group v-model="question.questionOptions" class="checkbox-list">
      <el-checkbox
        v-for="(option, opIndex) in question.questionOptions"
        :key="opIndex"
        :label="option.description"
        class="option-item"
      />
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) private question!: Questionnaire.IQuestion
  @Prop({ required: true }) private index!: number
}
</script>

<style lang="scss" scoped>
  .checkbox-list {
    width: 100%;

    .option-item {
      display: block;
      margin: 20px 0;
    }

    .option-desc {
      width: 100%;
      padding-left: 19px;
      box-sizing: border-box;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
</style>
