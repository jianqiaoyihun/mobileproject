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
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 20"
          format="ss s"
          @finish="isCountDownShow = false"
        />
       <van-button slot="button"
        v-else
        round
        size="small"
        type="primary"
        @click="getCode"
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
import { login, code } from '@/api/user'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onLogin () {
      const user = this.user
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async getCode () {
      this.isCountDownShow = true
      const mobile = this.user.mobile
      const res = await code(mobile)
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
