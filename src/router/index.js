import { createRouter, createWebHashHistory } from 'vue-router'
import MainBoard from '@/views/MainBoard.vue'
import Login from '@/views/Login.vue'
import Identification from '@/views/Identification.vue'
import DetailContent from '@/views/DetailContent.vue'
import EntitySearch from '@/views/EntitySearch.vue'
import RelationSearch from '@/views/RelationSearch.vue'
import Overview from '@/views/Overview.vue'
import Agricultural from '@/views/AgriculturalQA.vue'
import Test from '@/views/Test.vue'
import ChatAI from '@/views/ChatAI.vue'

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
        children: [
          {
            path: '',
            component: Identification
          },
          {
            path: 'detailContent',
            component: DetailContent,
            props(route) {
              return {
                entity: route.query.entity
              }
            }
          }
        ]
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
      },
      {
        path: 'chatAI',
        component: ChatAI
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
