import { axios, STATE } from './index.js'
import store from '@/store/index.js'
// ------------------------------登录注册-------------------------
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
 * @param {{account: String,password: String,use:String}} params
 * @returns {Promise}
 */
export function loginGET (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/account/',
            method: 'GET',
            params
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.userInfo)
            } else {
                reject(data.error)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}
/**
 * 快速登陆API
 * @param {{phone: str, code: str}} params
 * @returns {Promise}
 */
export function quickGET (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/quick/',
            method: 'GET',
            params
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.userInfo)
            } else {
                reject(data.error)
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
            const data = response.data
            if (data.status) {
                resolve(data.info)
            } else {
                reject(data.error)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}
/**
 * 验证码获取API
 * @returns {Promise}
 */
export function codeGET () {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/code/',
            method: 'GET'
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.info)
            } else {
                reject(data.error)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}
/**
 * 修改密码
 * @param {{ID:int, password: String}} params
 * @returns {Promise}
 */
export function pwPOST (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/modifyPW/',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.info)
            } else {
                reject(data.error)
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

// ----------------------------------个人信息----------------------------
/**
 * @param {{ID:int}} params
 * @returns {Promise}
 */
export function getUserInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/userInfo/',
            method: 'GET',
            params
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.userInfo)
            } else {
                reject(data.error)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

/**
 * @param {{ID:int, userInfo:{}}} params
 * @returns {Promise}
 */
export function updateUserInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/userInfo/',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.userInfo)
            } else {
                reject(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

/**
 * @param {{ID:int}} params
 * @returns {Promise}
 */
export function getPrivacyInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/privacyInfo/',
            method: 'GET',
            params
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(data.privacyInfo)
            } else {
                reject(data.error)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

/**
 * @param {{k:v}} params
 * @returns
 */
export function updatePrivacyInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/privacyInfo/',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const data = response.data
            if (data.status) {
                resolve(response)
            } else {
                reject(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}

export function getTruePrivacy (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getTruePrivacy/',
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

export function getBrowseInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/browseInfo/',
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

export function deleteBrowseInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/browseInfo/',
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

export function getCollectedInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/collectedInfo/',
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

export function deleteCollectedInfo (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/collectedInfo/',
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

export function getMessageList (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getMessageList/',
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
