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
            warning: '',
            userinfo: {}
        }
    },
    methods: {
        signIn(loginMsg) {
            console.log(loginMsg)
            let userinfo = {}
            loginGET({
                account: loginMsg.account,
                password: loginMsg.password
            })
                .then((response) => {
                    if (response.data !== '{}') {
                        userinfo = JSON.parse(response.data)
                        this.userinfo = userinfo
                        this.$router.push('/mainBoard')
                    } else {
                        // y
                    }
                })
                .catch(() => {
                    // y
                })
        },
        signUp(registerMsg) {
            let state = -1
            registerPOST({
                account: registerMsg.account,
                password: registerMsg.password
            })
                .then((response) => {
                    state = response.data
                })
                .catch(() => {
                    // t
                })
            if (state === 200) {
                this.loginTo()
            } else {
                // y
            }
        },
        registerTo() {
            this.isRegister = true
        },
        loginTo() {
            this.isRegister = false
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
        }
    }
}
</script>
