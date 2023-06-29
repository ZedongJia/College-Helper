import { createRouter, createWebHashHistory } from 'vue-router'
import MainBoard from '@/views/MainBoard.vue'
import Login from '@/views/Login.vue'
import Identification from '@/views/Identification.vue'
import Test from '@/views/Test.vue'

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
    redirect: '/mainBoard/identification',
    component: MainBoard,
    children: [
      {
        path: 'identification',
        component: Identification
      }
    ]
  },
  {
    path: '/test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
