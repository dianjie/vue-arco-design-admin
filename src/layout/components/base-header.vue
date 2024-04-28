<template>
  <header :class="headerCls">
    <div :class="logoCls">
      <h1 :class="`${prefixCls}-logo__title`">Di Admin</h1>
      <a-button shape="square" v-if="hasToggleSideMenu" :class="handleCls" @click="toggleSideMenu">
        <template #icon>
          <i-ep-arrow-right />
        </template>
      </a-button>
    </div>
    <div style="flex: 1 1 0%">
      <base-menu v-if="menuModeIsTop" />
    </div>
    <div :class="`${prefixCls}-right`">
      <a-tooltip content="代码仓库" position="bottom">
        <i-mdi-github :class="iconBtnCls" @click="navToGitHub" />
      </a-tooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, inject, unref } from 'vue'

import pgk from '../../../package.json'

import BaseMenu from './base-menu.vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const { prefixCls } = useDesign('layout-header')

const headerCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--fixed`]: true
  }
])

const configStore = useConfigStore()
const { menuModeIsTop, menuModeIsCollapse, menuModeIsDefault, menuModeIsOverlay, sidebarFixed } =
  storeToRefs(configStore)

const sideMenu = inject<boolean>('sideMenu')

const toggleSideMenu = () => {
  configStore.toggleSideMenu()
}

const handleCls = computed(() => [
  {
    'side-menu-handle': true,
    'side-menu-open': unref(sideMenu)
  }
])

const logoCls = computed(() => [
  {
    [`${prefixCls}-logo`]: true,
    [`${prefixCls}-logo--top`]: unref(menuModeIsTop)
  }
])

const iconBtnCls = computed(() => [
  {
    'icon-btn': true,
    [`${prefixCls}-right__item`]: true
  }
])

const navToGitHub = () => {
  window.open(pgk.homepage)
}

const hasToggleSideMenu = computed(() => {
  const temp = !unref(menuModeIsTop) && !unref(menuModeIsCollapse)
  if (unref(sidebarFixed)) {
    if (unref(menuModeIsDefault)) {
      return false
    }
    if (unref(menuModeIsOverlay)) {
      return true
    }
    return temp
  } else {
    return temp
  }
})
</script>

<style lang="less">
@prefix-cls: ~'@{prefix-var}-layout-header';
.@{prefix-cls} {
  display: flex;
  width: 100%;
  align-items: center;
  height: var(--di-header-height);
  min-height: 35px;
  background-color: var(--di-header-bg-color);
  color: var(--di-header-text-color);
  transition: height linear 0.2s;
  border-bottom: 1px solid var(--color-border);

  &--fixed {
    position: fixed;
    top: 0;
    z-index: 100;
  }

  &-logo {
    width: var(--di-menu-side-width);
    padding-left: 1rem;

    &--top {
      width: auto;
    }

    &__title {
      font-size: 18px;
    }

    .side-menu-handle {
      position: absolute;
      left: calc(var(--di-menu-side-width) - (32px / 2));
      top: calc(var(--di-header-height) / 2 - (32px / 2));
      transition:
        width linear 0.2s,
        height linear 0.2s;

      &.arco-btn-only-icon {
        svg {
          transition: transform 0.2s;
        }
      }
    }

    .side-menu-open {
      &.arco-btn-only-icon {
        svg {
          transform: rotate(-180deg);
        }
      }
    }
  }

  &-right {
    display: flex;
    padding-right: 12px;

    &__item {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }

    .icon-btn {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
