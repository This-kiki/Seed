<template>
  <div>
    <el-row class="login-body">
      <el-col :span="5" :offset="9">
        <el-form :model="loginForm" :rules="rules" label-width="100px" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setToken } from '../../utils/auth'
//引入验证组件
export default {
  data() {
    return {
      activeName: 'login', //选项卡
      loginForm: {
        //表单v-model的值
        username: '',
        password: '',
      },
      rules: {
        //验证规则
        username: [
          { required: true, message: '用户名不能少', trigger: 'blur' },
          { min: 4, max: 16, message: '用户名在4到16位之间', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          // formdata
          var opt = new FormData()
          opt.append('username', this.loginForm.username)
          opt.append('password', this.loginForm.password)
          this.$http.userLogin(opt).then(({ data }) => {
            console.log('result for login', data)
            if (data.token) {
              this.$message({
                type: 'success',
                message: '登录成功',
              })
              let token = data.token
              this.$store.commit('user/setToken', token)
              setToken(token)
              //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
              let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/index')
              console.log('登陆成功，跳转到->', redirectUrl)
              this.$router.push({
                path: redirectUrl,
              })
            } else {
              this.$message({
                type: 'info',
                message: '登陆失败',
              })
            }
          })
        } else {
          //验证不通过
          console.log('error submit')
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.login-body {
  margin-top: 20%;
}
</style>