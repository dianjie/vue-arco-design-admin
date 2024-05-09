import { isString } from 'lodash-es'
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

import { type TabBarState, type TagProps } from './types'

import {
  DEFAULT_TAB_ROUTE,
  DEFAULT_TAB_ROUTE_NAME,
  NOTFOUND_ROUTE_NAME,
  REDIRECT_ROUTE_NAME
} from '@/router/constants'

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: (meta.title as string) || '',
    name: String(name),
    fullPath,
    query,
    // 页面不缓存
    ignoreCache: meta.ignoreCache as boolean
  }
}

const BAN_LIST = [REDIRECT_ROUTE_NAME, NOTFOUND_ROUTE_NAME]

const useAppStore = defineStore('app-tab-bar', {
  state: (): TabBarState => ({
    // keep-alive 缓存页面
    cacheTabList: new Set([DEFAULT_TAB_ROUTE_NAME]),
    tagList: [DEFAULT_TAB_ROUTE]
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheTabList(): string[] {
      return Array.from(this.cacheTabList)
    }
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return
      this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string)
      }
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (isString(name) && name !== '') this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.ignoreCache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = [DEFAULT_TAB_ROUTE]
      this.cacheTabList.clear()
      this.cacheTabList.add(DEFAULT_TAB_ROUTE_NAME)
    }
  },
  persist: {
    // 只持久化 tagList ，cacheTabList 自行恢复
    paths: ['tagList'],
    afterRestore: ({ store }) => {
      // 恢复要设置的缓存页面
      const tempCacheTabList: string[] = []
      store.tagList.forEach((item: TagProps) => {
        if (!item.ignoreCache) {
          tempCacheTabList.push(item.name)
        }
      })
      store.cacheTabList = new Set([...new Set(tempCacheTabList)])
    }
  }
})

export default useAppStore
