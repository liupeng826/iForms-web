<template>
  <el-menu
    :router="true"
    :default-active="defaultActive"
    :unique-opened="true"
    class="nav-bar"
    text-color="#fff"
  >
    <nav-bar-item
      v-for="(item, index) in navConfigs"
      v-show="!item.hidden"
      :key="index"
      :submenu="item"
    />
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavConfigs from './config'
import NavBarItem from './NavBarItem.vue'
import { UserModule } from '@/store/modules/user'
import { roleEnum } from '@/config/enum/roleEnum'
import i18n from '@/lang'
import LangSelect from '@/components/LangSelect/index.vue'

@Component({
  components: {
    NavBarItem,
    LangSelect
  }
})

export default class NavBar extends Vue {
  created () {
  }
  public navConfigs = NavConfigs

  get defaultActive () {
    return this.$route.meta ? this.$route.meta.navIndex || '' : ''
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  border-right: 0;
  background-color: #464c5b;

  .el-submenu__title:focus,
  .el-menu-item:focus {
    background: none
  }

  .el-submenu__title:hover,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background-color: #313540;
  }
}
</style>
