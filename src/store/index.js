import { createStore } from 'vuex'

export default createStore({
    state: {
        userInfo: {
            nickname: '雨霖铃',
            account: '',
            password: '',
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
        }
    },
    mutations: {
        updateCurrNode(state, params) {
            state.currNode = params
        },
        updateShowTree(state) {
            state.showTree = !state.showTree
        }
    }
})
