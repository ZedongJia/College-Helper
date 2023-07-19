import { axios, STATE } from './index.js'
import store from '@/store/index.js'

/**
 * @param {String} msg 报错信息
 */
function raise (msg) {
    store.commit('prompt/trigger', {
        msg: msg,
        level: 'warning'
    })
}
/**
 * 登录请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function loginGET (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/login/',
            method: 'GET',
            params
        }).then(response => {
            if (response.data - STATE.NOT_FOUND === 0) {
                reject(response)
            } else {
                resolve(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}
/**
 * 登出
 * @returns {Promise}
 */
export function logoutGET () {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/logout/',
            method: 'GET'
        }).then(response => {
            if (response.data - STATE.NOT_FOUND === 0) {
                reject(response)
            } else {
                resolve(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

/**
 * 注册请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function registerPOST (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/register/',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data - STATE.NOT_FOUND === 0) {
                reject(response)
            } else {
                resolve(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

/**
 * 验证
 * @param {function} error 错误执行函数
 * @returns
 */
export function valid (error) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/valid/',
            method: 'GET'
        }).then(response => {
            if (response.data - STATE.NOT_FOUND === 0) {
                reject(response)
            } else {
                resolve(response)
            }
        }).catch(() => {
            error()
        })
    })
}
