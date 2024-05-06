// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import './styles/index.less'

import { createApp } from 'vue'

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
