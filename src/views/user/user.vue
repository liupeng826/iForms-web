<template>
  <div v-loading.fullscreen.lock="loading">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="addUser">新增用户</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :action="uploadUrl"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          name="userfile"
          :show-upload-list="false"
          :limit="1"
          :on-exceeded="onUploadExceeded"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
        >
          <el-button plain icon="el-icon-upload el-icon--right">批量导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchParams.blurry" style="width: 300px;" clearable placeholder="输入工号、名称或者邮箱搜索" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="ios-search" @click="fetchListData">搜索用户</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table :data="list" border @selection-change="onSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="userId" label="工号" />
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="sex" label="性别">
          <template slot-scope="{ row }">
            {{ row.sex | sexFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="client.name" label="客户端" />
        <el-table-column prop="market.description" label="市场" />
        <el-table-column prop="branch.name" label="分支机构" />
        <el-table-column prop="role" label="权限" />
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-20">
        <el-button type="danger" @click="batchDelete">批量删除</el-button>
        <el-button type="warning" @click="clearAll">一键清空</el-button>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        :current-page.sync="pageParams.page"
        :page-size="pageParams.size"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="onChangePage"
      />
    </div>

    <add-user :visible.sync="addUserVisible" @submit="fetchListData" />
    <edit-user :visible.sync="editUserVisible" :model="editModel" @submit="fetchListData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as UserAction from '@/api/user'
import AddUser from '@/views/user/components/AddUser.vue'
import EditUser from '@/views/user/components/EditUser.vue'
import { defaultUserData } from '@/api/default'

interface ISearchOption {
  value: string,
  label: string
}

@Component({
  components: {
    AddUser,
    EditUser
  }
})
export default class extends Vue {
  private loading: boolean = false
  private searchParams: {
    blurry: string
  } = {
    blurry: ''
  }
  private editModel: User.IUser = {
    ...defaultUserData
  }
  private addUserVisible: boolean = false
  private editUserVisible: boolean = false
  private selectContent: User.IUser[] = []
  private pageParams: {
    page: number,
    size: number
  } = {
    page: 1,
    size: 10
  }
  private total: number = 0
  public list: User.IUser[] = []

  get uploadUrl () {
    return `${process.env.VUE_APP_BASE_API}/user/upload`
  }

  onChangePage (val: number) {
    this.pageParams.page = val
    this.fetchListData()
  }

  onSelectionChange (val: User.IUser[]) {
    this.selectContent = val
  }

  onUploadExceeded () {
    this.$message.warning('仅支持单个单文件导入')
  }

  onUploadSuccess (response: any) {
    if (response.err === 0) {
      this.$message.success(response.msg)
      this.fetchListData()
    } else {
      this.$message.error('上传出错')
    }
  }

  onUploadError () {
    this.$message.error('上传出错')
  }

  handleEdit (row: User.IUser) {
    this.editModel = row
    this.editUserVisible = true
  }

  handleDelete (row: User.IUser) {
    this.$confirm('确认删除此用户吗？', '删除', {
      type: 'warning'
    })
      .then(() => {
        this.delUser(row.id || '')
      })
      .catch(() => {})
  }

  public addUser () {
    this.addUserVisible = true
  }

  private async delUser (nIds: string) {
    const res = await UserAction.del({
      u_id: nIds
    })
    if (res.success) {
      this.$message.success(`成功删除${res.data}个用户`)
      this.fetchListData()
    } else {
      this.$message.error(res.msg)
    }
  }

  public batchDelete () {
    this.$confirm('您确认删除这几条内容吗？', '批量删除', {
      type: 'warning'
    })
      .then(async () => {
        const rowIds = this.selectContent.map(({ u_id: id }) => id).join(',')
        this.delUser(rowIds)
      })
      .catch(() => {})
  }

  public clearAll () {
    this.$confirm('您确认删除全部内容吗？', '一键清空', {
      type: 'warning'
    })
      .then(async () => {
        const res = await UserAction.clear()
        if (res.success) {
          this.$message.success('清空用户成功')
          this.fetchListData()
        } else {
          this.$message.error(res.msg)
        }
      })
      .catch(() => {})
  }

  public async fetchListData () {
    this.loading = true
    const res = await UserAction.list(
      this.searchParams,
      this.pageParams)
    this.loading = false
    if (res.success) {
      this.list = res.data
      this.total = res.data.size
    } else {
      this.$message.error(res.msg)
    }
  }

  mounted () {
    this.fetchListData()
  }
}
</script>

<style scoped>

</style>
