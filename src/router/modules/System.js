import identification from './modules/identification'

export default {
    name: 'system',
    path: '/system',
    redirect: '/system/identification',
    component: () => import('@/views/System.vue'),
    children: [
        identification,
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
            component: () => import('@/views/overview/Overview.vue')
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
}
