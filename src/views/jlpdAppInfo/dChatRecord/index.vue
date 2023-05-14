<template>
  <div class="app-container">
    <el-radio-group v-model="type" size="medium">
      <el-radio-button label="private">单人聊天记录</el-radio-button>
      <el-radio-button label="group">群聊聊天记录</el-radio-button>
    </el-radio-group>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="index" label="序号" width="80">
        <template #default="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="topic"
        label="订阅路径"
        width="180"
      />
      <el-table-column
        prop="userId"
        label="消息发送者Id"
        width="180"
      />
      <el-table-column
        prop="username"
        label="消息发送者用户名"
        width="180"
      />
      <el-table-column
        prop="text"
        label="消息内容"
        width="180"
      />
      <el-table-column
        prop="createdAt"
        label="消息生成时间"
        width="180"
      />
      <el-table-column
        prop="messageTTL"
        label="用于清空聊天"
        width="180"
      />
      <el-table-column
        prop="groupId"
        label="消息群Id"
        width="180"
      />
      <el-table-column
        prop="groupName"
        label="消息群名称"
        width="180"
      />
      <el-table-column
        prop="type"
        label="消息类型"
        width="180"
      />
    </el-table>
    <div style="display: flex;justify-content: end;margin-top: 20px">
      <el-pagination background :current-page.sync="query.pageNum" :page-size.sync="query.pageSize" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>
<script>
import { getMessage } from '@/api/jlpdAppInfo/chat'

export default {
  data() {
    return {
      loading: false,
      type: 'private',
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
    },
    type: {
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
    fetchData() {
      getMessage({ ...this.query, type: this.type }).then(r => {
        this.tableData = r.messageDTOS
        this.total = r.page.totalElements
      })
    }
  }
}
</script>
