<template>
  <!-- <div class="layout-header"> -->
  <div class="navbar">
    <div class="right-menu">
      <slot />
      <!-- <lang-select class="right-menu-item hover-effect" /> -->
      <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div>
          <!-- <h3>Language</h3> -->
          <svg
            class="svg-icon"
            width="128"
            height="128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M83.287 103.01c-1.57-3.84-6.778-10.414-15.447-19.548-2.327-2.444-2.182-4.306-1.338-9.862v-.64c.553-3.81 1.513-6.05 14.313-8.087 6.516-1.018 8.203 1.57 10.589 5.178l.785 1.193a12.625 12.625 0 0 0 6.43 5.207c1.134.524 2.53 1.164 4.421 2.24 4.596 2.53 4.596 5.41 4.596 11.753v.727a26.91 26.91 0 0 1-5.178 17.454 59.055 59.055 0 0 1-19.025 11.026c3.49-6.546.814-14.313 0-16.553l-.146-.087zM64 5.12a58.502 58.502 0 0 1 25.484 5.818 54.313 54.313 0 0 0-12.859 10.327c-.93 1.28-1.716 2.473-2.472 3.579-2.444 3.694-3.637 5.352-5.818 5.614a25.105 25.105 0 0 1-4.219 0c-4.276-.29-10.094-.64-11.956 4.422-1.193 3.23-1.396 11.956 2.444 16.495.66 1.077.778 2.4.32 3.578a7.01 7.01 0 0 1-2.066 3.229 18.938 18.938 0 0 1-2.909-2.91 18.91 18.91 0 0 0-8.32-6.603c-1.25-.349-2.647-.64-3.985-.93-3.782-.786-8.03-1.688-9.019-3.812a14.895 14.895 0 0 1-.727-5.818 21.935 21.935 0 0 0-1.396-9.25 8.873 8.873 0 0 0-5.557-4.946A58.705 58.705 0 0 1 64 5.12zM0 64c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64C28.654 0 0 28.654 0 64z" />
          </svg>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language==='zh'" command="zh">
            中文
          </el-dropdown-item>
          <el-dropdown-item :disabled="language==='en'" command="en">
            English
          </el-dropdown-item>
          <!-- <el-dropdown-item :disabled="language==='es'" command="es">
            Español
          </el-dropdown-item>
          <el-dropdown-item :disabled="language==='ja'" command="ja">
            日本語
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
      <a class="logout" @click="logout">{{ $t("layoutHeader.logOut") }} {{ userName }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { setLanguage } from '@/utils/cookies'
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
  components: {
    LangSelect
  }
})

@Component
export default class LayoutHeaderComponent extends Vue {
  get userName () {
    return UserModule.userName
  }

  logout () {
    UserModule.logout()
    this.$message.warning(this.$t('layoutHeader.logOutMsg').toString())
    this.$router.push('/login')
  }

  get language () {
    return this.$store.getters.language
  }

  public handleSetLanguage (lang: string) {
    this.$i18n.locale = lang
    this.$store.dispatch('app/setLanguage', lang)
    setLanguage(lang)
    this.$router.go(0)
    this.$message({
      message: 'Switch Language Success',
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .international {
      margin: 0 20px;
      font-size: 18px;
    }
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .logout {
      margin-right: 15px;
    }
  }
}
</style>
