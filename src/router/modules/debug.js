export default {
    path: '/test',
    component: () => import('@/views/debug/BackendTest.vue'),
    children: [
        {
            path: '/backend',
            component: () => import('@/views/debug/BackendTest.vue')
        }
    ]
}
