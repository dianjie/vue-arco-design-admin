<template>
  <div :class="classCls">
    <div :class="`${prefixCls}-content`">
      <router-view>
        <template #default="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, inject, unref } from 'vue'
import { RouterView } from 'vue-router'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const { prefixCls } = useDesign('layout-main')

const sideMenu = inject<boolean>('sideMenu')

const store = useConfigStore()
const { menuModeIsDefault, menuModeIsTop, menuModeIsCollapse } = storeToRefs(store)

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--left-spacing`]: unref(menuModeIsDefault) && unref(sideMenu),
    [`${prefixCls}--top`]: unref(menuModeIsTop),
    [`${prefixCls}--collapse-spacing`]: unref(menuModeIsCollapse)
  }
])
</script>

<style lang="less">
@prefix-cls: ~'@{prefix-var}-layout-main';

.@{prefix-cls} {
  padding-top: var(--di-header-height);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  &-content {
    padding: 1rem;
    background-color: var(--di-content-bg-color);
  }

  &--left-spacing {
    margin-left: var(--di-menu-side-width);
    transition: margin-left 0.2s;
  }

  &--collapse-spacing {
    margin-left: var(--di-menu-collapsed-width);
    transition: margin-left 0.2s;
  }
}
</style>
