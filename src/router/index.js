import { createRouter, createWebHashHistory } from 'vue-router'
import MainBoard from '@/views/MainBoard.vue'
import Login from '@/views/Login.vue'
import Identification from '@/views/Identification.vue'
import EntitySearch from '@/views/EntitySearch.vue'
import RelationSearch from '@/views/RelationSearch.vue'
import Overview from '@/views/Overview.vue'
import Agricultural from '@/views/AgriculturalQA.vue'
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
      },
      {
        path: 'entitySearch',
        component: EntitySearch
      },
      {
        path: 'relationSearch',
        component: RelationSearch
      },
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'agriculturalQA',
        component: Agricultural
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
