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
            <span
                style="right: 50%"
                class="error-prompt"
            ></span>
            <label for="code">验证码</label>
            <span class="line"></span>
            <Button
                @click="sendCode"
                style="width: 50%; height: 40px; line-height: 40px"
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
import { quickGET, codeGET } from '@/api/user.js'
import { jumpTo } from '@/utils/callback.js'
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
            if (!this.validate()) {
                return
            }

            quickGET({
                phone: this.quickForm.phone,
                code: this.quickForm.code
            })
                .then((userInfo) => {
                    this.$store.commit('userInfo/update', userInfo)
                    // 产生提示框
                    this.$store.commit('prompt/trigger', '登陆成功')
                    // 跳转
                    jumpTo(() => {
                        this.$router.push({
                            path: '/system'
                        })
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        toRegister() {
            this.$router.push({
                name: 'register'
            })
        },
        sendCode() {
            if (!this.validate(false)) {
                return
            }
            codeGET()
                .then((info) => {
                    this.$store.commit('prompt/trigger', info)
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        validate(checkCode = true) {
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
            if (checkCode && this.quickForm.code === '') {
                document.querySelector('#code~.error-prompt').innerHTML =
                    '验证码不能为空'
                isValid = false
            }
            return isValid
        }
    }
}
</script>
