import { createRouter, createWebHashHistory } from 'vue-router'

import { DEFAULT_LAYOUT } from './constants'

const router = createRouter({
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
          component: () => import('@/views/welcome/index.vue')
        }
      ]
    }
  ]
})

export default router
