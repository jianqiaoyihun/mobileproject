import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载验证插件的初始配置
import './utils/validations'
import './utils/register-vant.js'
import 'amfe-flexible'
import './styles/index.less'

// 加载初始日期时间库
import './utils/datetime'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
