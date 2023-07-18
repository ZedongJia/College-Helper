export default {
    namespaced: true,
    state: {
        isShow: false,
        msg: '',
        durationTime: 1000
    },
    mutations: {
        trigger (state, msg) {
            console.log('enter')
            state.isShow = true
            state.msg = msg
            setTimeout(() => {
                state.isShow = false
                state.prompt = ''
            }, state.durationTime)
        }
    }
}
