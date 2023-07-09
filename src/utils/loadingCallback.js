const LOADINGTIME = 1000

/**
 * 执行数据加载的包装函数
 * @param {*} callback 回调函数
 */
function loading(callback) {
    setTimeout(callback, LOADINGTIME)
}
export { loading }
