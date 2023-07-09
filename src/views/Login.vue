<template>
    <InfoForm
        v-if="isRegister"
        :title="title"
        :inputs="registerLayout.inputs"
        :buttons="registerLayout.buttons"
        @receive="r"
    ></InfoForm>
    <InfoForm
        v-if="!isRegister"
        :title="title"
        :inputs="loginLayout.inputs"
        :buttons="loginLayout.buttons"
        @receive="r"
    ></InfoForm>
</template>
<script>
export default {
    data() {
        return {
            isRegister: false,
            title: '垂直农业知识图谱',
            login: {
                account: '',
                password: ''
            },
            register: {
                account: '',
                password: '',
                confirm: ''
            },
            loginLayout: {
                inputs: [
                    {
                        type: 'text',
                        symbol: 'Account'
                    },
                    {
                        type: 'password',
                        symbol: 'Password'
                    }
                ],
                buttons: ['login', 'to register']
            },
            registerLayout: {
                inputs: [
                    {
                        type: 'text',
                        symbol: 'Account'
                    },
                    {
                        type: 'password',
                        symbol: 'Password'
                    },
                    {
                        type: 'password',
                        symbol: 'Confirm'
                    }
                ],
                buttons: ['register', 'to login']
            }
        }
    },
    methods: {
        signIn(loginMsg) {
            // todo
            this.$router.push('/mainBoard')
        },
        signUp(registerMsg) {
            // todo
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
        }
    }
}
</script>
