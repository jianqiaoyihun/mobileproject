import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    // 参考文档：https://router.vuejs.org/zh/guide/essentials/passing-props.html
    props: true
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/user/:userId',
    component: () => import('@/views/user')
  },
  {
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      {
        path: 'qu',
        component: () => import('@/views/qu')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
