<template>
  <div v-loading.fullscreen.lock="loading">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="addDept">新增部门</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchParams.blurry" style="width: 300px;" clearable placeholder="输入工号、名称或者邮箱搜索" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="ios-search" @click="fetchListData">搜索部门</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table ref="table" :data="list" @selection-change="onSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="deptId" label="ID" />
        <el-table-column prop="isActive" label="状态" />
        <el-table-column prop="createdDate" label="创建日期" />
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

    <add-dept :visible.sync="addDeptVisible" @submit="fetchListData" />
    <edit-dept :visible.sync="editDeptVisible" :model="editModel" @submit="fetchListData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as DeptAction from '@/api/dept'
import AddDept from '@/views/dept/components/AddDept.vue'
import EditDept from '@/views/dept/components/EditDept.vue'
import { defaultDeptData } from '@/api/default'

interface ISearchOption {
  value: string,
  label: string
}

@Component({
  components: {
    AddDept,
    EditDept
  }
})
export default class extends Vue {
  private loading: boolean = false
  private searchParams: {
    ids: string[]
  } = {
    ids: []
  }
  private editModel: User.IDept = {
    ...defaultDeptData
  }
  private addDeptVisible: boolean = false
  private editDeptVisible: boolean = false
  private selectContent: User.IDept[] = []
  private pageParams: {
    page: number,
    size: number
  } = {
    page: 1,
    size: 10
  }
  private total: number = 0
  public list: User.IDept[] = []

  onChangePage (val: number) {
    this.pageParams.page = val
    this.fetchListData()
  }

  onSelectionChange (val: User.IDept[]) {
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

  handleEdit (row: User.IDept) {
    this.editModel = row
    this.editDeptVisible = true
  }

  handleDelete (row: User.IDept) {
    this.$confirm('确认删除此用户吗？', '删除', {
      type: 'warning'
    })
      .then(() => {
        this.delDept(row.id || '')
      })
      .catch(() => {})
  }

  public addDept () {
    this.addDeptVisible = true
  }

  private async delDept (nIds: string) {
    const res = await DeptAction.del({
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
        const rowIds = this.selectContent.map(({ id }) => id).join(',')
        this.delDept(rowIds)
      })
      .catch(() => {})
  }

  public clearAll () {
    this.$confirm('您确认删除全部内容吗？', '一键清空', {
      type: 'warning'
    })
      .then(async () => {
        const res = await DeptAction.clear()
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
    const res = await DeptAction.getDepts(
      this.searchParams)
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
