<template>
  <div>
    <el-radio-group v-model="question.id" vertica class="radio-list">
      console.log('子组件')
      <el-radio
        v-for="(option, opIndex) in question.questionOptions"
        :key="opIndex"
        :label="option.description"
        class="option-item"
      />
    </el-radio-group>
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
  .radio-list {
    width: 100%;

    .option-item {
      display: flex;
      font-size: inherit;
      align-items: center;
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

    .addition-input {
      margin-left: 20px;
    }
  }
</style>
