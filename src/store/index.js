import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)
const USER_KEY = 'user'
export default new Vuex.Store({
  state: {
    // user: null // 用来存储令牌，要么是null，要么是一个对象
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      setItem(USER_KEY, state.user)
    },
    remUser () {
      removeItem(USER_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
