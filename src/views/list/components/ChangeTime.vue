<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :title="$t('changeTime.title')">
    <el-date-picker
      v-model="deadline"
      type="datetime"
      :placeholder="$t('changeTime.placeholderForDeadline')"
      :editable="false"
      placement="bottom"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('changeTime.cancel') }}</el-button>
      <el-button type="primary" @click="submit">{{ $t('changeTime.submit') }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as FormAction from '@/api/form'

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: any
  private deadline: Date = new Date()

  @Watch('model')
  watchModel (val: Form.IForm) {
    this.deadline = new Date(Number(val.n_deadline))
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    if (!this.deadline) {
      return this.$message.warning(this.$t('changeTime.deadlineIsRequired').toString())
    }
    const res = await FormAction.changeTime({
      n_id: this.model.n_id,
      n_deadline: this.deadline.getTime()
    })
    if (res.success) {
      this.dialogVisible = false
      this.$message.success(this.$t('changeTime.successMsg').toString())
    } else {
      this.$message.error(this.$t('changeTime.failureMsg').toString())
    }
  }
}
</script>

<style scoped>

</style>
