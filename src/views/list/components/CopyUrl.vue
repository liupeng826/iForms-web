<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :title="$t('copyUrl.title')">
    <el-row>
      <el-col :span="18">
        <el-input
          id="url"
          ref="copyURL"
          :value="url"
          :autofocus="true"
          :readonly="true"
        />
      </el-col>
      <!-- 问卷地址 -->
      <el-col :span="4" :offset="1">
        <el-button
          class="copyboard"
          data-clipboard-target="#url"
          @click="handleCopy"
        >{{ $t('copyUrl.copy') }}</el-button>
      </el-col>
    </el-row>
    <el-alert class="mt-20">{{ $t('copyUrl.reminder') }}</el-alert>
    <div class="qrcode-wrapper">
      <canvas ref="qrcode" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('copyUrl.close') }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as FormAction from '@/api/form'
import Clipboard from 'clipboard'
import QRCode from 'qrcode'

@Component
export default class extends Vue {
  @Prop() visible!: boolean
  @Prop() model!: any
  private deadline: Date = new Date()

  @Watch('model')
  watchModel (val: Form.IForm) {
    this.$nextTick(() => {
      QRCode.toCanvas(this.$refs.qrcode, this.url, {
        width: 300
      }, function (error) {
        if (error) console.error(error)
      })
    })
  }

  get dialogVisible () {
    return this.visible
  }
  set dialogVisible (val) {
    this.$emit('update:visible', val)
  }

  get url () {
    return window.location.origin + '/#/view/' + this.model.superFormId
  }

  handleCopy () {
    const clipboard = new Clipboard('.copyboard')

    clipboard.on('success', (e) => {
      this.$message.success(this.$t('copyUrl.successMsg').toString())
      e.clearSelection()
    })

    clipboard.on('error', (e) => {
      this.$message.error(this.$t('copyUrl.failureMsg').toString())
    })
  }
}
</script>

<style lang="scss" scoped>
.qrcode-wrapper {
  text-align: center;
}
</style>
