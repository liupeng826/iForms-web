<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h3 class="title">{{ $t('login.title') }}</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        class="form-area"
        @submit.native.prevent
        @keyup.enter="handleSubmit('form')"
      >
        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="form.username" autocomplete="on" />
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            native-type="submit"
            @click="handleSubmit('form')"
          >{{ $t('login.login') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-logo" />
    <!-- <div class="login-github">
      <a class="icon-github" href="https://github.com/liupeng826/iForms-web" target="_blank">
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTA0NjgwOTI2NTgxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMzIgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQyNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAxLjU2MjUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0wIDUxNS44NzJDMCA3NDEuMTIgMTQ0LjM1MiA5MzIuNjQgMzQ1LjU4NCAxMDAyLjk3NmMyNy4xMiA2Ljg5NiAyMi44OTYtMTIuNTQ0IDIyLjg5Ni0yNS42MTZsMC04OS40MjRjLTE1Ni40NjQgMTguMzA0LTE2Mi43MzYtODUuMjgtMTczLjI5Ni0xMDIuNjA4LTIxLjMxMi0zNi4yNzItNzEuMzkyLTQ1LjQ4OC01Ni40MzItNjIuNzUyIDM1LjY5Ni0xOC40MzIgNzEuOTY4IDQuNjA4IDExNCA2Ni43ODQgMzAuNDY0IDQ1LjA3MiA4OS42NjQgMzcuNTA0IDExOS45MzYgMjkuOTM2IDYuNjI0LTI3LjA1NiAyMC43MDQtNTEuMiAzOS45NTItNzAuMDgtMTYxLjg4OC0yOC44MTYtMjI5LjU1Mi0xMjcuNzkyLTIyOS41NTItMjQ1LjQ0IDAtNTYuOTQ0IDE4LjgtMTA5LjUwNCA1NS44MDgtMTUxLjg1Ni0yMy40MDgtNjkuODg4IDIuMjU2LTEyOS40NzIgNS42MTYtMTM4LjQxNiA2Ni45MjgtNi4wOCAxMzYuNTEyIDQ3Ljg3MiAxNDEuODcyIDUyLjEyOCAzOC4xMjgtMTAuMTkyIDgxLjUyLTE1Ljc2IDEzMC4wNjQtMTUuNzYgNDguODQ4IDAgOTIuNDggNS42MzIgMTMwLjc4NCAxNS45NTIgMTMuMDcyLTkuOTUyIDc3LjU4NC01Ni4xOTIgMTM5LjgyNC01MC41NDQgMy4zMTIgOC44NDggMjguNDE2IDY3LjE2OCA2LjQgMTM2LjAxNiAzNy4zNzYgNDIuNDY0IDU2LjM1MiA5NS4yNjQgNTYuMzUyIDE1Mi40OCAwIDExNy44ODgtNjcuOTUyIDIxNy4wMDgtMjMwLjUyOCAyNDUuNiAyNy4xNTIgMjYuNzM2IDQzLjk4NCA2My45MiA0My45ODQgMTA1LjA0bDAgMTI5LjcxMmMwLjg2NCAxMC4zMzYgMCAyMC43MzYgMTcuMzYgMjAuNzM2IDIwNC4xMTItNjguNzUyIDM1MS4xMi0yNjEuNzEyIDM1MS4xMi00ODkuMDA4QzEwMzEuNzQ0IDIzMC45NiA4MDAuNzg0IDAgNTE1Ljg3MiAwIDIzMC45NiAwIDAgMjMwLjk2IDAgNTE1Ljg3MkwwIDUxNS44NzJ6TTAgNTE1Ljg3MiIgcC1pZD0iNDI3MSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=="
          alt="GitHub"
        ></a>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'

import { UserModule } from '@/store/modules/user'
import * as AdminAction from '@/api/auth'
import i18n from '@/lang'
import { roleEnum } from '../../config/enum/roleEnum'

@Component
export default class LoginComponent extends Vue {
  data = {
    codeUrl: '',
    cookiePass: ''
  }
  private form = {
    username: '',
    password: '',
    code: '',
    uuid: ''
  }
  private placeholderForUserName = ''
  private placeholderForPassword = ''
  private loginSuccessfully = ''
  private loginFailed = ''
  private wrongFormInput = ''
  private nonAdminCannotLogin = ''

  private rules = {
    username: [
      {
        required: true,
        message: this.placeholderForUserName,
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: this.placeholderForPassword,
        trigger: 'blur'
      }
    ]
  }
  async getCode () {
    const res = await AdminAction.getCodeImg()
    if (res.success) {
      this.data.codeUrl = res.data.img
      this.form.uuid = res.data.uuid
    }
  }

  created () {
    this.getCode()
    // debugger
    this.placeholderForUserName = this.$t('login.placeholderForUserName').toString()
    this.placeholderForPassword = this.$t('login.placeholderForPassword').toString()
    this.loginSuccessfully = this.$t('login.loginSuccessfully').toString()
    this.loginFailed = this.$t('login.loginFailed').toString()
    this.wrongFormInput = this.$t('login.wrongFormInput').toString()
    this.nonAdminCannotLogin = this.$t('login.nonAdminCannotLogin').toString()
  }

  handleSubmit (name: string) {
    (this.$refs[name] as ElForm).validate(async (valid) => {
      if (valid) {
        const res = await AdminAction.login({
          ...this.form
        })
        if (res.success) {
          if (res.data!.user.role === roleEnum.SUPER_ADMIN || res.data!.user.role === roleEnum.ADMIN) {
            this.$message.success(this.loginSuccessfully)
            const data: any = {
              username: this.form.username,
              token: res.data!.token,
              userData: res.data!
            }
            UserModule.login(data)
            await this.$router.push('/list')
          }
          else {
            this.$message.info(this.nonAdminCannotLogin)
          }
        } else {
          this.$message.error(this.loginFailed)
        }
      } else {
        this.$message.error(this.wrongFormInput)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #318fce;
    background: linear-gradient(to bottom right, #318fce 0%, #48e7ef 100%);

    .login-form {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      border-radius: 5px;
      padding: 30px 20px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 10px;
    }

    .login-btn {
      width: 100%;
    }

    .login-code {
      width: 33%;
      display: inline-block;
      height: 38px;
      float: right;
      img{
        cursor: pointer;
        vertical-align:middle
      }
    }

    .form-area {
      width: 300px;
    }

    .login-logo {
      position: absolute;
      top: 10px;
      left: 30px;
      width: 250px;
      height: 75px;
      background: url("../../assets/logo.png") no-repeat center;
      background-size: cover;
    }

    .login-github {
      position: absolute;
      top: 20px;
      right: 30px;
      margin: 20px 0;
      color: #fff;
      vertical-align: middle;
    }

    .icon-github {
      display: inline-block;
    }

    .icon-github img{
      width: 20px;
      height: auto;
    }
  }
</style>
