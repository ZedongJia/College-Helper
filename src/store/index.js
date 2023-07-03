import { createStore } from 'vuex'

export default createStore({
  state: {
    currNode: {
      parent: '',
      children: []
    }
  },
  getters: {
    getCurrNode(state) {
      return state.currNode
    }
  },
  mutations: {
    updateCurrNode(state, params) {
      console.log(state)
      state.currNode = params
    }
  }
})
