<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="index" label="序号" width="80">
        <template #default="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="avatarUrl" label="群头像" width="180">
        <template #default="{row}">
          <img width="70" :src="row.avatarUrl">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="mobile" label="手机号" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column prop="region" label="地区" width="180" />
      <el-table-column prop="createdAt" label="注册时间" width="180" />
      <el-table-column prop="createIp" label="注册IP" width="180" />
      <el-table-column prop="loginIp" label="当前登录IP" width="180" />
      <el-table-column fixed="right" prop="isDisabled" label="账号状态" width="120">
        <template #default="{row}">
          <el-switch v-model="row.isDisabled" @change="val => editStatus(row,val)" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="autoAdd" label="自动添加" width="120">
        <template #default="{row}">
          <el-switch v-model="row.autoAdd" @change="val => editAutoAdd(row,val)" />
        </template>
      </el-table-column>
      <el-table-column prop="statusText" label="状态" fixed="right" />
    </el-table>
    <div style="display: flex;justify-content: end;margin-top: 20px">
      <el-pagination background :current-page.sync="query.pageNum" :page-size.sync="query.pageSize" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script>
import { getUserList, updateUserAutoAdd, updateUserStatus } from '@/api/jlpdAppInfo/users'

export default {
  data() {
    return {
      loading: false,
      query: {
        pageSize: 10,
        pageNum: 1
      },
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
    async editStatus(val, status) {
      await updateUserStatus({ userId: val.id, isDisabled: status })
      this.fetchData()
      this.$message.success('修改成功！')
    },
    async editAutoAdd(val, status) {
      await updateUserAutoAdd({ userId: val.id, autoAdd: status })
      this.fetchData()
      this.$message.success('修改成功！')
    },
    async fetchData() {
      this.loading = true
      const { content, totalElements } = await getUserList(this.query)
      this.tableData = content
      this.total = totalElements
      this.loading = false
    }
  }
}
</script>
