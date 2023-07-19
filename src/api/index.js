import axios from 'axios'

const STATE = {
    NOT_FOUND: 400
}
axios.defaults.baseURL = 'http://localhost:8000/'

axios.defaults.withCredentials = true

axios.defaults.proxy = {
    host: 'localhost',
    port: '8080'
}
export { STATE, axios }
