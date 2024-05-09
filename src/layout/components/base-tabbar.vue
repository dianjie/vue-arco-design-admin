<template>
  <div class="tab-bar-container">
    <a-scrollbar ref="scrollbarRef">
      <tab-item
        class="tabs-item"
        v-for="(tag, index) in tagList"
        :key="tag.fullPath"
        :index="index"
        :item-data="tag"
      />
    </a-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useRoute, type RouteLocationNormalized } from 'vue-router'

import TabItem from './tab-item/index.vue'

import { listenerRouteChange, removeRouteListener } from '@/router/utils/routeListener'
import { useTabBarStore, useConfigStore } from '@/stores'

const tabBarStore = useTabBarStore()
const configStore = useConfigStore()

const tagList = computed(() => {
  return tabBarStore.getTabList
})

const scrollbarRef = ref()

const route = useRoute()

const isOverflow = () => {
  const container = scrollbarRef.value?.containerRef
  return container ? container.scrollWidth > container.parentElement.scrollWidth : false
}

const getMaxOffset = () => {
  const container = scrollbarRef.value?.containerRef
  return container ? container.scrollWidth - container.parentElement.scrollWidth : 0
}

const getScrollLeft = () => {
  const container = scrollbarRef.value?.containerRef
  if (container) {
    const activatedTab = container.querySelector(`span[data-fullPath="${route.fullPath}"]`)
    const {
      parentElement: { offsetWidth: parentOffsetLeft }
    } = container
    const scrollLeft = activatedTab.offsetWidth - (parentOffsetLeft - activatedTab.offsetLeft)
    return activatedTab ? scrollLeft : 0
  }
  return 0
}

const scrollToActiveTab = () => {
  nextTick(() => {
    if (isOverflow()) {
      const scrollLeft = getScrollLeft()
      const maxOffset = getMaxOffset()
      const left = Math.min(Math.max(scrollLeft, 0), maxOffset)
      scrollbarRef.value?.scrollLeft(left)
    }
  })
}

listenerRouteChange((route: RouteLocationNormalized) => {
  if (!route.meta.noAffix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
    tabBarStore.updateTabList(route)
  }
}, true)

onUnmounted(() => {
  removeRouteListener()
})

// 更新是否显示滚动条
watch(
  () => tabBarStore.tagList,
  () => {
    if (configStore.getShowTabBar) {
      nextTick(() => {
        scrollbarRef.value?.handleResize()
      })
    }
  },
  { deep: true }
)

// 路由变化滚动到选中 Tab
watch(
  route,
  () => {
    nextTick(() => {
      scrollToActiveTab()
    })
  },
  { immediate: true, deep: true }
)

// 监听窗口变化
useResizeObserver(scrollbarRef, () => {
  scrollToActiveTab()
})
</script>

<style lang="less">
.tab-bar-container {
  background-color: var(--color-bg-2);
  position: sticky;
  top: var(--di-header-height);
  z-index: 100;
  padding: 0.5rem 1rem;
  width: 100%;
  border-bottom: 1px solid var(--color-border);

  .arco-scrollbar {
    background-color: inherit;

    .arco-scrollbar-track {
      bottom: -12px;
    }
  }

  .arco-scrollbar-container {
    display: flex;
    gap: 10px;
    overflow: auto;

    .tabs-item {
      flex-shrink: 0;
      cursor: pointer;
    }
  }
}
</style>
