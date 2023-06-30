import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'echarts'
import register from './components/index'

const app = createApp(App)
register(app)
app.use(store).use(router).mount('#app')
