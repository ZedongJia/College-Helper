import { createStore } from 'vuex'

export default createStore({
  state: {
    currNode: {
      parent: '',
      children: []
    },
    showTree: false
  },
  getters: {
    getCurrNode(state) {
      return state.currNode
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
