<template>
  <div :class="classCls">
    <a-button type="primary" :class="`${prefixCls}-button`" @click="toggleDrawer">
      <i-ant-design:setting-outlined class="iconify-icon" v-if="!drawer" />
      <i-ant-design:close-outlined class="iconify-icon" v-else />
    </a-button>
    <a-drawer v-model:visible="drawer" :width="300">
      <template #header>
        <span>项目配置</span>
      </template>
      <config-theme />
      <config-menu />
      <component-themes />
      <topbar-themes />
      <menu-themes v-if="!menuModeIsTop" />
      <bg-color-themes />
      <interface-function />
      <interface-display />
      <template #footer>
        <design-handle />
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, unref } from 'vue'

import ConfigMenu from './config-menu.vue'
import ConfigTheme from './config-theme.vue'
import DesignHandle from './design-handle.vue'
import InterfaceDisplay from './interface/interface-display.vue'
import InterfaceFunction from './interface/interface-function.vue'
import BgColorThemes from './themes/bg-color-themes.vue'
import ComponentThemes from './themes/component-themes.vue'
import MenuThemes from './themes/menu-themes.vue'
import TopbarThemes from './themes/topbar-themes.vue'

import { useDesign } from '@/hooks/web/useDesign'
import { useConfigStore } from '@/stores'

const drawer = ref(false)

const { prefixCls } = useDesign('layout-config')

const classCls = computed(() => [
  {
    [prefixCls]: true,
    [`${prefixCls}--open`]: unref(drawer)
  }
])

const toggleDrawer = () => {
  drawer.value = !unref(drawer)
}

const configStore = useConfigStore()
const { menuModeIsTop } = storeToRefs(configStore)
</script>

<style scoped lang="less">
@prefix-cls: ~'@{prefix-var}-layout-config';
.@{prefix-cls} {
  &-button {
    position: fixed;
    top: 45%;
    right: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;

    :deep(> span) {
      margin-left: 2px;
    }
  }

  &--open {
    width: 100%;

    .@{prefix-cls} {
      &-button {
        transition: right 295ms cubic-bezier(0.7, 0.3, 0.1, 1) 0s;
        right: 300px;
        z-index: 2000;
      }
    }
  }
}
</style>

<style lang="less">
@import url('../styles/theme-color.less');
</style>
