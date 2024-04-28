import { createApp } from 'vue'
import './styles/index.less'

import App from './App.vue'
import router from './router'

import { setupStore } from '@/stores'

const bootstrap = () => {
  const app = createApp(App)

  // 配置路由
  app.use(router)

  // 配置 store
  setupStore(app)

  app.mount('#app')
}

bootstrap()
