<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 表单信息 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号" />

      <van-field
        v-model="user.code"
        left-icon="phone-o"
        placeholder="请输入验证码">
       <van-button slot="button"
        round
        size="small"
        type="primary"
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login_but">
      <van-button type="info" style="width:100%;color:#fff;font-size:16px" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      const user = this.user
      const res = await login(user)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
  .login_but {
    padding: 0 16px;
    padding-top: 27px;

  }
</style>
