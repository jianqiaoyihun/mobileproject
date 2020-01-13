import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
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
