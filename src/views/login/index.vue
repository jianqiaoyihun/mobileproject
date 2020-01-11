<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 表单信息 -->
    <ValidationObserver ref="myform">
      <ValidationProvider name="手机号" immediate rules="required|mobile" v-slot="{ errors }">
        <van-field
          v-model="user.mobile"
          left-icon="phone-o"
          placeholder="请输入手机号" />
      </ValidationProvider>
      <ValidationProvider name="验证码" immediate rules="required|code">
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
      </ValidationProvider>
    </ValidationObserver>
    <!-- 登录按钮 -->
    <div class="login_but">
      <van-button type="info" style="width:100%;color:#fff;font-size:16px" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, code } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onLogin () {
      // 获取表单数据
      const user = this.user

      // 表单验证
      const success = await this.$refs.myform.validate()
      if (!success) {
        // 必须得给 ValidationProvider 配置 immediate  ，负责拿不到errors数据
        const errors = this.$refs.myform.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }

      // 开启登录验证
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })

      // 手动停止提示
      // 提示对象.clear()

      // 请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async getCode () {
      try {
        // 获取手机号
        const { mobile } = this.user
        // 定义手机验证规则
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        // 如果验证失败，提示错误消息，停止发送验证码
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        this.isCountDownShow = true
        const res = await code(mobile)
        console.log(res)
      } catch (err) {
        console.log(err)
        // 关闭验证码显示
        this.isCountDownShow = false
        this.$toast('请勿频繁操作')
      }
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
