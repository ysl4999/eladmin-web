<template>
  <div v-loading="loading" class="app-container">
    <h4>app Logo配置</h4>
    <div class="el-upload">
      <img :src="imageInfo.value" title="点击上传头像" class="avatar">
    </div>
    <el-upload
      :limit="1"
      accept=".jpeg,.png"
      action=""
      :show-file-list="false"
      :http-request="(file) =>{handleAvatarSuccess(file,'自定义参数')}"
      :before-upload="handlerAvatarBefore"
    >
      <el-button type="primary">修改logo</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getLogoInfo, setLogo } from '@/api/jlpdApp/jipdConfig'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      imageInfo: {
        id: null,
        name: '',
        value: '',
        operator: '',
        createAt: null,
        updateAt: null
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'fileUploadApi',
      'baseApi'
    ])
  },
  created() {
    this.getLogo()
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
    async handleAvatarSuccess(files, params) {
      this.loading = true
      const { file, name } = files
      const formData = new FormData()
      formData.append('file', file, name) // 这个file默认接受的一整个	element上传文件的对象，文件在里面的file字段里面
      await setLogo(formData)
      this.loading = false
      this.$message.success('修改成功！')
      this.getLogo()
    },
    getLogo() {
      this.loading = true
      getLogoInfo().then(res => {
        this.imageInfo = res
        this.loading = false
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

