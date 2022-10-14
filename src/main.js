import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import router from './router.js'
import App from './App.vue'

// 创建 app 实例
const app = createApp(App)

// 使用element-ui和router
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 挂载 app 实例
app.mount('#app')