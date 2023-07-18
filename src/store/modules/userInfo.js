export default {
    namespaced: true,
    state: {
        ID: -1,
        nickname: '张三',
        image: 'http://localhost:8000/gallery/match/?ID=5'
    },
    getters: {
        hasLogin(state) {
            return state.userInfo.ID !== -1
        }
    },
    mutations: {
        update (state, userInfo) {
            state.ID = userInfo.ID
            state.nickname = userInfo.nickname
            state.image = userInfo.image
        }
    }
}
