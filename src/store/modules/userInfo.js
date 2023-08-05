const defaultUser = {
    ID: -1,
    nickname: '张三',
    image: 'http://localhost:8000/gallery/match/?ID=5'
}

export default {
    namespaced: true,
    state: {
        ID: -1,
        nickname: '张三',
        image: 'http://localhost:8000/gallery/match/?ID=5'
    },
    mutations: {
        update (state, userInfo) {
            state.ID = userInfo.id
            state.nickname = userInfo.nickname
            state.image = userInfo.image
            // 持久化存储
            localStorage.setItem('userInfo', JSON.stringify(state))
        },
        refresh (state) {
            state.ID = defaultUser.ID
            state.nickname = defaultUser.nickname
            state.image = defaultUser.image
            localStorage.clear()
        }
    }
}
