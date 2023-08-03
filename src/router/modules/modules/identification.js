export default {
    path: 'identification',
    children: [
        {
            path: '',
            component: () => import('@/views/mainBoard/identification/Identification.vue')
        },
        {
            name: 'detailContent',
            path: 'detailContent',
            component: () => import('@/views/mainBoard/identification/Detail.vue'),
            props (route) {
                return {
                    entity: route.query.entity
                }
            }
        }
    ]
}
