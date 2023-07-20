export default {
    path: 'identification',
    children: [
        {
            path: '',
            component: () => import('@/views/mainBoard/Identification.vue')
        },
        {
            name: 'detailContent',
            path: 'detailContent',
            component: () => import('@/views/mainBoard/DetailContent.vue'),
            props (route) {
                return {
                    entity: route.query.entity
                }
            }
        }
    ]
}
