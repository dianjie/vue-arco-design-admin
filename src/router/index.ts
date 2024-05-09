import { type App } from 'vue'
import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './base'
import { DEFAULT_LAYOUT } from './constants'
import { appRoutes } from './helper/moduleRouter'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DEFAULT_LAYOUT,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index.vue'),
          meta: { title: '工作台' }
        }
      ]
    },
    ...appRoutes,
    REDIRECT_ROUTE,
    NOT_FOUND_ROUTE
  ]
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
