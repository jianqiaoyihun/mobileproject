import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

// 要在axios响应到达拦截之前进行一次转换，
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  }
)
export default request
