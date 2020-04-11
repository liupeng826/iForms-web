<template>
  <div v-loading.fullscreen.lock="loading" class="form-list">
    <el-table :data="list" @selection-change="onSelectionChange">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column prop="title" :label="$t('list.formName')" align="left">
        <template slot-scope="{ row }">
          <router-link tag="a" :to="`./view/${row.superFormId}`">
            {{ row.title }}
            <el-tag
              v-if="isExpired(row.deadline)"
              class="ml-10"
              size="mini"
              type="danger"
            >{{ $t('list.Expired') }}</el-tag>
          </router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="deadline" :label="$t('list.deadline')" align="center">
        <template slot-scope="{ row }">
          {{ row.deadline | formatTime }}
        </template>
      </el-table-column> -->
      <el-table-column prop="createdDate" :label="$t('list.createdDate')" align="center">
        <template slot-scope="{ row }">{{ row.createdDate | formatTime }}</template>
      </el-table-column>
      <el-table-column prop="modifiedDate" :label="$t('list.modifiedDate')" align="center">
        <template slot-scope="{ row }">{{ row.modifiedDate | formatTime }}</template>
      </el-table-column>
      <el-table-column prop="publishStatus" :label="$t('list.publishStatus')" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.isActive | statusColorFilter">{{ row.isActive | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('list.actionTitle')" align="center" width="250px">
        <template slot-scope="{ row }">
          <!-- <el-button
            type="primary"
            size="mini"
            style="margin-right: 10px"
            @click="handleStatistics(row)"
          >{{ $t('list.statistics') }}</el-button> -->
          <el-dropdown @command="onOptionClick($event, row)">
            <el-button type="danger" size="mini">
              {{ $t('list.action') }}
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="preview">{{ $t('list.previewForm') }}</el-dropdown-item>
              <el-dropdown-item command="copyUrl">{{ $t('list.copyAddress') }}</el-dropdown-item>
              <!-- <el-dropdown-item command="submitStatistic">查看回收情况</el-dropdown-item> -->
              <!-- <el-dropdown-item command="deadline" divided>{{ $t('list.editDeadline') }}</el-dropdown-item> -->
              <el-dropdown-item command="edit">{{ $t('list.editForm') }}</el-dropdown-item>
              <el-dropdown-item command="translate">{{ $t('list.translateForm') }}</el-dropdown-item>
              <!-- <el-dropdown-item command="delete">{{ $t('list.deleteForm') }}</el-dropdown-item> -->
              <el-dropdown-item command="publish">{{ row.isActive === 1 ? $t('list.publishmentStop') : $t('list.publishForm') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <change-time :visible.sync="changeTimeVisible" :model="editModel" />
    <copy-url :visible.sync="copyUrlVisible" :model="editModel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import ChangeTime from './components/ChangeTime.vue'
import CopyUrl from './components/CopyUrl.vue'
import * as FormAction from '@/api/form'
import { client } from '@/constants/default.ts'

import {
  FormStatus,
  FormStatusText,
  FormStatusColor
} from '@/config/enum/formStatus'

@Component({
  filters: {
    formatTime (val: string | number) {
      const timestamp = Number(val)
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    statusFilter (val: FormStatus) {
      return FormStatusText[val]
    },
    statusColorFilter (val: FormStatus) {
      return FormStatusColor[val]
    }
  },
  components: {
    ChangeTime,
    CopyUrl
  }
})
export default class NavBar extends Vue {
  private list: Questionnaire.IForm[] = [];
  private FormStatus = FormStatus;
  private loading: boolean = false;
  private changeTimeVisible: boolean = false;
  private copyUrlVisible: boolean = false;
  private editModel: any = {};
  private selectContent: any[] = [];

  mounted () {
    this.fetchListData()
  }

  onSelectionChange (val: any) {
    this.selectContent = val
  }

  onOptionClick (command: string, row: any) {
    switch (command) {
      case 'preview':
        this.$router.push({
          name: 'view',
          params: {
            id: row.superFormId
          }
        })
        break
      case 'copyUrl':
        this.editModel = row
        this.copyUrlVisible = true
        break
      case 'submitStatistic':
        this.$router.push({
          name: 'submitStatistics',
          params: {
            id: row.id
          }
        })
        break
      case 'edit':
        this.$router.push({
          name: 'edit',
          params: {
            id: row.superFormId
          }
        })
        break
      case 'publish':
        this.changeStatus(row)
        break
      case 'deadline':
        this.editModel = row
        this.changeTimeVisible = true
        break
      case 'delete':
        this.singleDelete(row)
        break
      case 'translate':
        this.$router.push({
          name: 'translate',
          params: {
            id: row.superFormId
          }
        })
        break
    }
  }

  /**
   * 是否已截止
   * @param deadline
   */
  public isExpired (deadline: number) {
    return deadline < Date.now()
  }

  public createForm () {
    this.$router.push({ name: 'create' })
  }

  private async deleteForm (row: Questionnaire.IForm) {
    const res = await FormAction.publish(row)
    if (res.success) {
      this.$message.success(this.$t('list.deletionSuccessfully').toString())
      this.fetchListData()
    } else {
      this.$message.error(this.$t('list.deletionFailed').toString())
    }
  }

  public singleDelete (row: Questionnaire.IForm) {
    this.$confirm(this.$t('list.reminderForDeletion').toString(), this.$t('list.reminder').toString(), {
      type: 'warning'
    }).then(async () => {
      this.deleteForm({ ...row, isActive: 0, client })
    }).catch(() => {})
  }

  /**
   * 查看统计
   * @param row
   */
  handleStatistics (row: Questionnaire.IForm) {
    this.$router.push({
      name: 'statisticsResult',
      params: {
        id: row.id
      }
    })
  }

  /**
   * 发布/收回
   * @param row
   */
  async changeStatus (row: Questionnaire.IForm) {
    this.loading = true
    const res = await FormAction.publish({
      superFormId: row.superFormId
    })
    this.loading = false
    if (res.success) {
      this.$message.success(this.$t('list.updateStatusSuccessfully').toString())
      this.fetchListData()
    } else {
      this.$message.error(res.msg)
    }
  }

  public async fetchListData () {
    this.loading = true
    const res = await FormAction.list()
    this.loading = false
    if (!res.success) return
    this.list = res.data ? res.data.filter(item => item.language === 'en-us') : []
  }
}
</script>

<style lang="scss" scoped>
.form-btn {
  margin: 10px;
}
</style>
