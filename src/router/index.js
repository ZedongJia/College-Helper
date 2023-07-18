import { createRouter, createWebHashHistory } from 'vue-router'
import { validCookie } from '@/api/user'
import store from '@/store/index.js'
import login from './modules/account.js'
import dashBoard from './modules/System.js'
import test from './modules/test.js'

const routes = [
    // entry redirect
    {
        path: '/',
        redirect: '/account'
    },
    login,
    dashBoard,
    test
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const { userInfo } = store.getters
    // test
    const backdoor = true
    if (backdoor) {
        return
    }
    // 跳过login
    if (!to.fullPath.startsWith('/account') && !userInfo.hasLogin) {
        // 检测
        validCookie().then((response) => {
            if (response.data - 400 === 0) {
                router.push({
                    name: 'login'
                })
            }
        }).catch(() => {
            router.push({
                name: 'login'
            })
        })
    }
})

export default router
