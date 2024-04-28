<template>
  <div :class="classCls">
    <a-menu
      :mode="modeProp"
      :collapsed="menuModeIsCollapse"
      :trigger-props="{
        'scroll-to-close': true
      }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
    >
      <a-menu-item key="0_0_0" data-obj="1">Menu 1</a-menu-item>
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2" disabled>Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item-group title="Menu Group 1">
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Menu Group 2">
          <a-menu-item key="2_2">Menu 3</a-menu-item>
          <a-menu-item key="2_3">Menu 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, inject, unref } from 'vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const { prefixCls } = useDesign('menu-wrapper')

const sideMenu = inject<boolean>('sideMenu')
const store = useConfigStore()
const { menuModeIsDefault, menuModeIsOverlay, menuModeIsTop, menuModeIsCollapse } =
  storeToRefs(store)

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--default`]: unref(menuModeIsDefault) && !unref(sideMenu),
    [`${prefixCls}--overlay`]: unref(menuModeIsOverlay) && !unref(sideMenu),
    [`${prefixCls}--top`]: unref(menuModeIsTop),
    [`${prefixCls}--collapse`]: unref(menuModeIsCollapse)
  }
])

const modeProp = computed(() => {
  if (unref(menuModeIsDefault) || unref(menuModeIsOverlay)) {
    return 'vertical'
  } else if (unref(menuModeIsTop)) {
    return 'horizontal'
  } else {
    return 'vertical'
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{prefix-var}-menu-wrapper';

.@{prefix-cls} {
  height: calc(100% - var(--di-header-height));
  width: var(--di-menu-side-width);
  position: fixed;
  left: 0;
  top: var(--di-header-height);
  z-index: 100;
  transform: none;
  border-right: 1px solid var(--color-border);

  &--default,
  &--overlay {
    transform: translate3d(calc(-1 * var(--di-menu-side-width)), 0, 0);
    transition: transform 0.2s;
  }

  &--overlay {
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }

  &--top {
    width: 100%;
    position: relative;
    top: 0;
    border-right-width: 0;
  }

  &--collapse {
    width: var(--di-menu-collapsed-width);
  }

  .arco-menu {
    height: 100%;
  }
}
</style>
