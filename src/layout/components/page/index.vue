<template>
  <router-view>
    <template #default="{ Component, route }">
      <keep-alive v-if="openCache" :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-else :is="Component" :key="route.fullPath" />
    </template>
  </router-view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, unref } from 'vue'

import { useConfigStore, useTabBarStore } from '@/stores'

defineOptions({ name: 'page-layout' })

const store = useConfigStore()

const { getShowTabBar, getOpenKeepAlive } = storeToRefs(store)

const tabBarStore = useTabBarStore()

const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowTabBar))

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return []
  }
  return tabBarStore.getCacheTabList
})
</script>
