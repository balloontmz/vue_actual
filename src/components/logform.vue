<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <div class="g-form-label">用户名：</div>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名"/>
          <span class="g-form-error">{{ userErrors.errorText }}</span>
        </div>
      </div>

      <div class="g-form-line">
        <div class="g-form-label">密码：</div>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码"/>
          <span class="g-form-error">{{ passwordErrors.errorText }}</span>
        </div>
      </div>

      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <span>{{ errorText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logform',
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: '',
      userFlag: false,
      pwFlag: false
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      } else {
        status = true
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status: status,
        errorText: errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码位数为1-6位'
      } else {
        status = true
        errorText = ''
      }
      if (!this.pwFlag) {
        errorText = ''
        this.pwFlag = true
      }
      return {
        status, errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        // alert('账户名或者密码错误')
        this.errorText = '部分选项不合格'
      } else {
        // alert('登录操作')
        this.errorText = ''
        this.$http.get('api/login').then(
          (res) => {
            this.$emit('has-log', res.data)
          }, (err) => {
            console.log(err)
          }
        )
      }
      // console.log(this.usernameModel, this.passwordModel)
    }
  }
}
</script>

<style scoped>

</style>
