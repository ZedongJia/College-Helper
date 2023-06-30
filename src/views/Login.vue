<template>
    <div
        v-if="!isRegister"
        id="login-frame"
    >
        <h1 id="title">垂直农业知识图谱系统</h1>
        <div id="input-box">
            <div id="account-box">
                <input
                    type="text"
                    v-model="login.account"
                    required
                />
                <span>用户名</span>
            </div>
            <div id="pw-box">
                <input
                    type="password"
                    v-model="login.password"
                    required
                />
                <span>密码</span>
            </div>
        </div>
        <div id="operate-box">
            <button @click="signIn">登录</button>
            <button @click="registerTo">去注册</button>
        </div>
    </div>
    <div
        v-if="isRegister"
        id="login-frame"
    >
        <h1 id="title">垂直农业知识图谱系统</h1>
        <div id="input-box">
            <div id="account-box">
                <input
                    type="text"
                    v-model="register.account"
                    required
                />
                <span>用户名</span>
            </div>
            <div id="pw-box">
                <input
                    type="password"
                    v-model="register.password"
                    required
                />
                <span>密码</span>
            </div>
            <div id="cf-box">
                <input
                    type="password"
                    v-model="register.confirm"
                    required
                />
                <span>再次确认密码</span>
            </div>
        </div>
        <div id="operate-box">
            <button @click="signUp">注册</button>
            <button @click="backTo">去登录</button>
        </div>
    </div>
    <div id="login-bg"></div>
</template>
<script>
export default {
    data() {
        return {
            isRegister: false,
            login: {
                account: '',
                password: ''
            },
            register: {
                account: '',
                password: '',
                confirm: ''
            }
        }
    },
    methods: {
        signIn() {
            // todo
            this.$router.push('/mainBoard')
        },
        signUp() {
            // todo
        },
        registerTo() {
            this.isRegister = true
        },
        backTo() {
            this.isRegister = false
        }
    }
}
</script>
<style>
#login-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background-color: transparent;
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 5px black;
    border-radius: 5px;
}
#login-frame > * {
    flex: 0 0 100%;
}
/* title */
#title {
    margin: 32px 0;
    font-size: 26px;
    text-align: center;
}

/* input css */
#input-box > * {
    margin-bottom: 16px;
}

#account-box,
#pw-box,
#cf-box {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

#account-box input,
#pw-box input,
#cf-box input {
    margin: 0 auto;
    padding-left: 1em;
    width: 80%;
    height: 48px;
    font-size: 18px;
    line-height: 48px;
    border-bottom: 1px solid black;
}

#account-box span,
#pw-box span,
#cf-box span {
    pointer-events: none;
    position: absolute;
    left: 15%;
    top: 50%;
    transform: translate(0, -50%);
    transition: 0.25s;
}
#account-box input:focus ~ span,
#account-box input:valid ~ span,
#pw-box input:focus ~ span,
#pw-box input:valid ~ span,
#cf-box input:focus ~ span,
#cf-box input:valid ~ span {
    transform: translate(0, -175%);
}
/* button css */
#operate-box {
    margin: 16px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}
#operate-box button {
    cursor: pointer;
    height: 48px;
    font-size: 18px;
}

#login-bg {
    z-index: -1;
    position: fixed;
    opacity: 0.7;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('./images/login-bg.png');
    background-size: 100% 100%;
}
</style>
