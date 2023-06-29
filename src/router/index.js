import { createRouter, createWebHashHistory } from 'vue-router'
import MainBoard from '@/views/MainBoard.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/mainBoard',
    component: MainBoard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
