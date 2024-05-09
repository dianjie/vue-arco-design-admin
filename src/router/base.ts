import { type RouteRecordRaw } from 'vue-router'

import { DEFAULT_LAYOUT, NOTFOUND_ROUTE_NAME, REDIRECT_ROUTE_NAME } from './constants'

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  name: 'RedirectTo',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true
      }
    }
  ]
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOTFOUND_ROUTE_NAME,
  component: () => import('@/views/not-found/index.vue')
}
