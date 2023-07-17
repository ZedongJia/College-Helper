import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/'

axios.defaults.withCredentials = true

axios.defaults.proxy = {
    host: 'localhost',
    port: '8080'
}

export default axios
