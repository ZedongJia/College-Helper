export default {
    namespaced: true,
    state: {
        currNode: {
            parent: 'root',
            children: [],
            name: ''
        },
        isShow: false
    },
    mutations: {
        updateNode (state, params) {
            state.currNode = params
        },
        show (state) {
            state.isShow = true
        },
        hide (state) {
            state.isShow = false
        }
    }
}
