<template>
  <div class="mt-20 mb-20">
    <el-input
      type="textarea"
      :autosize="{minRows: 2,maxRows: 5}"
      placeholder="请输入..."
    />
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

</style>
