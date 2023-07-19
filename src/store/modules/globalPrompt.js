export default {
    namespaced: true,
    state: {
        isShow: false,
        msg: '',
        level: 'info',
        durationTime: 1000
    },
    mutations: {
        trigger (state, params) {
            /**
             * signal, 信号,类型为Object{
             *  msg: String,
             *  level: Enum('info', 'warning')
             * }
             */
            state.isShow = true
            if (typeof signal === 'object') {
                state.msg = params.msg
                state.level = params.level
            } else {
                state.msg = params
            }
            setTimeout(() => {
                state.isShow = false
                state.msg = ''
                state.level = 'info'
            }, state.durationTime)
        }
    }
}
