<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="新增部门">
    <el-form
      ref="addDept"
      :model="form"
      label-position="left"
      label-width="80px"
      class="form"
    >
      <el-form-item label="ID" prop="deptId">
        <el-input
          v-model="form.deptId"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder=""
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as DeptAction from '@/api/dept'
import { sexEnumMap } from '@/config/enum/sex'
import { ElForm } from 'element-ui/types/form'
import { defaultDeptData } from '@/constants/default'

@Component
export default class AddDeptComp extends Vue {
  @Prop() visible!: boolean
  private form: User.IDept = {
    ...defaultDeptData
  }

  private sexEnumMap = sexEnumMap

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    const ref = this.$refs.addDept as ElForm
    ref.validate(async valid => {
      if (!valid) return
      const res = await DeptAction.addDept({
        ...this.form
      })
      if (res.success) {
        this.dialogVisible = false
        this.$message.success('新增用户成功！')
        ref.resetFields()
        this.$emit('submit')
      } else {
        this.$message.error('新增用户失败')
      }
    })
  }
}
</script>

<style scoped>

</style>
