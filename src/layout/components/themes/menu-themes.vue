<template>
  <a-divider>菜单主题色</a-divider>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-item`">
      <div :class="`${prefixCls}-item__left`"> 菜单色 </div>
      <div :class="`${prefixCls}-item__right`">
        <a-color-picker
          v-model="store.menuTheme"
          :show-preset="true"
          :disabled-alpha="true"
          :preset-colors="presetColor"
          format="hex"
          @change="changeMenuTheme"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import presetColor from './preset-color'

import { useDesign } from '@/hooks/web/useDesign'
import { changeMenuTheme } from '@/hooks/web/useMenuTheme'
import { useConfigStore } from '@/stores'

const store = useConfigStore()

const { prefixCls } = useDesign('theme-color')
</script>

<style lang="less"></style>
