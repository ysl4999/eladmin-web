<template>
  <div v-loading="loading" class="app-container">
    <div class="config-container">
      <span class="config-item">
        <h4>登录配置</h4>
        <el-form :model="userLogin">
          <el-form-item label="手机号 + 密码验证">
            <el-switch v-model="userLogin.MOBILE_PASSWORD" @change="updateLoginConf" />
          </el-form-item>
          <el-form-item label="用户名 + 密码验证">
            <el-switch v-model="userLogin.USERNAME_PASSWORD" @change="updateLoginConf" />
          </el-form-item>
          <el-form-item label="邮箱号 + 密码验证">
            <el-switch v-model="userLogin.EMAIL_PASSWORD" @change="updateLoginConf" />
          </el-form-item>
          <el-form-item label="手机 + 验证码">
            <el-switch v-model="userLogin.MOBILE_CODE" @change="updateLoginConf" />
          </el-form-item>
          <el-form-item label="邮箱 + 验证码">
            <el-switch v-model="userLogin.EMAIL_CODE" @change="updateLoginConf" />
          </el-form-item>
        </el-form>
      </span>
      <span class="config-item">
        <h4>注册配置</h4>
        <el-form :model="userRegister">
          <el-form-item label="手机号 + 密码注册">
            <el-switch v-model="userRegister.MOBILE_PASSWORD" @change="updateRegConf" />
          </el-form-item>
          <el-form-item label="用户名 + 密码注册">
            <el-switch v-model="userRegister.USERNAME_PASSWORD" @change="updateRegConf" />
          </el-form-item>
          <el-form-item label="邮箱 + 密码注册">
            <el-switch v-model="userRegister.EMAIL_PASSWORD" @change="updateRegConf" />
          </el-form-item>
        </el-form>
      </span>
    </div>
  </div>
</template>

<script>
import { getLoginConfig, getRegisterConfig, updateLoginConfig, updateRegisterConfig } from '@/api/jlpdApp/jipdConfig'

export default {
  data() {
    return {
      loading: false,
      userLogin: {
        MOBILE_PASSWORD: true,
        USERNAME_PASSWORD: true,
        EMAIL_PASSWORD: false,
        MOBILE_CODE: false,
        EMAIL_CODE: false
      },
      userRegister: {
        MOBILE_PASSWORD: false,
        USERNAME_PASSWORD: true,
        EMAIL_PASSWORD: false
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    async updateLoginConf() {
      await updateLoginConfig(this.userLogin)
      this.getConfig()
      this.$message.success('修改成功！')
    },
    async updateRegConf() {
      await updateRegisterConfig(this.userRegister)
      this.getConfig()
      this.$message.success('修改成功！')
    },
    async getConfig() {
      this.loading = true
      this.userLogin = await getLoginConfig()
      this.userRegister = await getRegisterConfig()
      this.loading = false
    }
  }
}
</script>

<style scoped>
.config-container{
  display: flex;
}
.config-item{
  width: 20%;
  display: inline-block;
}
</style>
