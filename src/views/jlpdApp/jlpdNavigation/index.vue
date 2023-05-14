<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="showDialog(null)">新增</el-button>
    </div>
    <el-table :loading="loading" :data="list" style="width: 100%">
      <el-table-column prop="index" label="序号" width="80">
        <template #default="{$index}">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="routing" label="导航栏路由地址" width="180" />
      <el-table-column prop="name" label="导航栏名称" width="180" />
      <el-table-column prop="img" label="导航栏图标" width="180">
        <template #default="{row}">
          <img width="70" :src="row.img">
        </template>
      </el-table-column>
      <el-table-column prop="imgBright" label="导航栏选中图标">
        <template #default="{row}">
          <img width="70" :src="row.imgBright">
        </template>
      </el-table-column>
      <el-table-column prop="setup" label="操作">
        <template #default="{row}">
          <el-button type="text" @click="showDialog(row.id)">编辑</el-button>
          <el-button type="text" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dialogTitle" width="30%" :visible.sync="dialogVisible" destroy-on-close @close="closeDialog">
      <!-- 在此处添加弹窗的表单或内容 -->
      <!-- 例如： -->
      <el-form label-width="130px">
        <el-form-item prop="routing" label="导航栏路由地址">
          <el-input v-model="dialogData.routing" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="name" label="导航栏名称">
          <el-input v-model="dialogData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="img" label="导航图标">
          <ItemUpload v-model="dialogData.img" />
        </el-form-item>
        <el-form-item prop="imgBright" label="导航图标选中">
          <ItemUpload v-model="dialogData.imgBright" />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveData">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addNav, delNav, getNavInfo, getNavList, updateNav } from '@/api/jlpdApp/navigation'
import ItemUpload from '@/components/ItemUpload'
export default {
  components: {
    ItemUpload
  },
  data() {
    return {
      list: [],
      dialogTitle: '',
      dialogVisible: false,
      dialogData: {
        id: '',
        routing: '',
        name: '',
        img: '',
        imgBright: ''
      },
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // before方法校验文件类型以及大小
    async handlerAvatarBefore(file) {
      const isLt2M = file.size
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (isLt2M > 1024 * 1024 * 10) {
          this.$message.warning('图片请控制在10Mb以内')
          return false
        } else {
          return
        }
      } else {
        this.$message.warning('只支持jpeg/jpg/png格式')
        return false
      }
    },
    async showDialog(id) {
      if (id) {
        // 编辑弹窗
        this.dialogTitle = '编辑导航栏'
        // 根据ID从后端或数据列表中获取对应的数据
        this.dialogData = await getNavInfo({ id })
      } else {
        // 新增弹窗
        this.dialogTitle = '新增导航栏'
        this.dialogData = {
          id: '',
          routing: '',
          name: '',
          img: '',
          imgBright: ''
        }
      }
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogData = {
        id: '',
        routing: '',
        name: '',
        img: '',
        imgBright: ''
      }
      this.dialogVisible = false
    },
    async saveData() {
      if (this.dialogData.id) {
        // 执行编辑操作
        await updateNav(this.dialogData)
      } else {
        // 执行新增操作
        await addNav(this.dialogData)
        console.log('Add:', this.dialogData)
      }
      this.fetchData()
      this.dialogVisible = false
    },
    async del(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delNav({ id: row.id })
        this.fetchData()
        this.$message.success('删除成功！')
      })
    },
    async fetchData() {
      this.loading = true
      this.list = await getNavList()
      this.loading = false
    }
  }
}
</script>
