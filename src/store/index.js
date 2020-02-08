import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'
Vue.use(Vuex)
const USER_KEY = 'user'
export default new Vuex.Store({
  state: {
    // user: null // 用来存储令牌，要么是null，要么是一个对象
    user: getItem(USER_KEY),
    cachePages: ['TabBar']
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
    },

    // 添加缓存页面
    addCachePage (state, name) {
      if (!state.cachePages.includes(name)) {
        state.cachePages.push(name)
      }
    },

    // 移除缓存页面
    removeCachePage (state, name) {
      const index = state.cachePages.indexOf(name)
      if (index !== -1) {
        state.cachePages.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
