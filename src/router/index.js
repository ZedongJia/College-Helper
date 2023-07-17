import { createRouter, createWebHashHistory } from 'vue-router'
import { validCookie } from '@/api/user'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/mainBoard',
        redirect: '/mainBoard/identification',
        component: () => import('@/views/MainBoard.vue'),
        children: [
            {
                path: 'identification',
                children: [
                    {
                        path: '',
                        component: () => import('@/views/Identification.vue')
                    },
                    {
                        path: 'detailContent',
                        component: () => import('@/views/DetailContent.vue'),
                        props (route) {
                            return {
                                entity: route.query.entity
                            }
                        }
                    }
                ]
            },
            {
                path: 'entitySearch',
                component: () => import('@/views/EntitySearch.vue')
            },
            {
                path: 'relationSearch',
                component: () => import('@/views/RelationSearch.vue')
            },
            {
                path: 'overview',
                component: () => import('@/views/Overview.vue')
            },
            {
                path: 'agriculturalQA',
                component: () => import('@/views/AgriculturalQA.vue')
            },
            {
                path: 'userCenter',
                component: () => import('@/views/userCenter/UserCenter.vue')
            },
            {
                path: 'chatAI',
                component: () => import('@/views/ChatAI.vue')
            }
        ]
    },
    {
        path: '/test',
        component: () => import('@/views/Test.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    // 跳过login
    if (from.fullPath !== '/login' && to.fullPath !== '/' && to.fullPath !== '/login') {
        // 检测
        validCookie().then((response) => {
            console.log(response)
            if (response.data - 400 === 0) {
                router.push({
                    name: 'login'
                })
            }
        }).catch(() => {
            router.push({
                name: 'login'
            })
        })
    }
})

export default router
