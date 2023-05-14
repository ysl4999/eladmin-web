<template>
  <div class="app-container">
    <h4>关于文本</h4>
    <el-input v-model="value" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入内容" />
    <div style="margin-top: 10px">
      <el-button type="primary" @click="save">保存修改</el-button>
    </div>
  </div>
</template>
<script>
import { getText, saveText } from '@/api/jlpdAppInfo/text'

export default {
  data() {
    return {
      loading: false,
      value: ''
    }
  },
  created() {
    this.info()
  },
  methods: {
    info() {
      getText().then(r => {
        this.value = JSON.parse(r[0].value)
      })
    },
    async save() {
      this.loading = true
      await saveText(this.value)
      this.$message.success('保存成功！')
      this.info()
      this.loading = false
    }
  }
}
</script>
