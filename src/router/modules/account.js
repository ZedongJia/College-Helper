export default {
    path: '/account',
    redirect: '/account/login',
    component: () => import('@/views/account/Account.vue'),
    children: [
        {
            name: 'login',
            path: 'login',
            component: () => import('@/views/account/Login.vue')
        },
        {
            name: 'register',
            path: 'register',
            component: () => import('@/views/account/Register.vue')
        },
        {
            name: 'forget',
            path: 'forget',
            component: () => import('@/views/account/Forget.vue')
        }
    ]
}
