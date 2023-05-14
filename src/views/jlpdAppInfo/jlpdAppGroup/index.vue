<template>
  <div class="app-container">
    <div>
      <el-input v-model="search" style="width: 200px" placeholder="请输入搜索" />
      <el-button type="primary" @click="filters">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="index" label="序号" width="80">
        <template #default="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="groupHead" label="群头像" width="180">
        <template #default="{row}">
          <img width="70" :src="row.groupHead">
        </template>
      </el-table-column>
      <el-table-column prop="foxCode" label="群号" width="180" />
      <el-table-column prop="name" label="群名称" width="180" />
      <el-table-column prop="desc" label="群介绍" width="200" :show-overflow-tooltip="true" />
      <el-table-column prop="notice" label="群公告" width="200" :show-overflow-tooltip="true" />
      <el-table-column prop="ownerName" label="群主昵称" />
      <!--      <el-table-column fixed="right" prop="isDisabled" label="群状态" width="120">-->
      <!--        <template #default="{row}">-->
      <!--          <el-switch v-model="row.isDisabled" @change="val => editStatus(row,val)" />-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="createdAt" label="创建时间" width="200" />
      <el-table-column prop="setup" label="操作">
        <template #default="{row}">
          <el-button type="text" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: end;margin-top: 20px">
      <el-pagination background :current-page.sync="query.pageNum" :page-size.sync="query.pageSize" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>
<script>
import { getGroups, removeGroup } from '@/api/jlpdAppInfo/group'

export default {
  data() {
    return {
      loading: false,
      query: {
        pageSize: 10,
        pageNum: 1
      },
      search: '',
      total: 0,
      tableData: []
    }
  },
  watch: {
    query: {
      handler(val) {
        this.fetchData()
      },
      deep: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    reset() {
      this.search = ''
      this.query.pageNum = 1
      this.fetchData()
    },
    del(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await removeGroup({ groupId: row.id })
        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    filters() {
      this.fetchData()
    },
    async fetchData() {
      this.loading = true
      const { content, totalElements } = await getGroups({ ...this.query, search: this.search })
      this.tableData = content
      this.total = totalElements
      this.loading = false
    }
  }
}
</script>
