<template>
  <div class="change-pwd">
    <el-form ref="form" :model="form" :rules="rules" label-width="80">
      <el-form-item :label="$t('setting.oldPassword')" prop="oldPasswd">
        <el-input v-model="form.oldPasswd" type="password" />
      </el-form-item>
      <el-form-item :label="$t('setting.newPassword')" prop="passwd">
        <el-input v-model="form.passwd" type="password" />
      </el-form-item>
      <el-form-item :label="$t('setting.confirmPassword')" prop="passwdCheck">
        <el-input v-model="form.passwdCheck" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('setting.submit') }}</el-button>
        <el-button type="ghost" style="margin-left: 8px" @click="handleReset">{{ $t('setting.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import * as AdminAction from '@/api/auth'
import { UserModule } from '@/store/modules/user'

@Component
export default class extends Vue {
  private loading: boolean = false
  private oldPasswordRequired = ''
  private newPasswordRequired = ''
  private reEnterNewPassword = ''
  private differentPassword = ''
  private successMsg = ''
  private failureMsg = ''

  created () {
    // debugger
    this.oldPasswordRequired = this.$t('setting.oldPasswordRequired').toString()
    this.newPasswordRequired = this.$t('setting.newPasswordRequired').toString()
    this.reEnterNewPassword = this.$t('setting.reEnterNewPassword').toString()
    this.differentPassword = this.$t('setting.differentPassword').toString()
    this.successMsg = this.$t('setting.successMsg').toString()
    this.failureMsg = this.$t('setting.failureMsg').toString()
  }

  private validateOldPassword (rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error(this.oldPasswordRequired))
    }
  }

  private validatePass (rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error(this.newPasswordRequired))
    } else {
      if (this.form.passwdCheck !== '') {
        // 对第二个密码框单独验证
        const ref = this.$refs.form as ElForm
        ref.validateField('passwdCheck')
      }
      callback()
    }
  }

  private validatePassCheck (rule: any, value: string, callback: Function) {
    if (value === '') {
      callback(new Error(this.reEnterNewPassword))
    } else if (value !== this.form.passwd) {
      callback(new Error(this.differentPassword))
    } else {
      callback()
    }
  }

  private form: {
    passwd: string,
    passwdCheck: string,
    oldPasswd: string
  } = {
    passwd: '',
    passwdCheck: '',
    oldPasswd: ''
  }
  private rules: any = {
    passwd: [
      { validator: this.validatePass, trigger: 'blur' }
    ],
    passwdCheck: [
      { validator: this.validatePassCheck, trigger: 'blur' }
    ],
    oldPasswd: [
      { required: true, validator: this.validateOldPassword, trigger: 'blur' }
    ]
  }

  handleSubmit () {
    const ref = this.$refs.form as ElForm
    ref.validate(async (valid) => {
      if (!valid) return
      const params = {
        oldPass: this.form.oldPasswd,
        newPass: this.form.passwd
      }
      this.loading = true
      const res = await AdminAction.changePwd(params)
      this.loading = false
      if (res.success) {
        this.$message.success(this.successMsg)
        // 重置表单
        this.handleReset()
        UserModule.logout()
        this.$router.push('/login')
      } else {
        this.$message.error(this.failureMsg)
      }
    })
  }

  handleReset () {
    const ref = this.$refs.form as ElForm
    ref.resetFields()
  }
}
</script>

<style lang="scss" scoped>
  .change-pwd {
    width: 50%;
  }
</style>
