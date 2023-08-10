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
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    actions: {
        update({ state, commit }) {
            if (state.someList.length === 12) {
                commit('fetch', {
                    status: 'refresh'
                })
            }
            state.someList = state.someList.slice(6, state.someList.length)
            console.log(state.someList.length)
        }
    }
}
