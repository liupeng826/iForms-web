<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" title="新增用户">
    <el-form
      ref="addUser"
      :model="form"
      label-position="left"
      label-width="80px"
      class="form"
    >
      <el-form-item label="工号" prop="userId">
        <el-input
          v-model="form.userId"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="form.userName"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio
            v-for="(item, index) in sexEnumMap"
            :key="index"
            :label="index"
          >{{ item }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="客户端" prop="client.name">
        <el-input
          v-model="form.client.name"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="分支机构" prop="dept.name">
        <el-input
          v-model="form.dept.name"
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
import * as UserAction from '@/api/user'
import { sexEnumMap } from '@/config/enum/sex'
import { ElForm } from 'element-ui/types/form'
import { defaultUserData } from '@/constants/default'

@Component
export default class AddUserComp extends Vue {
  @Prop() visible!: boolean
  private form: User.IUser = {
    ...defaultUserData
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

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  async submit () {
    const ref = this.$refs.addUser as ElForm
    ref.validate(async valid => {
      if (!valid) return
      const res = await UserAction.addUser({
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
