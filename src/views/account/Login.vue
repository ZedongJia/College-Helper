<template>
    <InfoForm
        title="登录"
        :warning="warning"
        :inputs="inputs"
        :buttons="buttons"
        @receive="r"
        Popover
    ></InfoForm>
</template>
<script>
import { loginGET } from '@/api/user.js'
import { jumpTo } from '@/utils/callback.js'
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'text',
                    title: '账号',
                    symbol: 'account'
                },
                {
                    type: 'password',
                    title: '密码',
                    symbol: 'password'
                }
            ],
            buttons: ['login', 'to register'],
            warning: ''
        }
    },
    methods: {
        signIn(loginMsg) {
            if (loginMsg.account === '') {
                this.raise('账号信息不能为空')
                return
            } else if (loginMsg.password === '') {
                this.raise('密码不能为空')
                return
            }
            let userinfo = {}
            loginGET({
                account: loginMsg.account,
                password: loginMsg.password
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        userinfo = response.data
                        this.$store.commit('userInfo/update', userinfo)
                        // 产生提示框
                        this.$store.commit('prompt/trigger', '登陆成功')
                        // 跳转
                        jumpTo(() => {
                            this.$router.push({
                                path: '/mainBoard'
                            })
                        })
                    } else {
                        this.raise('没有该用户的信息')
                    }
                })
                .catch(() => {
                    this.raise('网络故障，请重试')
                })
        },
        toRegister() {
            this.$router.push({
                name: 'register'
            })
        },
        r(e) {
            switch (e.name) {
                case 'login':
                    this.signIn(e.inputsF)
                    break
                case 'to register':
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
