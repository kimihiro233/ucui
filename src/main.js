import './assets/main.css'
// playground 支持运行时切库：两套样式同时加载（类名前缀隔离，互不冲突）
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'
import App from './App.vue'
import UniUI from './core'

const app = createApp(App)

app.use(UniUI, { lib: 'element' })

app.mount('#app')
