import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

import useConfigStore from './modules/design'
import useTabBarStore from './modules/tab-bar'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { useConfigStore, useTabBarStore }
export default store
