<template lang="">
    <InfoForm
        title="注册"
        :warning="warning"
        :inputs="inputs"
        :buttons="buttons"
        @receive="r"
        Popover
    ></InfoForm>
</template>
<script>
import { registerPOST } from '@/api/user.js'
import { jumpTo } from '@/utils/callback'
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
                },
                {
                    type: 'password',
                    title: '再次确认密码',
                    symbol: 'confirm'
                }
            ],
            buttons: [
                {
                    title: '注册',
                    symbol: 'register'
                },
                {
                    title: '去登录',
                    symbol: 'to login'
                }
            ],
            warning: ''
        }
    },
    methods: {
        signUp(registerMsg) {
            // 校验
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
                        this.$store.commit('prompt/trigger', '注册成功')
                        jumpTo(() => {
                            this.toLogin()
                        })
                    } else {
                        this.raise('该用户已注册')
                    }
                })
                .catch(() => {
                    this.raise('网络故障，请重试')
                })
        },
        toLogin() {
            this.$router.push({
                name: 'login'
            })
        },
        r(e) {
            switch (e.name) {
                case 'register':
                    this.signUp(e.inputsF)
                    break
                case 'to login':
                    this.toLogin()
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
<style lang=""></style>
