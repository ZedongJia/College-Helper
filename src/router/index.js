import { createRouter, createWebHashHistory } from 'vue-router'
import { stateGET } from '@/api/user.js'
import login from './modules/account.js'
import dashBoard from './modules/System.js'
import debug from './modules/debug.js'
import store from '@/store/index.js'

const routes = [
    // entry redirect
    {
        path: '/',
        redirect: '/account'
    },
    login,
    dashBoard,
    debug
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    if (store.state.userInfo.ID === -1) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo !== null) {
            for (const k in userInfo) {
                store.state.userInfo[k] = userInfo[k]
            }
        }
    }
    // test
    // const backdoor = true
    // if (backdoor) {
    //     return
    // }
    // 跳过login
    if (!to.fullPath.startsWith('/account')) {
        // 检测
        await stateGET({
            logout: false
        }, () => {
            store.commit('userInfo/refresh')
            router.push({
                name: 'login'
            })
        }).catch(() => {
            router.push({
                name: 'login'
            })
        })
    }
})

export default router
