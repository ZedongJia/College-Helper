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
            component: () => import('@/views/mainBoard/Interest.vue')
        },
        {
            path: 'chatAI',
            component: () => import('@/views/mainBoard/ChatAI.vue')
        },
        {
<<<<<<< HEAD
            path: 'scoreVisual',
            component: () => import('@/views/mainBoard/ScoreVisual.vue')
=======
            path: 'feedback',
            component: () => import('@/views/mainBoard/Feedback.vue')
>>>>>>> 9c5b9c365ec6a937ceb83426390af3ac661b5cd7
        },
        userCenter
    ]
}
