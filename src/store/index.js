import { createStore } from 'vuex'

export default createStore({
    state: {
        userInfo: {
            ID: -1,
            nickname: '雨霖铃',
            image: 'test.png'
        },
        currNode: {
            parent: 'root',
            children: [],
            nodename: ''
        },
        showTree: false
    },
    getters: {
        getCurrNode(state) {
            return state.currNode
        },
        getUserInfo(state) {
            return state.userInfo
        },
        isShowTree(state) {
            return state.showTree
        },
        isLogin(state) {
            return state.userInfo.ID !== -1
        }
    },
    mutations: {
        updateCurrNode(state, params) {
            state.currNode = params
        },
        updateShowTree(state) {
            state.showTree = !state.showTree
        },
        updateUserInfo(state, userInfo) {
            state.userInfo.ID = userInfo.ID
            state.userInfo.nickname = userInfo.nickname
            state.userInfo.image = userInfo.image
        }
    }
})
