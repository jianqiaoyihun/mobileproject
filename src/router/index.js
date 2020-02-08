import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
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
  // 要注意路由匹配的优先级，从上到下
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
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
  },
  { // 我的作品
    path: '/my-article/:type?',
    name: 'my-article',
    component: () => import('@/views/user-articles'),
    props: true
  }
  // { // 我的收藏
  //   path: '/my-article/collect',
  //   name: 'my-article-collect',
  //   component: () => import('@/views/user-articles')
  // },
  // { // 我的历史
  //   path: '/my-article/history',
  //   name: 'my-article-history',
  //   component: () => import('@/views/user-articles')
  // }
]

const router = new VueRouter({
  routes
})

export default router
