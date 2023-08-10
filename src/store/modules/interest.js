import { Recommendation } from '@/api/entity'
export default {
    namespaced: true,
    state: {
        someList: []
    },
    getters: {
        getSomeList(state) {
            return state.someList.slice(0, 6)
        }
    },
    mutations: {
        fetch(state, params) {
            Recommendation(params)
                .then((recommdList) => {
                    state.someList = state.someList.concat(recommdList)
                    if (params.status === 'refresh') {
                        state.someList = state.someList.slice(6)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    actions: {
        update({ state, commit }) {
            if (state.someList.length === 6) {
                commit('fetch', {
                    status: 'refresh'
                })
            }
        }
    }
}
