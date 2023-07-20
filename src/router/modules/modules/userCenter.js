export default {
    path: 'userCenter',
    redirect: 'userCenter/homePage',
    component: () => import('@/views/userCenter/UserCenter.vue'),
    children: [
        {
            path: 'homePage',
            component: () => import('@/views/userCenter/views/HomePage.vue')
        },
        {
            path: 'infoBoard',
            component: () => import('@/views/userCenter/views/InfoBoard.vue')
        },
        {
            path: 'privacyBoard',
            component: () => import('@/views/userCenter/views/PrivacyBoard.vue')
        },
        {
            path: 'historyBoard',
            component: () => import('@/views/userCenter/views/HistoryBoard.vue')
        },
        {
            path: 'collectBoard',
            component: () => import('@/views/userCenter/views/CollectBoard.vue')
        },
        {
            path: 'contactBoard',
            component: () => import('@/views/userCenter/views/ContactBoard.vue')
        }
    ]
}
