import { DEFAULT_LAYOUT } from '../constants'
import type { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/result',
  name: 'result',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '结果页',
    icon: 'check-circle'
  },
  children: [
    {
      path: '403',
      name: 'Result403',
      component: () => import('@/views/result/403/index.vue'),
      meta: { title: '无权限' }
    },
    {
      path: '404',
      name: 'Result404',
      component: () => import('@/views/result/404/index.vue'),
      meta: { title: '访问页面不存在' }
    },
    {
      path: '500',
      name: 'Result500',
      component: () => import('@/views/result/500/index.vue'),
      meta: { title: '服务器出错' }
    }
  ]
}

export default RESULT
