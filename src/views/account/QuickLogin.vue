<template>
    <div id="account-form">
        <h1>登录</h1>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="call-outline"></ion-icon>
            </span>
            <input
                id="phone"
                type="text"
                v-model="quickForm.phone"
                required
            />
            <span class="error-prompt"></span>
            <label for="phone">手机号</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="code-working-outline"></ion-icon>
            </span>
            <input
                style="width: 50%"
                id="code"
                type="text"
                v-model="quickForm.code"
                required
            />
            <span style="right: 50%;" class="error-prompt"></span>
            <label for="code">验证码</label>
            <span class="line"></span>
            <Button style="width: 50%; height: 40px; line-height: 40px"
                >点击发送验证码
            </Button>
        </div>
        <p>
            <router-link
                style="float: left"
                :to="{ name: 'login' }"
                >密码登陆</router-link
            >
        </p>
        <Button
            @click="signIn"
            style="
                margin-top: 40px;
                width: 80%;
                height: 40px;
                line-height: 40px;
            "
            >登录</Button
        >
        <p>还没有账号? <a @click="toRegister">去注册</a></p>
    </div>
</template>
<script>
// import { loginGET } from '@/api/user.js'
// import { jumpTo } from '@/utils/callback.js'
import { Validator } from '@/utils/validation.js'
export default {
    data() {
        return {
            quickForm: {
                phone: '',
                code: ''
            },
            validator: new Validator()
        }
    },
    methods: {
        signIn() {
            this.validate()
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
                name: 'register'
            })
        },
        validate() {
            // 清空警告
            document.querySelectorAll('.error-prompt').forEach((e) => {
                e.innerHTML = ''
            })

            const res = this.validator.validate({
                phone: this.quickForm.phone
            })
            let isValid = true
            if (!res.phone.result) {
                document.querySelector('#phone~.error-prompt').innerHTML =
                    res.phone.error
                isValid = false
            }
            if (this.quickForm.code === '') {
                document.querySelector('#code~.error-prompt').innerHTML =
                    '验证码不能为空'
                isValid = false
            }
            return isValid
        }
    }
}
</script>
