import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import register from './components/index'

const app = createApp(App)
app.config.globalProperties.echarts = echarts
register(app)
app.use(store).use(router).mount('#app')
