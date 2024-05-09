import type { Router } from 'vue-router'

import { setRouteEmitter } from '@/router/utils/routeListener'

function createPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
}
