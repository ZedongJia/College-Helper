import axois from './index.js'

/**
 * 登录请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function loginGET (params) {
    return axois({
        url: 'user/login/',
        method: 'GET',
        params
    })
}
/**
 * 登出
 * @returns {Promise}
 */
export function logOutGET () {
    return axois({
        url: 'user/logout',
        method: 'GET'
    })
}

/**
 * 登录请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function registerPOST (params) {
    return axois({
        url: 'user/register/',
        method: 'POST',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export function validCookie () {
    return axois({
        url: 'user/valid/',
        method: 'GET'
    })
}
