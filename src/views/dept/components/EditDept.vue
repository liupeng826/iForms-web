<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="修改部门">
    <el-form
      ref="editDept"
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as DeptAction from '@/api/dept'
import { sexEnumMap } from '@/config/enum/sex'
import { ElForm } from 'element-ui/types/form'
import { defaultDeptData } from '@/constants/default'

interface IDeptForm extends User.IDept{
  u_id: string
}

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: IDeptForm
  private form: IDeptForm = {
    u_id: '',
    ...defaultDeptData
  }
  // private rules: any = {
  //   u_name: [
  //     { required: true, message: '请输入姓名', trigger: 'blur' }
  //   ],
  //   u_class: [
  //     { required: true, message: '请输入部门', trigger: 'blur' }
  //   ],
  //   u_number: [
  //     { required: true, message: '请输入工号', trigger: 'blur' }
  //   ],
  //   u_birthday: [
  //     { required: true, message: '请输入出生日期', trigger: 'blur' }
  //   ],
  //   u_nation: [
  //     { required: true, message: '请输入民族', trigger: 'blur' }
  //   ],
  //   u_sex: [
  //     { required: true, message: '请选择性别', trigger: 'change' }
  //   ],
  //   u_email: [
  //     { type: 'email', required: true, message: '请输入邮箱地址', trigger: 'blur' }
  //   ],
  //   u_tel: [
  //     { required: true, message: '请输入手机号', trigger: 'blur' }
  //   ],
  //   u_identity: [
  //     { required: true, message: '请输入身份证号', trigger: 'blur' }
  //   ]
  // }
  private sexEnumMap = sexEnumMap

  @Watch('model')
  watchModel (val: IDeptForm) {
    this.form = val
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    const ref = this.$refs.editDept as ElForm
    ref.validate(async (valid: boolean) => {
      if (!valid) return
      const res = await DeptAction.updateDept({
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
