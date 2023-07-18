export default {
    path: 'identification',
    children: [
        {
            path: '',
            component: () => import('@/views/Identification.vue')
        },
        {
            name: 'detailContent',
            path: 'detailContent',
            component: () => import('@/views/DetailContent.vue'),
            props (route) {
                return {
                    entity: route.query.entity
                }
            }
        }
    ]
}
