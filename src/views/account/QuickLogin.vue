<template>
    <InfoForm
        title="快速登录"
        :warning="warning"
        :inputs="inputs"
        :buttons="buttons"
        @receive="r"
        Popover
    ></InfoForm>
</template>
<script>
// import { loginGET } from '@/api/user.js'
// import { jumpTo } from '@/utils/callback.js'
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'text',
                    title: '手机号',
                    symbol: 'account'
                },
                {
                    type: 'valid',
                    title: '验证码',
                    symbol: 'sms',
                    callback: (account) => {
                        console.log(account)
                    }
                }
            ],
            buttons: [
                {
                    title: '登录',
                    symbol: 'login'
                },
                {
                    title: '去账号登录',
                    symbol: 'to login'
                }
            ],
            warning: ''
        }
    },
    methods: {
        signIn(loginMsg) {
            // if (loginMsg.account === '') {
            //     this.raise('手机号不能为空')
            //     return
            // } else if (loginMsg.sms === '') {
            //     this.raise('验证码不能为空')
            //     return
            // }
            // let userinfo = {}
            // loginGET({
            //     account: loginMsg.account,
            //     password: loginMsg.password
            // })
            //     .then((response) => {
            //         if (JSON.stringify(response.data) !== '{}') {
            //             userinfo = response.data
            //             this.$store.commit('userInfo/update', userinfo)
            //             // 产生提示框
            //             this.$store.commit('prompt/trigger', '登陆成功')
            //             // 跳转
            //             jumpTo(() => {
            //                 this.$router.push({
            //                     path: '/system'
            //                 })
            //             })
            //         } else {
            //             this.raise('没有该用户的信息')
            //         }
            //     })
            //     .catch(() => {
            //         this.$store.commit('prompt/trigger', {
            //         msg: '网络故障，请重试',
            //         level: 'warning'
            //         })
            //     })
        },
        toRegister() {
            this.$router.push({
                name: 'login'
            })
        },
        r(e) {
            switch (e.name) {
                case 'login':
                    this.signIn(e.inputsF)
                    break
                case 'to login':
                    this.toRegister()
                    break
            }
        },
        /**
         * 警告
         * @param {String} msg message to raise
         */
        raise(msg) {
            // 产生警告
            this.warning = msg
        }
    }
}
</script>
