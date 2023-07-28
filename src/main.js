import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import akComponents from './lib/index'
import 'ionicons/dist/ionicons/ionicons.esm.js'
import 'ionicons/dist/ionicons/ionicons.js'
const app = createApp(App)
app.config.globalProperties.echarts = echarts
app.use(akComponents)
app.use(store).use(router).mount('#app')
