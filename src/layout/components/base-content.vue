<template>
  <div :class="classCls">
    <tab-bar v-if="getShowTabBar" />
    <div :class="`${prefixCls}-content`">
      <page-layout />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, inject, unref } from 'vue'

import TabBar from './base-tabbar.vue'
import PageLayout from './page/index.vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const { prefixCls } = useDesign('layout-main')

const sideMenu = inject<boolean>('sideMenu')

const store = useConfigStore()
const { menuModeIsDefault, menuModeIsTop, menuModeIsCollapse, getShowTabBar } = storeToRefs(store)

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
