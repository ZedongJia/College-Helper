<template>
    <InfoForm
        v-if="isRegister"
        :title="title"
        :warning="warning"
        :inputs="registerLayout.inputs"
        :buttons="registerLayout.buttons"
        @receive="r"
        Popover
    ></InfoForm>
    <InfoForm
        v-if="!isRegister"
        :title="title"
        :warning="warning"
        :inputs="loginLayout.inputs"
        :buttons="loginLayout.buttons"
        @receive="r"
        Popover
    ></InfoForm>
    <!-- <BackGround></BackGround> -->
</template>
<script>
import { loginGET, registerPOST } from '@/api/user.js'
export default {
    data() {
        return {
            isRegister: false,
            title: '垂直农业知识图谱',
            loginLayout: {
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
                buttons: ['login', 'to register']
            },
            registerLayout: {
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
                    },
                    {
                        type: 'password',
                        title: '再次确认密码',
                        symbol: 'confirm'
                    }
                ],
                buttons: ['register', 'to login']
            },
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
                        console.log(response)
                        userinfo = response.data
                        this.$store.commit('updateUserInfo', userinfo)
                        this.$router.push({
                            path: '/mainBoard'
                        })
                    } else {
                        this.raise('没有该用户的信息')
                    }
                })
                .catch(() => {
                    this.raise('没有该用户的信息')
                })
        },
        signUp(registerMsg) {
            if (registerMsg.account === '') {
                this.raise('账号信息不能为空')
                return
            } else if (registerMsg.password === '') {
                this.raise('密码不能为空')
                return
            } else if (registerMsg.confirm !== registerMsg.password) {
                this.raise('密码与确认密码必须相同')
            }
            let state = -1
            registerPOST({
                account: registerMsg.account,
                password: registerMsg.password
            })
                .then((response) => {
                    state = response.data
                    if (state - 200 === 0) {
                        this.loginTo()
                    } else {
                        this.raise('该用户已注册')
                    }
                })
                .catch(() => {
                    this.raise('该用户已注册')
                })
        },
        registerTo() {
            this.isRegister = true
            this.clearWarning()
        },
        loginTo() {
            this.isRegister = false
            this.clearWarning()
        },
        r(e) {
            switch (e.name) {
                case 'login':
                    this.signIn(e.inputsF)
                    break
                case 'to register':
                    this.registerTo()
                    break
                case 'register':
                    this.signUp(e.inputsF)
                    break
                case 'to login':
                    this.loginTo()
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
        },
        clearWarning() {
            this.warning = ''
        }
    }
}
</script>
