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
            url: 'user/account/',
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
 * 注册请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function registerPOST (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/account/',
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
 * 查看状态
 * @param {{logout:boolean}} params
 * @param {function} error
 * @returns {Promise}
 */
export function stateGET (params, error) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/state/',
            method: 'GET',
            params
        }).then(response => {
            if (response.data - STATE.NOT_FOUND === 0) {
                reject(response)
            } else {
                resolve(response)
            }
        }).catch(() => {
            if (error === undefined) {
                raise('网络故障，请重试')
            } else {
                error()
            }
        })
    })
}
