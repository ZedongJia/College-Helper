import identification from './modules/identification'
import userCenter from './modules/userCenter.js'

export default {
    name: 'system',
    path: '/system',
    redirect: '/system/identification',
    component: () => import('@/views/System.vue'),
    children: [
        identification,
        {
            path: 'entitySearch',
            component: () => import('@/views/mainBoard/EntitySearch.vue')
        },
        {
            path: 'relationSearch',
            component: () => import('@/views/mainBoard/RelationSearch.vue')
        },
        {
            path: 'overview',
            component: () => import('@/views/mainBoard/overview/Overview.vue')
        },
        {
            path: 'interest',
            component: () => import('@/views/Interest.vue')
        },
        {
            path: 'chatAI',
            component: () => import('@/views/mainBoard/ChatAI.vue')
        },
        userCenter
    ]
}
