import { axios } from './index.js'
import store from '@/store/index.js'
function raise (msg) {
    store.commit('prompt/trigger', {
        msg: msg,
        level: 'warning'
    })
}
export function RelationQuery (params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/relation/',
            method: 'GET',
            params
        }).then(response => {
            if (response) {
                resolve(response)
            } else {
                reject(response)
            }
        }).catch(() => {
            raise('网络故障，请重试')
        })
    })
}
